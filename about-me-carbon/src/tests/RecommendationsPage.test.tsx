import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi, afterEach } from 'vitest'

// Inline data inside factory - safe from vi.mock hoisting
vi.mock('../data/recommendations.json', () => ({
  default: {
    books: [
      {
        kind: 'book',
        slug: 'sapiens',
        title: 'Sapiens: A Brief History of Humankind',
        creator: 'Yuval Noah Harari',
        year: '2011',
        description: 'A brief history of humankind.',
        imageUrl: 'https://covers.openlibrary.org/b/id/12345-L.jpg',
        sourceUrl: 'https://openlibrary.org/works/OL123',
        metadata: [{ label: 'Author', value: 'Yuval Noah Harari' }],
      },
      {
        kind: 'book',
        slug: 'lotr',
        title: 'The Lord of the Rings',
        creator: 'J.R.R. Tolkien',
        year: '1954',
        description: null,
        imageUrl: null,
        sourceUrl: null,
        metadata: [],
      },
    ],
    movies: [
      {
        kind: 'movie',
        slug: 'avengers-endgame',
        title: 'Avengers: Endgame',
        creator: 'Anthony Russo',
        year: '2019',
        description: 'The Avengers assemble one last time.',
        imageUrl: 'https://example.com/endgame.jpg',
        sourceUrl: 'https://en.wikipedia.org/wiki/Avengers:_Endgame',
        metadata: [
          { label: 'Director', value: 'Anthony Russo' },
          { label: 'Release', value: '2019' },
        ],
      },
    ],
  },
}))

import RecommendationsPage from '../pages/RecommendationsPage'

function renderPage() {
  render(
    <MemoryRouter>
      <RecommendationsPage />
    </MemoryRouter>
  )
}

describe('RecommendationsPage', () => {
  it('renders page heading', () => {
    renderPage()
    expect(screen.getByText(/What I return to/i)).toBeInTheDocument()
  })

  it('renders page overline with exact text', () => {
    renderPage()
    // Use exact string to avoid matching 'Book Recommendations' / 'Movie Recommendations'
    expect(screen.getByText('Recommendations')).toBeInTheDocument()
  })

  it('renders Book Recommendations section heading', () => {
    renderPage()
    expect(screen.getByRole('heading', { name: 'Book Recommendations' })).toBeInTheDocument()
  })

  it('renders Movie Recommendations section heading', () => {
    renderPage()
    expect(screen.getByRole('heading', { name: 'Movie Recommendations' })).toBeInTheDocument()
  })

  it('renders Sapiens book title', () => {
    renderPage()
    expect(screen.getByText(/Sapiens: A Brief History of Humankind/i)).toBeInTheDocument()
  })

  it('renders Lord of the Rings book title', () => {
    renderPage()
    expect(screen.getByText(/The Lord of the Rings/i)).toBeInTheDocument()
  })

  it('renders Avengers Endgame movie title', () => {
    renderPage()
    expect(screen.getByText(/Avengers: Endgame/i)).toBeInTheDocument()
  })

  it('renders intro copy about returning to', () => {
    renderPage()
    expect(screen.getByText(/High-conviction picks/i)).toBeInTheDocument()
  })
})

describe('RecommendationsPage with empty data', () => {
  afterEach(() => {
    vi.resetModules()
  })

  it('renders empty state messages when no books or movies', async () => {
    vi.resetModules()
    vi.doMock('../data/recommendations.json', () => ({
      default: { books: [], movies: [] },
    }))
    const { default: RecommendationsPageFresh } = await import('../pages/RecommendationsPage')
    render(
      <MemoryRouter>
        <RecommendationsPageFresh />
      </MemoryRouter>
    )
    expect(screen.getByText(/No book recommendations available yet/i)).toBeInTheDocument()
    expect(screen.getByText(/No movie recommendations available yet/i)).toBeInTheDocument()
  })
})
