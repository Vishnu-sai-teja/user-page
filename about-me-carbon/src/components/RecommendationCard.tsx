import { Fragment } from 'react'
import Box from 'carbon-react/lib/components/box'
import Typography from 'carbon-react/lib/components/typography'
import styled from 'styled-components'
import type {
  BookRecommendationCard,
  MovieRecommendationCard,
} from '../types/recommendations'

type RecommendationCardProps = {
  item: BookRecommendationCard | MovieRecommendationCard
}

const CardWrapper = styled.div`
  display: flex;
  gap: 24px;
  padding: 24px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  margin-bottom: 16px;
  align-items: flex-start;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 16px;
  }
`

const CoverImage = styled.img`
  width: 100px;
  flex-shrink: 0;
  border-radius: 4px;
  object-fit: cover;
  aspect-ratio: 2 / 3;
  background: #f0f0f0;

  @media (max-width: 600px) {
    width: 80px;
  }
`

const CoverPlaceholder = styled.div`
  width: 100px;
  flex-shrink: 0;
  border-radius: 4px;
  background: linear-gradient(135deg, #e8e0f0 0%, #d0c8e8 100%);
  aspect-ratio: 2 / 3;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8246af;
  font-size: 28px;

  @media (max-width: 600px) {
    width: 80px;
  }
`

const MetadataList = styled.dl`
  margin: 8px 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 8px;
  row-gap: 2px;
`

const MetaDt = styled.dt`
  font-size: 12px;
  font-weight: 600;
  color: #737373;
  white-space: nowrap;

  &::after {
    content: ':';
  }
`

const MetaDd = styled.dd`
  font-size: 12px;
  color: #404040;
  margin: 0;
`

function RecommendationCard({ item }: RecommendationCardProps) {
  const isBook = item.kind === 'book'
  const emoji = isBook ? '📚' : '🎬'

  return (
    <CardWrapper role="article" aria-label={item.title}>
      {item.imageUrl ? (
        <CoverImage
          src={item.imageUrl}
          alt={`Cover of ${item.title}`}
          loading="lazy"
          width={100}
        />
      ) : (
        <CoverPlaceholder aria-hidden="true">{emoji}</CoverPlaceholder>
      )}

      <Box flex="1" minWidth={0}>
        <Typography variant="h4" mb={1}>
          {item.title}
        </Typography>

        {item.creator && (
          <Typography variant="p" color="blackOpacity65" mb={1} fontWeight="500">
            {isBook ? `by ${item.creator}` : `Directed by ${item.creator}`}
          </Typography>
        )}

        {item.description && (
          <Typography variant="p" color="blackOpacity74" mb={1} fontSize="14px">
            {item.description}
          </Typography>
        )}

        {item.metadata.length > 0 && (
          <MetadataList>
            {item.metadata.map((row) => (
              <Fragment key={row.label}>
                <MetaDt>{row.label}</MetaDt>
                <MetaDd>{row.value}</MetaDd>
              </Fragment>
            ))}
          </MetadataList>
        )}

        {item.sourceUrl && (
          <Box mt={2}>
            <a
              href={item.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '12px', color: '#0077C8', textDecoration: 'underline' }}
            >
              {isBook ? 'Open Library →' : 'Wikipedia →'}
            </a>
          </Box>
        )}
      </Box>
    </CardWrapper>
  )
}

export default RecommendationCard
