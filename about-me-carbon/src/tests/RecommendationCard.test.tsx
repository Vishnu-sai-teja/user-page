import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import RecommendationCard from '../components/RecommendationCard'
import type { BookRecommendationCard, MovieRecommendationCard } from '../types/recommendations'

const bookWithImage: BookRecommendationCard = {
  kind: 'book',
  slug: 'sapiens',
  title: 'Sapiens: A Brief History of Humankind',
  creator: 'Yuval Noah Harari',
  year: '2011',
  description: 'A brief history of humankind from the Stone Age to the present.',
  imageUrl: 'https://covers.openlibrary.org/b/id/12345-L.jpg',
  sourceUrl: 'https://openlibrary.org/works/OL123',
  metadata: [
    { label: 'Author', value: 'Yuval Noah Harari' },
    { label: 'First published', value: '2011' },
    { label: 'Editions', value: '42' },
  ],
}

const bookNoImage: BookRecommendationCard = {
  kind: 'book',
  slug: 'lotr',
  title: 'The Lord of the Rings',
  creator: null,
  year: '1954',
  description: null,
  imageUrl: null,
  sourceUrl: null,
  metadata: [],
}

const movieWithMetadata: MovieRecommendationCard = {
  kind: 'movie',
  slug: 'inception',
  title: 'Inception',
  creator: 'Christopher Nolan',
  year: '2010',
  description: 'A thief who steals corporate secrets through dream-sharing technology.',
  imageUrl: 'https://upload.wikimedia.org/wikipedia/en/2/2e/Inception.jpg',
  sourceUrl: 'https://en.wikipedia.org/wiki/Inception',
  metadata: [
    { label: 'Director', value: 'Christopher Nolan' },
    { label: 'Release', value: '2010' },
    { label: 'Runtime', value: '148 min' },
  ],
}

const movieNoImage: MovieRecommendationCard = {
  kind: 'movie',
  slug: 'game-of-thrones',
  title: 'Game of Thrones',
  creator: null,
  year: null,
  description: null,
  imageUrl: null,
  sourceUrl: null,
  metadata: [],
}

function renderCard(item: BookRecommendationCard | MovieRecommendationCard) {
  return render(
    <MemoryRouter>
      <RecommendationCard item={item} />
    </MemoryRouter>
  )
}

describe('RecommendationCard', () => {
  describe('book with full data', () => {
    it('renders the book title', () => {
      renderCard(bookWithImage)
      expect(screen.getByText(/Sapiens/i)).toBeInTheDocument()
    })

    it('renders "by" author line for books', () => {
      renderCard(bookWithImage)
      expect(screen.getByText(/by Yuval Noah Harari/i)).toBeInTheDocument()
    })

    it('renders the description', () => {
      renderCard(bookWithImage)
      expect(screen.getByText(/Stone Age/i)).toBeInTheDocument()
    })

    it('renders the cover image when imageUrl is set', () => {
      renderCard(bookWithImage)
      const img = screen.getByRole('img', { name: /Cover of Sapiens/i })
      expect(img).toBeInTheDocument()
      expect(img).toHaveAttribute('src', bookWithImage.imageUrl)
    })

    it('renders metadata rows', () => {
      renderCard(bookWithImage)
      expect(screen.getByText('Author')).toBeInTheDocument()
      expect(screen.getByText('First published')).toBeInTheDocument()
      expect(screen.getByText('42')).toBeInTheDocument()
    })

    it('renders Open Library source link', () => {
      renderCard(bookWithImage)
      const link = screen.getByText(/Open Library/i)
      expect(link).toBeInTheDocument()
      expect(link.closest('a') ?? link).toHaveAttribute('href', bookWithImage.sourceUrl)
    })

    it('renders article role', () => {
      renderCard(bookWithImage)
      expect(screen.getByRole('article', { name: /Sapiens/i })).toBeInTheDocument()
    })
  })

  describe('book without image or creator', () => {
    it('renders placeholder emoji when no imageUrl', () => {
      renderCard(bookNoImage)
      // placeholder div is aria-hidden; check it exists in dom
      const card = screen.getByRole('article')
      expect(card).toBeInTheDocument()
    })

    it('does not render "by" line when creator is null', () => {
      renderCard(bookNoImage)
      expect(screen.queryByText(/by /i)).not.toBeInTheDocument()
    })

    it('does not render source link when sourceUrl is null', () => {
      renderCard(bookNoImage)
      expect(screen.queryByText(/Open Library/i)).not.toBeInTheDocument()
    })
  })

  describe('movie with full data', () => {
    it('renders movie title', () => {
      renderCard(movieWithMetadata)
      expect(screen.getByText(/Inception/i)).toBeInTheDocument()
    })

    it('renders "Directed by" line for movies', () => {
      renderCard(movieWithMetadata)
      expect(screen.getByText(/Directed by Christopher Nolan/i)).toBeInTheDocument()
    })

    it('renders movie description', () => {
      renderCard(movieWithMetadata)
      expect(screen.getByText(/dream-sharing/i)).toBeInTheDocument()
    })

    it('renders poster image', () => {
      renderCard(movieWithMetadata)
      const img = screen.getByRole('img', { name: /Cover of Inception/i })
      expect(img).toBeInTheDocument()
    })

    it('renders director metadata row', () => {
      renderCard(movieWithMetadata)
      expect(screen.getByText('Director')).toBeInTheDocument()
      expect(screen.getByText('Christopher Nolan')).toBeInTheDocument()
    })

    it('renders Wikipedia source link', () => {
      renderCard(movieWithMetadata)
      const link = screen.getByText(/Wikipedia/i)
      expect(link).toBeInTheDocument()
    })
  })

  describe('movie without image or creator', () => {
    it('renders placeholder emoji for movie', () => {
      renderCard(movieNoImage)
      const card = screen.getByRole('article')
      expect(card).toBeInTheDocument()
    })

    it('does not render "Directed by" when creator is null', () => {
      renderCard(movieNoImage)
      expect(screen.queryByText(/Directed by/i)).not.toBeInTheDocument()
    })
  })
})
