const fs = require('fs');
const path = require('path');
const { parseResume } = require('../parsers/resumeParser');
const { parseJD } = require('../parsers/jdParser');
const { matchJob } = require('../matcher/jobMatcher');

async function generateOutput() {
    const resumePath = path.join(__dirname, '../data/resumes/example-resume.pdf');
    const jdPath = path.join(__dirname, '../data/job_descriptions/example-jd.txt');
    const outputPath = path.join(__dirname, '../sampleOutput/result.json');

    try {
        const resumeData = await parseResume(resumePath);
        const jdData = parseJD(jdPath);

        const matchResult = matchJob(resumeData, jdData, "JD001", "Backend Developer");

        fs.writeFileSync(outputPath, JSON.stringify(matchResult, null, 2));
        console.log('Sample output generated at', outputPath);
    } catch (err) {
        console.error('Error generating sample output:', err);
    }
}

generateOutput();
