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
      range: `${SHEET_NAME}!A2:S`, // Adjust range as needed
    });

    const rows = response.data.values || [];
    
    return rows.map((row, index) => ({
      rowIndex: index + 2, // +2 because row 1 is header, arrays start at 0
      teamRowID: row[0],
      teamSize: parseInt(row[1]) || 0,
      member1Name: row[2] || '',
      reg1: row[3] || '',
      entered1: row[4] === 'TRUE',
      member2Name: row[5] || '',
      reg2: row[6] || '',
      entered2: row[7] === 'TRUE',
      member3Name: row[8] || '',
      reg3: row[9] || '',
      entered3: row[10] === 'TRUE',
      member4Name: row[11] || '',
      reg4: row[12] || '',
      entered4: row[13] === 'TRUE',
      polaroidApplied: row[14] === 'YES',
      polaroidPassType: row[15] || '',
      polaroidUsed: row[16] === 'TRUE',
      polaroidUsedTime: row[17] || '',
    }));
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw new Error('Failed to fetch team data');
  }
}

/**
 * Find team by Registration Number
 * Searches across Reg1, Reg2, Reg3, Reg4
 */
async function findTeamByRegNo(regNo) {
  const teams = await getAllTeams();
  
  for (const team of teams) {
    if (team.reg1 === regNo || team.reg2 === regNo || 
        team.reg3 === regNo || team.reg4 === regNo) {
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

    // Calculate column index (Entered1 is column E = index 5)
    // Entered1: E(5), Entered2: H(8), Entered3: K(11), Entered4: N(14)
    const columnIndex = 5 + ((memberIndex - 1) * 3);
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
 */
async function checkPolaroidEligibility(regNo) {
  const team = await findTeamByRegNo(regNo);
  
  if (!team) {
    return { eligible: false, reason: 'Team not found' };
  }

  if (!team.polaroidApplied) {
    return { eligible: false, reason: 'Polaroid not applied', team };
  }

  if (team.polaroidUsed) {
    return { 
      eligible: false, 
      reason: 'Polaroid already used', 
      team,
      usedTime: team.polaroidUsedTime 
    };
  }

  return { 
    eligible: true, 
    team,
    passType: team.polaroidPassType 
  };
}

/**
 * Mark Polaroid as used
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

    if (team.polaroidUsed) {
      throw new Error('Polaroid already used');
    }

    const now = new Date().toISOString();
    
    // Update PolaroidUsed (column Q) and PolaroidUsedTime (column R)
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!Q${team.rowIndex}:R${team.rowIndex}`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [['TRUE', now]],
      },
    });

    return { success: true, message: 'Polaroid marked as used', timestamp: now };
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
};
