import { Column, Grid, Link, Theme } from '@carbon/react'

import { ContactSection } from './components/ContactSection'
import { EducationSection } from './components/EducationSection'
import { ErrorBoundary } from './components/ErrorBoundary'
import { ExperienceSection } from './components/ExperienceSection'
import { HeroSection } from './components/HeroSection'
import { ProjectsSection } from './components/ProjectsSection'
import { SiteHeader } from './components/SiteHeader'
import { SkillsSection } from './components/SkillsSection'
import { SummarySection } from './components/SummarySection'
import { profilePageData } from './content/profile'

/**
 * Composes the single-page About Me experience using the Carbon dark theme and
 * the approved content structure for Vishnu's profile.
 */
function App() {
  return (
    <Theme theme="g100">
      <ErrorBoundary>
        <div className="app-shell">
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <SiteHeader
          name={profilePageData.name}
          role={profilePageData.role}
          organization={profilePageData.organization}
          navigationSections={profilePageData.navigationSections}
        />
        <main id="main-content" className="site-main">
          <HeroSection
            name={profilePageData.name}
            role={profilePageData.role}
            organization={profilePageData.organization}
            thesis={profilePageData.heroThesis}
            summary={profilePageData.heroSummary}
            focusAreas={profilePageData.focusAreas}
            orientationNotes={profilePageData.orientationNotes}
            navigationSections={profilePageData.navigationSections}
          />
          <SummarySection
            paragraphs={profilePageData.summaryParagraphs}
            directionPoints={profilePageData.directionPoints}
          />
          <ExperienceSection experience={profilePageData.experience} />
          <SkillsSection skillGroups={profilePageData.skillGroups} />
          <ProjectsSection projects={profilePageData.projects} />
          <EducationSection education={profilePageData.education} />
          <ContactSection contactChannels={profilePageData.contactChannels} />
        </main>
        <footer className="site-footer">
          <Grid fullWidth className="site-grid site-footer__grid">
            <Column sm={4} md={4} lg={10}>
              <p className="cds--body-long-01 site-footer__copy">
                Built as a Carbon-native personal profile focused on clarity, narrative flow, and practical AI credibility.
              </p>
            </Column>
            <Column sm={4} md={4} lg={6}>
              <div className="site-footer__links">
                <Link href="#projects">Projects</Link>
                <Link href="#contact">Contact</Link>
                <Link href="https://www.kaggle.com/vishnusaitejan" target="_blank" rel="noreferrer">
                  Kaggle
                </Link>
              </div>
            </Column>
          </Grid>
        </footer>
      </div>
      </ErrorBoundary>
    </Theme>
  )
}

export default App
