const fs = require('fs');
const { extractExperience } = require('../utils/experienceExtractor');
const { extractSalary } = require('../utils/salaryExtractor');
const { skills: skillDictionary, rawSkills } = require('../utils/skillDictionary');

function parseJD(filePath) {
    const text = fs.readFileSync(filePath, 'utf8');

    const salary = extractSalary(text);
    const experience = extractExperience(text);

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

    const lines = text.split('\n');
    let currentSection = 'about';
    let aboutRole = [];
    let jobTitle = "Not specified";

    for (const line of lines) {
        const lowerLine = line.trim().toLowerCase();

        if (lowerLine.startsWith('job title') || lowerLine.startsWith('role') || lowerLine.startsWith('position')) {
            const parts = line.split(':');
            if (parts.length > 1) {
                jobTitle = parts[1].trim();
            }
        }

        if (lowerLine.includes('responsibilities') || lowerLine.includes('what you will do') ||
            lowerLine.includes('requirements') || lowerLine.includes('qualifications') ||
            lowerLine.includes('required skills') || lowerLine.includes('desired skills') ||
            lowerLine.includes('preferred skills')) {
            currentSection = 'other';
            continue;
        }

        if (line.trim().length > 0) {
            if (currentSection === 'about' && !lowerLine.startsWith('job title') && !lowerLine.startsWith('role:') && !lowerLine.startsWith('position:') && !lowerLine.startsWith('location')) {
                aboutRole.push(line.trim());
            }
        }
    }

    const aboutText = aboutRole.join(' ').substring(0, 500);

    return {
        salary: salary,
        experience: experience,
        skills: [...new Set(extractedSkills)],
        aboutRole: aboutText || "No description provided.",
        jobTitle: jobTitle
    };
}

module.exports = { parseJD };
