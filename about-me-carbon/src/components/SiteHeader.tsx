import { Grid, Column, Link } from '@carbon/react'

import type { NavigationSection } from '../content/profile'
import { buildSectionHref } from '../utils/profile'

interface SiteHeaderProps {
  readonly name: string
  readonly role: string
  readonly organization: string
  readonly navigationSections: readonly NavigationSection[]
}

/**
 * Provides the sticky site shell that keeps Vishnu's identity and the major
 * section anchors visible while visitors scan the page.
 */
export function SiteHeader({
  name,
  role,
  organization,
  navigationSections,
}: SiteHeaderProps) {
  return (
    <header className="site-header">
      <Grid fullWidth className="site-header__grid">
        <Column sm={4} md={3} lg={4}>
          <div className="site-header__identity">
            <p className="cds--label-01 site-header__name">{name}</p>
            <p className="cds--helper-text-01 site-header__meta">
              {role} at {organization}
            </p>
          </div>
        </Column>
        <Column sm={4} md={5} lg={12}>
          <nav aria-label="Primary sections" className="site-header__nav">
            {navigationSections.map((section) => (
              <Link
                key={section.id}
                className="site-header__link"
                href={buildSectionHref(section.id)}
              >
                {section.label}
              </Link>
            ))}
          </nav>
        </Column>
      </Grid>
    </header>
  )
}
