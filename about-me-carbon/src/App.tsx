import { useMemo, useState } from "react";
import Box from "carbon-react/lib/components/box";
import Link from "carbon-react/lib/components/link";
import Search from "carbon-react/lib/components/search/search.component";
import { Tile } from "carbon-react/lib/components/tile";
import Typography from "carbon-react/lib/components/typography";
import Pill from "carbon-react/lib/components/pill";
import Image from "carbon-react/lib/components/image";
import NavigationBar from "carbon-react/lib/components/navigation-bar";
import {
  VerticalMenuFullScreen,
  VerticalMenuItem,
  VerticalMenuTrigger
} from "carbon-react/lib/components/vertical-menu";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate
} from "react-router-dom";

import {
  aboutNarrative,
  contactAudiences,
  contactCallout,
  emailAddress,
  experienceTimeline,
  featuredProjects,
  filterProjects,
  heroHighlights,
  navigationItems,
  professionalSummary,
  profileHandles,
  type RecommendationCard,
  skillGroups,
  workingPrinciples
} from "./content/siteContent";
import { recommendationsPageData } from "./content/recommendations.generated";

/**
 * Wraps the routed site in a browser router for the production application.
 */
export default function App(): JSX.Element {
  return (
    <BrowserRouter basename="/user-page">
      <AboutMeApp />
    </BrowserRouter>
  );
}

/**
 * Renders the full About Me experience, including the shared shell, primary
 * navigation, and the route content for home, about, projects, recommendations,
 * and contact.
 */
export function AboutMeApp(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (path: string): void => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <Box bg="--colorsUtilityYang100" minHeight="100vh">
      <NavigationBar position="sticky" navigationType="white" px={[3, 4, 6]} justifyContent="space-between" alignItems="center">
        <Box>
          <Typography as="div" variant="small" color="--colorsUtilityYin055" textTransform="uppercase">
            Vishnu Sai Teja Nagabandi
          </Typography>
          <Typography as="div" variant="h5" color="--colorsUtilityYin090">
            Graduate AI Engineer
          </Typography>
        </Box>

        <Box as="nav" aria-label="Primary" display={["none", "none", "flex"]} alignItems="center">
          {navigationItems.map((item, index) => {
            const isActive = location.pathname === item.path;

            return (
              <Box key={item.path} ml={index === 0 ? 0 : 4}>
                <Link
                  aria-current={isActive ? "page" : undefined}
                  bold={isActive}
                  href={item.path}
                  linkSize="large"
                  underline={isActive ? "always" : "hover"}
                  onClick={(event) => {
                    event.preventDefault();
                    handleNavigate(item.path);
                  }}
                >
                  {item.label}
                </Link>
              </Box>
            );
          })}
        </Box>

        <Box display={["block", "block", "none"]}>
          <VerticalMenuTrigger onClick={() => setIsMenuOpen(true)}>
            Menu
          </VerticalMenuTrigger>
        </Box>
      </NavigationBar>

      <VerticalMenuFullScreen
        aria-label="Mobile site navigation"
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      >
        {navigationItems.map((item) => (
          <VerticalMenuItem
            key={item.path}
            active={location.pathname === item.path}
            ariaCurrent={location.pathname === item.path ? "page" : undefined}
            href={item.path}
            onClick={(event) => {
              event.preventDefault();
              handleNavigate(item.path);
            }}
            title={item.label}
          />
        ))}
      </VerticalMenuFullScreen>

      <Box as="main" maxWidth="1200px" mx="auto" px={[3, 4, 6]} py={[4, 5, 6]}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/recommendations" element={<RecommendationsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Box>

      <Box as="footer" bg="white" color="--colorsUtilityYin055" px={[3, 4, 6]} py={3}>
        <Box maxWidth="1200px" mx="auto" display="flex" justifyContent="space-between" gap={2} flexWrap="wrap">
          <Typography variant="small">Built as a Carbon-based editorial profile for recruiters, collaborators, and peers.</Typography>
          <Typography variant="small">Recommendation metadata is generated at build time from public sources.</Typography>
        </Box>
      </Box>
    </Box>
  );
}

/**
 * Presents the identity-led landing route with a thesis statement, primary CTA,
 * and a right-rail explainer for how the routed site is organized.
 */
