import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, useNavigate } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import HomePage from '../pages/HomePage'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...actual,
    useNavigate: vi.fn(),
  }
})

function renderHomePage() {
  const mockNavigate = vi.fn()
  vi.mocked(useNavigate).mockReturnValue(mockNavigate)
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  )
  return { mockNavigate }
}

describe('HomePage', () => {
  it('renders name headline', () => {
    renderHomePage()
    expect(screen.getByText(/Vishnu Sai Teja/i)).toBeInTheDocument()
  })

  it('renders current role', () => {
    renderHomePage()
    expect(screen.getAllByText(/Graduate AI Engineer/i).length).toBeGreaterThan(0)
  })

  it('renders thesis statement about SAGE', () => {
    renderHomePage()
    expect(screen.getAllByText(/SAGE/i).length).toBeGreaterThan(0)
  })

  it('renders "how this place works" section', () => {
    renderHomePage()
    expect(screen.getByText(/how this place works/i)).toBeInTheDocument()
  })

  it('renders all content stream cards in explore section', () => {
    renderHomePage()
    expect(screen.getAllByText(/About/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Experience/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Projects/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Recommendations/i).length).toBeGreaterThan(0)
  })

  it('clicking "Read more about me" navigates to /about', () => {
    const { mockNavigate } = renderHomePage()
    fireEvent.click(screen.getByText(/Read more about me/i))
    expect(mockNavigate).toHaveBeenCalledWith('/about')
  })

  it('clicking "Get in touch" navigates to /contact', () => {
    const { mockNavigate } = renderHomePage()
    fireEvent.click(screen.getByText(/Get in touch/i))
    expect(mockNavigate).toHaveBeenCalledWith('/contact')
  })

  it('clicking an explore card navigates to that route', () => {
    const { mockNavigate } = renderHomePage()
    const navCards = document.querySelectorAll('a[aria-label]')
    const projectsCard = Array.from(navCards).find((el) =>
      el.getAttribute('aria-label')?.includes('Projects')
    ) as HTMLElement
    expect(projectsCard).toBeTruthy()
    fireEvent.click(projectsCard)
    expect(mockNavigate).toHaveBeenCalledWith('/projects')
  })
})
