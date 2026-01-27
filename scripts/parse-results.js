const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, '../vertopal.com_2025 SCHOOL PERFORMANCE REPORT (1).json');
const outputFile = path.join(__dirname, '../data/school-performance.json');

try {
    const content = fs.readFileSync(inputFile, 'utf8');
    let text = '';
    try {
        const raw = JSON.parse(content);
        // Find the largest key
        const keys = Object.keys(raw);
        const largestKey = keys.reduce((a, b) => a.length > b.length ? a : b, '');
        text = largestKey;
        console.log(`Using key of length ${text.length}`);
    } catch (e) {
        console.log('JSON parse failed, treating file as raw text');
        text = content;
    }

    // Remove potential JSON wrapper chars if raw text
    if (text.trim().startsWith('{"')) {
        text = text.substring(2);
    }
    if (text.trim().endsWith('": null}')) {
        text = text.substring(0, text.length - 8);
    }

    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
    const schools = [];
    let currentDistrict = 'UNKNOWN';

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Check for headers to ignore
        if (line === 'District Name' || line === 'EMIS No' || line === 'Centre No' ||
            line === 'Centre Name' || line === 'Quintile' || line.includes('Progressed No') ||
            line.includes('Total Wrote') || line.includes('Total Achieved') ||
            line.includes('% Achieved') || line === 'EASTERN CAPE' ||
            line.match(/^202[3-5]$/)
        ) {
            continue;
        }

        // Attempt to identify District
        // If lines[i] is ALL CAPS text and short-ish, and lines[i+1] is 9 digits, it's a district.
        if (/^[A-Z \-]+$/.test(line) && line.length > 3 && !line.includes('PROVINCE') &&
            i + 1 < lines.length && /^\d{9}$/.test(lines[i + 1])) {
            currentDistrict = line;
            continue;
        }

        // Also sometimes District is not followed immediately by EMIS if header intervenes.
        // So let's rely on the strategy: 
        // If we find EMIS at lines[i], we check lines[i-1] for District possibility.

        if (/^\d{9}$/.test(line)) {
            const emis = line;

            // Look back for District if we haven't set one or if it changed
            let prevIndex = i - 1;
            while (prevIndex >= 0 && (lines[prevIndex] === 'District Name' || lines[prevIndex].match(/^202[3-5]$/))) {
                prevIndex--;
            }

            if (prevIndex >= 0) {
                const potentialDistrict = lines[prevIndex];
                // If it looks like a district (Name, uppercase, not number)
                if (/^[A-Z \-]+$/.test(potentialDistrict) && potentialDistrict.length > 3 && !potentialDistrict.includes('PROVINCE')) {
                    currentDistrict = potentialDistrict;
                }
            }

            // Check for enough following lines
            // We need CentreNo(1), Name(1), Quintile(1), Metrics(12) = 15 lines
            if (i + 15 >= lines.length) continue;

            const centreNo = lines[i + 1];
            const name = lines[i + 2];
            const quintile = lines[i + 3];

            if (!/^\d+$/.test(centreNo) || !/^\d+$/.test(quintile)) {
                continue;
            }

            const metrics = [];
            const offset = 4;
            for (let j = 0; j < 12; j++) {
                metrics.push(lines[i + offset + j]);
            }

            const validMetrics = metrics.every(m => /^[\d.]+$/.test(m));

            if (validMetrics) {
                schools.push({
                    district: currentDistrict,
                    emis: emis,
                    centreNo: centreNo,
                    name: name,
                    quintile: quintile,
                    results: {
                        2023: {
                            progressed: metrics[0],
                            wrote: metrics[1],
                            achieved: metrics[2],
                            percentage: metrics[3]
                        },
                        2024: {
                            progressed: metrics[4],
                            wrote: metrics[5],
                            achieved: metrics[6],
                            percentage: metrics[7]
                        },
                        2025: {
                            progressed: metrics[8],
                            wrote: metrics[9],
                            achieved: metrics[10],
                            percentage: metrics[11]
                        }
                    }
                });

                i += 15;
            }
        }
    }

    console.log(`Parsed ${schools.length} schools`);
    if (schools.length > 0) {
        fs.writeFileSync(outputFile, JSON.stringify(schools, null, 2));
        console.log('Saved to', outputFile);
    }
} catch (e) {
    console.error(e);
}
