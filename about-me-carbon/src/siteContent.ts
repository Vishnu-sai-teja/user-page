export interface NavigationItem {
  readonly label: string;
  readonly href: "/" | "/about" | "/projects";
}

export interface ContactChannel {
  readonly label: string;
  readonly value: string;
  readonly href: string;
}

export interface Principle {
  readonly title: string;
  readonly description: string;
}

export interface ExperienceEntry {
  readonly company: string;
  readonly role: string;
  readonly period: string;
  readonly location: string;
  readonly summary: string;
  readonly highlights: readonly string[];
}

export interface SkillGroup {
  readonly label: string;
  readonly items: readonly string[];
}

export interface EducationEntry {
  readonly institution: string;
  readonly credential: string;
  readonly graduation: string;
  readonly location: string;
  readonly detail: string;
}

export interface ProjectEntry {
  readonly slug: string;
  readonly title: string;
  readonly category: string;
  readonly year: string;
  readonly summary: string;
  readonly whyItMatters: string;
  readonly technologies: readonly string[];
  readonly highlights: readonly string[];
}

export interface SiteContent {
  readonly name: string;
  readonly role: string;
  readonly organization: string;
  readonly thesis: string;
  readonly homeSummary: string;
  readonly focusAreas: readonly string[];
  readonly navigation: readonly NavigationItem[];
  readonly homeOrientation: readonly string[];
  readonly homeMaintenanceNote: string;
  readonly aboutEssay: readonly string[];
  readonly principles: readonly Principle[];
  readonly experience: readonly ExperienceEntry[];
  readonly skillGroups: readonly SkillGroup[];
  readonly education: readonly EducationEntry[];
  readonly coursework: readonly string[];
  readonly languages: readonly string[];
  readonly projects: readonly ProjectEntry[];
  readonly contactChannels: readonly ContactChannel[];
  readonly contactInvitation: string;
}

/**
 * Central content model for Vishnu's About Me experience, derived from the
 * provided user profile so every route reads from one factual source.
 */
