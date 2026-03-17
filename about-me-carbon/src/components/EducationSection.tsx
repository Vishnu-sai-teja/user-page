import { Column, Grid, Tile } from '@carbon/react'

import type { EducationEntry } from '../content/profile'
import { SectionIntro } from './SectionIntro'

interface EducationSectionProps {
  readonly education: readonly EducationEntry[]
}

/**
 * Highlights the academic foundation behind the engineering profile without
 * turning the page into a full resume transcript.
 */
export function EducationSection({ education }: EducationSectionProps) {
  return (
    <section id="education" className="page-section">
      <Grid fullWidth className="site-grid">
        <Column sm={4} md={8} lg={16}>
          <SectionIntro
            eyebrow="Education"
            title="Formal grounding in computer science"
            summary="The academic path pairs a strong engineering foundation with the applied ML work that followed in internships and full-time roles."
          />
        </Column>
        {education.map((educationEntry) => (
          <Column key={educationEntry.institution} sm={4} md={4} lg={8}>
            <Tile className="content-tile education-tile">
              <p className="cds--label-01 section-eyebrow">{educationEntry.period}</p>
              <h3 className="cds--productive-heading-03 card-title">
                {educationEntry.institution}
              </h3>
              <p className="cds--body-long-01 card-summary">{educationEntry.credential}</p>
              <p className="cds--body-long-01 card-summary">{educationEntry.location}</p>
              <p className="cds--body-long-01 card-summary">{educationEntry.detail}</p>
            </Tile>
          </Column>
        ))}
      </Grid>
    </section>
  )
}
