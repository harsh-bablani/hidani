function matchJob(resumeData, jdData, jobId = "JD001", role = "Backend Developer") {
    const resumeSkillsLower = resumeData.skills.map(s => s.toLowerCase());
    const jdSkills = jdData.skills;

    const skillsAnalysis = [];
    let matchedCount = 0;

    for (const jdSkill of jdSkills) {
        const isPresent = resumeSkillsLower.includes(jdSkill.toLowerCase());
        skillsAnalysis.push({
            skill: jdSkill,
            presentInResume: isPresent
        });
        if (isPresent) {
            matchedCount++;
        }
    }

    let matchingScore = 0;
    if (jdSkills.length > 0) {
        matchingScore = Math.round((matchedCount / jdSkills.length) * 100);
    }

    return {
        name: resumeData.name,
        salary: jdData.salary || "Not specified",
        yearOfExperience: resumeData.experience,
        resumeSkills: resumeData.skills,
        matchingJobs: [
            {
                jobId: jobId,
                role: role,
                aboutRole: jdData.aboutRole.trim(),
                skillsAnalysis: skillsAnalysis,
                matchingScore: matchingScore
            }
        ]
    };
}

module.exports = { matchJob };
