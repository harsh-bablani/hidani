function extractExperience(text) {
    if (!text) return null;

    const lowerText = text.toLowerCase();

    // Explicit pattern matches
    const expRegexes = [
        /(\d+(?:\.\d+)?)(?:\s*-\s*\d+(?:\.\d+)?)?\+?\s*years?\s*(?:of\s*experience)?/i,
        /experience[:\s]+(\d+(?:\.\d+)?)(?:\s*-\s*\d+(?:\.\d+)?)?\+?\s*years?/i,
        /(\d+(?:\.\d+)?)\+?\s*yrs/i,
    ];

    let maxExp = 0;
    let found = false;
    for (const regex of expRegexes) {
        const matches = text.match(new RegExp(regex.source, 'gi'));
        if (matches) {
            for (const match of matches) {
                const numMatch = match.match(/(\d+(?:\.\d+)?)/);
                if (numMatch) {
                    const exp = parseFloat(numMatch[1]);
                    if (exp > maxExp && exp < 50) {
                        maxExp = exp;
                        found = true;
                    }
                }
            }
        }
    }

    if (found) return maxExp;

    // Look for fresher/entry level keywords
    if (lowerText.includes('fresher') || lowerText.includes('entry level') || lowerText.includes('0 years')) {
        return 0;
    }

    return null;
}

module.exports = { extractExperience };
