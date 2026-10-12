export type Lang = "en" | "fr";

/* Language-independent project data */
export const PROJECTS_BASE = [
  { period: "05/2026 – 07/2026", tags: ["Python", "Airflow", "dbt", "PostgreSQL", "Docker", "Grafana", "Scikit-learn"],
    link: "https://github.com/rayenbenyoussef/Medical_data_quality_pipeline",
    images: ["/projects/medical-1.png", "/projects/medical-2.png", "/projects/medical-3.png"] },
  { mixed: true, period: "2026", tags: ["Java", "XML", "PHP", "UML 2.0", "Android"],
    link: "https://github.com/rayenbenyoussef/Clubiqo_app",
    images: ["/projects/clubiqo-1.png", "/projects/clubiqo-2.png", "/projects/clubiqo-3.png"] },
  { period: "04/2026", tags: ["Java", "Agile / Scrum", "Git & GitHub"],
    link: "https://github.com/rayenbenyoussef/GymFlow_Agl_ds_main",
    images: ["/projects/gymflow-1.png", "/projects/gymflow-2.png", "/projects/gymflow-3.png"] },
];

export const SKILL_ITEMS = [
  ["Python (Pandas, NumPy, Scikit-learn)", "SQL (PostgreSQL, PL/SQL)", "Machine Learning", "Data Analysis & Data Modeling"],
  ["ETL/ELT & Data Warehousing", "Airflow", "dbt", "Docker"],
  ["Power BI", "Grafana", "Git & GitHub"],
  ["Java, C, PHP", "Android (Java/XML)", "UML", "Agile / Scrum"],
];
export const LANG_PCT = [100, 70, 65, 20];
export const CONTACT_VALUES = {
  email: "rayen.benyoussef@etudiant-fsegt.utm.tn", phone: "+216 52 925 815",
  linkedin: "https://linkedin.com/in/rayen-ben-youssef-a7b727361", github: "https://github.com/rayenbenyoussef",
};

