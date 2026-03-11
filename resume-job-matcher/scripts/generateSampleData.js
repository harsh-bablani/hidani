const fs = require('fs');
const PDFDocument = require('pdfkit');
const path = require('path');

const resumesDir = path.join(__dirname, '../data/resumes');
const jdsDir = path.join(__dirname, '../data/job_descriptions');
const outputDir = path.join(__dirname, '../sampleOutput');

[resumesDir, jdsDir, outputDir].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

(async () => {
    await new Promise((resolve) => {
        const stream = fs.createWriteStream(path.join(resumesDir, 'example-resume.pdf'));
        const doc = new PDFDocument();
        doc.pipe(stream);

        doc.fontSize(25).text('John Doe', { align: 'center' });
        doc.moveDown();
        doc.fontSize(16).text('Professional Summary');
        doc.fontSize(12).text('Experienced Backend Developer with 4.5 years of experience in building scalable microservices and robust APIs. Passionate about clean code and modern architecture.');
        doc.moveDown();
        doc.fontSize(16).text('Skills');
        doc.fontSize(12).text('Languages & Frameworks: Java, Python, JavaScript, Spring Boot, React');
        doc.text('Databases: MySQL, PostgreSQL, MongoDB');
        doc.text('DevOps & Tools: Docker, Kubernetes, AWS, Git');
        doc.moveDown();
        doc.fontSize(16).text('Experience');
        doc.fontSize(12).text('Software Engineer | Tech Corp Inc. | Jan 2020 - Present');
        doc.text('Developed backend services using Java and Spring Boot. Deployed applications on Kubernetes and AWS.');

        doc.end();

        stream.on('finish', () => {
            console.log('Sample resume PDF generated.');
            resolve();
        });
    });

    // Generate Sample JD
    const jdContent = `
Job Title: Backend Developer
Location: Remote

About the Role
We are looking for a highly skilled Backend Developer to join our core engineering team. You will be responsible for backend development of our highly scaled distributed systems.

Requirements
- 3+ years of experience in software development
- Proficiency in Java and Spring Boot
- Experience with message queues like Kafka
- Knowledge of cloud platforms like AWS
- Familiarity with containerization using Docker

Compensation
CTC: ₹15,00,000 per annum + Equity
`;

    fs.writeFileSync(path.join(jdsDir, 'example-jd.txt'), jdContent.trim());
    console.log('Sample JD TXT generated.');
})();
