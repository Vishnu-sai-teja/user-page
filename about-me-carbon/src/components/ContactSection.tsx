import { Email, Launch, LogoGithub, LogoLinkedin } from '@carbon/icons-react'
import { Button, Column, Grid, Link, Tile } from '@carbon/react'

import type { ContactChannel } from '../content/profile'
import { SectionIntro } from './SectionIntro'

interface ContactSectionProps {
  readonly contactChannels: readonly ContactChannel[]
}

/**
 * Makes follow-up frictionless by exposing the clearest communication channels
 * as both direct CTAs and a compact reference list.
 */
export function ContactSection({ contactChannels }: ContactSectionProps) {
  return (
    <section id="contact" className="page-section page-section--last">
      <Grid fullWidth className="site-grid">
        <Column sm={4} md={8} lg={16}>
          <SectionIntro
            eyebrow="Contact"
            title="Reach out if the work overlaps"
            summary="Recruiters, collaborators, and peers should be able to move from first impression to conversation without hunting for the right link."
          />
        </Column>
        <Column sm={4} md={4} lg={8}>
          <Tile className="content-tile contact-tile">
            <h3 className="cds--productive-heading-03 card-title">Start with the direct channels</h3>
            <p className="cds--body-long-01 card-summary">
              Email is the fastest route for hiring and collaboration. GitHub and LinkedIn make it easier to scan work context and continue the conversation.
            </p>
            <div className="hero-actions hero-actions--stacked">
              <Button href="mailto:vishnusaiteja.3004@gmail.com" renderIcon={Email}>
                Email Vishnu
              </Button>
              <Button
                href="https://github.com/Vishnu-sai-teja"
                kind="secondary"
                renderIcon={LogoGithub}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </Button>
              <Button
                href="https://www.linkedin.com/in/vishnu-sai-teja-nag"
                kind="tertiary"
                renderIcon={LogoLinkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </Button>
            </div>
          </Tile>
        </Column>
        <Column sm={4} md={4} lg={8}>
          <Tile className="content-tile contact-tile">
            <h3 className="cds--productive-heading-03 card-title">All links in one place</h3>
            <div className="contact-list">
              {contactChannels.map((channel) => (
                <div key={channel.label} className="contact-row">
                  <p className="cds--label-01 section-eyebrow">{channel.label}</p>
                  <Link
                    href={channel.href}
                    target={channel.href.startsWith('http') ? '_blank' : undefined}
                    rel={channel.href.startsWith('http') ? 'noreferrer' : undefined}
                    renderIcon={channel.href.startsWith('http') ? Launch : undefined}
                  >
                    {channel.value}
                  </Link>
                </div>
              ))}
            </div>
          </Tile>
        </Column>
      </Grid>
    </section>
  )
}
