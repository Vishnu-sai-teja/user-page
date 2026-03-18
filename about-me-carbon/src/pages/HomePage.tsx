import { useNavigate } from 'react-router-dom'
import Box from 'carbon-react/lib/components/box'
import Typography from 'carbon-react/lib/components/typography'
import styled from 'styled-components'
import { AutoGrid } from '../components/styled'

const HeroSection = styled.div`
  background: linear-gradient(135deg, #003349 0%, #004B87 50%, #0077C8 100%);
  color: white;
  padding: 80px 24px;
  min-height: 340px;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    padding: 56px 16px;
    min-height: 280px;
  }
`

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`

const HeroOverline = styled.p`
  color: rgba(255,255,255,0.7);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0 0 12px;
`

const HeroHeading = styled.h1`
  color: white;
  font-size: clamp(32px, 5vw, 52px);
  font-weight: 700;
  line-height: 1.15;
  margin: 0 0 16px;
`

const HeroLead = styled.p`
  color: rgba(255,255,255,0.85);
  font-size: 18px;
  line-height: 1.5;
  margin: 0 0 32px;
`

const HeroExplainerOverline = styled.p`
  color: rgba(255,255,255,0.6);
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0 0 16px;
`

const HeroStreamLabel = styled.p`
  color: rgba(255,255,255,0.9);
  font-weight: 600;
  font-size: 14px;
  margin: 0 0 4px;
`

const HeroStreamDesc = styled.p`
  color: rgba(255,255,255,0.65);
  font-size: 13px;
  margin: 0;
  line-height: 1.5;
`

const HeroCTAPrimary = styled.button`
  padding: 10px 24px;
  background: white;
  color: #003349;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.15s;

  &:hover { background: #f0f0f0; }
  &:focus-visible { outline: 2px solid white; outline-offset: 2px; }
`

const HeroCTASecondary = styled.button`
  padding: 10px 24px;
  background: transparent;
  color: white;
  border: 1.5px solid rgba(255,255,255,0.6);
  border-radius: 4px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: border-color 0.15s;

  &:hover { border-color: white; }
  &:focus-visible { outline: 2px solid white; outline-offset: 2px; }
`

const NavCard = styled.a`
  display: block;
  padding: 20px 24px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  text-decoration: none;
  background: white;
  transition: box-shadow 0.15s, border-color 0.15s;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    border-color: #0077C8;
  }

  &:focus-visible {
    outline: 2px solid #0077C8;
    outline-offset: 2px;
  }
`

const CONTENT_STREAMS = [
  {
    path: '/about',
    label: 'About',
    description: 'Who I am, where I come from, and what drives my work in AI engineering.',
  },
  {
    path: '/experience',
    label: 'Experience',
    description: 'Career timeline at SAGE, PIBIT, and AiDash, plus my technical skills.',
  },
  {
    path: '/projects',
    label: 'Projects',
    description: 'Hands-on AI builds: multi-agent systems, stable diffusion, healthcare AI.',
  },
  {
    path: '/recommendations',
    label: 'Recommendations',
    description: 'Books and films I return to — a window into how I think and what I value.',
  },
]

function HomePage() {
  const navigate = useNavigate()

  return (
    <div>
      <HeroSection>
        <HeroGrid>
          {/* Identity block */}
          <div>
            <HeroOverline>Graduate AI Engineer</HeroOverline>
            <HeroHeading>
              Vishnu Sai Teja<br />Nagabandi
            </HeroHeading>
            <HeroLead>
              Building AI systems at SAGE — agents, RAG pipelines, voice AI, and document intelligence.
            </HeroLead>
            <Box display="flex" gap={2} flexWrap="wrap">
              <HeroCTAPrimary onClick={() => navigate('/about')}>
                Read more about me
              </HeroCTAPrimary>
              <HeroCTASecondary onClick={() => navigate('/contact')}>
                Get in touch
              </HeroCTASecondary>
            </Box>
          </div>

          {/* How this place works */}
          <div>
            <HeroExplainerOverline>How this place works</HeroExplainerOverline>
            <Box display="flex" flexDirection="column" gap={3}>
              {CONTENT_STREAMS.map((stream) => (
                <div key={stream.path}>
                  <HeroStreamLabel>{stream.label}</HeroStreamLabel>
                  <HeroStreamDesc>{stream.description}</HeroStreamDesc>
                </div>
              ))}
            </Box>
          </div>
        </HeroGrid>
      </HeroSection>

      <Box py={6} px={3} backgroundColor="--colorsUtilityMajor025">
        <Box maxWidth="1280px" mx="auto">
          <Typography variant="h3" mb={4}>
            Explore
          </Typography>
          <AutoGrid>
            {CONTENT_STREAMS.map((stream) => (
              <NavCard
                key={stream.path}
                href={stream.path}
                onClick={(e) => {
                  e.preventDefault()
                  navigate(stream.path)
                }}
                aria-label={`Navigate to ${stream.label} page`}
              >
                <Typography variant="h4" mb={1}>
                  {stream.label}
                </Typography>
                <Typography variant="p" color="blackOpacity65">
                  {stream.description}
                </Typography>
              </NavCard>
            ))}
          </AutoGrid>
        </Box>
      </Box>
    </div>
  )
}

export default HomePage
