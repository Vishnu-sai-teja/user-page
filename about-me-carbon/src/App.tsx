import {
  Accordion,
  AccordionItem,
  Button,
  Header,
  HeaderMenuItem,
  HeaderName,
  HeaderNavigation,
  Link,
  Search,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Tile,
} from '@carbon/react'
import { Component, useDeferredValue, useState } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import { HashRouter, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import {
  contactChannels,
  educationEntries,
  experienceEntries,
  heroHighlights,
  knowledgeEntries,
  narrativePrinciples,
  noteStreamDescriptions,
  projectEntries,
  skillGroups,
  siteThesis,
} from './siteContent'
import {
  countKnowledgeEntries,
  filterKnowledgeEntries,
  filterProjects,
} from './siteHelpers'

export class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true }
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div className="page page--reading">
          <Tile className="empty-state">
            <p className="eyebrow">error</p>
            <h1>Something went wrong.</h1>
            <p>The page could not be rendered. Please refresh and try again.</p>
            <Button kind="primary" onClick={() => this.setState({ hasError: false })}>
              Try again
            </Button>
          </Tile>
        </div>
      )
    }
    return this.props.children
  }
}

type RouteDefinition = {
  readonly description: string
  readonly label: string
  readonly path: string
}

const routes: readonly RouteDefinition[] = [
  {
    path: '/',
    label: 'home',
    description: 'first impression, thesis, and how the site is organized',
  },
  {
    path: '/about',
    label: 'about',
    description: 'the long-form narrative, experience arc, and skills',
  },
  {
    path: '/projects',
    label: 'projects',
    description: 'built work across agents, vision, and model pipelines',
  },
  {
    path: '/notes',
    label: 'notes',
    description: 'working notes, live inputs, and durable recommendations',
  },
]

const knowledgeKinds = ['writing', 'bookmark', 'recommendation'] as const

type ContactCardProps = {
  readonly heading: string
  readonly summary: string
}

/**
 * Renders the personal site inside an existing router so route-aware tests can
 * verify the full navigation and page behavior without depending on hash URLs.
 */
export function SiteApp() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main id="main-content" className="site-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  )
}

/**
 * Wraps the personal site in hash-based routing so the built application can be
 * hosted on GitHub Pages without server-side route rewrites.
 */
function App() {
  return (
    <HashRouter>
      <ErrorBoundary>
        <SiteApp />
      </ErrorBoundary>
    </HashRouter>
  )
}

function SiteHeader() {
  const location = useLocation()

  return (
    <Header aria-label="Vishnu Nagabandi site" className="site-header">
      <div className="site-header__inner">
        <HeaderName as={NavLink} to="/" prefix="vishnu">
          nagabandi
        </HeaderName>
        <HeaderNavigation aria-label="Primary navigation">
          {routes.map((route) => {
            const isCurrentPage = location.pathname === route.path

            return (
              <HeaderMenuItem
                key={route.path}
                as={NavLink}
                to={route.path}
                isCurrentPage={isCurrentPage}
                aria-current={isCurrentPage ? 'page' : undefined}
              >
                {route.label}
              </HeaderMenuItem>
            )
          })}
        </HeaderNavigation>
      </div>
    </Header>
  )
}

function HomePage() {
  return (
    <div className="page page--home">
      <section className="hero-grid" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Graduate AI Engineer at SAGE, Bangalore</p>
          <h1 id="hero-title">Vishnu Sai Teja Nagabandi</h1>
          <p className="hero-thesis">{siteThesis}</p>
          <p className="hero-summary">
            I work at the point where models meet operations: agentic workflows,
            low-latency voice systems, document intelligence, and the plumbing
            that keeps them grounded in real business context.
          </p>
          <div className="hero-actions">
            <Button as={NavLink} to="/about" kind="primary">
              Read the story
            </Button>
            <Button as={NavLink} to="/projects" kind="tertiary">
              Browse projects
            </Button>
          </div>
          <div className="tag-row" aria-label="Focus areas">
            {heroHighlights.map((highlight) => (
              <Tag key={highlight} type="outline">
                {highlight}
              </Tag>
            ))}
          </div>
        </div>
        <aside className="orientation-rail" aria-labelledby="orientation-title">
          <p className="eyebrow">how this place works</p>
          <h2 id="orientation-title">A small system, not a resume dump.</h2>
          <div className="orientation-copy">
            {routes
              .filter((route) => route.path !== '/')
              .map((route) => (
                <p key={route.path}>
                  <Link as={NavLink} to={route.path} inline>
                    {route.label}
                  </Link>{' '}
                  holds {route.description}.
                </p>
              ))}
            <p>
              The goal is quick orientation for a recruiter or collaborator, and
              enough depth for the people who want to keep reading.
            </p>
          </div>
          <p className="build-note">
            Built with React, TypeScript, Carbon, and a content model tuned for
            scan speed first.
          </p>
        </aside>
      </section>

      <section className="section-stack" aria-labelledby="home-highlights-title">
        <div className="section-heading">
          <p className="eyebrow">selected highlights</p>
          <h2 id="home-highlights-title">What defines the work</h2>
        </div>
        <div className="tile-grid tile-grid--three">
          <Tile>
            <p className="tile-kicker">current role</p>
            <h3>SAGE</h3>
            <p>
              Productionizing ReWOO-style agents that connect MCP tools, ERP
              data, and retrieval systems into usable workflows.
            </p>
          </Tile>
          <Tile>
            <p className="tile-kicker">domains</p>
            <h3>Voice, documents, computer vision</h3>
            <p>
              I focus on systems that need both model quality and operational
              reliability under live usage.
            </p>
          </Tile>
          <Tile>
            <p className="tile-kicker">working style</p>
            <h3>Grounded over flashy</h3>
            <p>
              I care about observability, latency, and failure modes as much as
              raw model capability.
            </p>
          </Tile>
        </div>
      </section>

      <ContactCard
        heading="contact"
        summary="If you are hiring, building, or exploring production AI systems, the fastest path is email. GitHub is the easiest way to scan the technical surface area."
      />
    </div>
  )
}

