export type SectionId =
  | 'summary'
  | 'experience'
  | 'skills'
  | 'projects'
  | 'education'
  | 'contact'

export interface NavigationSection {
  readonly id: SectionId
  readonly label: string
}

export interface ExperienceEntry {
  readonly company: string
  readonly location: string
  readonly period: string
  readonly role: string
  readonly summary: string
  readonly highlights: readonly string[]
}

export interface SkillGroup {
  readonly label: string
  readonly items: readonly string[]
}

export interface ProjectEntry {
  readonly title: string
  readonly year: string
  readonly summary: string
  readonly technologies: readonly string[]
  readonly highlights: readonly string[]
}

export interface EducationEntry {
  readonly institution: string
  readonly location: string
  readonly credential: string
  readonly period: string
  readonly detail: string
}

export interface ContactChannel {
  readonly label: string
  readonly href: string
  readonly value: string
}

export interface ProfilePageData {
  readonly name: string
  readonly role: string
  readonly organization: string
  readonly heroThesis: string
  readonly heroSummary: string
  readonly focusAreas: readonly string[]
  readonly orientationNotes: readonly string[]
  readonly summaryParagraphs: readonly string[]
  readonly directionPoints: readonly string[]
  readonly navigationSections: readonly NavigationSection[]
  readonly experience: readonly ExperienceEntry[]
  readonly skillGroups: readonly SkillGroup[]
  readonly projects: readonly ProjectEntry[]
  readonly education: readonly EducationEntry[]
  readonly contactChannels: readonly ContactChannel[]
}

/**
 * Captures the content model that drives the full About Me page so the UI can
 * stay declarative and tightly aligned with Vishnu's approved profile data.
 */
