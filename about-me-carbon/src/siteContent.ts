export interface ContactChannel {
  readonly external: boolean
  readonly href?: string
  readonly label: string
  readonly value: string
}

export interface ExperienceEntry {
  readonly company: string
  readonly highlights: readonly string[]
  readonly location: string
  readonly period: string
  readonly role: string
  readonly summary: string
}

export interface SkillGroup {
  readonly items: readonly string[]
  readonly label: string
}

export interface EducationEntry {
  readonly credential: string
  readonly detail: string
  readonly institution: string
  readonly period: string
}

export interface ProjectEntry {
  readonly evidence: readonly string[]
  readonly focus: string
  readonly id: string
  readonly stage: 'academic' | 'production' | 'research'
  readonly summary: string
  readonly technologies: readonly string[]
  readonly title: string
  readonly year: string
}

interface KnowledgeBase {
  readonly id: string
  readonly summary: string
  readonly tags: readonly string[]
  readonly title: string
}

export interface WritingEntry extends KnowledgeBase {
  readonly date: string
  readonly kind: 'writing'
}

export interface BookmarkEntry extends KnowledgeBase {
  readonly href: string
  readonly kind: 'bookmark'
  readonly source: string
}

export interface RecommendationEntry extends KnowledgeBase {
  readonly creator: string
  readonly href: string
  readonly kind: 'recommendation'
}

export type KnowledgeEntry = WritingEntry | BookmarkEntry | RecommendationEntry

/**
 * The one-line professional positioning that anchors the home page and sets the
 * tone for the rest of the site.
 */
export const siteThesis =
  'I build grounded AI systems for voice, documents, and multi-agent workflows.'

/**
 * Compact focus areas used in the home-page hero to give a recruiter or
 * collaborator an immediate scan of Vishnu\'s working surface.
 */
export const heroHighlights = [
  'multi-agent systems',
  'voice AI',
  'document intelligence',
  'computer vision',
  'ML infrastructure',
] as const

/**
 * A concise principle set used to turn the summary page into an authored point
 * of view instead of a simple chronology.
 */
export const narrativePrinciples = [
  {
    kicker: 'systems thinking',
    title: 'Ground models in the tools people already trust',
    description:
      'I care about agents and AI interfaces only when they can reach the systems of record cleanly and return context that helps someone act.',
  },
  {
    kicker: 'engineering bar',
    title: 'Latency, observability, and failure modes matter',
    description:
      'Production AI is not just model quality. It is response time, monitoring, debugging clarity, and predictable recovery when a dependency fails.',
  },
  {
    kicker: 'craft',
    title: 'Make experimentation legible to the team',
    description:
      'I prefer systems where training pipelines, evaluations, and behavior changes are easy to inspect and improve rather than hidden behind mystery knobs.',
  },
] as const

/**
 * Experience records ordered from current to past roles so the accordion reads
 * like a coherent professional arc.
 */
export const experienceEntries: readonly ExperienceEntry[] = [
  {
    company: 'SAGE',
    role: 'Graduate AI Engineer',
    period: 'October 2025 - Present',
    location: 'Bangalore, India',
    summary:
      'Building production-oriented agent and voice systems that connect language models to enterprise context instead of isolating them as demo-only interfaces.',
    highlights: [
      'Designed and productionized ReWOO-based agents integrating MCP server tools with ERP systems and RAG pipelines.',
      'Built low-latency voice agents for AR professionals, enabling real-time CRM and ERP context during live calls.',
    ],
  },
  {
    company: 'PIBIT',
    role: 'AI/ML Engineer',
    period: 'July 2025 - October 2025',
    location: 'Bangalore, India',
    summary:
      'Worked on document intelligence systems where gains had to show up in recall, mapping accuracy, and practical extraction quality.',
    highlights: [
      'Developed a layout model that improved layout recall by 28% over earlier models.',
      'Built a YOLO-based OCR system for worker compensation and auto loss run document processing.',
      'Implemented clustering-based algorithms that improved YOLO mapping accuracy by 6%.',
    ],
  },
  {
    company: 'PIBIT',
    role: 'AI/ML Intern',
    period: 'October 2024 - June 2025',
    location: 'Bangalore, India',
    summary:
      'Focused on the infrastructure side of machine learning work: training workflows, deployment plumbing, and operational visibility.',
    highlights: [
      'Designed and deployed Azure-based training pipelines with GitHub workflow integration.',
      'Built real-time model performance tracking using FastAPI and SQLAlchemy.',
    ],
  },
  {
    company: 'AiDash',
    role: 'Data Science Intern',
    period: 'April 2024 - October 2024',
    location: 'Bangalore, India',
    summary:
      'Built computer-vision workflows for geospatial asset understanding from large image streams.',
    highlights: [
      'Built an end-to-end asset geotagging pipeline from street-view imagery using object detection, depth and height estimation, and asynchronous parallel processing.',
    ],
  },
] as const