export const siteContent: SiteContent = {
  name: "Vishnu Sai Teja Nagabandi",
  role: "Graduate AI Engineer",
  organization: "SAGE",
  thesis:
    "Building grounded AI systems where live business context, low latency, and dependable orchestration matter as much as model quality.",
  homeSummary:
    "Vishnu works across multi-agent systems, voice AI, document intelligence, computer vision, and ML infrastructure, with a clear bias toward production-ready systems rather than isolated model demos.",
  focusAreas: [
    "Multi-agent systems",
    "Voice AI",
    "Document intelligence",
    "Computer vision",
    "ML infrastructure"
  ],
  navigation: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" }
  ],
  homeOrientation: [
    "About — Vishnu's story, work history, and what connects the roles.",
    "Projects — featured builds across agent systems, OCR pipelines, and generative models.",
    "Contact — email is the fastest path; GitHub, LinkedIn, and Kaggle add context."
  ],
  homeMaintenanceNote: "Updated March 2026.",
  aboutEssay: [
    "I build AI systems meant to survive real usage. My work sits at the intersection of multi-agent orchestration, voice interfaces, document intelligence, computer vision, and the infrastructure that keeps those systems usable after a demo ends.",
    "At SAGE, I work as a Graduate AI Engineer on ReWOO-based agents and low-latency voice experiences for AR professionals. The common thread is bringing live CRM and ERP context into workflows where timing, retrieval quality, and reliability directly affect how useful the system feels.",
    "Before SAGE, I worked at PIBIT across layout analysis, OCR pipelines, Azure-based training workflows, and model performance tracking. At AiDash, I worked on asset geotagging from street-view imagery, combining object detection, depth and height estimation, and asynchronous processing in one end-to-end pipeline.",
    "What keeps pulling me forward is the systems work around AI: the integrations, evaluation loops, observability, and engineering choices that make a model genuinely useful inside a product or workflow."
  ],
  principles: [
    {
      title: "Ground models in live context",
      description:
        "Vishnu's current work centers on connecting agents and voice interfaces to CRM and ERP data so intelligence is tied to the actual business moment."
    },
    {
      title: "Optimize for real-time use",
      description:
        "Low-latency voice systems and production-oriented retrieval pipelines show a consistent preference for responsiveness, not just accuracy in isolation."
    },
    {
      title: "Prefer measurable gains",
      description:
        "From the 28% layout-recall improvement to the 6% YOLO mapping lift, the profile points to work that values concrete quality improvements."
    }
  ],
  experience: [
    {
      company: "SAGE",
      role: "Graduate AI Engineer",
      period: "October 2025 - Present",
      location: "Bangalore, India",
      summary:
        "Production AI work focused on enterprise agent workflows and voice experiences that need live business context during use.",
      highlights: [
        "Designed and productionized ReWOO-based agents integrating MCP server tools with ERP systems and RAG pipelines to retrieve real-time CRM context.",
        "Built low-latency voice agents for AR professionals, enabling real-time access to CRM and ERP context during live calls."
      ]
    },
    {
      company: "PIBIT",
      role: "AI/ML Engineer",
      period: "July 2025 - October 2025",
      location: "Bangalore, India",
      summary:
        "Document and image understanding work aimed at measurable extraction quality and stronger layout understanding.",
      highlights: [
        "Developed a layout model for document and image analysis, improving layout recall by 28% over earlier models.",
        "Built a YOLO-based OCR system for worker compensation and auto loss run document processing, improving extraction accuracy.",
        "Implemented clustering-based algorithms to refine training and improve YOLO mapping accuracy by 6%."
      ]
    },
    {
      company: "PIBIT",
      role: "AI/ML Intern",
      period: "October 2024 - June 2025",
      location: "Bangalore, India",
      summary:
        "ML operations and backend support work focused on training workflows, task creation, and continuous model monitoring.",
      highlights: [
        "Designed and deployed Azure-based training pipelines to support model training and task creation with GitHub workflow integration.",
        "Built real-time model performance tracking using FastAPI and SQLAlchemy for continuous monitoring."
      ]
    },
    {
      company: "AiDash",
      role: "Data Science Intern",
      period: "April 2024 - October 2024",
      location: "Bangalore, India",
      summary:
        "Computer vision work centered on end-to-end asset geotagging from street-view imagery at scale.",
      highlights: [
        "Built an end-to-end asset geotagging pipeline from street-view imagery using object detection, depth and height estimation, and asynchronous parallel processing."
      ]
    }
  ],
  skillGroups: [
    {
      label: "Programming languages",
      items: ["Python", "C++", "PostgreSQL", "MySQL", "Shell"]
    },
    {
      label: "Frameworks and tools",
      items: ["PyTorch", "LangChain", "LangGraph", "FastAPI", "Flask", "Docker"]
    },
    {
      label: "Libraries",
      items: ["NumPy", "Pandas", "Scikit-Learn", "Matplotlib", "NLTK", "SpaCy", "SQLAlchemy"]
    },
    {
      label: "Cloud platforms",
      items: ["AWS", "Azure"]
    }
  ],
  education: [
    {
      institution: "Indian Institute of Information Technology, Nagpur",
      credential: "B.Tech in Computer Science",
      graduation: "May 2025",
      location: "Nagpur, Maharashtra",
      detail: "GPA: 8.55/10"
    },
    {
      institution: "Sri Chaithanya",
      credential: "Senior Secondary Education",
      graduation: "2021",
      location: "Hyderabad, Telangana",
      detail: "Score: 98.2%"
    }
  ],
  coursework: [
    "Mathematics in Data Science",
    "Numerical Methods and Probability",
    "Discrete Mathematics and Graph Theory",
    "Operating System",
    "Database Management Systems",
    "Cloud Computing Applied Sciences",
    "Machine Learning"
  ],
  languages: ["English", "Hindi", "Telugu", "German (Novice)"],
  projects: [
    {
      slug: "multi-agent-resume-parser",
      title: "Multi-Agent Resume Parser",
      category: "Agent systems",
      year: "2025",
      summary:
        "A multi-agent system for extracting structured information from PDF and DOCX resumes with feedback loops and traceability built into the workflow.",
      whyItMatters:
        "This project shows Vishnu's preference for orchestration and observability, not just extraction accuracy. It combines multi-step reasoning, user feedback, and agent tracing in one workflow.",
      technologies: ["LangChain", "LangGraph", "LangSmith", "Python"],
      highlights: [
        "Built a multi-agent system to process resumes and extract key information from PDF and DOCX files.",
        "Implemented user feedback loops for real-time accuracy improvements.",
        "Used LangGraph and LangSmith to track AI interactions."
      ]
    },
    {
      slug: "staffusion",
      title: "Staffusion",
      category: "Generative modeling",
      year: "2024",
      summary:
        "An end-to-end stable diffusion pipeline for text-to-image generation built from core model components instead of treating generation as a black box.",
      whyItMatters:
        "Staffusion highlights comfort with model internals and system composition, especially when a project requires connecting multiple learning components into one coherent pipeline.",
      technologies: ["PyTorch", "Python"],
      highlights: [
        "Implemented an end-to-end stable diffusion pipeline for text-to-image generation.",
        "Integrated UNet, CLIP, and Vision Transformers into the pipeline."
      ]
    },
    {
      slug: "skin-cancer-detection",
      title: "Skin Cancer Detection",
      category: "Medical imaging",
      year: "2024",
      summary:
        "A GAN-based medical imaging project focused on strengthening dataset quality to support better downstream detection accuracy.",
      whyItMatters:
        "The project reflects an interest in improving the data conditions around a model, not just adjusting the detector itself. It is a reminder that system quality often starts with dataset quality.",
      technologies: ["GANs"],
      highlights: [
        "Developed a Generative Adversarial Network to improve the medical imaging dataset and support better detection accuracy."
      ]
    }
  ],
  contactChannels: [
    {
      label: "Email",
      value: "vishnusaiteja.3004@gmail.com",
      href: "mailto:vishnusaiteja.3004@gmail.com"
    },
    {
      label: "Phone",
      value: "+91 8978044062",
      href: "tel:+918978044062"
    },
    {
      label: "GitHub",
      value: "Vishnu-sai-teja",
      href: "https://github.com/Vishnu-sai-teja"
    },
    {
      label: "LinkedIn",
      value: "Vishnu Sai Teja Nag",
      href: "https://www.linkedin.com/in/vishnu-sai-teja-nag"
    },
    {
      label: "Kaggle",
      value: "Vishnu Sai Teja N",
      href: "https://www.kaggle.com/vishnusaitejan"
    }
  ],
  contactInvitation:
    "If the work overlaps with hiring, collaboration, or shared research interests, email is the fastest way to continue the conversation."
};

/**
 * Returns a project by slug so the detail route can render a focused case-study
 * page without duplicating lookup logic in the view layer.
 */
export function findProjectBySlug(
  projects: readonly ProjectEntry[],
  slug: string
): ProjectEntry | undefined {
  return projects.find((project) => project.slug === slug);
}

/**
 * Filters the project collection using a case-insensitive match across the
 * project title, category, summary, and listed technologies.
 */
export function filterProjects(
  projects: readonly ProjectEntry[],
  query: string
): readonly ProjectEntry[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return projects;
  }

  return projects.filter((project) => {
    const searchableText = [
      project.title,
      project.category,
      project.summary,
      project.whyItMatters,
      ...project.technologies
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}