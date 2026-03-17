import { ArrowRight, Email } from '@carbon/icons-react'
import { Button, Column, Grid, Tag, Tile } from '@carbon/react'

import type { NavigationSection } from '../content/profile'
import { buildSectionHref } from '../utils/profile'

interface HeroSectionProps {
  readonly name: string
  readonly role: string
  readonly organization: string
  readonly thesis: string
  readonly summary: string
  readonly focusAreas: readonly string[]
  readonly orientationNotes: readonly string[]
  readonly navigationSections: readonly NavigationSection[]
}

/**
 * Establishes Vishnu's identity, thesis, and reading path so visitors can get
 * an immediate sense of role, focus, and how the rest of the page is organized.
 */
export function HeroSection({
  name,
  role,
  organization,
  thesis,
  summary,
  focusAreas,
  orientationNotes,
  navigationSections,
}: HeroSectionProps) {
  return (
    <section className="hero-section">
      <Grid fullWidth className="site-grid">
        <Column sm={4} md={5} lg={10}>
          <div className="hero-copy">
            <p className="cds--label-01 section-eyebrow">{role} at {organization}</p>
            <h1 className="cds--productive-heading-07 hero-title">{name}</h1>
            <p className="cds--productive-heading-03 hero-thesis">{thesis}</p>
            <p className="cds--body-long-02 hero-summary">{summary}</p>
            <div className="hero-actions">
              <Button href={buildSectionHref('experience')} renderIcon={ArrowRight}>
                View experience
              </Button>
              <Button
                href={buildSectionHref('contact')}
                kind="tertiary"
                renderIcon={Email}
              >
                Contact Vishnu
              </Button>
            </div>
            <div className="hero-tags" aria-label="Core focus areas">
              {focusAreas.map((focusArea) => (
                <Tag key={focusArea} type="cyan">
                  {focusArea}
                </Tag>
              ))}
            </div>
          </div>
        </Column>
        <Column sm={4} md={3} lg={6}>
          <Tile className="orientation-tile">
            <p className="cds--label-01 section-eyebrow">How this page works</p>
            <h2 className="cds--productive-heading-03 orientation-title">
              A concise profile with enough depth to be useful.
            </h2>
            <div className="orientation-notes">
              {orientationNotes.map((note) => (
                <p key={note} className="cds--body-long-01 orientation-note">
                  {note}
                </p>
              ))}
            </div>
            <p className="cds--helper-text-01 orientation-footer">
              Sections: {navigationSections.map((section) => section.label).join(' • ')}
            </p>
          </Tile>
        </Column>
      </Grid>
    </section>
  )
}
