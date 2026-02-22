import express from 'express';

const router = express.Router();

// Mock test data - matches the new sheet structure with merged teams
const mockTeams = [
  {
    rowIndex: 2,
    teamRowID: '1',
    teamSize: 3,
    mergedTeamID: '14',
    member1Name: 'Rahul',
    reg1: '23BCE10012',
    entered1: false,
    member2Name: 'Ankit',
    reg2: '23BCE10013',
    entered2: false,
    member3Name: 'Suresh',
    reg3: '23BCE10014',
    entered3: false,
    member4Name: '',
    reg4: '',
    entered4: false,
    polaroidApplied: true,
    polaroidPassType: '2',
    polaroidUsed: false,
    polaroidUsedTime: '',
    polaroidPassUsed: 0,
  },
  {
    rowIndex: 3,
    teamRowID: '2',
    teamSize: 2,
    mergedTeamID: '13',
    member1Name: 'Bhaskar',
    reg1: '23BCE10015',
    entered1: false,
    member2Name: 'Rishabh',
    reg2: '23BET10013',
    entered2: false,
    member3Name: '',
    reg3: '',
    entered3: false,
    member4Name: '',
    reg4: '',
    entered4: false,
    polaroidApplied: true,
    polaroidPassType: '1',
    polaroidUsed: false,
    polaroidUsedTime: '',
    polaroidPassUsed: 0,
  },
  {
    rowIndex: 4,
    teamRowID: '3',
    teamSize: 1,
    mergedTeamID: '3',
    member1Name: 'Nimesh',
    reg1: '23BEY10019',
    entered1: false,
    member2Name: '',
    reg2: '',
    entered2: false,
    member3Name: '',
    reg3: '',
    entered3: false,
    member4Name: '',
    reg4: '',
    entered4: false,
    polaroidApplied: false,
    polaroidPassType: '',
    polaroidUsed: false,
    polaroidUsedTime: '',
    polaroidPassUsed: 0,
  },
  {
    rowIndex: 5,
    teamRowID: '4',
    teamSize: 4,
    mergedTeamID: '4',
    member1Name: 'Amit',
    reg1: '23BCE10020',
    entered1: false,
    member2Name: 'Priya',
    reg2: '23BCE10021',
    entered2: false,
    member3Name: 'Rohit',
    reg3: '23BCE10022',
    entered3: false,
    member4Name: 'Neha',
    reg4: '23BCE10023',
    entered4: false,
    polaroidApplied: true,
    polaroidPassType: '4',
    polaroidUsed: false,
    polaroidUsedTime: '',
    polaroidPassUsed: 0,
  },
  {
    rowIndex: 6,
    teamRowID: '5',
    teamSize: 4,
    mergedTeamID: '5',
    member1Name: 'Karan',
    reg1: '23BCE10024',
    entered1: false,
    member2Name: 'Meena',
    reg2: '23BCE10025',
    entered2: false,
    member3Name: 'Vivek',
    reg3: '23BCE10026',
    entered3: false,
    member4Name: 'Pooja',
    reg4: '23BCE10027',
    entered4: false,
    polaroidApplied: true,
    polaroidPassType: '2',
    polaroidUsed: false,
    polaroidUsedTime: '',
    polaroidPassUsed: 0,
  },
  {
    rowIndex: 7,
    teamRowID: '6',
    teamSize: 3,
    mergedTeamID: '6',
    member1Name: 'Sahil',
    reg1: '23BET10028',
    entered1: false,
    member2Name: 'Manoj',
    reg2: '23BET10029',
    entered2: false,
    member3Name: 'Ritu',
    reg3: '23BET10030',
    entered3: false,
    member4Name: '',
    reg4: '',
    entered4: false,
    polaroidApplied: false,
    polaroidPassType: '',
    polaroidUsed: false,
    polaroidUsedTime: '',
    polaroidPassUsed: 0,
  },
  {
    rowIndex: 8,
    teamRowID: '7',
    teamSize: 2,
    mergedTeamID: '13',
    member1Name: 'Deepak',
    reg1: '23BEY10031',
    entered1: false,
    member2Name: 'Sonya',
    reg2: '23BEY10032',
    entered2: false,
    member3Name: '',
    reg3: '',
    entered3: false,
    member4Name: '',
    reg4: '',
    entered4: false,
    polaroidApplied: false,
    polaroidPassType: '',
    polaroidUsed: false,
    polaroidUsedTime: '',
    polaroidPassUsed: 0,
  },
  {
    rowIndex: 9,
    teamRowID: '8',
    teamSize: 1,
    mergedTeamID: '8',
    member1Name: 'Arjun',
    reg1: '23BCE10033',
    entered1: false,
    member2Name: '',
    reg2: '',
    entered2: false,
    member3Name: '',
    reg3: '',
    entered3: false,
    member4Name: '',
    reg4: '',
    entered4: false,
    polaroidApplied: true,
    polaroidPassType: '4',
    polaroidUsed: false,
    polaroidUsedTime: '',
    polaroidPassUsed: 0,
  },
  {
    rowIndex: 10,
    teamRowID: '9',
    teamSize: 1,
    mergedTeamID: '14',
    member1Name: 'Isha',
    reg1: '23BCE10034',
    entered1: false,
    member2Name: '',
    reg2: '',
    entered2: false,
    member3Name: '',
    reg3: '',
    entered3: false,
    member4Name: '',
    reg4: '',
    entered4: false,
    polaroidApplied: true,
    polaroidPassType: '2',
    polaroidUsed: false,
    polaroidUsedTime: '',
    polaroidPassUsed: 0,
  },
  {
    rowIndex: 11,
    teamRowID: '10',
    teamSize: 2,
    mergedTeamID: '10',
    member1Name: 'Mohan',
    reg1: '23BET10037',
    entered1: false,
    member2Name: 'Rakesh',
    reg2: '23BET10038',
    entered2: false,
    member3Name: '',
    reg3: '',
    entered3: false,
    member4Name: '',
    reg4: '',
    entered4: false,
    polaroidApplied: true,
    polaroidPassType: '3',
    polaroidUsed: false,
    polaroidUsedTime: '',
    polaroidPassUsed: 0,
  },
  {
    rowIndex: 12,
    teamRowID: '11',
    teamSize: 4,
    mergedTeamID: '11',
    member1Name: 'Sneha',
    reg1: '23BEY10039',
    entered1: false,
    member2Name: 'Alok',
    reg2: '23BEY10040',
    entered2: false,
    member3Name: 'Nitin',
    reg3: '23BEY10041',
    entered3: false,
    member4Name: 'Kavya',
    reg4: '23BEY10042',
    entered4: false,
    polaroidApplied: false,
    polaroidPassType: '',
    polaroidUsed: false,
    polaroidUsedTime: '',
    polaroidPassUsed: 0,
  },
  {
    rowIndex: 13,
    teamRowID: '12',
    teamSize: 3,
    mergedTeamID: '12',
    member1Name: 'Varun',
    reg1: '23BCE10043',
    entered1: false,
    member2Name: 'Ayesha',
    reg2: '23BCE10044',
    entered2: false,
    member3Name: 'Salman',
    reg3: '23BCE10045',
    entered3: false,
    member4Name: '',
    reg4: '',
    entered4: false,
    polaroidApplied: true,
    polaroidPassType: '2',
    polaroidUsed: false,
    polaroidUsedTime: '',
    polaroidPassUsed: 0,
  },
  // Merged identity row for Team 13 (Teams 2 + 7)
  {
    rowIndex: 14,
    teamRowID: '13',
    teamSize: 4,
    mergedTeamID: '13',
    member1Name: 'Bhaskar',
    reg1: '23BCE10015',
    entered1: false,
    member2Name: 'Rishabh',
    reg2: '23BET10013',
    entered2: false,
    member3Name: 'Deepak',
    reg3: '23BEY10031',
    entered3: false,
    member4Name: 'Sonya',
    reg4: '23BEY10032',
    entered4: false,
    polaroidApplied: false,
    polaroidPassType: '',
    polaroidUsed: false,
    polaroidUsedTime: '',
    polaroidPassUsed: 0,
  },
  // Merged identity row for Team 14 (Teams 1 + 9)
  {
    rowIndex: 15,
    teamRowID: '14',
    teamSize: 4,
    mergedTeamID: '14',
    member1Name: 'Rahul',
    reg1: '23BCE10012',
    entered1: false,
    member2Name: 'Ankit',
    reg2: '23BCE10013',
    entered2: false,
    member3Name: 'Suresh',
    reg3: '23BCE10014',
    entered3: false,
    member4Name: 'Isha',
    reg4: '23BCE10034',
    entered4: false,
    polaroidApplied: false,
    polaroidPassType: '',
    polaroidUsed: false,
    polaroidUsedTime: '',
    polaroidPassUsed: 0,
  },
];

