# Resume Parsing and Job Matching System

A complete rule-based Resume Parsing and Job Matching System built without any Large Language Models or Generative AI APIs.

This Node.js application uses strictly rule-based logic, regular expressions, and traditional NLP concepts to parse skills, experience, and salary from Resumes (PDF) and Job Descriptions (TXT), returning a matching score.

## Features Implemented

1. **Resume PDF Parsing**: Utilizes `pdf-parse` to read resume text.
2. **JD Text Parsing**: Reads and analyzes Job Descriptions.
3. **Salary Extraction**: Powerful regex algorithms to detect formats like "12 LPA", "₹10,00,000 per annum", "$180000 - $220000".
4. **Experience Extraction**: Regex-based phrase matching to identify explicit years of experience (e.g., "3-5 years", "Fresher").
5. **Skill Extraction**: Predefined comprehensive skill dictionary spanning various frontend, backend, devops, and database technologies.
6. **Skill Comparison**: Computes intersections between candidate skills and job requirements.
7. **Matching Score**: Percentage calculation `(Matched JD Skills / Total JD Skills) * 100` mapped from 0 to 100.
8. **JSON Output**: Returns rigidly structured JSON matching the provided schema.
9. **REST API**: Built with Express, exposes a `POST /match` multipart file upload endpoint using Multer.
10. **Bonus Web UI**: Simple, sleek frontend to test the extraction API locally.

## Project Structure

```
resume-job-matcher/
├── api/
│   └── server.js                # Express REST API definition
├── data/                        # Contains example documents
│   ├── resumes/                 # Example PDFs
│   └── job_descriptions/        # Example TXTs
├── matcher/
│   └── jobMatcher.js            # Core matching and scoring execution logic
├── parsers/
│   ├── jdParser.js              # Reads text files for JD section parsing
│   └── resumeParser.js          # Uses pdf-parse to extract candidate text
├── public/                      
│   └── index.html               # Bonus Web UI for file dropping
├── sampleOutput/
│   └── result.json              # Sample matched JSON dump
├── scripts/                     # Helper generators for data
│   ├── generateSampleData.js
│   └── generateSampleOutput.js
├── utils/
│   ├── experienceExtractor.js   # Regex logic for Experience
│   ├── salaryExtractor.js       # Regex logic for Salary detection
│   └── skillDictionary.js       # Extensive list of tech keywords
├── package.json
└── README.md
```

## Parsing Engine Logic Details

Since no AI endpoints can be used, the extraction system hinges on deterministic parsing rules:

* **Tokenization and Matching**: Text is loaded, converted to an intermediate lowercase form, and systematically checked against the array exported by `skillDictionary.js`. It utilizes specific regex boundaries `(?:\\b|\\s|^)` depending on if the skill includes special characters (like `C++` or `.NET`) to ensure clean text matching instead of partial false positive hits (e.g. matching 'C' inside 'React').
* **Experience & Salary**: Deep Regex searches scanning the whole document structure to parse numbers adjacent to keywords like `LPA`, `years`, `%k`, `$`, `entry level`. Taking the maximum matched experience bounds.
* **Sections**: Keyword boundaries (e.g. 'Requirements', 'Responsibilities') designate document sections to segregate role traits.

## Setup Instructions

**Prerequisites:** Node.js (v14 or higher)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Generate Example Resumes and Result JSON (Optional):**
   ```bash
   npm run generate-samples
   ```
   *This populates `data/resumes/example-resume.pdf`, `data/job_descriptions/example-jd.txt` and calculates `sampleOutput/result.json`*.

3. **Run the Application:**
   ```bash
   npm start
   ```

4. **Testing the API / Web UI:**
   Navigate your browser to `http://localhost:3000`. Use the web form to select the previously generated PDF and TXT file from the `data/` directories, and instantly receive the analyzed Matching Output.

## API Endpoint Details

**POST `/match`**

Content-Type: `multipart/form-data`

* **resume**: Source Resume File (PDF)
* **jd**: Job Description File (TXT)

*Response:*
Returns `200 OK` JSON detailing candidate Name, parsed Salary, matching Jobs array, Skill analysis truth table, and a 0-100 Matching Score.
