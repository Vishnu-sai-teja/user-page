import Box from 'carbon-react/lib/components/box'
import Typography from 'carbon-react/lib/components/typography'
import RecommendationCard from '../components/RecommendationCard'
import recommendationsData from '../data/recommendations.json'
import type { RecommendationsPageData } from '../types/recommendations'
import { PageOverline } from '../components/styled'

const data = recommendationsData as RecommendationsPageData

function RecommendationsPage() {
  return (
    <Box py={6} px={3}>
      <Box maxWidth="860px" mx="auto">
        <PageOverline>Recommendations</PageOverline>
        <Typography variant="h1" mb={2}>
          What I return to
        </Typography>
        <Box maxWidth="560px">
          <Typography variant="p" color="blackOpacity65" mb={6}>
            High-conviction picks from books and film — not a reading list or a watchlist, but the ones worth going back to.
          </Typography>
        </Box>

        {/* Book Recommendations */}
        <Box mb={6}>
          <Typography variant="h2" mb={4}>
            Book Recommendations
          </Typography>
          {data.books.length === 0 ? (
            <Typography variant="p" color="blackOpacity55">
              No book recommendations available yet.
            </Typography>
          ) : (
            data.books.map((book) => (
              <RecommendationCard key={book.slug} item={book} />
            ))
          )}
        </Box>

        {/* Movie Recommendations */}
        <Box mb={4}>
          <Typography variant="h2" mb={4}>
            Movie Recommendations
          </Typography>
          {data.movies.length === 0 ? (
            <Typography variant="p" color="blackOpacity55">
              No movie recommendations available yet.
            </Typography>
          ) : (
            data.movies.map((movie) => (
              <RecommendationCard key={movie.slug} item={movie} />
            ))
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default RecommendationsPage
