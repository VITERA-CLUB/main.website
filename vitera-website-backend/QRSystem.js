import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

// Google Sheets Configuration
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const SHEET_NAME = process.env.SHEET_NAME || 'Registrations';

// Initialize Google Sheets API safely
let auth = null;
let sheets = null;

if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
  try {
    auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    sheets = google.sheets({ version: 'v4', auth });
  } catch (err) {
    console.error('❌ Failed to parse GOOGLE_SERVICE_ACCOUNT_KEY:', err.message);
  }
} else {
  console.warn('⚠️ GOOGLE_SERVICE_ACCOUNT_KEY is not defined in environment variables.');
}

// Cache for sheet IDs to avoid repeated metadata fetches
let sheetIdCache = null;

/**
 * Get sheet IDs with caching
 */
async function getSheetIds() {
  if (!sheets) {
    throw new Error('Google Sheets API is not initialized. Please provide GOOGLE_SERVICE_ACCOUNT_KEY in .env');
  }

  if (sheetIdCache) {
    return sheetIdCache;
  }

  const sheetMetadata = await sheets.spreadsheets.get({
    spreadsheetId: SPREADSHEET_ID,
    fields: 'sheets.properties',
  });

  const mainSheet = sheetMetadata.data.sheets.find(
    s => s.properties.title === SHEET_NAME
  );
  const teamStatusSheet = sheetMetadata.data.sheets.find(
    s => s.properties.title === 'team-status'
  );

  sheetIdCache = {
    main: mainSheet ? mainSheet.properties.sheetId : 0,
    teamStatus: teamStatusSheet ? teamStatusSheet.properties.sheetId : null,
  };

  return sheetIdCache;
}

/**
 * Fetch all registration data from Google Sheet
 * Full Column Sequence (A to BH):
 * A: Timestamp
 * B: Name
 * C: College Email ID
 * D: Select your team type (SOLO, TRIO, QUINTET)
 * E: Syndicate Name (SOLO)
 * F: Participant Name (SOLO)
 * G: Registration No (SOLO)
 * H: Batch (SOLO)
 * I: Reference (SOLO)
 * J: Syndicate Name (DUO)
 * K: Member 1 Name (DUO)
 * L: Member 1 Reg (DUO)
 * M: Member 2 Name (DUO)
 * N: Member 2 Reg (DUO)
 * O: Reference (DUO)
 * P: Syndicate Name (TRIO)
 * Q: Member 1 Name (TRIO)
 * R: Member 1 Reg (TRIO)
 * S: Member 2 Name (TRIO)
 * T: Member 2 Reg (TRIO)
 * U: Member 3 Name (TRIO)
 * V: Member 3 Reg (TRIO)
 * W: Reference (TRIO)
 * X: Syndicate Name (QUARTET / 4)
 * Y: Member 1 Name
 * Z: Member 1 Reg
 * AA: Member 2 Name
 * AB: Member 2 Reg
 * AC: Member 3 Name
 * AD: Member 3 Reg
 * AE: Member 4 Name
 * AF: Member 4 Reg
 * AG: Polaroid Pass Choice
 * AH: Reference
 * AI: Syndicate Name (QUINTET / 5)
 * AJ: Member 1 Name
 * AK: Member 1 Reg
 * AL: Member 2 Name
 * AM: Member 2 Reg
 * AN: Member 3 Name
 * AO: Member 3 Reg
 * AP: Member 4 Name
 * AQ: Member 4 Reg
 * AR: Member 5 Name
 * AS: Member 5 Reg
 */