function HomePage(): JSX.Element {
  const navigate = useNavigate();

  return (
    <Box display="grid" gap={5} gridTemplateColumns={["1fr", "1fr", "minmax(0, 1.15fr) minmax(18rem, 0.85fr)"]}>
      <Box display="flex" flexDirection="column" gap={4}>
        <Box display="flex" flexWrap="wrap" gap={1}>
          {heroHighlights.map((highlight) => (
            <Pill key={highlight} pillRole="status" fill colorVariant="information">
              {highlight}
            </Pill>
          ))}
        </Box>

        <Box maxWidth="46rem">
          <Typography as="h1" variant="h1-large" color="--colorsUtilityYin090" mb={2}>
            Building AI systems that have to work with real context, real latency, and real operators.
          </Typography>
          <Typography as="p" variant="big" color="--colorsUtilityYin070" mb={3}>
            {professionalSummary}
          </Typography>
          <Link
            bold
            href="/about"
            icon="chevron_right"
            iconAlign="right"
            onClick={(event) => {
              event.preventDefault();
              navigate("/about");
            }}
          >
            Explore the full profile
          </Link>
        </Box>

        <Tile orientation="vertical" roundness="large" p={[3, 4]} variant="grey">
          <Typography as="h2" variant="h4" mb={2}>
            Current focus
          </Typography>
          <Typography mb={2}>
            At SAGE, Vishnu works on agentic accounts receivable workflows that combine tool use, ERP access, retrieval, and voice-first delivery. The common thread across his recent work is operational AI: systems that need retrieval quality, observability, and clean handoffs across model and product boundaries.
          </Typography>
          <Typography>
            Earlier roles across PIBIT and AiDash deepened the computer vision, OCR, and training-infrastructure side of that foundation, which is why the portfolio here spans both agentic systems and classic ML pipelines.
          </Typography>
        </Tile>
      </Box>

      <Tile orientation="vertical" roundness="large" p={[3, 4]} borderVariant="selected" borderWidth="borderWidth200">
        <Typography as="p" variant="small" color="--colorsUtilityYin055" textTransform="uppercase" mb={2}>
          How this place works
        </Typography>
        <Box display="flex" flexDirection="column" gap={3}>
          {navigationItems.slice(1).map((item) => (
            <Box key={item.path}>
              <Typography as="h2" variant="h5" mb={1}>
                {item.label}
              </Typography>
              <Typography color="--colorsUtilityYin070">{item.summary}</Typography>
            </Box>
          ))}
        </Box>
      </Tile>
    </Box>
  );
}

/**
 * Renders the narrative route with professional context first, then an impact-
 * oriented experience timeline and categorized technical skills.
 */