/**
 * Skills are grouped by domain so the page can present technical breadth
 * without flattening everything into one undifferentiated tag cloud.
 */
export const skillGroups: readonly SkillGroup[] = [
  {
    label: 'languages',
    items: ['Python', 'C++', 'PostgreSQL', 'MySQL', 'Shell'],
  },
  {
    label: 'frameworks',
    items: ['PyTorch', 'LangChain', 'LangGraph', 'FastAPI', 'Flask', 'Docker'],
  },
  {
    label: 'libraries',
    items: ['NumPy', 'Pandas', 'Scikit-Learn', 'Matplotlib', 'NLTK', 'SpaCy', 'SQLAlchemy'],
  },
  {
    label: 'platforms and languages',
    items: ['AWS', 'Azure', 'English', 'Hindi', 'Telugu', 'German (Novice)'],
  },
] as const

/**
 * Academic records provide grounding without turning the page into a resume-style
 * educational appendix.
 */
export const educationEntries: readonly EducationEntry[] = [
  {
    institution: 'IIIT Nagpur',
    credential: 'B.Tech in Computer Science',
    detail: 'GPA: 8.55/10, graduated May 2025.',
    period: '2021 - 2025',
  },
  {
    institution: 'Sri Chaithanya, Hyderabad',
    credential: 'Senior Secondary Education',
    detail: '98.2%, completed in 2021.',
    period: '2019 - 2021',
  },
] as const

/**
 * Projects surfaced on the dedicated index. Each record emphasizes why the work
 * matters, not just what framework names were involved.
 */
export const projectEntries: readonly ProjectEntry[] = [
  {
    id: 'resume-parser',
    title: 'Multi-Agent Resume Parser',
    year: '2025',
    stage: 'production',
    focus: 'Agent orchestration for document understanding and feedback loops',
    summary:
      'A multi-agent system for processing resumes from PDF and DOCX formats while keeping user feedback inside the loop for continuous accuracy improvements.',
    technologies: ['LangChain', 'LangGraph', 'LangSmith', 'Python'],
    evidence: [
      'Structured the workflow as cooperating agents instead of a single extraction pass.',
      'Added feedback loops so corrections could improve future parsing quality.',
      'Used LangGraph and LangSmith to trace behavior across AI interactions.',
    ],
  },
  {
    id: 'staffusion',
    title: 'Staffusion',
    year: '2024',
    stage: 'research',
    focus: 'Generative image systems built from core model components',
    summary:
      'An end-to-end stable diffusion pipeline that connected UNet, CLIP, and vision-transformer style components into a coherent text-to-image stack.',
    technologies: ['PyTorch', 'Python', 'Diffusion Models'],
    evidence: [
      'Implemented the full text-to-image path instead of treating the model as a black-box API.',
      'Integrated UNet, CLIP, and transformer-based components into a single pipeline.',
    ],
  },
  {
    id: 'skin-cancer-detection',
    title: 'Skin Cancer Detection',
    year: '2024',
    stage: 'academic',
    focus: 'Synthetic data support for medical imaging detection',
    summary:
      'A GAN-based approach that improved the effective medical-imaging dataset and supported better downstream detection performance.',
    technologies: ['GANs', 'Python', 'Medical Imaging'],
    evidence: [
      'Used generative augmentation to strengthen a constrained dataset.',
      'Focused on data quality as a lever for improving detection outcomes.',
    ],
  },
] as const

/**
 * Notes content preserves the editorial inputs-versus-outputs distinction the
 * site model calls for, while staying grounded in Vishnu\'s real working themes.
 */