async function getAllTeams() {
  try {
    if (!sheets) {
      throw new Error('Google Sheets API is not initialized. Please provide GOOGLE_SERVICE_ACCOUNT_KEY in .env');
    }

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A2:BH`, // Read all response columns
    });

    const rows = response.data.values || [];
    
    return rows.map((row, index) => {
      const teamType = (row[3] || '').trim().toUpperCase();
      const members = [];
      let syndicateName = 'Default Syndicate';
      let foundRegNo = '';

      // Helper to add valid member
      const addMember = (name, reg) => {
        if (reg && reg.trim()) {
          const cleanReg = reg.trim();
          const cleanName = (name && name.trim()) ? name.trim() : cleanReg;
          members.push({ name: cleanName, regNo: cleanReg });
        }
      };

      // 1. Check Team Type specific mapping
      if (teamType.includes('SOLO')) {
        syndicateName = row[4] || row[1] || 'Solo Syndicate';
        addMember(row[5] || row[1], row[6]);
      } else if (teamType.includes('TRIO') || teamType.includes('3')) {
        syndicateName = row[15] || 'Trio Syndicate';
        addMember(row[16], row[17]);
        addMember(row[18], row[19]);
        addMember(row[20], row[21]);
      } else if (teamType.includes('QUINTET') || teamType.includes('5')) {
        syndicateName = row[34] || row[35] || 'Quintet Syndicate';
        addMember(row[35], row[36]);
        addMember(row[37], row[38]);
        addMember(row[39], row[40]);
        addMember(row[41], row[42]);
        addMember(row[43], row[44]);
      }

      // 2. Comprehensive Row Scan (catches any registration number in any column cell)
      row.forEach((cell, cellIdx) => {
        if (cell && typeof cell === 'string') {
          const val = cell.trim();
          // Regex for VIT Registration Number pattern: 2 digits + 3 letters + 5 digits (e.g. 26BAI11062, 26BCE10412, 24MIM10166)
          if (/^\d{2}[A-Z]{3}\d{5}$/i.test(val) || /^\d{2}[A-Z]{3}\d{4}$/i.test(val)) {
            const isAlreadyAdded = members.some(m => m.regNo.toUpperCase() === val.toUpperCase());
            if (!isAlreadyAdded) {
              const possibleName = (cellIdx > 0 && row[cellIdx - 1]) ? row[cellIdx - 1] : val;
              addMember(possibleName, val);
            }
          }
        }
      });

      if (!syndicateName || syndicateName === 'Default Syndicate') {
        syndicateName = row[4] || row[9] || row[15] || row[23] || row[34] || 'Syndicate';
      }

      return {
        rowIndex: index + 2, // 1-indexed row number in Google Sheet
        teamRowID: (index + 1).toString(),
        timestamp: row[0] || '',
        leaderName: row[1] || '',
        email: row[2] || '',
        teamType: row[3] || 'SOLO',
        syndicateName: syndicateName,
        members: members,
        teamSize: members.length || 1,
        mergedTeamID: (index + 1).toString(),
        // Backwards compatibility properties
        member1Name: members[0] ? members[0].name : '',
        reg1: members[0] ? members[0].regNo : '',
        entered1: false,
        member2Name: members[1] ? members[1].name : '',
        reg2: members[1] ? members[1].regNo : '',
        entered2: false,
        member3Name: members[2] ? members[2].name : '',
        reg3: members[2] ? members[2].regNo : '',
        entered3: false,
        member4Name: members[3] ? members[3].name : '',
        reg4: members[3] ? members[3].regNo : '',
        entered4: false,
        member5Name: members[4] ? members[4].name : '',
        reg5: members[4] ? members[4].regNo : '',
        entered5: false,
      };
    });
  } catch (error) {
    console.error('Error fetching registration data:', error);
    throw new Error('Failed to fetch registration data');
  }
}

/**
 * Find participant/team by Registration Number across any team size & column
 * Case-insensitive matching
 */
async function findTeamByRegNo(regNo) {
  const teams = await getAllTeams();
  const searchReg = regNo.trim().toUpperCase();
  
  for (const team of teams) {
    const match = team.members.find(m => m.regNo.toUpperCase() === searchReg);
    if (match) {
      return team;
    }
  }
  
  return null;
}

/**
 * Update team-status sheet when member entry is marked
 * Optimized version that batches all updates together
 */
async function updateTeamStatusSheet(teamRowID, memberIndex, team) {
  try {
    const TEAM_STATUS_SHEET = 'team-status';
    
    // Get the registration number of the member being marked
    const regKey = `reg${memberIndex}`;
    const memberRegNo = team[regKey];
    
    if (!memberRegNo) {
      console.error('Member registration number not found');
      return;
    }
    
    // Get sheet IDs from cache and team-status data in parallel
    const [sheetIds, teamStatusResponse] = await Promise.all([
      getSheetIds(),
      sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${TEAM_STATUS_SHEET}!A2:M`, // Get Team ID and all 4 members (reg numbers in columns D, G, J, M)
      }),
    ]);

    if (!sheetIds.teamStatus) {
      console.error('team-status sheet not found');
      return;
    }

    const rows = teamStatusResponse.data.values || [];
    let teamRow = -1;
    let memberPosition = -1; // Position in team-status (1-4)

    // Find the row with matching Merged Team ID and the member's position
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const teamId = row[0];
      
      // Check if this is the merged team
      if (teamId === team.mergedTeamID) {
        teamRow = i + 2; // +2 for header and 0-indexing
        
        // Find which member position by matching reg number (columns D=3, G=6, J=9, M=12)
        const reg1 = (row[3] || '').toUpperCase();
        const reg2 = (row[6] || '').toUpperCase();
        const reg3 = (row[9] || '').toUpperCase();
        const reg4 = (row[12] || '').toUpperCase();
        const memberRegUpper = memberRegNo.toUpperCase();
        
        if (reg1 === memberRegUpper) memberPosition = 1;
        else if (reg2 === memberRegUpper) memberPosition = 2;
        else if (reg3 === memberRegUpper) memberPosition = 3;
        else if (reg4 === memberRegUpper) memberPosition = 4;
        
        break;
      }
    }

    if (teamRow === -1) {
      console.error(`Merged Team ID ${team.mergedTeamID} not found in team-status sheet`);
      return;
    }
    
    if (memberPosition === -1) {
      console.error(`Member RegNo ${memberRegNo} not found in team-status team ${team.mergedTeamID}`);
      return;
    }

    // Calculate column indices for team-status sheet (using memberPosition from merged team)
    // Team-status columns: A=TeamID(0), B=Size(1), C=Name1(2), D=Reg1(3), E=Status1(4), F=Name2(5)...
    const nameColumn = (memberPosition - 1) * 3 + 2;
    const regColumn = (memberPosition - 1) * 3 + 3;
    const statusColumn = (memberPosition - 1) * 3 + 4;

    // Calculate main sheet column index (using memberIndex from original team)
    // Main sheet columns: A-E are other data, F=Entered1(5), G=Member2(6), H=Reg2(7), I=Entered2(8)...
    const mainEnteredColumnIndex = 5 + ((memberIndex - 1) * 3); // Column F=5, I=8, L=11, O=14

    // Batch ALL updates together - main sheet + team-status sheet
    const requests = [
      // Update main sheet Entered column to TRUE
      {
        updateCells: {
          range: {
            sheetId: sheetIds.main,
            startRowIndex: team.rowIndex - 1,
            endRowIndex: team.rowIndex,
            startColumnIndex: mainEnteredColumnIndex,
            endColumnIndex: mainEnteredColumnIndex + 1,
          },
          rows: [{
            values: [{
              userEnteredValue: { boolValue: true },
            }],
          }],
          fields: 'userEnteredValue',
        },
      },
      // Update team-status Status to "Present"
      {
        updateCells: {
          range: {
            sheetId: sheetIds.teamStatus,
            startRowIndex: teamRow - 1,
            endRowIndex: teamRow,
            startColumnIndex: statusColumn,
            endColumnIndex: statusColumn + 1,
          },
          rows: [{
            values: [{
              userEnteredValue: { stringValue: 'Present' },
            }],
          }],
          fields: 'userEnteredValue',
        },
      },
      // Highlight member name in team-status with orange
      {
        repeatCell: {
          range: {
            sheetId: sheetIds.teamStatus,
            startRowIndex: teamRow - 1,
            endRowIndex: teamRow,
            startColumnIndex: nameColumn,
            endColumnIndex: nameColumn + 1,
          },
          cell: {
            userEnteredFormat: {
              backgroundColor: {
                red: 1.0,
                green: 0.65,
                blue: 0.0,
              },
            },
          },
          fields: 'userEnteredFormat.backgroundColor',
        },
      },
      // Highlight reg number in team-status with orange
      {
        repeatCell: {
          range: {
            sheetId: sheetIds.teamStatus,
            startRowIndex: teamRow - 1,
            endRowIndex: teamRow,
            startColumnIndex: regColumn,
            endColumnIndex: regColumn + 1,
          },
          cell: {
            userEnteredFormat: {
              backgroundColor: {
                red: 1.0,
                green: 0.65,
                blue: 0.0,
              },
            },
          },
          fields: 'userEnteredFormat.backgroundColor',
        },
      },
    ];

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      resource: { requests },
    });

    console.log(`✓ Updated entry for Team ${teamRowID} Member ${memberIndex} → Team-status ${team.mergedTeamID} Position ${memberPosition}`);
  } catch (error) {
    console.error('✗ Error updating team-status sheet:', error);
    throw error;
  }
}

