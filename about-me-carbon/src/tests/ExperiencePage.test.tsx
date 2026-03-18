import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import ExperiencePage from '../pages/ExperiencePage'

function renderExperiencePage() {
  render(
    <MemoryRouter>
      <ExperiencePage />
    </MemoryRouter>
  )
}

describe('ExperiencePage', () => {
  it('renders page heading', () => {
    renderExperiencePage()
    expect(screen.getByText(/Career timeline/i)).toBeInTheDocument()
  })

  it('renders page overline', () => {
    renderExperiencePage()
    expect(screen.getByText(/^Experience$/i)).toBeInTheDocument()
  })

  it('renders SAGE role', () => {
    renderExperiencePage()
    expect(screen.getAllByText(/SAGE/i).length).toBeGreaterThan(0)
    expect(screen.getByText(/Graduate AI Engineer/i)).toBeInTheDocument()
  })

  it('renders PIBIT roles', () => {
    renderExperiencePage()
    const pibitEntries = screen.getAllByText(/PIBIT/i)
    expect(pibitEntries.length).toBeGreaterThan(1)
  })

  it('renders AiDash role', () => {
    renderExperiencePage()
    expect(screen.getByText(/AiDash/i)).toBeInTheDocument()
    expect(screen.getAllByText(/Data Science Intern/i).length).toBeGreaterThan(0)
  })

  it('renders skills section', () => {
    renderExperiencePage()
    expect(screen.getByText(/^Skills$/i)).toBeInTheDocument()
  })

  it('renders Python skill', () => {
    renderExperiencePage()
    const pythonPills = screen.getAllByText(/Python/i)
    expect(pythonPills.length).toBeGreaterThan(0)
  })

  it('renders LangChain skill', () => {
    renderExperiencePage()
    expect(screen.getAllByText(/LangChain/i).length).toBeGreaterThan(0)
  })

  it('renders education section', () => {
    renderExperiencePage()
    expect(screen.getByText(/Education/i)).toBeInTheDocument()
    expect(screen.getByText(/IIIT Nagpur/i)).toBeInTheDocument()
    expect(screen.getByText(/8\.55/i)).toBeInTheDocument()
  })

  it('renders role highlights for SAGE', () => {
    renderExperiencePage()
    expect(screen.getByText(/ReWOO/i)).toBeInTheDocument()
  })

  it('renders role highlights for PIBIT engineer', () => {
    renderExperiencePage()
    expect(screen.getAllByText(/YOLO/i).length).toBeGreaterThan(0)
  })

  it('renders AiDash highlight about geotagging', () => {
    renderExperiencePage()
    expect(screen.getByText(/geotagging/i)).toBeInTheDocument()
  })

  it('renders date badges', () => {
    renderExperiencePage()
    expect(screen.getAllByText(/October/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/April 2024/i).length).toBeGreaterThan(0)
  })
})
