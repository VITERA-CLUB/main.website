import express from 'express';

const router = express.Router();

// Mock test data - matches the sample CSV structure
const mockTeams = [
  {
    rowIndex: 2,
    teamRowID: '1',
    teamSize: 3,
    member1Name: 'Rahul',
    reg1: 'CS23B1021',
    entered1: false,
    member2Name: 'Ankit',
    reg2: 'CS23B1022',
    entered2: false,
    member3Name: 'Suresh',
    reg3: 'CS23B1023',
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
    rowIndex: 3,
    teamRowID: '2',
    teamSize: 2,
    member1Name: 'Priya',
    reg1: 'CS23B2031',
    entered1: false,
    member2Name: 'Anjali',
    reg2: 'CS23B2032',
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
    polaroidPassUsed: 1,
  },
  {
    rowIndex: 4,
    teamRowID: '3',
    teamSize: 1,
    member1Name: 'Vikram',
    reg1: 'CS23B3041',
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
    polaroidPassType: '1',
    polaroidUsed: false,
    polaroidUsedTime: '',
    polaroidPassUsed: 0,
  },
  {
    rowIndex: 5,
    teamRowID: '4',
    teamSize: 2,
    member1Name: 'Amit',
    reg1: 'CS23B4051',
    entered1: false,
    member2Name: 'Rohit',
    reg2: 'CS23B4052',
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
    rowIndex: 6,
    teamRowID: '5',
    teamSize: 4,
    member1Name: 'Arjun',
    reg1: 'CS23B5061',
    entered1: false,
    member2Name: 'Kavya',
    reg2: 'CS23B5062',
    entered2: false,
    member3Name: 'Neha',
    reg3: 'CS23B5063',
    entered3: false,
    member4Name: 'Rajesh',
    reg4: 'CS23B5064',
    entered4: false,
    polaroidApplied: true,
    polaroidPassType: '4',
    polaroidUsed: false,
    polaroidUsedTime: '',
    polaroidPassUsed: 3,
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

    res.json({
      success: true,
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

    const team = findTeamByRegNo(regNo);

    if (!team) {
      return res.json({
        success: false,
        eligible: false,
        reason: 'Team not found',
      });
    }

    if (!team.polaroidApplied) {
      return res.json({
        success: false,
        eligible: false,
        reason: 'Polaroid not applied',
        team: {
          teamRowID: team.teamRowID,
          teamSize: team.teamSize,
          polaroidApplied: team.polaroidApplied,
          polaroidUsed: team.polaroidUsed,
        },
      });
    }

    // Check if usage count has reached the limit
    const passTypeLimit = parseInt(team.polaroidPassType) || 0;
    const currentUsage = team.polaroidPassUsed || 0;
    
    if (currentUsage >= passTypeLimit) {
      return res.json({ 
        success: false,
        eligible: false, 
        reason: 'Polaroid pass limit reached', 
        team: {
          teamRowID: team.teamRowID,
          teamSize: team.teamSize,
          polaroidApplied: team.polaroidApplied,
          polaroidUsed: team.polaroidUsed,
        },
        usedTime: team.polaroidUsedTime,
        usedCount: currentUsage,
        maxCount: passTypeLimit
      });
    }

    const passTypeName = getPassTypeName(team.polaroidPassType);

    res.json({
      success: true,
      eligible: true,
      team: {
        teamRowID: team.teamRowID,
        teamSize: team.teamSize,
        passType: passTypeName,
        passTypeRaw: team.polaroidPassType,
        usedCount: currentUsage,
        remainingCount: passTypeLimit - currentUsage,
      },
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

    // Check if usage limit has been reached
    const passTypeLimit = parseInt(team.polaroidPassType) || 0;
    const currentUsage = team.polaroidPassUsed || 0;
    
    if (currentUsage >= passTypeLimit) {
      return res.status(400).json({
        success: false,
        message: 'Polaroid pass limit already reached',
      });
    }

    const now = new Date().toISOString();
    const newUsageCount = currentUsage + 1;
    const isFullyUsed = newUsageCount >= passTypeLimit;
    
    team.polaroidUsed = isFullyUsed;
    team.polaroidUsedTime = now;
    team.polaroidPassUsed = newUsageCount;

    res.json({
      success: true,
      message: 'Polaroid marked as used',
      timestamp: now,
      usedCount: newUsageCount,
      remainingCount: passTypeLimit - newUsageCount,
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