/**
 * Mark a specific member as present → highlights ONLY their Name + RegNo cells green.
 * Column mapping based on Google Form sheet structure:
 *   SOLO:    Name=F(5), RegNo=G(6)
 *   TRIO:    M1 Name=Q(16)/Reg=R(17), M2 Name=S(18)/Reg=T(19), M3 Name=U(20)/Reg=V(21)
 *   QUINTET: M1 Name=AJ(35)/Reg=AK(36), M2=AL(37)/AM(38), M3=AN(39)/AO(40), M4=AP(41)/AQ(42), M5=AR(43)/AS(44)
 */
async function markMemberEntry(teamRowID, memberIndex = 1) {
  try {
    const teams = await getAllTeams();
    const team = teams.find(t => t.teamRowID === teamRowID.toString());
    
    if (!team) {
      throw new Error('Participant record not found');
    }

    const sheetIds = await getSheetIds();
    const rowIdx = team.rowIndex - 1; // 0-indexed

    const teamType = (team.teamType || '').trim().toUpperCase();

    // Determine name + regNo column indices for this member based on member regNo matching or team type mapping
    let nameCol = -1, regCol = -1;

    // Check if team member exists at memberIndex
    const memberObj = team.members && team.members[memberIndex - 1];
    const targetReg = memberObj ? memberObj.regNo.trim().toUpperCase() : null;

    if (teamType.includes('SOLO')) {
      nameCol = 5; // Col F: Participant Name
      regCol = 6;  // Col G: Registration No
    } else if (teamType.includes('TRIO') || teamType.includes('3')) {
      // M1=Q(16)/R(17), M2=S(18)/T(19), M3=U(20)/V(21)
      nameCol = 16 + (memberIndex - 1) * 2;
      regCol = 17 + (memberIndex - 1) * 2;
    } else if (teamType.includes('QUINTET') || teamType.includes('5')) {
      // M1=AJ(35)/AK(36), M2=AL(37)/AM(38), M3=AN(39)/AO(40), M4=AP(41)/AQ(42), M5=AR(43)/AS(44)
      nameCol = 35 + (memberIndex - 1) * 2;
      regCol = 36 + (memberIndex - 1) * 2;
    } else {
      // Dynamic fallback: locate the exact regNo column from raw row data if available
      nameCol = 5 + (memberIndex - 1) * 3;
      regCol = nameCol + 1;
    }

    // Highlight ONLY name + regNo cells soft green for this specific member
    const GREEN = { red: 0.72, green: 0.96, blue: 0.72 }; // #B8F5B8 bright soft green

    const requests = [
      {
        repeatCell: {
          range: {
            sheetId: sheetIds.main,
            startRowIndex: rowIdx,
            endRowIndex: rowIdx + 1,
            startColumnIndex: nameCol,
            endColumnIndex: nameCol + 1,
          },
          cell: { userEnteredFormat: { backgroundColor: GREEN } },
          fields: 'userEnteredFormat.backgroundColor',
        },
      },
      {
        repeatCell: {
          range: {
            sheetId: sheetIds.main,
            startRowIndex: rowIdx,
            endRowIndex: rowIdx + 1,
            startColumnIndex: regCol,
            endColumnIndex: regCol + 1,
            },
          cell: { userEnteredFormat: { backgroundColor: GREEN } },
          fields: 'userEnteredFormat.backgroundColor',
        },
      },
    ];

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      resource: { requests },
    });

    console.log(`✓ Member ${memberIndex} of team ${teamRowID} marked present → cells highlighted GREEN`);
    return { success: true, message: `Member ${memberIndex} marked present in sheet` };
  } catch (error) {
    console.error('Error marking entry:', error);
    throw error;
  }
}

