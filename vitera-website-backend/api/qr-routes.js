import express from 'express';
import {
  findTeamByRegNo,
  markMemberEntry,
  checkPolaroidEligibility,
  markPolaroidUsed,
  getPassTypeName,
} from '../QRSystem.js';

const router = express.Router();

/**
 * POST /api/qr/entry/fetch
 * Fetch team details by scanning QR code
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

    const team = await findTeamByRegNo(regNo);

    if (!team) {
      return res.status(404).json({ 
        success: false, 
        message: 'Team not found with this registration number' 
      });
    }

    // Format team data for frontend
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
 * POST /api/qr/entry/mark
 * Mark a specific member as entered
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

    const result = await markMemberEntry(teamRowID, memberIndex);

    res.json({
      success: true,
      message: `Member ${memberIndex} marked as entered`,
      data: result,
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
 * POST /api/qr/polaroid/check
 * Check if team is eligible for Polaroid
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

    const result = await checkPolaroidEligibility(regNo);

    if (!result.eligible) {
      return res.json({
        success: false,
        eligible: false,
        reason: result.reason,
        usedTime: result.usedTime,
        usedCount: result.usedCount,
        maxCount: result.maxCount,
        team: result.team ? {
          teamRowID: result.team.teamRowID,
          teamSize: result.team.teamSize,
          polaroidApplied: result.team.polaroidApplied,
          polaroidUsed: result.team.polaroidUsed,
        } : null,
      });
    }

    // Convert pass type number to name
    const passTypeName = getPassTypeName(result.passType);

    res.json({
      success: true,
      eligible: true,
      team: {
        teamRowID: result.team.teamRowID,
        teamSize: result.team.teamSize,
        passType: passTypeName,
        passTypeRaw: result.passType,
        usedCount: result.usedCount || 0,
        remainingCount: result.remainingCount || 0,
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
 * POST /api/qr/polaroid/complete
 * Mark Polaroid as used
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

    const result = await markPolaroidUsed(teamRowID);

    res.json({
      success: true,
      message: 'Polaroid marked as used',
      timestamp: result.timestamp,
      usedCount: result.usedCount,
      remainingCount: result.remainingCount,
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
 * GET /api/qr/health
 * Health check endpoint
 */
router.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'QR System API is running',
    timestamp: new Date().toISOString(),
  });
});

export default router;
