const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/school-performance.json');

try {
    const content = fs.readFileSync(filePath, 'utf8');
    const schools = JSON.parse(content);

    let totalWrote2025 = 0;
    let totalWrote2024 = 0;
    let totalWrote2023 = 0;
    let schoolsCount = schools.length;

    schools.forEach(school => {
        if (school.results['2025'] && school.results['2025'].wrote) {
            totalWrote2025 += parseInt(school.results['2025'].wrote, 10) || 0;
        }
        if (school.results['2024'] && school.results['2024'].wrote) {
            totalWrote2024 += parseInt(school.results['2024'].wrote, 10) || 0;
        }
        if (school.results['2023'] && school.results['2023'].wrote) {
            totalWrote2023 += parseInt(school.results['2023'].wrote, 10) || 0;
        }
    });

    console.log('Total Schools in File:', schoolsCount);
    console.log('Total Candidates Wrote 2025:', totalWrote2025);
    console.log('Total Candidates Wrote 2024:', totalWrote2024);
    console.log('Total Candidates Wrote 2023:', totalWrote2023);

} catch (e) {
    console.error('Error reading or parsing file:', e);
}
