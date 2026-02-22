import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

// Google Sheets Configuration
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const SHEET_NAME = process.env.SHEET_NAME || 'Registrations';

// Initialize Google Sheets API
const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

/**
 * Fetch all team data from Google Sheet
 */
async function getAllTeams() {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A2:T`, // A-T: 20 columns including PolaroidPassUsed
    });

    const rows = response.data.values || [];
    
    return rows.map((row, index) => ({
      rowIndex: index + 2, // +2 because row 1 is header, arrays start at 0
      teamRowID: row[0],
      teamSize: parseInt(row[1]) || 0,
      mergedTeamID: row[2] || row[0], // Column C - Merged_TeamID, defaults to TeamRowID if not set
      member1Name: row[3] || '',
      reg1: row[4] || '',
      entered1: row[5] === 'TRUE',
      member2Name: row[6] || '',
      reg2: row[7] || '',
      entered2: row[8] === 'TRUE',
      member3Name: row[9] || '',
      reg3: row[10] || '',
      entered3: row[11] === 'TRUE',
      member4Name: row[12] || '',
      reg4: row[13] || '',
      entered4: row[14] === 'TRUE',
      polaroidApplied: row[15] === 'YES',
      polaroidPassType: row[16] || '',
      polaroidUsed: row[17] === 'TRUE',
      polaroidUsedTime: row[18] || '',
      polaroidPassUsed: parseInt(row[19]) || 0,
    }));
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw new Error('Failed to fetch team data');
  }
}

/**
 * Find team by Registration Number
 * Searches across Reg1, Reg2, Reg3, Reg4
 * Case-insensitive matching
 */
async function findTeamByRegNo(regNo) {
  const teams = await getAllTeams();
  
  // Convert input to uppercase for case-insensitive matching
  const regNoUpper = regNo.toUpperCase();
  
  for (const team of teams) {
    if (team.reg1.toUpperCase() === regNoUpper || 
        team.reg2.toUpperCase() === regNoUpper || 
        team.reg3.toUpperCase() === regNoUpper || 
        team.reg4.toUpperCase() === regNoUpper) {
      return team;
    }
  }
  
  return null;
}

/**
 * Mark a specific member as entered
 */
async function markMemberEntry(teamRowID, memberIndex) {
  try {
    const teams = await getAllTeams();
    const team = teams.find(t => t.teamRowID === teamRowID);
    
    if (!team) {
      throw new Error('Team not found');
    }

    // Validate member index (1-4)
    if (memberIndex < 1 || memberIndex > 4) {
      throw new Error('Invalid member index');
    }

    // Check if member exists
    const regKey = `reg${memberIndex}`;
    if (!team[regKey]) {
      throw new Error('Member does not exist');
    }

    // Check if already entered
    const enteredKey = `entered${memberIndex}`;
    if (team[enteredKey]) {
      throw new Error('Member already entered');
    }

    // Calculate column index (Entered1 is column F = index 6)
    // Entered1: F(6), Entered2: I(9), Entered3: L(12), Entered4: O(15)
    const columnIndex = 6 + ((memberIndex - 1) * 3);
    const columnLetter = String.fromCharCode(64 + columnIndex);
    
    // Update the sheet
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!${columnLetter}${team.rowIndex}`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [['TRUE']],
      },
    });

    return { success: true, message: 'Entry marked successfully' };
  } catch (error) {
    console.error('Error marking entry:', error);
    throw error;
  }
}

/**
 * Check Polaroid eligibility
 * Handles merged team logic
 */
async function checkPolaroidEligibility(regNo) {
  const teams = await getAllTeams();
  
  // STEP 1: Find original team by regNo
  const originalTeam = await findTeamByRegNo(regNo);
  
  if (!originalTeam) {
    return { eligible: false, reason: 'Team not found' };
  }

  // STEP 2: Check if this is a merged team
  const isMerged = originalTeam.teamRowID !== originalTeam.mergedTeamID;
  
  if (!isMerged) {
    // Normal team - simple logic
    if (!originalTeam.polaroidApplied) {
      return { eligible: false, reason: 'Polaroid not applied', team: originalTeam };
    }

    const passTypeLimit = parseInt(originalTeam.polaroidPassType) || 0;
    const currentUsage = originalTeam.polaroidPassUsed || 0;
    
    if (currentUsage >= passTypeLimit) {
      return { 
        eligible: false, 
        reason: 'Polaroid pass limit reached', 
        team: originalTeam,
        usedTime: originalTeam.polaroidUsedTime,
        usedCount: currentUsage,
        maxCount: passTypeLimit
      };
    }

    return { 
      eligible: true, 
      team: originalTeam,
      passType: originalTeam.polaroidPassType,
      usedCount: currentUsage,
      remainingCount: passTypeLimit - currentUsage,
      merged: false
    };
  }
  
  // STEP 3: Merged team - fetch all teams in merge group
  const mergedTeamID = originalTeam.mergedTeamID;
  const mergeGroupTeams = teams.filter(t => 
    t.mergedTeamID === mergedTeamID && t.teamRowID !== mergedTeamID
  );
  
  // Build merge info with FRESH data
  const mergeInfo = {
    mergedTeamID: mergedTeamID,
    originalTeamRowID: originalTeam.teamRowID,
    teams: mergeGroupTeams.map(t => {
      const passTypeLimit = parseInt(t.polaroidPassType) || 0;
      const currentUsage = t.polaroidPassUsed || 0;
      return {
        teamRowID: t.teamRowID,
        teamSize: t.teamSize,
        polaroidApplied: t.polaroidApplied,
        polaroidPassType: t.polaroidPassType,
        polaroidUsed: currentUsage >= passTypeLimit, // Calculate based on current data
        polaroidPassUsed: currentUsage,
        usedTime: t.polaroidUsedTime,
        members: [
          t.reg1 ? { name: t.member1Name, regNo: t.reg1 } : null,
          t.reg2 ? { name: t.member2Name, regNo: t.reg2 } : null,
          t.reg3 ? { name: t.member3Name, regNo: t.reg3 } : null,
          t.reg4 ? { name: t.member4Name, regNo: t.reg4 } : null,
        ].filter(Boolean)
      };
    })
  };
  
  // Check if ANY team in merge group has available passes
  const hasAnyEligibleTeam = mergeInfo.teams.some(t => {
    if (!t.polaroidApplied) return false;
    const passLimit = parseInt(t.polaroidPassType) || 0;
    const used = t.polaroidPassUsed || 0;
    return used < passLimit;
  });
  
  if (!hasAnyEligibleTeam) {
    // No team in the merge has available passes
    return { 
      eligible: false, 
      reason: 'No available passes in merged team', 
      team: originalTeam,
      merged: true,
      mergeInfo 
    };
  }

  // At least one team has passes available
  const passTypeLimit = parseInt(originalTeam.polaroidPassType) || 0;
  const currentUsage = originalTeam.polaroidPassUsed || 0;
  
  return { 
    eligible: true, 
    team: originalTeam,
    passType: originalTeam.polaroidPassType,
    usedCount: currentUsage,
    remainingCount: passTypeLimit - currentUsage,
    merged: true,
    mergeInfo
  };
}