/* Use **double asterisks** for bold */
export const CONTENT = {
  en: {
    nav: ["About", "Skills", "Projects", "Education", "Contact"],
    hello: "Hello, I'm", title: "Data Science & Business Intelligence Student",
    tagline: "I build data pipelines and predictive models, from raw data to dashboards. Looking for a graduation internship (PFE) from February 1 to May 30, 2027.",
    ctaContact: "Contact me", ctaProjects: "See my projects", scroll: "Scroll",
    about: { label: "01 — Profile", heading: "About me", paras: [
      "Business Computing student at FSEGT, specialized in **Data Science, Business Intelligence** and data analytics. I build data pipelines and predictive models, from raw data to dashboards.",
      "I have hands-on experience in **ELT/ETL, data quality, data warehousing and Machine Learning** (Python, SQL, Airflow, dbt, Power BI). I'm interested in applying data to **healthcare, business and finance**.",
      "Detail-oriented, autonomous and analytical." ],
      stats: ["Projects built", "Automated data quality tests", "DataCamp certificates"],
      interests: ["Healthcare & Data", "Business & Finance", "JCI Rafraf (2 years)", "NEXUS FSEGT (1 year)", "Volleyball"] },
    skills: { label: "02 — Skills", heading: "What I work with",
      groups: ["Data & Machine Learning", "Pipelines & Warehousing", "Visualization & Tooling", "Software Engineering"],
      softTitle: "Soft skills", soft: ["Problem Solving", "Attention to Detail", "Autonomy & Organization", "Analytical Thinking", "Teamwork"],
      langsTitle: "Languages", langs: [["Arabic", "Native"], ["French", "Intermediate"], ["English", "Intermediate"], ["German", "Beginner"]] },
    projects: { label: "03 — Projects", heading: "Things I've built", github: "View on GitHub →", addShot: "Add a screenshot",
      items: [
        { name: "Medical Data Quality Pipeline", type: "Personal project · Data Engineering & Data Science", duration: "2 months", location: "Tunis",
          bullets: ["Built an end-to-end ELT pipeline on real-world healthcare data (MIMIC-IV-ED) using Python, Airflow, dbt, PostgreSQL and Docker, with 166 automated data quality tests.",
            "Created Grafana monitoring dashboards and a Logistic Regression prototype for emergency admission prediction."] },
        { name: "Clubiqo", type: "Personal project · Android & PHP club management app", duration: "2 months", location: "Tunis",
          bullets: ["Designed and built an Android prototype (Java/XML) with member, moderator and admin roles, event registration and dashboards, based on UML 2.0 diagrams.",
            "Developed the PHP web admin interface."] },
        { name: "GymFlow", type: "Team project · FSEGT · Scrum Master & Java Developer", duration: "2 weeks", location: "Tunis",
          bullets: ["Led an Agile team as Scrum Master (task tracking, sprint coordination) while developing Java features."] } ] },
    education: { label: "04 — Education", heading: "Academic path", school: "Faculty of Economics and Management of Tunis (FSEGT)",
      degree: "Bachelor's Degree in Business Computing", period: "09/2024 – Present · Tunis", certsTitle: "Certifications & achievements",
      certs: [["DataCamp", "Intermediate Python", "Jan 2026"], ["DataCamp", "Data Manipulation with pandas", "Feb 2026"], ["JCI Rafraf", "Best Content Creator of the Year 2025", "2025"]] },
    contact: { label: "05 — Contact", heading: "Let's work together",
      intro: "I'm looking for a graduation internship (PFE) from February 1 to May 30, 2027. Get in touch if you have a data project in healthcare, business or finance.",
      labels: ["Email", "Phone", "Location", "LinkedIn", "GitHub"], place: "Tunis, Tunisia",
      quote: "\"Innovate. Analyze. Predict. — Building the scaffolding to turn raw data into strategic insights.\"" },
  },
  fr: {
    nav: ["À propos", "Compétences", "Projets", "Formation", "Contact"],
    hello: "Bonjour, je suis", title: "Étudiant en Data Science & Business Intelligence",
    tagline: "Je conçois des pipelines de données et des modèles prédictifs, de la donnée brute jusqu'aux tableaux de bord. Je recherche un stage de fin d'études (PFE) du 1er février au 30 mai 2027.",
    ctaContact: "Me contacter", ctaProjects: "Voir mes projets", scroll: "Défiler",
    about: { label: "01 — Profil", heading: "À propos de moi", paras: [
      "Étudiant en Licence Business Computing à la FSEGT, spécialisé en **Data Science, Business Intelligence** et analyse de données. Je conçois des pipelines de données et des modèles prédictifs, de la donnée brute jusqu'aux tableaux de bord.",
      "J'ai une expérience pratique en **ELT/ETL, qualité des données, data warehousing et Machine Learning** (Python, SQL, Airflow, dbt, Power BI). Je souhaite appliquer la data à **la santé, au business et à la finance**.",
      "Rigoureux, autonome et analytique." ],
      stats: ["Projets réalisés", "Tests automatisés de qualité des données", "Certificats DataCamp"],
      interests: ["Santé & Data", "Business & Finance", "JCI Rafraf (2 ans)", "NEXUS FSEGT (1 an)", "Volleyball"] },
    skills: { label: "02 — Compétences", heading: "Ce que je maîtrise",
      groups: ["Data & Machine Learning", "Pipelines & Data Warehousing", "Visualisation & Outils", "Génie logiciel"],
      softTitle: "Soft skills", soft: ["Résolution de problèmes", "Rigueur et sens du détail", "Autonomie et organisation", "Esprit d'analyse", "Travail d'équipe"],
      langsTitle: "Langues", langs: [["Arabe", "Langue maternelle"], ["Français", "Intermédiaire"], ["Anglais", "Intermédiaire"], ["Allemand", "Débutant"]] },
    projects: { label: "03 — Projets", heading: "Ce que j'ai construit", github: "Voir sur GitHub →", addShot: "Ajouter une capture d'écran",
      items: [
        { name: "Medical Data Quality Pipeline", type: "Projet personnel · Data Engineering & Data Science", duration: "2 mois", location: "Tunis",
          bullets: ["Conception d'un pipeline ELT de bout en bout sur des données de santé réelles (MIMIC-IV-ED) avec Python, Airflow, dbt, PostgreSQL et Docker, incluant 166 tests automatisés de qualité des données.",
            "Création de dashboards Grafana de suivi et d'un prototype de Machine Learning (Régression Logistique) pour la prédiction d'admission aux urgences."] },
        { name: "Clubiqo", type: "Projet personnel · Application Android & PHP de gestion de clubs", duration: "2 mois", location: "Tunis",
          bullets: ["Conception et développement d'un prototype Android (Java/XML) avec rôles membre, modérateur et admin, inscription aux événements et tableaux de bord, basé sur une modélisation UML 2.0.",
            "Développement de l'interface d'administration web en PHP."] },
        { name: "GymFlow", type: "Projet d'équipe · FSEGT · Scrum Master & Développeur Java", duration: "2 semaines", location: "Tunis",
          bullets: ["Direction d'une équipe Agile en tant que Scrum Master (suivi des tâches, coordination des sprints) tout en développant des fonctionnalités Java."] } ] },
    education: { label: "04 — Formation", heading: "Parcours académique", school: "Faculté des Sciences Économiques et de Gestion de Tunis (FSEGT)",
      degree: "Licence en Informatique de Gestion", period: "09/2024 – Présent · Tunis", certsTitle: "Certifications & réalisations",
      certs: [["DataCamp", "Intermediate Python", "janv. 2026"], ["DataCamp", "Data Manipulation with pandas", "fév. 2026"], ["JCI Rafraf", "Meilleur créateur de contenu 2025", "2025"]] },
    contact: { label: "05 — Contact", heading: "Travaillons ensemble",
      intro: "Je recherche un stage de fin d'études (PFE) du 1er février au 30 mai 2027. Contactez-moi si vous avez un projet data dans la santé, le business ou la finance.",
      labels: ["Email", "Téléphone", "Localisation", "LinkedIn", "GitHub"], place: "Tunis, Tunisie",
      quote: "« Innover. Analyser. Prédire. — Construire l'échafaudage qui transforme la donnée brute en décisions stratégiques. »" },
  },
};
