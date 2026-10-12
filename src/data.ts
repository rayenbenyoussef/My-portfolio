// All portfolio content lives here. Image paths point to files in /public.
export interface Project {
  title: string;
  kind: string;
  period: string;
  duration: string;
  bullets: string[];
  stack: string[];
  github: string;
  images: [string, string, string]; // 1 large + 2 small slots
}

export const profile = {
  name: "Rayen Ben Youssef",
  role: "Data Science & Business Intelligence student",
  intro:
    "I build data pipelines and predictive models, from raw data to dashboards. I like work where data quality matters: healthcare, business and finance.",
  about:
    "Business Computing student at FSEGT, specialized in Data Science, Business Intelligence and data analytics, with hands-on experience in ELT/ETL, data quality, data warehousing and Machine Learning.",
  availability: "Looking for a graduation internship (PFE), February 1 to May 30, 2027.",
  photo: "/profile.jpg",
  email: "rayen.benyoussef@etudiant-fsegt.utm.tn",
  phone: "+216 52 925 815",
  location: "Tunis, Tunisia",
  linkedin: "https://linkedin.com/in/rayen-ben-youssef-a7b727361",
  github: "https://github.com/rayenbenyoussef",
};

export const pipelineStages = ["Extract", "Load", "Transform", "Test", "Model", "Dashboard"];

export const projects: Project[] = [
  {
    title: "Medical Data Quality Pipeline",
    kind: "Data Engineering & Data Science",
    period: "05/2026 - 07/2026",
    duration: "2 months",
    bullets: [
      "Built an end-to-end ELT pipeline on real-world healthcare data (MIMIC-IV-ED) with 166 automated data quality tests.",
      "Created Grafana monitoring dashboards and a Logistic Regression prototype for emergency admission prediction.",
    ],
    stack: ["Python", "Airflow", "dbt", "PostgreSQL", "Docker", "Grafana", "Scikit-learn"],
    github: "https://github.com/rayenbenyoussef/Medical_data_quality_pipeline",
    images: ["/projects/medical-1.png", "/projects/medical-2.png", "/projects/medical-3.png"],
  },
  {
    title: "Clubiqo",
    kind: "Android & PHP club management app",
    period: "2026",
    duration: "2 months",
    bullets: [
      "Designed and built an Android prototype (Java/XML) with member, moderator and admin roles, event registration and dashboards, based on UML 2.0 diagrams.",
      "Developed the PHP web admin interface.",
    ],
    stack: ["Java", "XML", "PHP", "UML 2.0", "Android"],
    github: "https://github.com/rayenbenyoussef/Clubiqo_app",
    images: ["/projects/clubiqo-1.png", "/projects/clubiqo-2.png", "/projects/clubiqo-3.png"],
  },
  {
    title: "GymFlow",
    kind: "FSEGT team project, Scrum Master & Java developer",
    period: "04/2026",
    duration: "2 weeks",
    bullets: [
      "Led an Agile team as Scrum Master (task tracking, sprint coordination) while developing Java features.",
    ],
    stack: ["Java", "Agile / Scrum", "Git & GitHub"],
    github: "https://github.com/rayenbenyoussef/GymFlow_Agl_ds_main",
    images: ["/projects/gymflow-1.png", "/projects/gymflow-2.png", "/projects/gymflow-3.png"],
  },
];

export const skills = [
  "Python (Pandas, NumPy, Scikit-learn)",
  "SQL (PostgreSQL, PL/SQL)",
  "ETL/ELT & Data Warehousing",
  "Data Pipelines: Airflow, dbt, Docker",
  "Data Analysis & Data Modeling",
  "Machine Learning",
  "Data Visualization (Power BI, Grafana)",
  "Git & GitHub",
  "Java, C, PHP",
  "Android Development (Java/XML), UML",
  "Agile / Scrum",
];

export const softSkills = ["Problem solving", "Attention to detail", "Autonomy & organization", "Analytical thinking", "Teamwork"];

export const languages = [
  { name: "Arabic", level: "Native", pct: 100 },
  { name: "French", level: "Intermediate", pct: 70 },
  { name: "English", level: "Intermediate", pct: 65 },
  { name: "German", level: "Beginner", pct: 20 },
];

export const education = {
  period: "09/2024 - Present",
  school: "Faculty of Economics and Management of Tunis (FSEGT)",
  degree: "Bachelor's Degree in Business Computing",
  place: "Tunis",
};

export const certs = [
  { issuer: "DataCamp", items: ["Intermediate Python (Jan 2026)", "Data Manipulation with pandas (Feb 2026)"] },
  { issuer: "JCI Rafraf", items: ["Best Content Creator of the Year 2025"] },
];

export const interests = ["Active member of JCI Rafraf (2 years)", "Active member of NEXUS FSEGT (1 year)", "Volleyball"];
