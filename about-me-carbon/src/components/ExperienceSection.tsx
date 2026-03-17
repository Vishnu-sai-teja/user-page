import { Column, Grid, Tile } from '@carbon/react'

import type { ExperienceEntry } from '../content/profile'
import { buildExperienceMeta } from '../utils/profile'
import { SectionIntro } from './SectionIntro'

interface ExperienceSectionProps {
  readonly experience: readonly ExperienceEntry[]
}

/**
 * Presents Vishnu's roles as compact experience cards that emphasize the work,
 * responsibilities, and measurable outcomes visitors are most likely to scan.
 */
export function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <section id="experience" className="page-section">
      <Grid fullWidth className="site-grid">
        <Column sm={4} md={8} lg={16}>
          <SectionIntro
            eyebrow="Experience"
            title="Production AI, document systems, and ML infrastructure"
            summary="Each role added a new layer: enterprise agent workflows, document intelligence, ML operations, and computer vision at larger scale."
          />
        </Column>
        {experience.map((entry) => (
          <Column key={`${entry.company}-${entry.role}`} sm={4} md={4} lg={8}>
            <Tile className="content-tile experience-tile">
              <p className="cds--label-01 section-eyebrow">{buildExperienceMeta(entry)}</p>
              <h3 className="cds--productive-heading-03 card-title">
                {entry.company} | {entry.role}
              </h3>
              <p className="cds--body-long-01 card-summary">{entry.summary}</p>
              <ul className="detail-list">
                {entry.highlights.map((highlight) => (
                  <li key={highlight} className="cds--body-long-01">
                    {highlight}
                  </li>
                ))}
              </ul>
            </Tile>
          </Column>
        ))}
      </Grid>
    </section>
  )
}
