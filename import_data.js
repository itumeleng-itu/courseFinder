const { Client, Databases, ID } = require('node-appwrite');
const fs = require('fs');

// --- 1. CONFIGURATION ---
const config = {
    // These are the IDs you provided
    DATABASE_ID: '690342f30007941c262f',
    COLLECTION_ID: 'question_papers',
    BUCKET_ID: '690272af002390b344b8',
    
    // These are the CLI credentials from environment variables
    ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1',
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
    // Matches the pattern: '...pdf -> ID'
    const match = line.match(/✅ Uploaded: (.*\.pdf) -> (\w+)/);
    if (!match) return null;

    const [fullMatch, filename, file_id] = match;
    
    // Extract metadata from filename: 2024-November-Religion-Studies-Paper-1-English.pdf
    const parts = filename.replace('.pdf', '').split('-');
    
    // Join subject parts (e.g., 'Religion-Studies' becomes 'Religion Studies')
    let subject = [];
    let isSubjectPart = true;
    
    for (let i = 2; i < parts.length; i++) {
        if (parts[i] === 'Paper' || parts[i] === 'Memo') {
            isSubjectPart = false;
        }
        if (isSubjectPart) {
            subject.push(parts[i]);
        }
    }
    
    const paper_type_index = parts.findIndex(p => p.includes('Paper') || p.includes('Memo'));
    const paper_type = paper_type_index !== -1 ? parts.slice(paper_type_index, paper_type_index + 2).join(' ') : 'Paper';

    return {
        file_id: file_id,
        filename: filename,
        year: parseInt(parts[0]),
        session: parts[1],
        subject: subject.join(' '),
        paper_type: paper_type,
        // The language (English) is often the last part, useful for filtering
        language: parts[parts.length - 1]
    };
}

// --- 4. MAIN IMPORT FUNCTION ---
async function importDocuments() {
    const rawOutput = fs.readFileSync('upload_output.txt', 'utf-8'); // Read the full log
    const lines = rawOutput.split('\n');
    let importedCount = 0;

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
                            filename: data.filename,
                            language: data.language
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
}

// Ensure your original upload log is saved as 'upload_output.txt'
// and run the import process
importDocuments();