function findTeamByRegNo(regNo) {
  // Convert input to uppercase for case-insensitive matching
  const regNoUpper = regNo.toUpperCase();
  
  for (const team of mockTeams) {
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
 * POST /api/qr-mock/entry/fetch
 */
router.post('/entry/fetch', async (req, res) => {
  try {
    const { regNo } = req.body;

    if (!regNo) {
      return res.status(400).json({ 
        success: false, 
        message: 'Registration number is required' 
      });
    }

    const team = findTeamByRegNo(regNo);

    if (!team) {
      return res.status(404).json({ 
        success: false, 
        message: 'Team not found with this registration number' 
      });
    }

    const members = [];
    for (let i = 1; i <= team.teamSize; i++) {
      const nameKey = `member${i}Name`;
      const regKey = `reg${i}`;
      const enteredKey = `entered${i}`;
      
      if (team[regKey]) {
        members.push({
          index: i,
          name: team[nameKey],
          regNo: team[regKey],
          entered: team[enteredKey],
        });
      }
    }

    // Check if this is a merged team
    const isMerged = team.teamRowID !== team.mergedTeamID;
    let mergeInfo = null;

    if (isMerged) {
      const mergedTeamID = team.mergedTeamID;
      const mergeGroupTeams = mockTeams.filter(t => 
        t.mergedTeamID === mergedTeamID && t.teamRowID !== mergedTeamID
      );
      
      mergeInfo = {
        mergedTeamID: mergedTeamID,
        originalTeamRowID: team.teamRowID,
        teams: mergeGroupTeams.map(t => ({
          teamRowID: t.teamRowID,
          teamSize: t.teamSize,
          members: [
            t.reg1 ? { name: t.member1Name, regNo: t.reg1 } : null,
            t.reg2 ? { name: t.member2Name, regNo: t.reg2 } : null,
            t.reg3 ? { name: t.member3Name, regNo: t.reg3 } : null,
            t.reg4 ? { name: t.member4Name, regNo: t.reg4 } : null,
          ].filter(Boolean)
        }))
      };
    }

    res.json({
      success: true,
      merged: isMerged,
      mergeInfo: mergeInfo,
      team: {
        teamRowID: team.teamRowID,
        teamSize: team.teamSize,
        members,
      },
    });
  } catch (error) {
    console.error('Error fetching team:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching team data' 
    });
  }
});

/**
 * POST /api/qr-mock/entry/mark
 */
router.post('/entry/mark', async (req, res) => {
  try {
    const { teamRowID, memberIndex } = req.body;

    if (!teamRowID || !memberIndex) {
      return res.status(400).json({ 
        success: false, 
        message: 'Team ID and member index are required' 
      });
    }

    const team = mockTeams.find(t => t.teamRowID === teamRowID);
    
    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team not found',
      });
    }

    const enteredKey = `entered${memberIndex}`;
    if (team[enteredKey]) {
      return res.status(400).json({
        success: false,
        message: 'Member already entered',
      });
    }

    // Update mock data
    team[enteredKey] = true;

    res.json({
      success: true,
      message: `Member ${memberIndex} marked as entered`,
    });
  } catch (error) {
    console.error('Error marking entry:', error);
    res.status(400).json({ 
      success: false, 
      message: error.message || 'Failed to mark entry' 
    });
  }
});

