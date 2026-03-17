export type AppRoute = "/" | "/about" | "/projects" | "/recommendations" | "/contact";

export interface NavigationItem {
  readonly label: string;
  readonly path: AppRoute;
  readonly summary: string;
}

export interface ExperienceEntry {
  readonly company: string;
  readonly role: string;
  readonly duration: string;
  readonly location: string;
  readonly highlights: readonly string[];
}

export interface SkillGroup {
  readonly title: string;
  readonly items: readonly string[];
}

export interface ProjectEntry {
  readonly name: string;
  readonly category: string;
  readonly teaser: string;
  readonly problem: string;
  readonly approach: string;
  readonly outcome: string;
  readonly technologies: readonly string[];
}

export interface RecommendationMetadataRow {
  readonly label: string;
  readonly value: string;
}

export interface RecommendationCard {
  readonly kind: "book" | "movie";
  readonly slug: string;
  readonly title: string;
  readonly creator: string | null;
  readonly year: string | null;
  readonly description: string | null;
  readonly imageUrl: string | null;
  readonly sourceUrl: string | null;
  readonly metadata: readonly RecommendationMetadataRow[];
}

export interface RecommendationsPageData {
  readonly books: readonly RecommendationCard[];
  readonly movies: readonly RecommendationCard[];
}

export const navigationItems: readonly NavigationItem[] = [
  {
    label: "Home",
    path: "/",
    summary: "A fast orientation to Vishnu's role, direction, and how the site is organized."
  },
  {
    label: "About",
    path: "/about",
    summary: "Professional summary, experience arc, technical repertoire, and the working principles behind the resume."
  },
  {
    label: "Projects",
    path: "/projects",
    summary: "Three applied AI builds framed through problem, approach, and outcome."
  },
  {
    label: "Recommendations",
    path: "/recommendations",
    summary: "Books and films that show the technical taste and narrative instincts behind the work."
  },
  {
    label: "Contact",
    path: "/contact",
    summary: "A direct path for recruiters, collaborators, and peers to continue the conversation."
  }
] as const;

export const heroHighlights = [
  "Graduate AI Engineer at SAGE",
  "Building multi-agent and voice-first systems",
  "Grounded in document intelligence, CV, and ML operations"
] as const;

export const professionalSummary =
  "I build applied AI systems that need to work in real operating environments, not just in notebooks. My recent work spans multi-agent orchestration, voice AI, document intelligence, and model infrastructure, with a consistent focus on turning ambiguous workflows into reliable software.";

export const aboutNarrative = [
  "My path into AI engineering has been shaped by the tension between research ideas and production constraints. I am most energized when a system has to retrieve the right context, respond with low latency, and hold up under real usage rather than a controlled demo.",
  "At SAGE, I work on agentic workflows for accounts receivable operations, building ReWOO-style agents that combine tool use, ERP context, and retrieval pipelines. That work sits close to voice interaction too, which means the engineering bar includes speed, robustness, and the ability to surface the right answer while a conversation is still happening.",
  "Before that, I worked on document understanding and computer vision systems across PIBIT and AiDash. Those roles sharpened the habits I still rely on: measure recall, trace failures, improve the data path, and design for maintainability as early as possible."
] as const;

export const workingPrinciples = [
  "Prefer systems that can explain where their context came from.",
  "Treat latency as part of the product, not an afterthought.",
  "Keep model workflows observable enough that iteration is cheap."
] as const;

export const experienceTimeline: readonly ExperienceEntry[] = [
  {
    company: "SAGE",
    role: "Graduate AI Engineer",
    duration: "Oct 2025 - Present",
    location: "Bangalore, India",
    highlights: [
      "Designed and productionized ReWOO-based agents that combine MCP tools, ERP context, and RAG pipelines inside the AR Agent workspace.",
      "Built low-latency voice agents that let AR professionals pull CRM and ERP context during live calls."
    ]
  },
  {
    company: "PIBIT",
    role: "AI/ML Engineer",
    duration: "Jul 2025 - Oct 2025",
    location: "Bangalore, India",
    highlights: [
      "Developed a layout model for document and image analysis that improved layout recall by 28% over earlier baselines.",
      "Built a YOLO-based OCR pipeline for worker compensation and auto loss run documents, then refined mapping quality through clustering-based training improvements."
    ]
  },
  {
    company: "PIBIT",
    role: "AI/ML Intern",
    duration: "Oct 2024 - Jun 2025",
    location: "Bangalore, India",
    highlights: [
      "Designed Azure-based training pipelines with GitHub workflow integration for repeatable model training and task creation.",
      "Implemented FastAPI and SQLAlchemy monitoring services for near real-time model performance tracking."
    ]
  },
  {
    company: "AiDash",
    role: "Data Science Intern",
    duration: "Apr 2024 - Oct 2024",
    location: "Bangalore, India",
    highlights: [
      "Built an end-to-end asset geotagging pipeline from street-view imagery using detection, depth estimation, height estimation, and asynchronous parallel processing."
    ]
  }
] as const;

