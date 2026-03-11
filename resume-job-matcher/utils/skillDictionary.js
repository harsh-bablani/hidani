const skills = [
  "Java", "Spring Boot", "Python", "React", "Docker", "Kafka",
  "MySQL", "AWS", "Kubernetes", "Node.js", "Express", "MongoDB",
  "SQL", "Git", "REST", "API", "GraphQL", "Jenkins", "CI/CD",
  "Linux", "Unix", "Bash", "Shell", "HTML", "CSS", "JavaScript",
  "TypeScript", "C#", ".NET", "C++", "C", "Ruby", "Rails", "PHP",
  "Laravel", "Go", "Rust", "Swift", "Kotlin", "Android", "iOS",
  "React Native", "Flutter", "Machine Learning", "Data Science",
  "Deep Learning", "TensorFlow", "PyTorch", "NLP", "Computer Vision",
  "Redis", "Elasticsearch", "RabbitMQ", "ActiveMQ", "Hibernate",
  "JPA", "MyBatis", "Spring Cloud", "Microservices", "Angular", "Vue",
  "Django", "Flask", "FastAPI", "Azure", "GCP", "PostgreSQL", "Oracle"
];

module.exports = {
  skills: skills.map(s => s.toLowerCase()),
  rawSkills: skills
};