export const knowledgeEntries: readonly KnowledgeEntry[] = [
  {
    kind: 'writing',
    id: 'grounded-agents',
    title: 'Grounded agents are mostly a systems problem',
    date: 'March 2026',
    summary:
      'A short note on why the real challenge in enterprise agents is usually tool design, retrieval quality, and observability rather than prompting alone.',
    tags: ['agents', 'MCP', 'RAG'],
  },
  {
    kind: 'writing',
    id: 'voice-latency',
    title: 'Voice AI starts with latency budgets',
    date: 'March 2026',
    summary:
      'A field note on treating response time as a product constraint when building live voice systems for professional workflows.',
    tags: ['voice AI', 'latency', 'product'],
  },
  {
    kind: 'writing',
    id: 'document-intelligence',
    title: 'Document intelligence still breaks at the edges',
    date: 'February 2026',
    summary:
      'A note on why layout variance, OCR noise, and downstream business rules still matter more than benchmark optimism suggests.',
    tags: ['OCR', 'layout models', 'document AI'],
  },
  {
    kind: 'bookmark',
    id: 'mcp',
    title: 'Model Context Protocol',
    source: 'modelcontextprotocol.io',
    href: 'https://modelcontextprotocol.io/introduction',
    summary:
      'Useful reference for thinking about tool contracts, context transfer, and agent-to-system boundaries.',
    tags: ['protocols', 'agents'],
  },
  {
    kind: 'bookmark',
    id: 'langgraph',
    title: 'LangGraph documentation',
    source: 'langchain-ai.github.io',
    href: 'https://langchain-ai.github.io/langgraph/',
    summary:
      'A live reference for stateful agent orchestration patterns and graph-shaped control flow.',
    tags: ['agents', 'orchestration'],
  },
  {
    kind: 'bookmark',
    id: 'fastapi',
    title: 'FastAPI documentation',
    source: 'fastapi.tiangolo.com',
    href: 'https://fastapi.tiangolo.com/',
    summary:
      'Still one of the clearest references for moving Python model services into reliable APIs.',
    tags: ['backend', 'APIs'],
  },
  {
    kind: 'bookmark',
    id: 'pytorch',
    title: 'PyTorch docs',
    source: 'pytorch.org',
    href: 'https://pytorch.org/docs/stable/index.html',
    summary:
      'The place I keep returning to for model mechanics, training behavior, and debugging details.',
    tags: ['deep learning', 'training'],
  },
  {
    kind: 'recommendation',
    id: 'ddia',
    title: 'Designing Data-Intensive Applications',
    creator: 'Martin Kleppmann',
    href: 'https://dataintensive.net/',
    summary:
      'A strong systems foundation for anyone moving from model work into production architecture.',
    tags: ['systems', 'architecture'],
  },
  {
    kind: 'recommendation',
    id: 'fsdl',
    title: 'Full Stack Deep Learning',
    creator: 'Full Stack Deep Learning',
    href: 'https://fullstackdeeplearning.com/',
    summary:
      'A practical bridge between machine learning ideas and the engineering work needed to ship them well.',
    tags: ['MLOps', 'production'],
  },
  {
    kind: 'recommendation',
    id: 'illustrated-transformer',
    title: 'The Illustrated Transformer',
    creator: 'Jay Alammar',
    href: 'https://jalammar.github.io/illustrated-transformer/',
    summary:
      'Still one of the clearest starting points for explaining transformer intuition to new teammates.',
    tags: ['transformers', 'education'],
  },
] as const

/**
 * Short descriptions shown above the notes tabs so each stream has a distinct
 * editorial role instead of feeling like a generic card collection.
 */
export const noteStreamDescriptions = {
  writing:
    'Short working notes about the kinds of systems I am building and the constraints that make them interesting.',
  bookmark:
    'Live references I keep nearby while building agentic, backend, and model-serving systems.',
  recommendation:
    'Higher-conviction starting points I would hand to someone entering applied AI engineering.',
} as const

/**
 * Reachable channels prioritized for a recruiter or collaborator who wants to
 * continue the conversation without friction.
 */
export const contactChannels: readonly ContactChannel[] = [
  {
    label: 'email',
    value: 'vishnusaiteja.3004@gmail.com',
    href: 'mailto:vishnusaiteja.3004@gmail.com',
    external: false,
  },
  {
    label: 'phone',
    value: '+91 8978044062',
    href: 'tel:+918978044062',
    external: false,
  },
  {
    label: 'github',
    value: 'Vishnu-sai-teja',
    href: 'https://github.com/Vishnu-sai-teja',
    external: true,
  },
  {
    label: 'linkedin',
    value: 'Vishnu Sai Teja Nag',
    external: false,
  },
  {
    label: 'kaggle',
    value: 'Vishnu Sai Teja N',
    external: false,
  },
] as const