/**
 * Mark Polaroid as used
 * Only updates ORIGINAL team row, never merged identity row
 */
async function markPolaroidUsed(teamRowID) {
  try {
    const teams = await getAllTeams();
    const team = teams.find(t => t.teamRowID === teamRowID);
    
    if (!team) {
      throw new Error('Team not found');
    }

    if (!team.polaroidApplied) {
      throw new Error('Polaroid not applied for this team');
    }

    // Check if usage limit has been reached
    const passTypeLimit = parseInt(team.polaroidPassType) || 0;
    const currentUsage = team.polaroidPassUsed || 0;
    
    if (currentUsage >= passTypeLimit) {
      throw new Error('Polaroid pass limit already reached');
    }

    const now = new Date().toISOString();
    const newUsageCount = currentUsage + 1;
    const isFullyUsed = newUsageCount >= passTypeLimit;
    
    // Update PolaroidUsed (column R), PolaroidUsedTime (column S), and PolaroidPassUsed (column T)
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!R${team.rowIndex}:T${team.rowIndex}`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [[isFullyUsed ? 'TRUE' : 'FALSE', now, newUsageCount]],
      },
    });

    return { 
      success: true, 
      message: 'Polaroid marked as used', 
      timestamp: now,
      usedCount: newUsageCount,
      remainingCount: passTypeLimit - newUsageCount
    };
  } catch (error) {
    console.error('Error marking polaroid:', error);
    throw error;
  }
}

/**
 * Convert pass type number to name
 * 1 = Single, 2 = Duo, 3 = Group, 4 = Group
 */
function getPassTypeName(typeNumber) {
  const typeMap = {
    '1': 'Single',
    '2': 'Duo',
    '3': 'Group',
    '4': 'Group'
  };
  return typeMap[typeNumber] || typeNumber;
}

/**
 * Get merged team info for entry display
 */
async function getMergedTeamInfo(teamRowID) {
  const teams = await getAllTeams();
  const team = teams.find(t => t.teamRowID === teamRowID);
  
  if (!team) {
    return null;
  }
  
  const isMerged = team.teamRowID !== team.mergedTeamID;
  
  if (!isMerged) {
    return null;
  }
  
  // Get all teams in merge group
  const mergedTeamID = team.mergedTeamID;
  const mergeGroupTeams = teams.filter(t => 
    t.mergedTeamID === mergedTeamID && t.teamRowID !== mergedTeamID
  );
  
  return {
    mergedTeamID,
    originalTeamRowID: team.teamRowID,
    teams: mergeGroupTeams.map(t => ({
      teamRowID: t.teamRowID,
      teamSize: t.teamSize,
      members: [
        t.reg1 ? { name: t.member1Name, regNo: t.reg1, entered: t.entered1 } : null,
        t.reg2 ? { name: t.member2Name, regNo: t.reg2, entered: t.entered2 } : null,
        t.reg3 ? { name: t.member3Name, regNo: t.reg3, entered: t.entered3 } : null,
        t.reg4 ? { name: t.member4Name, regNo: t.reg4, entered: t.entered4 } : null,
      ].filter(Boolean)
    }))
  };
}

/**
 * Get all registrations (for QR generation)
 */
async function getAllRegistrations() {
  const teams = await getAllTeams();
  
  return teams.map(team => ({
    teamRowID: team.teamRowID,
    teamSize: team.teamSize,
    primaryRegNo: team.reg1, // Use first member's RegNo
    members: [
      { name: team.member1Name, regNo: team.reg1 },
      team.reg2 ? { name: team.member2Name, regNo: team.reg2 } : null,
      team.reg3 ? { name: team.member3Name, regNo: team.reg3 } : null,
      team.reg4 ? { name: team.member4Name, regNo: team.reg4 } : null,
    ].filter(Boolean),
  }));
}

export {
  getAllTeams,
  findTeamByRegNo,
  markMemberEntry,
  checkPolaroidEligibility,
  markPolaroidUsed,
  getPassTypeName,
  getAllRegistrations,
  getMergedTeamInfo,
};
