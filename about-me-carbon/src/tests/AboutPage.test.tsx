import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import AboutPage from '../pages/AboutPage'

function renderAboutPage() {
  render(
    <MemoryRouter>
      <AboutPage />
    </MemoryRouter>
  )
}

describe('AboutPage', () => {
  it('renders page heading', () => {
    renderAboutPage()
    expect(screen.getByText(/Who I am/i)).toBeInTheDocument()
  })

  it('renders overline label', () => {
    renderAboutPage()
    expect(screen.getByText(/^About$/i)).toBeInTheDocument()
  })

  it('renders Vishnu name in narrative', () => {
    renderAboutPage()
    expect(screen.getByText(/Vishnu Sai Teja Nagabandi/i)).toBeInTheDocument()
  })

  it('renders SAGE role description', () => {
    renderAboutPage()
    expect(screen.getAllByText(/SAGE/i).length).toBeGreaterThan(0)
  })

  it('renders "What I focus on" section', () => {
    renderAboutPage()
    expect(screen.getByText(/What I focus on/i)).toBeInTheDocument()
  })

  it('renders "Outside the work" section', () => {
    renderAboutPage()
    expect(screen.getByText(/Outside the work/i)).toBeInTheDocument()
  })

  it('renders links to experience and projects pages', () => {
    renderAboutPage()
    const links = screen.getAllByRole('link')
    const expLink = links.find((l) => l.getAttribute('href') === '/experience')
    const projLink = links.find((l) => l.getAttribute('href') === '/projects')
    expect(expLink).toBeTruthy()
    expect(projLink).toBeTruthy()
  })

  it('mentions IIIT Nagpur education', () => {
    renderAboutPage()
    expect(screen.getByText(/IIIT Nagpur/i)).toBeInTheDocument()
  })

  it('mentions multi-agent systems and LLM-adjacent topics', () => {
    renderAboutPage()
    expect(screen.getByText(/multi-agent/i)).toBeInTheDocument()
  })
})
