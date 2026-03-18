import Box from 'carbon-react/lib/components/box'
import Typography from 'carbon-react/lib/components/typography'
import styled from 'styled-components'
import { TwoColumnGrid, PageOverline } from '../components/styled'

const RoleCard = styled.div`
  padding: 28px 0;
  border-bottom: 1px solid #e8e8e8;

  &:last-child {
    border-bottom: none;
  }
`

const RoleMeta = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 24px;
  margin-bottom: 16px;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 8px;
  }
`

const DateBadge = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #0077C8;
  background: rgba(0, 119, 200, 0.08);
  padding: 3px 10px;
  border-radius: 12px;
  white-space: nowrap;
  flex-shrink: 0;
`

const BulletList = styled.ul`
  margin: 12px 0 0;
  padding-left: 20px;
  list-style: disc;
`

const BulletItem = styled.li`
  font-size: 14px;
  color: #404040;
  margin-bottom: 8px;
  line-height: 1.6;
`

const SkillPill = styled.span`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background: rgba(0, 51, 73, 0.06);
  color: #003349;
  margin: 3px;
`

const EXPERIENCE = [
  {
    company: 'SAGE',
    title: 'Graduate AI Engineer',
    duration: 'October 2025 – Present',
    location: 'Bangalore, India',
    highlights: [
      'Designed and productionized ReWOO-based agents integrating MCP server tools with ERP systems and RAG pipelines to retrieve real-time context from CRM platforms within the AR Agent workspace.',
      'Built low-latency voice agents for AR professionals, enabling real-time access to CRM and ERP context during live calls.',
    ],
  },
  {
    company: 'PIBIT',
    title: 'AI/ML Engineer',
    duration: 'July 2025 – October 2025',
    location: 'Bangalore, India',
    highlights: [
      'Developed a layout model for document and image analysis, improving layout recall by 28% over earlier models.',
      'Built a YOLO-based OCR system for worker compensation and auto loss run document processing, improving extraction accuracy.',
      'Implemented clustering-based algorithms to refine training and improve YOLO mapping accuracy by 6%.',
    ],
  },
  {
    company: 'PIBIT',
    title: 'AI/ML Intern',
    duration: 'October 2024 – June 2025',
    location: 'Bangalore, India',
    highlights: [
      'Designed and deployed Azure-based training pipelines to support model training and task creation with GitHub workflow integration.',
      'Built real-time model performance tracking using FastAPI and SQLAlchemy for continuous monitoring.',
    ],
  },
  {
    company: 'AiDash',
    title: 'Data Science Intern',
    duration: 'April 2024 – October 2024',
    location: 'Bangalore, India',
    highlights: [
      'Built an end-to-end asset geotagging pipeline from street-view imagery using object detection, depth and height estimation, and asynchronous parallel processing.',
    ],
  },
]

const SKILLS: { category: string; items: string[] }[] = [
  {
    category: 'Languages',
    items: ['Python', 'C++', 'PostgreSQL', 'MySQL', 'Shell'],
  },
  {
    category: 'Frameworks & Tools',
    items: ['PyTorch', 'LangChain', 'LangGraph', 'FastAPI', 'Flask', 'Docker'],
  },
  {
    category: 'Libraries',
    items: ['NumPy', 'Pandas', 'Scikit-Learn', 'Matplotlib', 'NLTK', 'SpaCy', 'SQLAlchemy'],
  },
  {
    category: 'Cloud',
    items: ['AWS', 'Azure'],
  },
]

function ExperiencePage() {
  return (
    <Box py={6} px={3}>
      <Box maxWidth="1280px" mx="auto">
        <Box maxWidth="720px" mb={6}>
          <PageOverline>Experience</PageOverline>
          <Typography variant="h1" mb={3}>
            Career timeline
          </Typography>
          <Typography variant="p" color="blackOpacity74">
            Four roles across three AI companies since early 2024 — from data science internships to full-stack ML engineering and production AI agents.
          </Typography>
        </Box>

        <TwoColumnGrid>
          {/* Timeline */}
          <Box>
            <Typography variant="h3" mb={4}>
              Roles
            </Typography>
            {EXPERIENCE.map((role, i) => (
              <RoleCard key={i}>
                <RoleMeta>
                  <Box flex="1" minWidth={0}>
                    <Typography variant="h4" mb={0}>
                      {role.title}
                    </Typography>
                    <Typography variant="p" color="blackOpacity65" fontWeight="500" mb={0}>
                      {role.company} · {role.location}
                    </Typography>
                  </Box>
                  <DateBadge>{role.duration}</DateBadge>
                </RoleMeta>
                <BulletList>
                  {role.highlights.map((h, j) => (
                    <BulletItem key={j}>{h}</BulletItem>
                  ))}
                </BulletList>
              </RoleCard>
            ))}
          </Box>

          {/* Skills + Education */}
          <Box>
            <Typography variant="h3" mb={4}>
              Skills
            </Typography>
            {SKILLS.map((group) => (
              <Box key={group.category} mb={4}>
                <Typography variant="segment-header-small" mb={2}>
                  {group.category}
                </Typography>
                <Box>
                  {group.items.map((item) => (
                    <SkillPill key={item}>{item}</SkillPill>
                  ))}
                </Box>
              </Box>
            ))}

            <Box mt={5}>
              <Typography variant="h3" mb={4}>
                Education
              </Typography>
              <Box mb={3}>
                <Typography variant="h4" mb={0}>
                  B.Tech in Computer Science
                </Typography>
                <Typography variant="p" color="blackOpacity65" mb={1}>
                  IIIT Nagpur · Nagpur, Maharashtra
                </Typography>
                <Typography variant="p" color="blackOpacity55">
                  Graduated May 2025 · GPA 8.55 / 10
                </Typography>
              </Box>
            </Box>
          </Box>
        </TwoColumnGrid>
      </Box>

    </Box>
  )
}

export default ExperiencePage
