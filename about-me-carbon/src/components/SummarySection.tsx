import { Column, Grid, Tag, Tile } from '@carbon/react'

import { SectionIntro } from './SectionIntro'

interface SummarySectionProps {
  readonly paragraphs: readonly string[]
  readonly directionPoints: readonly string[]
}

/**
 * Turns the profile summary into readable narrative copy and a compact set of
 * current-direction points so the section stays scannable without losing depth.
 */
export function SummarySection({ paragraphs, directionPoints }: SummarySectionProps) {
  return (
    <section id="summary" className="page-section">
      <Grid fullWidth className="site-grid">
        <Column sm={4} md={8} lg={16}>
          <SectionIntro
            eyebrow="Summary"
            title="Background, interests, and current direction"
            summary="Applied AI work has been the constant, but the shape of that work has expanded from models alone into the systems around them."
          />
        </Column>
        <Column sm={4} md={5} lg={10}>
          <Tile className="content-tile content-tile--narrative">
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className="cds--body-long-02 narrative-paragraph">
                {paragraph}
              </p>
            ))}
          </Tile>
        </Column>
        <Column sm={4} md={3} lg={6}>
          <Tile className="content-tile">
            <p className="cds--label-01 section-eyebrow">Current direction</p>
            <div className="point-list">
              {directionPoints.map((directionPoint) => (
                <Tag key={directionPoint} type="outline" className="point-tag">
                  {directionPoint}
                </Tag>
              ))}
            </div>
          </Tile>
        </Column>
      </Grid>
    </section>
  )
}