export const profilePageData: ProfilePageData = {
  name: 'Vishnu Sai Teja Nagabandi',
  role: 'Graduate AI Engineer',
  organization: 'SAGE',
  heroThesis:
    'Graduate AI Engineer building grounded AI systems across multi-agent workflows, voice AI, and document intelligence.',
  heroSummary:
    'I work on AI systems that have to hold up in production, where low latency, real business context, and reliable orchestration matter as much as model quality.',
  focusAreas: [
    'Multi-agent systems',
    'Voice AI',
    'Document intelligence',
    'Computer vision',
    'ML infrastructure',
  ],
  orientationNotes: [
    'Summary explains the background, domains, and current direction shaping my work in AI engineering.',
    'Experience shows the production and research contexts where I have built agents, OCR systems, and ML pipelines.',
    'Skills and projects surface the tools and builds that best represent how I approach applied AI work.',
    'Education and contact make it easy to place the academic foundation and continue the conversation quickly.',
  ],
  summaryParagraphs: [
    'I am an AI engineer with hands-on experience in multi-agent systems, voice AI, document intelligence, computer vision, and machine learning infrastructure. My work has centered on turning model capability into systems that teams can actually depend on.',
    'At SAGE, I currently focus on production-ready AI experiences that pull real-time business context into agentic and voice workflows. That means thinking beyond prompts alone and caring about orchestration, retrieval quality, latency, monitoring, and the software boundaries around models.',
    'Before SAGE, I worked at PIBIT and AiDash on layout analysis, OCR pipelines, training workflows, and geospatial computer vision. Across those environments, the consistent thread has been practical AI: measurable improvements, maintainable systems, and engineering choices that survive real usage.',
  ],
  directionPoints: [
    'Building AI systems that connect models to CRM and ERP context instead of keeping intelligence isolated.',
    'Working on real-time agent and voice experiences where latency and reliability are core product concerns.',
    'Growing deeper in the engineering layers around retrieval, evaluation, infrastructure, and observable ML workflows.',
  ],
  navigationSections: [
    { id: 'summary', label: 'Summary' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ],
  experience: [
    {
      company: 'SAGE',
      role: 'Graduate AI Engineer',
      period: 'October 2025 - Present',
      location: 'Bangalore, India',
      summary:
        'Designing production-oriented AI systems that merge agent orchestration, voice interaction, and live enterprise context into usable workflows.',
      highlights: [
        'Designed and productionized ReWOO-based agents integrating MCP server tools with ERP systems and RAG pipelines to retrieve real-time CRM context.',
        'Built low-latency voice agents for AR professionals, enabling live access to CRM and ERP context during calls.',
      ],
    },
    {
      company: 'PIBIT',
      role: 'AI/ML Engineer',
      period: 'July 2025 - October 2025',
      location: 'Bangalore, India',
      summary:
        'Worked on document and image understanding systems with emphasis on measurable extraction quality and model performance gains.',
      highlights: [
        'Developed a layout model for document and image analysis that improved layout recall by 28% over earlier models.',
        'Built a YOLO-based OCR system for worker compensation and auto loss run document processing, improving extraction accuracy.',
        'Implemented clustering-based refinement algorithms that improved YOLO mapping accuracy by 6%.',
      ],
    },
    {
      company: 'PIBIT',
      role: 'AI/ML Intern',
      period: 'October 2024 - June 2025',
      location: 'Bangalore, India',
      summary:
        'Focused on ML operations, training workflows, and backend monitoring to make model development easier to scale and observe.',
      highlights: [
        'Designed and deployed Azure-based training pipelines to support model training and task creation with GitHub workflow integration.',
        'Built real-time model performance tracking using FastAPI and SQLAlchemy for continuous monitoring.',
      ],
    },
    {
      company: 'AiDash',
      role: 'Data Science Intern',
      period: 'April 2024 - October 2024',
      location: 'Bangalore, India',
      summary:
        'Built computer vision infrastructure for asset understanding from large sets of street-view imagery.',
      highlights: [
        'Built an end-to-end asset geotagging pipeline from street-view imagery using object detection, depth and height estimation, and asynchronous parallel processing.',
      ],
    },
  ],
  skillGroups: [
    {
      label: 'Languages',
      items: ['Python', 'C++', 'PostgreSQL', 'MySQL', 'Shell'],
    },
    {
      label: 'Frameworks',
      items: ['LangChain', 'LangGraph', 'FastAPI', 'Flask', 'PyTorch', 'Docker'],
    },
    {
      label: 'Cloud',
      items: ['AWS', 'Azure'],
    },
    {
      label: 'Libraries',
      items: ['NumPy', 'Pandas', 'Scikit-Learn', 'Matplotlib', 'NLTK', 'SpaCy', 'SQLAlchemy'],
    },
  ],
  projects: [
    {
      title: 'Multi-Agent Resume Parser',
      year: '2025',
      summary:
        'A multi-agent resume parsing system for PDF and DOCX files that combines extraction, orchestration, and feedback loops to improve output quality over time.',
      technologies: ['LangChain', 'LangGraph', 'LangSmith', 'Python'],
      highlights: [
        'Built cooperating agents to process resumes and extract structured information from multiple document formats.',
        'Introduced user feedback loops to support real-time accuracy improvements.',
        'Used LangGraph and LangSmith to trace and inspect agent behavior.',
      ],
    },
    {
      title: 'Staffusion',
      year: '2024',
      summary:
        'An end-to-end text-to-image generation pipeline built around core stable diffusion components instead of treating generation as a black-box service.',
      technologies: ['PyTorch', 'Python'],
      highlights: [
        'Implemented a full stable diffusion workflow for text-to-image generation.',
        'Integrated UNet, CLIP, and vision-transformer style components into one coherent system.',
      ],
    },
    {
      title: 'Skin Cancer Detection',
      year: '2024',
      summary:
        'A GAN-driven medical imaging project aimed at improving dataset quality and downstream detection accuracy for skin cancer classification.',
      technologies: ['GANs'],
      highlights: [
        'Developed a generative adversarial approach to strengthen the medical imaging dataset.',
        'Used synthetic data support to improve the reliability of detection outcomes.',
      ],
    },
  ],
  education: [
    {
      institution: 'Indian Institute of Information Technology, Nagpur',
      location: 'Nagpur, Maharashtra',
      credential: 'B.Tech in Computer Science',
      period: 'Graduated May 2025',
      detail: 'GPA: 8.55/10',
    },
    {
      institution: 'Sri Chaithanya',
      location: 'Hyderabad, Telangana',
      credential: 'Senior Secondary Education',
      period: 'Graduated 2021',
      detail: 'Score: 98.2%',
    },
  ],
  contactChannels: [
    {
      label: 'Email',
      value: 'vishnusaiteja.3004@gmail.com',
      href: 'mailto:vishnusaiteja.3004@gmail.com',
    },
    {
      label: 'Phone',
      value: '+91 8978044062',
      href: 'tel:+918978044062',
    },
    {
      label: 'GitHub',
      value: 'github.com/Vishnu-sai-teja',
      href: 'https://github.com/Vishnu-sai-teja',
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/vishnu-sai-teja-nag',
      href: 'https://www.linkedin.com/in/vishnu-sai-teja-nag',
    },
    {
      label: 'Kaggle',
      value: 'kaggle.com/vishnusaitejan',
      href: 'https://www.kaggle.com/vishnusaitejan',
    },
  ],
}