export const skillGroups: readonly SkillGroup[] = [
  {
    title: "Languages",
    items: ["Python", "C++", "PostgreSQL", "MySQL", "Shell"]
  },
  {
    title: "Frameworks and Systems",
    items: ["LangChain", "LangGraph", "FastAPI", "Flask", "Docker"]
  },
  {
    title: "ML and Data",
    items: ["PyTorch", "Scikit-Learn", "NumPy", "Pandas", "SpaCy", "NLTK"]
  },
  {
    title: "Cloud and Operations",
    items: ["AWS", "Azure", "GitHub Actions", "SQLAlchemy"]
  }
] as const;

export const featuredProjects: readonly ProjectEntry[] = [
  {
    name: "Multi-Agent Resume Parser",
    category: "Agentic document intelligence",
    teaser: "A feedback-aware parsing system for structured resume extraction across PDF and DOCX inputs.",
    problem: "Resume data arrives in inconsistent formats, which makes downstream screening and review slow and error-prone.",
    approach: "I built a LangChain and LangGraph workflow that coordinates specialized agents for extraction, validation, and human feedback while LangSmith traces the decision path.",
    outcome: "The result is a resume parsing flow that turns unstructured files into traceable, review-ready structured profiles and makes accuracy tuning visible rather than opaque.",
    technologies: ["LangChain", "LangGraph", "LangSmith", "Python"]
  },
  {
    name: "Staffusion",
    category: "Generative AI systems",
    teaser: "An end-to-end text-to-image generation pipeline assembled from core diffusion building blocks.",
    problem: "Diffusion systems can feel like black boxes unless each modeling stage is surfaced clearly enough to inspect and reason about.",
    approach: "I implemented the pipeline with UNet, CLIP, and vision transformer components, focusing on how prompt encoding, denoising, and image decoding connect across the full generation loop.",
    outcome: "The project became a strong systems exercise in generative AI, resulting in a working pipeline that is understandable at the component level rather than only at the final output layer.",
    technologies: ["PyTorch", "Python", "Stable Diffusion"]
  },
  {
    name: "Skin Cancer Detection",
    category: "Medical imaging ML",
    teaser: "A GAN-backed data improvement workflow for more resilient medical image classification.",
    problem: "Medical imaging datasets are often limited and imbalanced, which constrains the quality of downstream detection models.",
    approach: "I used generative adversarial networks to enrich the available image set and improve the training conditions for skin cancer detection tasks.",
    outcome: "The project strengthened the dataset side of the pipeline and demonstrated how synthetic augmentation can support better readiness for clinical image classification experiments.",
    technologies: ["GANs", "Python", "Deep Learning"]
  }
] as const;

export const contactCallout =
  "If you're hiring for applied AI, exploring agentic workflows, or want to compare notes on production ML systems, email is the fastest way to reach me.";

export const contactAudiences = ["Recruiters", "Collaborators", "Hiring managers", "Peers"] as const;

export const emailAddress = "vishnusaiteja.3004@gmail.com";

export interface ProfileHandle {
  readonly platform: string;
  readonly label: string;
  readonly href: string;
}

export const profileHandles: readonly ProfileHandle[] = [
  { platform: "GitHub", label: "Vishnu-sai-teja", href: "https://github.com/Vishnu-sai-teja" },
  { platform: "LinkedIn", label: "Vishnu Sai Teja Nag", href: "https://www.linkedin.com/in/vishnu-sai-teja-nag" },
  { platform: "Kaggle", label: "Vishnu Sai Teja N", href: "https://www.kaggle.com/vishnusaitejan" }
];

/**
 * Filters the featured projects page so visitors can quickly focus on a subset
 * of work by matching against the project name, category, summary, or stack.
 */
export function filterProjects(projects: readonly ProjectEntry[], query: string): readonly ProjectEntry[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return projects;
  }

  return projects.filter((project) => {
    const searchableContent = [
      project.name,
      project.category,
      project.teaser,
      project.problem,
      project.approach,
      project.outcome,
      ...project.technologies
    ]
      .join(" ")
      .toLowerCase();

    return searchableContent.includes(normalizedQuery);
  });
}
