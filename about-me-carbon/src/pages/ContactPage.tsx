import Box from 'carbon-react/lib/components/box'
import Typography from 'carbon-react/lib/components/typography'
import styled from 'styled-components'
import { PageOverline } from '../components/styled'

const ContactLink = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  text-decoration: none;
  color: #003349;
  font-size: 15px;
  font-weight: 500;
  transition: box-shadow 0.15s, border-color 0.15s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    border-color: #0077C8;
    color: #0077C8;
  }

  &:focus-visible {
    outline: 2px solid #0077C8;
    outline-offset: 2px;
  }
`

const IconSpan = styled.span`
  font-size: 20px;
  flex-shrink: 0;
`

const IntroText = styled.div`
  max-width: 520px;
`

const ContactMetaLabel = styled.span`
  display: block;
  font-size: 12px;
  color: #737373;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 2px;
`

const ContactMetaValue = styled.strong`
  display: block;
  font-weight: 600;
  color: inherit;
`

const FooterNote = styled.div`
  margin-top: 48px;
  padding-top: 40px;
  border-top: 1px solid #e8e8e8;
`

const CONTACT_LINKS = [
  {
    label: 'Email',
    value: 'vishnusaiteja.3004@gmail.com',
    href: 'mailto:vishnusaiteja.3004@gmail.com',
    icon: '✉️',
  },
  {
    label: 'GitHub',
    value: 'Vishnu-sai-teja',
    href: 'https://github.com/Vishnu-sai-teja',
    icon: '⌨️',
  },
  {
    label: 'LinkedIn',
    value: 'Vishnu Sai Teja Nag',
    href: 'https://www.linkedin.com/in/vishnu-sai-teja-nag',
    icon: '💼',
  },
  {
    label: 'Kaggle',
    value: 'Vishnu Sai Teja N',
    href: 'https://www.kaggle.com/vishnusaitejan',
    icon: '📊',
  },
]

function ContactPage() {
  return (
    <Box py={6} px={3}>
      <Box maxWidth="720px" mx="auto">
        <PageOverline>Contact</PageOverline>
        <Typography variant="h1" mb={3}>
          Get in touch
        </Typography>
        <IntroText>
          <Typography variant="p" color="blackOpacity65" mb={2}>
            I'm open to conversations about AI engineering roles, collaboration on interesting problems, or just connecting with people working on similar things.
          </Typography>
          <Typography variant="p" color="blackOpacity65" mb={6}>
            Email is the most direct route. LinkedIn and GitHub are also good if you&apos;re already there.
          </Typography>
        </IntroText>

        <Box display="flex" flexDirection="column" gap={3}>
          {CONTACT_LINKS.map((link) => (
            <ContactLink
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              aria-label={`${link.label}: ${link.value}`}
            >
              <IconSpan aria-hidden="true">{link.icon}</IconSpan>
              <Box flex="1">
                <ContactMetaLabel>{link.label}</ContactMetaLabel>
                <ContactMetaValue>{link.value}</ContactMetaValue>
              </Box>
            </ContactLink>
          ))}
        </Box>

        <FooterNote>
          <Typography variant="p" color="blackOpacity55">
            Based in Bangalore, India. Currently working at SAGE as a Graduate AI Engineer. Open to opportunities globally.
          </Typography>
        </FooterNote>
      </Box>
    </Box>
  )
}

export default ContactPage
