/**
 * Subject aliases - maps canonical names to accepted variations
 * IMPORTANT: Mathematics, Technical Mathematics, and Mathematical Literacy
 * are kept SEPARATE (not aliases of each other) because courses may require
 * one OR the other at different levels
 */
export const SUBJECT_ALIAS_DATA = new Map<string, string[]>([
    // Mathematics (Pure/Core) - distinct from Math Lit and Technical Math
    ['mathematics', ['maths', 'pure mathematics', 'mathematics core', 'math', 'core mathematics']],

    // Technical Mathematics - distinct subject
    ['technical mathematics', ['technical maths', 'tech mathematics', 'tech maths']],

    // Mathematical Literacy - distinct subject
    ['mathematical literacy', ['maths literacy', 'maths lit', 'math literacy', 'math lit', 'mathematics literacy']],

    // Sciences
    ['physical sciences', ['physics', 'physical science', 'physics and chemistry']],
    ['life sciences', ['biology', 'life science', 'bio', 'life sciences (biology)']],
    ['agricultural sciences', ['agricultural science', 'agric sciences', 'agriculture', 'agricultural studies']],

    // Technical Sciences
    ['technical sciences', ['technical science', 'tech sciences', 'tech science']],

    // Languages - English
    ['english home language', ['english hl', 'english (home)', 'english home', 'english (hl)']],
    ['english first additional language', ['english fal', 'english (fal)', 'english 1st additional', 'english first additional']],
    ['english second additional language', ['english sal', 'english (sal)', 'english 2nd additional']],

    // Languages - Afrikaans  
    ['afrikaans home language', ['afrikaans hl', 'afrikaans (home)', 'afrikaans home', 'afrikaans (hl)']],
    ['afrikaans first additional language', ['afrikaans fal', 'afrikaans (fal)', 'afrikaans 1st additional']],
    ['afrikaans second additional language', ['afrikaans sal', 'afrikaans (sal)']],

    // Languages - IsiZulu
    ['isizulu home language', ['isizulu hl', 'zulu hl', 'zulu home', 'isizulu (hl)', 'zulu home language']],
    ['isizulu first additional language', ['isizulu fal', 'zulu fal', 'isizulu (fal)']],

    // Languages - Other South African
    ['isixhosa home language', ['isixhosa hl', 'xhosa hl', 'isixhosa (hl)']],
    ['sesotho home language', ['sesotho hl', 'sotho hl']],
    ['setswana home language', ['setswana hl', 'tswana hl']],
    ['sepedi home language', ['sepedi hl', 'pedi hl']],

    // Technical subjects
    ['engineering graphics and design', ['egd', 'engineering graphics', 'graphics and design', 'technical drawing', 'eng graphics']],
    ['information technology', ['it', 'information tech']],
    ['computer applications technology', ['cat', 'computer applications', 'computer apps']],

    // Business subjects
    ['accounting', ['accountancy', 'financial accounting', 'acc']],
    ['business studies', ['business', 'business management', 'business admin']],
    ['economics', ['eco', 'economic studies', 'econ']],

    // Other subjects
    ['life orientation', ['lo', 'life skills']],
    ['consumer studies', ['consumer science', 'consumer sciences']],
    ['tourism', ['travel and tourism', 'tourism studies']],
    ['geography', ['geo', 'geographical studies']],
    ['history', ['hist', 'historical studies']],
    ['dramatic arts', ['drama', 'theatre studies']],
    ['music', ['musical arts']],
    ['visual arts', ['art', 'visual art', 'fine art']],
    ['design', ['art and design']],

    // Catch-all for generic "English" without level specified
    ['english', ['eng']],
]);
