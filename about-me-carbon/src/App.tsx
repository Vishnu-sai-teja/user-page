import { Component, type ReactNode, useState } from "react";
import CarbonProvider from "carbon-react/lib/components/carbon-provider";
import Box from "carbon-react/lib/components/box";
import Link from "carbon-react/lib/components/link";
import Pill from "carbon-react/lib/components/pill";
import Search from "carbon-react/lib/components/search";
import { FlatTable, FlatTableBody, FlatTableCell, FlatTableHead, FlatTableHeader, FlatTableRow } from "carbon-react/lib/components/flat-table";
import { Tabs, Tab } from "carbon-react/lib/components/tabs";
import { Tile } from "carbon-react/lib/components/tile";
import Typography from "carbon-react/lib/components/typography";
import GlobalStyle from "carbon-react/lib/style/global-style";
import sageTheme from "carbon-react/lib/style/themes/sage";

import { buildHashHref, type HashRoute, useHashRoute } from "./router";
import {
  filterProjects,
  findProjectBySlug,
  siteContent,
  type ContactChannel,
  type ExperienceEntry,
  type NavigationItem,
  type Principle,
  type ProjectEntry,
  type SkillGroup
} from "./siteContent";

type ProjectView = "cards" | "table";

interface ErrorBoundaryState {
  readonly hasError: boolean;
}

/**
 * Top-level safety net that prevents the page from going blank when a rendering
 * error escapes from a component subtree. Uses plain HTML so it works even if
 * the Carbon provider is the source of the error.
 */