/**
 * POST /api/qr-mock/polaroid/check
 */
router.post('/polaroid/check', async (req, res) => {
  try {
    const { regNo } = req.body;

    if (!regNo) {
      return res.status(400).json({ 
        success: false, 
        message: 'Registration number is required' 
      });
    }

    const originalTeam = findTeamByRegNo(regNo);

    if (!originalTeam) {
      return res.json({
        success: false,
        eligible: false,
        reason: 'Team not found',
      });
    }

    // Check if this is a merged team
    const isMerged = originalTeam.teamRowID !== originalTeam.mergedTeamID;
    
    // Calculate pass counts
    const passTypeLimit = parseInt(originalTeam.polaroidPassType) || 0;
    const usedCount = originalTeam.polaroidPassUsed || 0;
    const remainingCount = Math.max(0, passTypeLimit - usedCount);
    const passTypeName = passTypeLimit > 0 ? `${passTypeLimit}-Pass` : 'Unknown';
    
    if (!isMerged) {
      // Normal team - simple logic
      if (!originalTeam.polaroidApplied) {
        return res.json({
          success: false,
          eligible: false,
          reason: 'Polaroid not applied',
          merged: false,
          team: {
            teamRowID: originalTeam.teamRowID,
            teamSize: originalTeam.teamSize,
            polaroidApplied: originalTeam.polaroidApplied,
            polaroidUsed: originalTeam.polaroidUsed,
          },
        });
      }

      if (usedCount >= passTypeLimit) {
        return res.json({ 
          success: false,
          eligible: false, 
          reason: 'Polaroid pass limit reached',
          merged: false,
          team: {
            teamRowID: originalTeam.teamRowID,
            teamSize: originalTeam.teamSize,
            polaroidApplied: originalTeam.polaroidApplied,
            polaroidUsed: originalTeam.polaroidUsed,
          },
          passType: passTypeName,
          usedCount: usedCount,
          maxCount: passTypeLimit,
          usedTime: originalTeam.polaroidUsedTime
        });
      }

      return res.json({
        success: true,
        eligible: true,
        merged: false,
        team: {
          teamRowID: originalTeam.teamRowID,
          teamSize: originalTeam.teamSize,
          polaroidApplied: originalTeam.polaroidApplied,
          polaroidUsed: originalTeam.polaroidUsed,
        },
        passType: passTypeName,
        usedCount: usedCount,
        remainingCount: remainingCount,
      });
    }
    
    // Merged team logic - fetch all teams in merge group
    const mergedTeamID = originalTeam.mergedTeamID;
    const mergeGroupTeams = mockTeams.filter(t => 
      t.mergedTeamID === mergedTeamID && t.teamRowID !== mergedTeamID
    );
    
    // Build merge info
    const mergeInfo = {
      mergedTeamID: mergedTeamID,
      originalTeamRowID: originalTeam.teamRowID,
      teams: mergeGroupTeams.map(t => {
        const tPassType = parseInt(t.polaroidPassType) || 0;
        return {
          teamRowID: t.teamRowID,
          teamSize: t.teamSize,
          polaroidApplied: t.polaroidApplied,
          polaroidUsed: t.polaroidUsed,
          polaroidPassType: t.polaroidPassType,
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
    
    // Check original team's polaroid status
    if (!originalTeam.polaroidApplied) {
      return res.json({
        success: false,
        eligible: false,
        reason: 'Polaroid not applied',
        merged: true,
        mergeInfo,
        team: {
          teamRowID: originalTeam.teamRowID,
          teamSize: originalTeam.teamSize,
          polaroidApplied: originalTeam.polaroidApplied,
          polaroidUsed: originalTeam.polaroidUsed,
        },
      });
    }

    if (usedCount >= passTypeLimit) {
      return res.json({ 
        success: false,
        eligible: false, 
        reason: 'Polaroid pass limit reached',
        merged: true,
        mergeInfo,
        team: {
          teamRowID: originalTeam.teamRowID,
          teamSize: originalTeam.teamSize,
          polaroidApplied: originalTeam.polaroidApplied,
          polaroidUsed: originalTeam.polaroidUsed,
        },
        passType: passTypeName,
        usedCount: usedCount,
        maxCount: passTypeLimit,
        usedTime: originalTeam.polaroidUsedTime
      });
    }

    return res.json({
      success: true,
      eligible: true,
      merged: true,
      mergeInfo,
      team: {
        teamRowID: originalTeam.teamRowID,
        teamSize: originalTeam.teamSize,
        polaroidApplied: originalTeam.polaroidApplied,
        polaroidUsed: originalTeam.polaroidUsed,
      },
      passType: passTypeName,
      usedCount: usedCount,
      remainingCount: remainingCount,
    });
  } catch (error) {
    console.error('Error checking polaroid:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while checking eligibility' 
    });
  }
});

/**
 * POST /api/qr-mock/polaroid/complete
 */
router.post('/polaroid/complete', async (req, res) => {
  try {
    const { teamRowID } = req.body;

    if (!teamRowID) {
      return res.status(400).json({ 
        success: false, 
        message: 'Team ID is required' 
      });
    }

    const team = mockTeams.find(t => t.teamRowID === teamRowID);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team not found',
      });
    }

    if (!team.polaroidApplied) {
      return res.status(400).json({
        success: false,
        message: 'Polaroid not applied for this team',
      });
    }

    const passTypeLimit = parseInt(team.polaroidPassType) || 0;
    const currentUsedCount = team.polaroidPassUsed || 0;

    if (currentUsedCount >= passTypeLimit) {
      return res.status(400).json({
        success: false,
        message: `Polaroid pass limit reached (${passTypeLimit} uses)`,
      });
    }

    const now = new Date().toISOString();
    const newUsedCount = currentUsedCount + 1;
    const remainingCount = passTypeLimit - newUsedCount;
    
    team.polaroidPassUsed = newUsedCount;
    team.polaroidUsedTime = now;
    
    // Only mark as fully used when limit is reached
    if (newUsedCount >= passTypeLimit) {
      team.polaroidUsed = true;
    }

    res.json({
      success: true,
      message: 'Polaroid marked as used',
      timestamp: now,
      usedCount: newUsedCount,
      remainingCount: remainingCount,
    });
  } catch (error) {
    console.error('Error completing polaroid:', error);
    res.status(400).json({ 
      success: false, 
      message: error.message || 'Failed to mark polaroid as used' 
    });
  }
});

/**
 * GET /api/qr-mock/health
 */
router.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'QR Mock System API is running (Using test data)',
    mode: 'MOCK',
    teams: mockTeams.length,
  });
});

export default router;
