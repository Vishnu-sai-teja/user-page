import Box from 'carbon-react/lib/components/box'
import Typography from 'carbon-react/lib/components/typography'
import styled from 'styled-components'
import { PageOverline } from '../components/styled'

const ProjectCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 28px;
  background: white;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: box-shadow 0.15s, border-color 0.15s;

  &:hover {
    box-shadow: 0 4px 16px rgba(0,0,0,0.08);
    border-color: #0077C8;
  }
`

const TechPill = styled.span`
  display: inline-block;
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  background: rgba(0, 119, 200, 0.08);
  color: #0077C8;
  margin: 2px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const ProjectList = styled.ul`
  margin: 8px 0 0;
  padding-left: 20px;
  list-style: disc;
`

const ProjectListItem = styled.li`
  margin-bottom: 6px;
  line-height: 1.6;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.74);
`

const PROJECTS = [
  {
    name: 'Multi-Agent Resume Parser',
    technologies: ['LangChain', 'LangGraph', 'LangSmith', 'Python'],
    overview:
      'A multi-agent system to process resumes and extract structured information from PDF and DOCX files with real-time user feedback loops.',
    highlights: [
      'Built multi-agent orchestration with LangGraph for parallel resume processing.',
      'Implemented user feedback loops enabling real-time accuracy improvements.',
      'Used LangSmith to track and debug AI interactions across agent hops.',
    ],
    link: null,
  },
  {
    name: 'Staffusion',
    technologies: ['PyTorch', 'Python'],
    overview:
      'An end-to-end stable diffusion pipeline for text-to-image generation, integrating UNet, CLIP, and Vision Transformers.',
    highlights: [
      'Implemented a complete stable diffusion pipeline from noise schedule to decoder output.',
      'Integrated CLIP for text encoding and Vision Transformers for image context.',
      'Achieved controllable generation quality across a range of prompt complexities.',
    ],
    link: 'https://github.com/Vishnu-sai-teja/staffusion',
  },
  {
    name: 'Skin Cancer Detection',
    technologies: ['GANs', 'Python'],
    overview:
      'A Generative Adversarial Network trained to augment medical imaging datasets and improve skin cancer detection accuracy.',
    highlights: [
      'Developed a GAN architecture to synthesise realistic dermoscopy images for data augmentation.',
      'Improved downstream classifier accuracy by training on the augmented dataset.',
      'Applied careful evaluation to avoid mode collapse and maintain diversity in generated samples.',
    ],
    link: null,
  },
]

function ProjectsPage() {
  return (
    <Box py={6} px={3}>
      <Box maxWidth="1280px" mx="auto">
        <Box maxWidth="640px" mb={6}>
          <PageOverline>Projects</PageOverline>
          <Typography variant="h1" mb={3}>
            What I've built
          </Typography>
          <Typography variant="p" color="blackOpacity74">
            Three independent AI projects spanning multi-agent systems, generative models, and medical imaging. Each one pushed a different part of the machine learning stack.
          </Typography>
        </Box>

        <ProjectGrid>
          {PROJECTS.map((project) => (
            <ProjectCard key={project.name} role="article" aria-label={project.name}>
              <div>
                <Typography variant="h3" mb={2}>
                  {project.name}
                </Typography>
                <Box mb={2}>
                  {project.technologies.map((tech) => (
                    <TechPill key={tech}>{tech}</TechPill>
                  ))}
                </Box>
              </div>

              <Typography variant="p" color="blackOpacity74">
                {project.overview}
              </Typography>

              <ProjectList>
                {project.highlights.map((h, i) => (
                  <ProjectListItem key={i}>{h}</ProjectListItem>
                ))}
              </ProjectList>

              {project.link && (
                <Box mt={2}>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '14px', color: '#0077C8', textDecoration: 'underline' }}
                  >
                    View on GitHub →
                  </a>
                </Box>
              )}
            </ProjectCard>
          ))}
        </ProjectGrid>
      </Box>
    </Box>
  )
}

export default ProjectsPage
