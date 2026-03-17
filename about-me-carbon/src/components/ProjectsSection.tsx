import { Column, Grid, Tag, Tile } from '@carbon/react'

import type { ProjectEntry } from '../content/profile'
import { buildProjectCardLabel } from '../utils/profile'
import { SectionIntro } from './SectionIntro'

interface ProjectsSectionProps {
  readonly projects: readonly ProjectEntry[]
}

/**
 * Surfaces representative builds with enough technical detail to show how
 * Vishnu thinks about agents, generation, and model-centered products.
 */
export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="page-section">
      <Grid fullWidth className="site-grid">
        <Column sm={4} md={8} lg={16}>
          <SectionIntro
            eyebrow="Projects"
            title="Representative work across agents, generation, and medical imaging"
            summary="These projects show a preference for systems thinking: orchestration, end-to-end modeling, and outcome-oriented experimentation."
          />
        </Column>
        {projects.map((project) => (
          <Column key={project.title} sm={4} md={4} lg={8}>
            <Tile className="content-tile project-tile" aria-label={buildProjectCardLabel(project)}>
              <div className="project-header-row">
                <p className="cds--label-01 section-eyebrow">{project.year}</p>
                <div className="tag-collection tag-collection--compact">
                  {project.technologies.map((technology) => (
                    <Tag key={technology} type="teal">
                      {technology}
                    </Tag>
                  ))}
                </div>
              </div>
              <h3 className="cds--productive-heading-03 card-title">{project.title}</h3>
              <p className="cds--body-long-01 card-summary">{project.summary}</p>
              <ul className="detail-list">
                {project.highlights.map((highlight) => (
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
