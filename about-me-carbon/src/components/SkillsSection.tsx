import { Column, Grid, Tag, Tile } from '@carbon/react'

import type { SkillGroup } from '../content/profile'
import { countSkillItems } from '../utils/profile'
import { SectionIntro } from './SectionIntro'

interface SkillsSectionProps {
  readonly skillGroups: readonly SkillGroup[]
}

/**
 * Groups the stack into explicit categories so the skills section reads as a
 * technical map rather than an undifferentiated keyword cloud.
 */
export function SkillsSection({ skillGroups }: SkillsSectionProps) {
  const totalSkillItems = countSkillItems(skillGroups)

  return (
    <section id="skills" className="page-section">
      <Grid fullWidth className="site-grid">
        <Column sm={4} md={8} lg={16}>
          <SectionIntro
            eyebrow="Skills"
            title="Languages, frameworks, cloud, and libraries"
            summary={`The stack spans ${totalSkillItems} listed tools across four categories, with the strongest center of gravity in applied Python and ML systems.`}
          />
        </Column>
        {skillGroups.map((skillGroup) => (
          <Column key={skillGroup.label} sm={4} md={4} lg={4}>
            <Tile className="content-tile skill-tile">
              <h3 className="cds--productive-heading-03 card-title">{skillGroup.label}</h3>
              <div className="tag-collection" aria-label={`${skillGroup.label} skills`}>
                {skillGroup.items.map((skillItem) => (
                  <Tag key={skillItem} type="warm-gray">
                    {skillItem}
                  </Tag>
                ))}
              </div>
            </Tile>
          </Column>
        ))}
      </Grid>
    </section>
  )
}
