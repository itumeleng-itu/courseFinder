// import_data.js
const { Client, Databases, ID } = require('node-appwrite');
const fs = require('fs');
require('dotenv').config({ path: '../.env.local' });

// --- 1. CONFIGURATION ---
const config = {
    // These are the actual IDs from your Appwrite Console
    DATABASE_ID: '690342f30007941c262f',
    COLLECTION_ID: 'question_papers',
    BUCKET_ID: '690272af002390b344b8',
    
    // These are loaded from your environment variables
    ENDPOINT: (process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1').trim(),
    PROJECT_ID: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
    API_KEY: process.env.APPWRITE_API_KEY,
};

// --- 2. INITIALIZE APPWRITE CLIENT ---
const client = new Client();
client
    .setEndpoint(config.ENDPOINT)
    .setProject(config.PROJECT_ID)
    .setKey(config.API_KEY);

const databases = new Databases(client);

// --- 3. DATA CLEANING AND EXTRACTION FUNCTION ---

// This function breaks down the filename and ID string
function processLine(line) {
    const match = line.match(/✅ Uploaded: (.*\.pdf) -> (\w+)/);
    if (!match) return null;

    const [_, filename, file_id] = match;
    const cleanName = filename.replace('.pdf', '');
    const parts = cleanName.split('-');

    if (parts.length < 4) {
        console.warn(`Skipping poorly formatted filename: ${filename}`);
        return null;
    }

    const year = parseInt(parts[0]);
    const session = parts[1];

    // Find where "Paper" or "Memo" starts
    const paperIndex = parts.findIndex(p => p === 'Paper' || p === 'Memo');
    if (paperIndex === -1) {
        console.warn(`No paper/memo indicator in: ${filename}`);
        return null;
    }

    // Subject = everything between session and paper
    const subjectParts = parts.slice(2, paperIndex);
    const subject = subjectParts.join(' ');

    // Paper type = "Paper 1", "Memo 2", etc.
    const paperType = `${parts[paperIndex]} ${parts[paperIndex + 1] || ''}`.trim();

    // Language = last part (if it's not a number)
    const lastPart = parts[parts.length - 1];
    const language = isNaN(lastPart) ? lastPart : 'Unknown';

    return {
        file_id,
        filename,
        year,
        session,
        subject,
        paper_type: paperType,
        language
    };
}

// --- 4. MAIN IMPORT FUNCTION ---
async function importDocuments() {
    try {
        const rawOutput = fs.readFileSync('upload_output.txt', 'utf-8'); // Read the full log
        const lines = rawOutput.split('\n');
        let importedCount = 0;

        console.log(`Starting import process...`);
        console.log(`Database ID: ${config.DATABASE_ID}`);
        console.log(`Collection ID: ${config.COLLECTION_ID}`);
        console.log(`Bucket ID: ${config.BUCKET_ID}`);
        console.log(`Found ${lines.length} lines to process\n`);

        for (const line of lines) {
            if (line.includes('✅ Uploaded:')) {
                const data = processLine(line);
                
                if (data) {
                    try {
                        await databases.createDocument(
                            config.DATABASE_ID,
                            config.COLLECTION_ID,
                            ID.unique(),
                            {
                                file_id: data.file_id,
                                bucket_id: config.BUCKET_ID,
                                year: data.year,
                                subject: data.subject,
                                paper_type: data.paper_type,
                                session: data.session,
                                language: data.language,
                                filename: data.filename
                            }
                        );
                        console.log(`[OK] Imported: ${data.subject} ${data.year} (${data.file_id})`);
                        importedCount++;
                    } catch (error) {
                        console.error(`[FAIL] Could not import ${data.filename}: ${error.message}`);
                    }
                }
            }
        }
        console.log(`\n--- Import Complete ---`);
        console.log(`Total documents imported: ${importedCount}`);
    } catch (error) {
        console.error('Error reading upload_output.txt:', error.message);
        console.log('\nMake sure you have saved your upload log as "upload_output.txt" in the same directory as this script.');
    }
}

// Check if required environment variables are set
if (!config.PROJECT_ID || !config.API_KEY) {
    console.error('Error: Missing required environment variables.');
    console.log('Make sure NEXT_PUBLIC_APPWRITE_PROJECT_ID and APPWRITE_API_KEY are set in your .env.local file.');
    process.exit(1);
}

// Ensure your original upload log is saved as 'upload_output.txt'
// and run the import process
importDocuments().catch(console.error);