function AboutPage(): JSX.Element {
  return (
    <Box display="flex" flexDirection="column" gap={5}>
      <Box maxWidth="46rem" mx="auto" width="100%">
        <Typography as="h1" variant="h2" mb={3}>
          About
        </Typography>
        {aboutNarrative.map((paragraph) => (
          <Typography key={paragraph} mb={3}>
            {paragraph}
          </Typography>
        ))}

        <Typography as="h2" variant="h4" mb={2} mt={5}>
          Working principles
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          {workingPrinciples.map((principle) => (
            <Tile key={principle} orientation="vertical" roundness="small" p={3} variant="grey">
              <Typography>{principle}</Typography>
            </Tile>
          ))}
        </Box>
      </Box>

      <Box>
        <Typography as="h2" variant="h3" mb={3}>
          Experience timeline
        </Typography>
        <Box display="grid" gap={3}>
          {experienceTimeline.map((entry) => (
            <Tile key={`${entry.company}-${entry.role}`} orientation="vertical" roundness="large" p={[3, 4]}>
              <Box display="flex" justifyContent="space-between" gap={3} flexWrap="wrap" mb={2}>
                <Box>
                  <Typography as="h3" variant="h4">
                    {entry.role}
                  </Typography>
                  <Typography color="--colorsUtilityYin070">{entry.company} · {entry.location}</Typography>
                </Box>
                <Pill pillRole="status" fill colorVariant="neutral">
                  {entry.duration}
                </Pill>
              </Box>
              <Box display="flex" flexDirection="column" gap={2}>
                {entry.highlights.map((highlight) => (
                  <Typography key={highlight}>{highlight}</Typography>
                ))}
              </Box>
            </Tile>
          ))}
        </Box>
      </Box>

      <Box>
        <Typography as="h2" variant="h3" mb={3}>
          Technical skills
        </Typography>
        <Box display="grid" gap={3} gridTemplateColumns={["1fr", "1fr", "repeat(2, minmax(0, 1fr))"]}>
          {skillGroups.map((group) => (
            <Tile key={group.title} orientation="vertical" roundness="large" p={[3, 4]} variant="grey">
              <Typography as="h3" variant="h4" mb={2}>
                {group.title}
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {group.items.map((skill) => (
                  <Pill key={skill}>{skill}</Pill>
                ))}
              </Box>
            </Tile>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

/**
 * Presents the project index with a lightweight search control so visitors can
 * scan or narrow the work by problem area and implementation stack.
 */
function ProjectsPage(): JSX.Element {
  const [query, setQuery] = useState("");
  const visibleProjects = useMemo(() => filterProjects(featuredProjects, query), [query]);

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Box display="flex" flexDirection={["column", "column", "row"]} justifyContent="space-between" gap={3} alignItems={["stretch", "stretch", "end"]}>
        <Box maxWidth="44rem">
          <Typography as="h1" variant="h2" mb={2}>
            Projects
          </Typography>
          <Typography color="--colorsUtilityYin070">
            Three representative builds across agentic document intelligence, generative AI systems, and medical imaging. Each one is framed around the problem it tackled, the system design choices it required, and the outcome it produced.
          </Typography>
        </Box>
        <Search
          aria-label="Filter projects"
          label="Search projects"
          maxWidth="26rem"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by project, domain, or technology"
          value={query}
        />
      </Box>

      <Box display="grid" gap={3}>
        {visibleProjects.map((project) => (
          <Tile key={project.name} orientation="vertical" roundness="large" p={[3, 4]}>
            <Box display="flex" justifyContent="space-between" gap={3} flexWrap="wrap" mb={2}>
              <Box>
                <Typography as="h2" variant="h3" mb={1}>
                  {project.name}
                </Typography>
                <Typography color="--colorsUtilityYin070">{project.teaser}</Typography>
              </Box>
              <Pill pillRole="status" fill colorVariant="information">
                {project.category}
              </Pill>
            </Box>

            <Box display="grid" gap={3} gridTemplateColumns={["1fr", "1fr", "repeat(3, minmax(0, 1fr))"]}>
              <ProjectNarrativeBlock label="Problem" value={project.problem} />
              <ProjectNarrativeBlock label="Approach" value={project.approach} />
              <ProjectNarrativeBlock label="Outcome" value={project.outcome} />
            </Box>

            <Box mt={3} display="flex" flexWrap="wrap" gap={1}>
              {project.technologies.map((technology) => (
                <Pill key={technology}>{technology}</Pill>
              ))}
            </Box>
          </Tile>
        ))}

        {visibleProjects.length === 0 ? (
          <Tile orientation="vertical" roundness="large" p={[3, 4]} variant="grey">
            <Typography as="h2" variant="h4" mb={1}>
              No project matched that search.
            </Typography>
            <Typography color="--colorsUtilityYin070">
              Try a broader term like agent, OCR, diffusion, or PyTorch.
            </Typography>
          </Tile>
        ) : null}
      </Box>
    </Box>
  );
}

interface ProjectNarrativeBlockProps {
  readonly label: string;
  readonly value: string;
}

/**
 * Keeps project case-study framing compact by rendering a titled block for one
 * part of the problem, approach, outcome narrative.
 */
function ProjectNarrativeBlock({ label, value }: ProjectNarrativeBlockProps): JSX.Element {
  return (
    <Box>
      <Typography as="h3" variant="small" color="--colorsUtilityYin055" textTransform="uppercase" mb={1}>
        {label}
      </Typography>
      <Typography>{value}</Typography>
    </Box>
  );
}

/**
 * Renders the dedicated recommendations route with books first and movies
 * second, using image-led vertical cards backed by normalized generated data.
 */
function RecommendationsPage(): JSX.Element {
  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Box maxWidth="42rem">
        <Typography as="h1" variant="h2" mb={2}>
          Recommendations
        </Typography>
        <Typography color="--colorsUtilityYin070">
          These are the books and films that feel most representative of Vishnu's blend of technical curiosity, scale, mythology, and systems thinking.
        </Typography>
      </Box>

      <RecommendationSection cards={recommendationsPageData.books} title="Book Recommendations" />
      <RecommendationSection cards={recommendationsPageData.movies} title="Movie Recommendations" />
    </Box>
  );
}

interface RecommendationSectionProps {
  readonly cards: readonly RecommendationCard[];
  readonly title: string;
}

/**
 * Groups one recommendation type into a titled vertical list while preserving
 * order from the source profile.
 */
function RecommendationSection({ cards, title }: RecommendationSectionProps): JSX.Element {
  return (
    <Box>
      <Typography as="h2" variant="h3" mb={3}>
        {title}
      </Typography>
      <Box display="flex" flexDirection="column" gap={3}>
        {cards.map((card) => (
          <Tile key={card.slug} orientation="vertical" roundness="large" p={[3, 4]}>
            <Box display="grid" gap={3} gridTemplateColumns={["1fr", "1fr", "220px minmax(0, 1fr)"]}>
              <RecommendationVisual imageUrl={card.imageUrl} title={card.title} />
              <Box display="flex" flexDirection="column" gap={2}>
                <Box>
                  <Typography as="h3" variant="h3" mb={1}>
                    {card.title}
                  </Typography>
                  <Typography color="--colorsUtilityYin070">
                    {card.creator ?? "Creator unavailable"}
                    {card.year ? ` · ${card.year}` : ""}
                  </Typography>
                </Box>
                <Typography>{card.description ?? "Description unavailable from the source record."}</Typography>
                <Box display="grid" gap={1} gridTemplateColumns={["1fr", "repeat(2, minmax(0, 1fr))"]}>
                  {card.metadata.map((row) => (
                    <Box key={`${card.slug}-${row.label}`}>
                      <Typography as="div" variant="small" color="--colorsUtilityYin055" textTransform="uppercase">
                        {row.label}
                      </Typography>
                      <Typography as="div">{row.value}</Typography>
                    </Box>
                  ))}
                </Box>
                <Link href={card.sourceUrl ?? undefined} target="_blank" rel="noreferrer" icon="link" iconAlign="right">
                  View source
                </Link>
              </Box>
            </Box>
          </Tile>
        ))}
      </Box>
    </Box>
  );
}

interface RecommendationVisualProps {
  readonly imageUrl: string | null;
  readonly title: string;
}

/**
 * Shows a locally optimized recommendation image when available and falls back
 * to a readable placeholder when upstream artwork is missing.
 */
function RecommendationVisual({ imageUrl, title }: RecommendationVisualProps): JSX.Element {
  if (imageUrl) {
    return (
      <Box borderRadius="borderRadius400" overflow="hidden" height="320px">
        <Image alt={`${title} cover art`} src={imageUrl} width="100%" height="320px" />
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="--colorsUtilityMajor040"
      borderRadius="borderRadius400"
      height="320px"
      p={3}
    >
      <Typography textAlign="center" variant="h4">
        Artwork unavailable for {title}
      </Typography>
    </Box>
  );
}

/**
 * Creates a focused contact route with a direct email CTA and enough context to
 * signal what kinds of conversations Vishnu is open to.
 */
function ContactPage(): JSX.Element {
  return (
    <Box display="grid" gap={4} gridTemplateColumns={["1fr", "1fr", "minmax(0, 0.95fr) minmax(18rem, 0.85fr)"]}>
      <Tile orientation="vertical" roundness="large" p={[4, 5]} borderVariant="selected" borderWidth="borderWidth200">
        <Typography as="h1" variant="h2" mb={2}>
          Reach out
        </Typography>
        <Typography mb={3}>{contactCallout}</Typography>
        <Link bold href={`mailto:${emailAddress}`} icon="email" iconAlign="left">
          {emailAddress}
        </Link>
      </Tile>

      <Box display="flex" flexDirection="column" gap={3}>
        <Tile orientation="vertical" roundness="large" p={[3, 4]} variant="grey">
          <Typography as="h2" variant="h4" mb={2}>
            Best fit conversations
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1}>
            {contactAudiences.map((audience) => (
              <Pill key={audience}>{audience}</Pill>
            ))}
          </Box>
        </Tile>

        <Tile orientation="vertical" roundness="large" p={[3, 4]}>
          <Typography as="h2" variant="h4" mb={2}>
            Public handles
          </Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            {profileHandles.map((handle) => (
              <Link
                key={handle.platform}
                href={handle.href}
                target="_blank"
                rel="noreferrer"
                icon="link"
                iconAlign="right"
              >
                {handle.platform}: {handle.label}
              </Link>
            ))}
          </Box>
        </Tile>
      </Box>
    </Box>
  );
}