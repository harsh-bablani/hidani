const fs = require('fs');
const pdfParse = require('pdf-parse');
const { extractExperience } = require('../utils/experienceExtractor');
const { skills: skillDictionary, rawSkills } = require('../utils/skillDictionary');

async function parseResume(filePath) {
    let text = '';

    if (filePath.toLowerCase().endsWith('.pdf')) {
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdfParse(dataBuffer);
        text = data.text;
    } else {
        text = fs.readFileSync(filePath, 'utf8');
    }

    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    let name = "Unknown Candidate";

    // Heuristic: Check first 5 lines for a likely name
    for (let i = 0; i < Math.min(5, lines.length); i++) {
        const line = lines[i];
        if (/^[A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,2}$/.test(line)) {
            name = line;
            break;
        }
    }

    if (name === "Unknown Candidate" && lines.length > 0) {
        name = lines[0]; // Fallback to very first line
    }

    const experience = extractExperience(text) || 0;
    const lowerText = text.toLowerCase();
    const extractedSkills = [];

    for (let i = 0; i < skillDictionary.length; i++) {
        const skill = skillDictionary[i];
        const escapeRegex = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        let regexStr;
        if (/^[a-z0-9]+$/i.test(skill)) {
            regexStr = `\\b${skill}\\b`;
        } else {
            regexStr = `(?:\\b|\\s|^)${escapeRegex(skill)}(?:\\b|\\s|$)`;
        }

        const regex = new RegExp(regexStr, 'i');
        if (regex.test(lowerText)) {
            extractedSkills.push(rawSkills[i]);
        }
    }

    return {
        name: name,
        experience: experience,
        skills: [...new Set(extractedSkills)],
        rawText: text
    };
}

module.exports = { parseResume };