export class ErrorBoundary extends Component<
  { readonly children: ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { readonly children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div style={{ maxWidth: "640px", margin: "48px auto", padding: "0 16px" }}>
          <h2>Something went wrong.</h2>
          <p>
            Try refreshing the page. If the problem continues, reach out at{" "}
            <a href="mailto:vishnusaiteja.3004@gmail.com">vishnusaiteja.3004@gmail.com</a>.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}


/**
 * Renders the header navigation link state for one top-level route destination
 * so the shell stays readable on both home and detail routes.
 */
function RouteLink({
  item,
  active
}: {
  readonly item: NavigationItem;
  readonly active: boolean;
}): JSX.Element {
  return (
    <Link aria-current={active ? "page" : undefined} href={buildHashHref(item.href)}>
      <Typography as="span" color="blackOpacity90" variant={active ? "b" : "span"}>
        {item.label}
      </Typography>
    </Link>
  );
}

/**
 * Displays the reusable list of contact channels so every route can offer a
 * consistent and low-friction way to continue the conversation.
 */
function ContactCluster({
  channels,
  title,
  summary
}: {
  readonly channels: readonly ContactChannel[];
  readonly title: string;
  readonly summary: string;
}): JSX.Element {
  return (
    <Tile orientation="vertical" p={4} roundness="large" variant="grey">
      <Typography as="p" color="blackOpacity65" mb={1} textTransform="uppercase" variant="small">
        Contact
      </Typography>
      <Typography as="h2" mb={2} variant="h4">
        {title}
      </Typography>
      <Typography mb={3}>{summary}</Typography>
      <Box display="grid" gap={2}>
        {channels.map((channel) => (
          <Box key={channel.label} display="flex" flexDirection="column" gap={1}>
            <Typography as="p" color="blackOpacity65" variant="small">
              {channel.label}
            </Typography>
            <Link href={channel.href} target={channel.href.startsWith("http") ? "_blank" : undefined} rel={channel.href.startsWith("http") ? "noreferrer" : undefined}>
              {channel.value}
            </Link>
          </Box>
        ))}
      </Box>
    </Tile>
  );
}

/**
 * Builds the landing route with identity, current focus, and a concise guide to
 * the rest of the site so visitors know where to go next.
 */
function HomePage(): JSX.Element {
  return (
    <Box maxWidth="1240px" mx="auto" px={[2, 3, 5]} py={[5, 6, 7]}>
      <Box display="grid" gap={5} gridTemplateColumns={["1fr", "1fr", "minmax(0, 7fr) minmax(300px, 5fr)"]}>
        <Box display="flex" flexDirection="column" gap={4}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography as="p" color="blackOpacity65" textTransform="uppercase" variant="small">
              {siteContent.role} at {siteContent.organization}
            </Typography>
            <Typography as="h1" variant="h1-large">
              {siteContent.name}
            </Typography>
            <Box maxWidth="600px">
              <Typography as="p" variant="h4">
                {siteContent.thesis}
              </Typography>
            </Box>
            <Box maxWidth="720px">
              <Typography>{siteContent.homeSummary}</Typography>
            </Box>
          </Box>

          <Box display="flex" flexWrap="wrap" gap={2}>
            {siteContent.focusAreas.map((focusArea) => (
              <Pill key={focusArea} colorVariant="information" fill pillRole="status" size="S">
                {focusArea}
              </Pill>
            ))}
          </Box>

          <Box display="flex" flexWrap="wrap" gap={3}>
            <Link href={buildHashHref("/about")}>
              <Typography as="span" variant="b">
                Read the full story
              </Typography>
            </Link>
            <Link href="mailto:vishnusaiteja.3004@gmail.com">
              <Typography as="span" variant="b">
                Start with email
              </Typography>
            </Link>
          </Box>
        </Box>

        <Tile orientation="vertical" p={4} roundness="large">
          <Typography as="p" color="blackOpacity65" mb={1} textTransform="uppercase" variant="small">
            How this place works
          </Typography>
          <Typography as="h2" mb={3} variant="h4">
            A compact personal site for quick scanning and deeper evaluation.
          </Typography>
          <Box display="flex" flexDirection="column" gap={3}>
            {siteContent.homeOrientation.map((note) => (
              <Typography key={note}>{note}</Typography>
            ))}
          </Box>
          <Typography as="p" color="blackOpacity65" mt={4} variant="small">
            {siteContent.homeMaintenanceNote}
          </Typography>
        </Tile>
      </Box>

      <Box display="grid" gap={4} gridTemplateColumns={["1fr", "1fr", "minmax(0, 6fr) minmax(280px, 4fr)"]} mt={[5, 6, 7]}>
        <Tile orientation="vertical" p={4} roundness="large" variant="grey">
          <Typography as="p" color="blackOpacity65" mb={1} textTransform="uppercase" variant="small">
            Current direction
          </Typography>
          <Typography as="h2" mb={2} variant="h4">
            Production AI that stays close to business context
          </Typography>
          <Box as="ul" display="flex" flexDirection="column" gap={2} m={0} p={0} pl={3}>
            <Typography as="li">
              Designing and shipping agents that connect model reasoning to CRM and ERP context instead of keeping intelligence isolated.
            </Typography>
            <Typography as="li">
              Building real-time voice experiences where latency and retrieval quality are product requirements, not afterthoughts.
            </Typography>
            <Typography as="li">
              Growing deeper in the engineering layers around observability, evaluation, and integration-heavy AI systems.
            </Typography>
          </Box>
        </Tile>

        <ContactCluster
          channels={siteContent.contactChannels}
          summary={siteContent.contactInvitation}
          title="Continue the conversation"
        />
      </Box>
    </Box>
  );
}

/**
 * Renders one working principle as a compact explanatory tile inside the about
 * route so the narrative page keeps both essay depth and scannable anchors.
 */
function PrincipleTile({ principle }: { readonly principle: Principle }): JSX.Element {
  return (
    <Tile orientation="vertical" p={4} roundness="large" variant="grey">
      <Typography as="h3" mb={2} variant="h4">
        {principle.title}
      </Typography>
      <Typography>{principle.description}</Typography>
    </Tile>
  );
}

/**
 * Displays an experience entry in a readable stacked format that preserves the
 * about route's narrative tone while still surfacing role-specific highlights.
 */
function ExperienceBlock({ entry }: { readonly entry: ExperienceEntry }): JSX.Element {
  return (
    <Tile orientation="vertical" p={4} roundness="large">
      <Typography as="p" color="blackOpacity65" mb={1} variant="small">
        {entry.period} | {entry.location}
      </Typography>
      <Typography as="h3" mb={1} variant="h4">
        {entry.company} | {entry.role}
      </Typography>
      <Typography mb={3}>{entry.summary}</Typography>
      <Box as="ul" display="flex" flexDirection="column" gap={2} m={0} p={0} pl={3}>
        {entry.highlights.map((highlight) => (
          <Typography as="li" key={highlight}>
            {highlight}
          </Typography>
        ))}
      </Box>
    </Tile>
  );
}

/**
 * Groups one skill category into a Carbon tile so the stack stays organized by
 * domain instead of becoming an undifferentiated keyword wall.
 */
function SkillGroupTile({ group }: { readonly group: SkillGroup }): JSX.Element {
  return (
    <Tile orientation="vertical" p={4} roundness="large" variant="grey">
      <Typography as="h3" mb={2} variant="h4">
        {group.label}
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={2}>
        {group.items.map((item) => (
          <Pill key={item} pillRole="status" size="S">
            {item}
          </Pill>
        ))}
      </Box>
    </Tile>
  );
}

/**
 * Builds the long-form about route with authored narrative, structured role
 * history, technical strengths, and the academic grounding behind the work.
 */
function AboutPage(): JSX.Element {
  return (
    <Box maxWidth="760px" mx="auto" px={[2, 3, 5]} py={[5, 6, 7]}>
      <Typography as="p" color="blackOpacity65" mb={1} textTransform="uppercase" variant="small">
        About
      </Typography>
      <Typography as="h1" mb={4} variant="h2">
        Applied AI work, shaped by systems thinking.
      </Typography>

      <Box as="article" display="flex" flexDirection="column" gap={3}>
        {siteContent.aboutEssay.map((paragraph) => (
          <Typography key={paragraph}>{paragraph}</Typography>
        ))}
      </Box>

      <Box display="grid" gap={3} mt={6}>
        {siteContent.principles.map((principle) => (
          <PrincipleTile key={principle.title} principle={principle} />
        ))}
      </Box>

      <Box display="flex" flexDirection="column" gap={3} mt={6}>
        <Typography as="h2" variant="h3">
          Experience
        </Typography>
        {siteContent.experience.map((entry) => (
          <ExperienceBlock entry={entry} key={`${entry.company}-${entry.role}`} />
        ))}
      </Box>

      <Box display="flex" flexDirection="column" gap={3} mt={6}>
        <Typography as="h2" variant="h3">
          Technical strengths
        </Typography>
        <Box display="grid" gap={3} gridTemplateColumns={["1fr", "1fr 1fr"]}>
          {siteContent.skillGroups.map((group) => (
            <SkillGroupTile group={group} key={group.label} />
          ))}
        </Box>
      </Box>

      <Box display="grid" gap={3} gridTemplateColumns={["1fr", "1fr 1fr"]} mt={6}>
        <Tile orientation="vertical" p={4} roundness="large">
          <Typography as="h2" mb={2} variant="h4">
            Education
          </Typography>
          <Box display="flex" flexDirection="column" gap={3}>
            {siteContent.education.map((entry) => (
              <Box key={entry.institution} display="flex" flexDirection="column" gap={1}>
                <Typography as="h3" variant="b">
                  {entry.institution}
                </Typography>
                <Typography>{entry.credential}</Typography>
                <Typography color="blackOpacity65" variant="small">
                  {entry.graduation} | {entry.location}
                </Typography>
                <Typography color="blackOpacity65" variant="small">
                  {entry.detail}
                </Typography>
              </Box>
            ))}
          </Box>
        </Tile>

        <Tile orientation="vertical" p={4} roundness="large" variant="grey">
          <Typography as="h2" mb={2} variant="h4">
            Coursework and languages
          </Typography>
          <Typography as="p" color="blackOpacity65" mb={2} variant="small">
            Coursework
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={2} mb={4}>
            {siteContent.coursework.map((course) => (
              <Pill key={course} pillRole="status" size="S">
                {course}
              </Pill>
            ))}
          </Box>
          <Typography as="p" color="blackOpacity65" mb={2} variant="small">
            Languages
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={2}>
            {siteContent.languages.map((language) => (
              <Pill key={language} pillRole="status" size="S">
                {language}
              </Pill>
            ))}
          </Box>
        </Tile>
      </Box>

      <Box mt={6}>
        <ContactCluster
          channels={siteContent.contactChannels}
          summary={siteContent.contactInvitation}
          title="Contact stays simple"
        />
      </Box>
    </Box>
  );
}

/**
 * Renders one project card for the browse view so visitors can scan the build,
 * its stack, and the reason it is featured before opening the detail route.
 */
function ProjectCard({ project }: { readonly project: ProjectEntry }): JSX.Element {
  return (
    <Tile orientation="vertical" p={4} roundness="large" variant="grey">
      <Box display="flex" flexDirection="column" gap={2}>
        <Box display="flex" flexWrap="wrap" gap={2}>
          <Pill colorVariant="information" fill pillRole="status" size="S">
            {project.year}
          </Pill>
          <Pill pillRole="status" size="S">
            {project.category}
          </Pill>
        </Box>
        <Typography as="h3" variant="h4">
          {project.title}
        </Typography>
        <Typography>{project.summary}</Typography>
        <Typography color="blackOpacity65" variant="small">
          {project.whyItMatters}
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={2}>
          {project.technologies.map((technology) => (
            <Pill key={technology} pillRole="status" size="S">
              {technology}
            </Pill>
          ))}
        </Box>
        <Link href={buildHashHref(`/projects/${project.slug}`)}>
          <Typography as="span" variant="b">
            Open project detail
          </Typography>
        </Link>
      </Box>
    </Tile>
  );
}

/**
 * Renders the project index as both a browseable card grid and a denser table,
 * with search filtering applied consistently to each view.
 */
function ProjectsPage({
  projectQuery,
  projectView,
  setProjectQuery,
  setProjectView
}: {
  readonly projectQuery: string;
  readonly projectView: ProjectView;
  readonly setProjectQuery: (nextValue: string) => void;
  readonly setProjectView: (nextValue: ProjectView) => void;
}): JSX.Element {
  const filteredProjects = filterProjects(siteContent.projects, projectQuery);

  return (
    <Box maxWidth="1240px" mx="auto" px={[2, 3, 5]} py={[5, 6, 7]}>
      <Box maxWidth="780px">
        <Typography as="p" color="blackOpacity65" mb={1} textTransform="uppercase" variant="small">
          Projects
        </Typography>
        <Typography as="h1" mb={2} variant="h2">
          Built work across agent orchestration, generation, and model quality.
        </Typography>
        <Typography>
          These are the projects worth foregrounding because they show the same pattern visible in Vishnu's professional work: end-to-end systems, measurable quality concerns, and a preference for understanding how the whole workflow fits together.
        </Typography>
      </Box>

      <Box alignItems={["stretch", "center"]} display="flex" flexDirection={["column", "row"]} gap={3} justifyContent="space-between" mt={5}>
        <Search
          aria-label="Search projects"
          onChange={(event) => setProjectQuery(event.target.value)}
          placeholder="Search by title, category, or technology"
          searchWidth="100%"
          value={projectQuery}
        />
        <Typography color="blackOpacity65" variant="small">
          {filteredProjects.length} project{filteredProjects.length === 1 ? "" : "s"}
        </Typography>
      </Box>

      <Tabs
        mt={4}
        onTabChange={(nextTabId) => {
          if (nextTabId === "cards" || nextTabId === "table") {
            setProjectView(nextTabId);
          }
        }}
        selectedTabId={projectView}
      >
        <Tab tabId="cards" title="Browse cards">
          {filteredProjects.length === 0 ? (
            <Tile mt={4} orientation="vertical" p={4} roundness="large">
              <Typography as="h3" mb={2} variant="h4">
                No projects match that search.
              </Typography>
              <Typography>
                Try a broader term such as agent, PyTorch, or GANs to bring the full set back into view.
              </Typography>
            </Tile>
          ) : (
            <Box display="grid" gap={3} gridTemplateColumns={["1fr", "1fr", "1fr 1fr"]} mt={4}>
              {filteredProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </Box>
          )}
        </Tab>
        <Tab tabId="table" title="Scan table">
          {filteredProjects.length === 0 ? (
            <Tile mt={4} orientation="vertical" p={4} roundness="large">
              <Typography as="h3" mb={2} variant="h4">
                No table rows to show.
              </Typography>
              <Typography>
                Clear the current search to compare the full project list again.
              </Typography>
            </Tile>
          ) : (
            <FlatTable caption="Projects table" colorTheme="light" mt={4} overflowX="auto" size="compact" width="100%">
              <FlatTableHead>
                <FlatTableRow>
                  <FlatTableHeader>Project</FlatTableHeader>
                  <FlatTableHeader>Category</FlatTableHeader>
                  <FlatTableHeader>Year</FlatTableHeader>
                  <FlatTableHeader>Technologies</FlatTableHeader>
                </FlatTableRow>
              </FlatTableHead>
              <FlatTableBody>
                {filteredProjects.map((project) => (
                  <FlatTableRow key={project.slug}>
                    <FlatTableCell>
                      <Box display="flex" flexDirection="column" gap={1}>
                        <Link href={buildHashHref(`/projects/${project.slug}`)}>
                          <Typography as="span" variant="b">
                            {project.title}
                          </Typography>
                        </Link>
                        <Typography color="blackOpacity65" variant="small">
                          {project.summary}
                        </Typography>
                      </Box>
                    </FlatTableCell>
                    <FlatTableCell>{project.category}</FlatTableCell>
                    <FlatTableCell>{project.year}</FlatTableCell>
                    <FlatTableCell>{project.technologies.join(", ")}</FlatTableCell>
                  </FlatTableRow>
                ))}
              </FlatTableBody>
            </FlatTable>
          )}
        </Tab>
      </Tabs>
    </Box>
  );
}

/**
 * Renders a focused project detail route with enough narrative and metadata to
 * explain the build without forcing it back into the index page layout.
 */
function ProjectDetailPage({ project }: { readonly project: ProjectEntry }): JSX.Element {
  return (
    <Box maxWidth="760px" mx="auto" px={[2, 3, 5]} py={[5, 6, 7]}>
      <Link href={buildHashHref("/projects")}>
        <Typography as="span" variant="b">
          Back to projects
        </Typography>
      </Link>
      <Box display="flex" flexDirection="column" gap={3} mt={4}>
        <Box display="flex" flexWrap="wrap" gap={2}>
          <Pill colorVariant="information" fill pillRole="status" size="S">
            {project.year}
          </Pill>
          <Pill pillRole="status" size="S">
            {project.category}
          </Pill>
        </Box>
        <Typography as="h1" variant="h2">
          {project.title}
        </Typography>
        <Typography>{project.summary}</Typography>
        <Typography color="blackOpacity65">{project.whyItMatters}</Typography>
      </Box>

      <Box mt={5}>
        <Typography as="h2" mb={2} variant="h4">
          Stack
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={2}>
          {project.technologies.map((technology) => (
            <Pill key={technology} pillRole="status" size="S">
              {technology}
            </Pill>
          ))}
        </Box>
      </Box>

      <Box mt={5}>
        <Typography as="h2" mb={2} variant="h4">
          Key contributions
        </Typography>
        <Box as="ul" display="flex" flexDirection="column" gap={2} m={0} p={0} pl={3}>
          {project.highlights.map((highlight) => (
            <Typography as="li" key={highlight}>
              {highlight}
            </Typography>
          ))}
        </Box>
      </Box>

      <Box mt={6}>
        <ContactCluster
          channels={siteContent.contactChannels}
          summary="If one of these builds is relevant to a role or collaboration, the direct links are here so the conversation can move quickly."
          title="Keep going from here"
        />
      </Box>
    </Box>
  );
}

/**
 * Provides the full About Me application shell, route-driven content, and
 * Carbon theming for the rebuilt multi-page experience.
 */
function App(): JSX.Element {
  const projectSlugs = siteContent.projects.map((project) => project.slug);
  const route = useHashRoute(projectSlugs);
  const [projectQuery, setProjectQuery] = useState("");
  const [projectView, setProjectView] = useState<ProjectView>("cards");

  const activeNavigationHref = route.kind === "project-detail" ? "/projects" : route.kind === "home" ? "/" : `/${route.kind}`;

  return (
    <ErrorBoundary>
      <CarbonProvider theme={sageTheme} validationRedesignOptIn>
      <GlobalStyle />
      <Link href="#main-content" isSkipLink>
        Skip to main content
      </Link>
      <Box bg="white" minHeight="100vh">
        <Box as="header" backgroundColor="white" boxShadow="boxShadow100" position="sticky" top="0">
          <Box alignItems={["flex-start", "center"]} display="flex" flexDirection={["column", "row"]} gap={3} justifyContent="space-between" maxWidth="1240px" mx="auto" px={[2, 3, 5]} py={3}>
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography as="p" color="blackOpacity90" variant="b">
                {siteContent.name}
              </Typography>
              <Typography as="p" color="blackOpacity65" variant="small">
                {siteContent.role} at {siteContent.organization}
              </Typography>
            </Box>

            <Box as="nav" display="flex" flexWrap="wrap" gap={3}>
              {siteContent.navigation.map((item) => (
                <RouteLink active={item.href === activeNavigationHref} item={item} key={item.href} />
              ))}
            </Box>
          </Box>
        </Box>

        <Box as="main" id="main-content">
          {route.kind === "home" && <HomePage />}
          {route.kind === "about" && <AboutPage />}
          {route.kind === "projects" && (
            <ProjectsPage
              projectQuery={projectQuery}
              projectView={projectView}
              setProjectQuery={setProjectQuery}
              setProjectView={setProjectView}
            />
          )}
          {route.kind === "project-detail" && (
            <ProjectDetailPage project={findProjectBySlug(siteContent.projects, route.slug)!} />
          )}
        </Box>

        <Box mt={4}>
          <Box backgroundColor="blackOpacity10" height="1px" width="100%" />
          <Box alignItems={["flex-start", "center"]} display="flex" flexDirection={["column", "row"]} gap={3} justifyContent="space-between" maxWidth="1240px" mx="auto" px={[2, 3, 5]} py={4}>
            <Box maxWidth="760px">
              <Typography color="blackOpacity65" variant="small">
                A compact editorial profile for recruiters, collaborators, and peers who want a direct view of Vishnu's work across multi-agent systems, voice AI, document intelligence, and ML infrastructure.
              </Typography>
            </Box>
            <Box display="flex" flexWrap="wrap" gap={3}>
              <Link href="mailto:vishnusaiteja.3004@gmail.com">Email</Link>
              <Link href={buildHashHref("/about")}>About</Link>
              <Link href={buildHashHref("/projects")}>Projects</Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </CarbonProvider>
    </ErrorBoundary>
  );
}

export default App;