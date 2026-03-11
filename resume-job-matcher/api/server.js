const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { parseResume } = require('../parsers/resumeParser');
const { parseJD } = require('../parsers/jdParser');
const { matchJob } = require('../matcher/jobMatcher');

const app = express();
const port = process.env.PORT || 3000;

const os = require('os');

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, os.tmpdir());
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Serve static files for the Simple UI
app.use(express.static('public'));

app.post('/match', upload.fields([{ name: 'resume', maxCount: 1 }, { name: 'jd', maxCount: 1 }]), async (req, res) => {
    try {
        if (!req.files || !req.files['resume'] || !req.files['jd']) {
            return res.status(400).json({ error: 'Both resume and jd files are required.' });
        }

        const resumeFile = req.files['resume'][0];
        const jdFile = req.files['jd'][0];

        // Parse inputs
        const resumeData = await parseResume(resumeFile.path);
        const jdData = parseJD(jdFile.path);

        // Match
        const matchResult = matchJob(resumeData, jdData, "JD_" + Date.now(), jdData.jobTitle || "Not specified");

        // Clean up uploaded files (optional but good practice)
        fs.unlinkSync(resumeFile.path);
        fs.unlinkSync(jdFile.path);

        res.json(matchResult);

    } catch (error) {
        console.error("Error processing files:", error);
        res.status(500).json({ error: 'Internal server error during parsing and matching.' });
    }
});

app.listen(port, () => {
    console.log(`Resume Matcher API listening at http://localhost:${port}`);
});

module.exports = app;