function AboutPage() {
  return (
    <div className="page page--reading">
      <section className="reading-column" aria-labelledby="about-title">
        <p className="eyebrow">about</p>
        <h1 id="about-title">I like AI work that survives contact with reality.</h1>
        <div className="long-form-copy">
          <p>
            My background is in applied AI systems that have to connect to real
            products, real operations, and real constraints. Right now, at SAGE,
            I build agentic and voice-driven systems that bring ERP and CRM
            context into live workflows instead of keeping intelligence isolated
            from the tools people actually use.
          </p>
          <p>
            The thread running through my work is practical intelligence. I am
            most interested in systems that need orchestration, retrieval,
            monitoring, and low-latency behavior all at once. That is why my
            experience stretches across multi-agent systems, voice AI, document
            intelligence, and machine learning infrastructure rather than sitting
            inside a single model niche.
          </p>
          <p>
            Before SAGE, I worked at PIBIT on document layouts, OCR pipelines,
            and training workflows, where the job was less about flashy demos and
            more about measurable gains in recall, mapping quality, and model
            operations. At AiDash, I built a geotagging pipeline from street-view
            imagery, which pushed me deeper into computer vision and asynchronous
            processing at production scale.
          </p>
          <p>
            What keeps me engaged is the boundary between research ideas and
            deployable systems. I enjoy the translation layer: turning a paper,
            framework, or experimental result into something a team can rely on,
            inspect, and improve. I want the systems I work on to feel grounded,
            observable, and useful.
          </p>
        </div>
      </section>

      <section className="section-stack" aria-labelledby="principles-title">
        <div className="section-heading">
          <p className="eyebrow">summary</p>
          <h2 id="principles-title">What I optimize for</h2>
        </div>
        <div className="tile-grid tile-grid--three">
          {narrativePrinciples.map((principle) => (
            <Tile key={principle.title}>
              <p className="tile-kicker">{principle.kicker}</p>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </Tile>
          ))}
        </div>
      </section>

      <section className="section-stack" aria-labelledby="experience-title">
        <div className="section-heading">
          <p className="eyebrow">experience</p>
          <h2 id="experience-title">Roles and responsibilities</h2>
        </div>
        <Accordion align="start">
          {experienceEntries.map((entry) => (
            <AccordionItem
              key={entry.company + entry.role}
              title={`${entry.company} | ${entry.role}`}
            >
              <div className="accordion-meta">
                <span>{entry.period}</span>
                <span>{entry.location}</span>
              </div>
              <p>{entry.summary}</p>
              <ul className="detail-list">
                {entry.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="section-stack" aria-labelledby="skills-title">
        <div className="section-heading">
          <p className="eyebrow">skills</p>
          <h2 id="skills-title">Languages, frameworks, and working tools</h2>
        </div>
        <div className="tile-grid tile-grid--two">
          {skillGroups.map((group) => (
            <Tile key={group.label}>
              <p className="tile-kicker">{group.label}</p>
              <div className="tag-row tag-row--compact">
                {group.items.map((item) => (
                  <Tag key={item} type="cool-gray">
                    {item}
                  </Tag>
                ))}
              </div>
            </Tile>
          ))}
        </div>
      </section>

      <section className="section-stack" aria-labelledby="education-title">
        <div className="section-heading">
          <p className="eyebrow">education</p>
          <h2 id="education-title">Academic grounding</h2>
        </div>
        <div className="tile-grid tile-grid--two">
          {educationEntries.map((entry) => (
            <Tile key={entry.institution}>
              <p className="tile-kicker">{entry.period}</p>
              <h3>{entry.institution}</h3>
              <p>{entry.credential}</p>
              <p>{entry.detail}</p>
            </Tile>
          ))}
        </div>
      </section>

      <ContactCard
        heading="next step"
        summary="The page is designed for quick evaluation, but I am happiest when the conversation moves to the actual system problems: grounding, latency, reliability, and product usefulness."
      />
    </div>
  )
}

function ProjectsPage() {
  const [projectQuery, setProjectQuery] = useState('')
  const [viewIndex, setViewIndex] = useState(0)
  const deferredProjectQuery = useDeferredValue(projectQuery)
  const visibleProjects = filterProjects(projectEntries, deferredProjectQuery)

  return (
    <div className="page">
      <section className="section-stack" aria-labelledby="projects-title">
        <div className="section-heading section-heading--with-control">
          <div>
            <p className="eyebrow">projects</p>
            <h1 id="projects-title">Built work across agents, generation, and vision</h1>
            <p className="section-intro">
              These are the projects that best reflect how I think: multi-step
              systems, measurable outcomes, and models that connect to actual
              workflows.
            </p>
          </div>
          <Search
            id="project-search"
            labelText="Search projects"
            placeholder="Search projects"
            value={projectQuery}
            onChange={(event) => setProjectQuery(event.target.value)}
            className="section-search"
          />
        </div>

        <Tabs
          selectedIndex={viewIndex}
          onChange={({ selectedIndex }) => setViewIndex(selectedIndex)}
        >
          <TabList aria-label="Project views" contained>
            <Tab>grid</Tab>
            <Tab>table</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {visibleProjects.length === 0 ? (
                <Tile className="empty-state">
                  <h2>No matching projects</h2>
                  <p>Try a broader term such as agent, OCR, or PyTorch.</p>
                </Tile>
              ) : (
                <div className="tile-grid tile-grid--projects">
                  {visibleProjects.map((project) => (
                    <Tile key={project.id} className="project-tile">
                      <div className="project-meta">
                        <Tag type="outline">{project.stage}</Tag>
                        <span>{project.year}</span>
                      </div>
                      <h2>{project.title}</h2>
                      <p className="project-focus">{project.focus}</p>
                      <p>{project.summary}</p>
                      <div className="tag-row tag-row--compact">
                        {project.technologies.map((technology) => (
                          <Tag key={technology} type="warm-gray">
                            {technology}
                          </Tag>
                        ))}
                      </div>
                      <ul className="detail-list">
                        {project.evidence.map((evidence) => (
                          <li key={evidence}>{evidence}</li>
                        ))}
                      </ul>
                    </Tile>
                  ))}
                </div>
              )}
            </TabPanel>
            <TabPanel>
              <TableContainer title="Project index" description="Dense scan for recruiters and collaborators.">
                <Table aria-label="Project index">
                  <TableHead>
                    <TableRow>
                      <TableHeader>project</TableHeader>
                      <TableHeader>focus</TableHeader>
                      <TableHeader>stack</TableHeader>
                      <TableHeader>year</TableHeader>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {visibleProjects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell>
                          <strong>{project.title}</strong>
                          <div className="table-subtext">{project.summary}</div>
                        </TableCell>
                        <TableCell>{project.focus}</TableCell>
                        <TableCell>{project.technologies.join(', ')}</TableCell>
                        <TableCell>{project.year}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </section>
    </div>
  )
}

function NotesPage() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)
  const activeKind = knowledgeKinds[selectedIndex]
  const counts = countKnowledgeEntries(knowledgeEntries)
  const visibleEntries = filterKnowledgeEntries(knowledgeEntries, {
    kind: activeKind,
    query: deferredQuery,
  })

  return (
    <div className="page">
      <section className="section-stack" aria-labelledby="notes-title">
        <div className="section-heading section-heading--with-control">
          <div>
            <p className="eyebrow">notes</p>
            <h1 id="notes-title">Inputs, outputs, and references worth keeping nearby</h1>
            <p className="section-intro">
              This page preserves the system logic behind the site: working notes
              are different from live inputs, and both are different from the
              references I would hand to someone starting in applied AI systems.
            </p>
          </div>
          <Search
            id="notes-search"
            labelText="Search notes"
            placeholder="Search notes"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="section-search"
          />
        </div>

        <Tabs
          selectedIndex={selectedIndex}
          onChange={({ selectedIndex: nextIndex }) => setSelectedIndex(nextIndex)}
        >
          <TabList aria-label="Knowledge streams" contained>
            <Tab>{`writing (${counts.writing})`}</Tab>
            <Tab>{`bookmarks (${counts.bookmark})`}</Tab>
            <Tab>{`recommendations (${counts.recommendation})`}</Tab>
          </TabList>
          <TabPanels>
            {knowledgeKinds.map((kind) => (
              <TabPanel key={kind}>
                <p className="panel-note">{noteStreamDescriptions[kind]}</p>
                {visibleEntries.length === 0 && activeKind === kind ? (
                  <Tile className="empty-state">
                    <h2>No matches in this stream</h2>
                    <p>Clear the search to see the full list again.</p>
                  </Tile>
                ) : null}
                {kind === 'writing' ? (
                  <div className="tile-grid tile-grid--two">
                    {visibleEntries
                      .filter((entry) => entry.kind === kind)
                      .map((entry) => (
                        <Tile key={entry.id}>
                          <p className="tile-kicker">{entry.date}</p>
                          <h2>{entry.title}</h2>
                          <p>{entry.summary}</p>
                          <div className="tag-row tag-row--compact">
                            {entry.tags.map((tag) => (
                              <Tag key={tag} type="blue">
                                {tag}
                              </Tag>
                            ))}
                          </div>
                        </Tile>
                      ))}
                  </div>
                ) : null}
                {kind === 'bookmark' ? (
                  <TableContainer title="Current inputs" description="Public references shaping current work.">
                    <Table aria-label="Bookmarks">
                      <TableHead>
                        <TableRow>
                          <TableHeader>reference</TableHeader>
                          <TableHeader>source</TableHeader>
                          <TableHeader>why it matters</TableHeader>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {visibleEntries
                          .filter((entry) => entry.kind === kind)
                          .map((entry) => (
                            <TableRow key={entry.id}>
                              <TableCell>
                                <Link href={entry.href} target="_blank" rel="noreferrer">
                                  {entry.title}
                                </Link>
                              </TableCell>
                              <TableCell>{entry.source}</TableCell>
                              <TableCell>{entry.summary}</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : null}
                {kind === 'recommendation' ? (
                  <div className="tile-grid tile-grid--two">
                    {visibleEntries
                      .filter((entry) => entry.kind === kind)
                      .map((entry) => (
                        <Tile key={entry.id}>
                          <p className="tile-kicker">recommended starting point</p>
                          <h2>{entry.title}</h2>
                          <p className="project-focus">{entry.creator}</p>
                          <p>{entry.summary}</p>
                          <Link href={entry.href} target="_blank" rel="noreferrer">
                            Visit reference
                          </Link>
                        </Tile>
                      ))}
                  </div>
                ) : null}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </section>
    </div>
  )
}

function NotFoundPage() {
  return (
    <div className="page page--reading">
      <Tile className="empty-state">
        <p className="eyebrow">404</p>
        <h1>That page does not exist here.</h1>
        <p>The useful paths are home, about, projects, and notes.</p>
        <Button as={NavLink} to="/" kind="primary">
          Return home
        </Button>
      </Tile>
    </div>
  )
}

function ContactCard({ heading, summary }: ContactCardProps) {
  return (
    <section className="section-stack" aria-label="Contact and next steps">
      <div className="section-heading">
        <p className="eyebrow">{heading}</p>
        <h2>Contact and next steps</h2>
        <p className="section-intro">{summary}</p>
      </div>
      <div className="tile-grid tile-grid--two">
        <Tile>
          <h3>Reach out directly</h3>
          <p>
            Email works best for hiring, collaboration, or anything that needs a
            quick technical conversation.
          </p>
          <div className="contact-actions">
            <Button href="mailto:vishnusaiteja.3004@gmail.com" kind="primary">
              Email Vishnu
            </Button>
            <Button href="tel:+918978044062" kind="tertiary">
              Call
            </Button>
          </div>
        </Tile>
        <Tile>
          <h3>Profiles</h3>
          <dl className="contact-list">
            {contactChannels.map((channel) => (
              <div key={channel.label} className="contact-list__row">
                <dt>{channel.label}</dt>
                <dd>
                  {channel.href ? (
                    <Link
                      href={channel.href}
                      target={channel.external ? '_blank' : undefined}
                      rel={channel.external ? 'noreferrer' : undefined}
                    >
                      {channel.value}
                    </Link>
                  ) : (
                    <span>{channel.value}</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Tile>
      </div>
    </section>
  )
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p>Designed as an editorial profile, built for quick scanning and deeper technical follow-up.</p>
        <div className="site-footer__links">
          <Link as={NavLink} to="/about" inline>
            about
          </Link>
          <Link as={NavLink} to="/projects" inline>
            projects
          </Link>
          <Link href="mailto:vishnusaiteja.3004@gmail.com" inline>
            email
          </Link>
          <Link href="https://github.com/Vishnu-sai-teja" target="_blank" rel="noreferrer" inline>
            github
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default App
