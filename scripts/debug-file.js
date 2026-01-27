const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, '../vertopal.com_2025 SCHOOL PERFORMANCE REPORT (1).json');

try {
    let content = fs.readFileSync(inputFile, 'utf8');
    console.log('File size:', content.length);

    try {
        const raw = JSON.parse(content);
        console.log('Keys:', Object.keys(raw));
        console.log('Values:', Object.values(raw).map(v => v === null ? 'null' : (typeof v)));

        // Check if any key contains the target string
        const target = 'ALFRED NZO EAST';
        const foundKey = Object.keys(raw).find(k => k.includes(target));
        if (foundKey) {
            console.log('Found target in a key!');
        } else {
            console.log('Target NOT found in any key');
        }
    } catch (e) {
        console.log('JSON parse failed', e);
    }

} catch (e) {
    console.error(e);
}