/**
 * Mark ALL members of a team as present → highlights ENTIRE ROW soft green.
 */
async function markAllMembersEntry(teamRowID) {
  try {
    const teams = await getAllTeams();
    const team = teams.find(t => t.teamRowID === teamRowID.toString());

    if (!team) {
      throw new Error('Team not found');
    }

    const sheetIds = await getSheetIds();
    const rowIdx = team.rowIndex - 1;

    const GREEN = { red: 0.8, green: 0.93, blue: 0.8 }; // Soft pastel green

    const requests = [{
      repeatCell: {
        range: {
          sheetId: sheetIds.main,
          startRowIndex: rowIdx,
          endRowIndex: rowIdx + 1,
          startColumnIndex: 0,
          endColumnIndex: 60,
        },
        cell: { userEnteredFormat: { backgroundColor: GREEN } },
        fields: 'userEnteredFormat.backgroundColor',
      },
    }];

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      resource: { requests },
    });

    console.log(`✓ All members of team ${teamRowID} marked present → entire row GREEN`);
    return { success: true, message: 'All members marked present — entire row highlighted GREEN' };
  } catch (error) {
    console.error('Error marking all entry:', error);
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

/**
 * Highlight a registration number cell (Column G) with orange background when ticket is generated
 * @param {string} regNo - Registration number to highlight
 * @param {object} team - Team object containing row and registration data
 */
async function highlightRegNoCell(regNo, team) {
  try {
    const sheetIds = await getSheetIds();
    const columnIndex = 6; // Default to Column G

    const requests = [{
      repeatCell: {
        range: {
          sheetId: sheetIds.main,
          startRowIndex: team.rowIndex - 1, // 0-indexed
          endRowIndex: team.rowIndex,
          startColumnIndex: columnIndex,
          endColumnIndex: columnIndex + 1,
        },
        cell: {
          userEnteredFormat: {
            backgroundColor: {
              red: 1.0,
              green: 0.65,
              blue: 0.0,
            },
          },
        },
        fields: 'userEnteredFormat.backgroundColor',
      },
    }];

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      resource: { requests },
    });

    console.log(`✓ Highlighted RegNo: ${regNo} at row ${team.rowIndex}`);
  } catch (error) {
    console.error('✗ Error highlighting RegNo cell:', error.message);
  }
}

export {
  getAllTeams,
  findTeamByRegNo,
  markMemberEntry,
  markAllMembersEntry,
  checkPolaroidEligibility,
  markPolaroidUsed,
  getPassTypeName,
  getAllRegistrations,
  getMergedTeamInfo,
  highlightRegNoCell,
};
