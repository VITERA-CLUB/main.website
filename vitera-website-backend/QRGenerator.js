import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import { getAllRegistrations } from './QRSystem.js';

/**
 * Generate QR codes for all registered teams
 */
async function generateAllQRCodes() {
  try {
    console.log('Fetching registrations...');
    const registrations = await getAllRegistrations();
    
    console.log(`Found ${registrations.length} teams`);
    
    // Create output directory
    const outputDir = path.join(process.cwd(), 'qr_codes');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const results = [];

    for (const team of registrations) {
      const { teamRowID, primaryRegNo, members } = team;
      
      if (!primaryRegNo) {
        console.warn(`Team ${teamRowID} has no primary RegNo, skipping...`);
        continue;
      }

      // QR Code payload
      const payload = `REG_NO=${primaryRegNo}`;
      
      // Generate QR code
      const fileName = `Team_${teamRowID}_${primaryRegNo}.png`;
      const filePath = path.join(outputDir, fileName);
      
      await QRCode.toFile(filePath, payload, {
        width: 500,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      });

      results.push({
        teamRowID,
        primaryRegNo,
        fileName,
        members: members.map(m => m.name),
      });

      console.log(`✓ Generated QR for Team ${teamRowID} (${primaryRegNo})`);
    }

    // Save manifest
    const manifestPath = path.join(outputDir, 'manifest.json');
    fs.writeFileSync(manifestPath, JSON.stringify(results, null, 2));
    
    console.log(`\n✓ Generated ${results.length} QR codes`);
    console.log(`✓ Saved to: ${outputDir}`);
    console.log(`✓ Manifest: ${manifestPath}`);
    
    return results;
  } catch (error) {
    console.error('Error generating QR codes:', error);
    throw error;
  }
}

/**
 * Generate a single QR code
 */
async function generateSingleQR(regNo, outputPath) {
  const payload = `REG_NO=${regNo}`;
  
  await QRCode.toFile(outputPath, payload, {
    width: 500,
    margin: 2,
    color: {
      dark: '#000000',
      light: '#FFFFFF',
    },
  });
  
  return outputPath;
}

/**
 * Generate QR code as base64 (for email/web display)
 */
async function generateQRBase64(regNo) {
  const payload = `REG_NO=${regNo}`;
  return await QRCode.toDataURL(payload, {
    width: 500,
    margin: 2,
  });
}

// Command-line execution
if (process.argv[1] === import.meta.url.replace('file:///', '').replace(/\//g, '\\')) {
  generateAllQRCodes()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export { generateAllQRCodes, generateSingleQR, generateQRBase64 };
