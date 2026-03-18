import Box from 'carbon-react/lib/components/box'
import Typography from 'carbon-react/lib/components/typography'
import { PageOverline } from '../components/styled'

function AboutPage() {
  return (
    <Box py={6} px={3}>
      <Box maxWidth="720px" mx="auto">
        <PageOverline>About</PageOverline>
        <Typography variant="h1" mb={5}>
          Who I am
        </Typography>

        <Typography variant="p" mb={4}>
          I'm Vishnu Sai Teja Nagabandi — a Graduate AI Engineer at SAGE in Bangalore, working on the kinds of problems that sit right at the edge of what language models can reliably do in production.
        </Typography>

        <Typography variant="p" mb={4}>
          My work at SAGE centres on building production-grade AI systems: ReWOO-based agents that connect MCP server tools to ERP and CRM platforms for real-time context retrieval, and low-latency voice agents that let AR professionals query live CRM and ERP data during calls. The challenge isn't just making a model produce the right output in isolation — it's making a system that holds together under real operational conditions.
        </Typography>

        <Typography variant="p" mb={4}>
          I came to this work through a degree in Computer Science at IIIT Nagpur (B.Tech, graduated May 2025, GPA 8.55), where I built a strong foundation in the mathematics and systems thinking that underpins applied machine learning. But the learning that shaped me most happened in the work itself: at PIBIT, I developed layout models for document and image analysis, built YOLO-based OCR systems for insurance document processing, and designed Azure-based training pipelines with real-time model performance monitoring. At AiDash, I built an end-to-end asset geotagging pipeline from street-view imagery using object detection, depth and height estimation, and asynchronous parallel processing.
        </Typography>

        <Typography variant="h3" mb={3}>
          What I focus on
        </Typography>

        <Typography variant="p" mb={4}>
          My technical interests cluster around multi-agent systems, retrieval-augmented generation, voice AI, document intelligence, and computer vision. I'm drawn to the infrastructure problems as much as the model problems — how do you monitor a model in production? How do you design a pipeline that degrades gracefully instead of silently failing? How do you build an agent that knows when to retrieve context versus when to reason directly?
        </Typography>

        <Typography variant="p" mb={4}>
          I think the most interesting work in AI right now happens at the boundary between a capable base model and a specific operational constraint. The model is rarely the bottleneck. The bottleneck is almost always the surrounding system.
        </Typography>

        <Typography variant="h3" mb={3}>
          Outside the work
        </Typography>

        <Typography variant="p" mb={4}>
          I read widely — history, mathematics, fiction, mystery. I'm drawn to books that take complexity seriously without becoming inaccessible. The Man Who Knew Infinity stayed with me because it is a story about mathematical intuition colliding with institutional scepticism. Sapiens because it rewires how you think about the scale of human history. Sherlock Holmes because good deductive reasoning is always instructive, even in fiction.
        </Typography>

        <Typography variant="p" mb={4}>
          I speak English, Hindi, and Telugu fluently, and I'm working on German. I believe understanding how different languages structure thought is genuinely useful for building systems that have to communicate across contexts.
        </Typography>

        <Typography variant="p">
          If you want to understand my professional trajectory in more detail, the <a href="/experience" style={{ color: '#0077C8' }}>Experience</a> page covers the roles and outcomes. If you want to see what I’ve built independently, the <a href="/projects" style={{ color: '#0077C8' }}>Projects</a> page is the right place to start.
        </Typography>
      </Box>
    </Box>
  )
}

export default AboutPage
