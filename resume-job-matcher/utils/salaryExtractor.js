function extractSalary(text) {
    if (!text) return null;

    const salaryRegexes = [
        // Match explicit LPA like "12 LPA", "12.5 LPA"
        /(\d+(?:\.\d+)?\s*lpa)/i,

        // Match CTC specific formats
        /(?:ctc|salary|package)[^\d]*(₹\s*[\d,]+(?:\s*per\s*annum|\s*p\.?a\.?|\s*lpa)?)/i,
        /(₹\s*[\d,]+(?:\s*per\s*annum|\s*p\.?a\.?|\s*lpa)?)/i,

        // Match dollar ranges
        /(\$\s*\d[,\d]*\s*-\s*\$\s*\d[,\d]*)/i,

        // Match singular dollar amounts
        /(\$[\d,]+(?:k)?(?:[\s-]+\$[\d,]+(?:k)?)?\s*(?:per\s*annum|\/yr|\/year)?)/i,

        // Match plain numbers if combined with "per annum"
        /((?:rs\.?|inr)?\s*[\d,]+\s*(?:lakhs?|cr|crores?)?\s*(?:per\s*annum|p\.?a\.?))/i
    ];

    for (const regex of salaryRegexes) {
        const match = text.match(regex);
        if (match && match[1]) {
            return match[1].trim();
        }
    }

    return null;
}

module.exports = { extractSalary };
