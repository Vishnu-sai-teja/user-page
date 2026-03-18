import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import ProjectsPage from '../pages/ProjectsPage'

function renderProjectsPage() {
  render(
    <MemoryRouter>
      <ProjectsPage />
    </MemoryRouter>
  )
}

describe('ProjectsPage', () => {
  it("renders page heading", () => {
    renderProjectsPage()
    expect(screen.getByText(/What I've built/i)).toBeInTheDocument()
  })

  it('renders page overline', () => {
    renderProjectsPage()
    expect(screen.getByText(/^Projects$/i)).toBeInTheDocument()
  })

  it('renders Multi-Agent Resume Parser project', () => {
    renderProjectsPage()
    expect(screen.getByText(/Multi-Agent Resume Parser/i)).toBeInTheDocument()
  })

  it('renders Staffusion project', () => {
    renderProjectsPage()
    expect(screen.getByText(/Staffusion/i)).toBeInTheDocument()
  })

  it('renders Skin Cancer Detection project', () => {
    renderProjectsPage()
    expect(screen.getAllByText(/Skin Cancer Detection/i).length).toBeGreaterThan(0)
  })

  it('renders tech pills for LangChain project', () => {
    renderProjectsPage()
    expect(screen.getAllByText(/LangChain/i).length).toBeGreaterThan(0)
  })

  it('renders tech pills for PyTorch', () => {
    renderProjectsPage()
    expect(screen.getAllByText(/PyTorch/i).length).toBeGreaterThan(0)
  })

  it('renders project highlights', () => {
    renderProjectsPage()
    expect(screen.getAllByText(/LangGraph/i).length).toBeGreaterThan(0)
  })

  it('renders GAN details for skin cancer project', () => {
    renderProjectsPage()
    expect(screen.getAllByText(/GAN/i).length).toBeGreaterThan(0)
  })

  it('renders stable diffusion description for Staffusion', () => {
    renderProjectsPage()
    expect(screen.getAllByText(/stable diffusion/i).length).toBeGreaterThan(0)
  })

  it('renders all three project cards with role=article', () => {
    renderProjectsPage()
    const articles = screen.getAllByRole('article')
    expect(articles.length).toBe(3)
  })

  it('renders GitHub link for Staffusion project', () => {
    renderProjectsPage()
    const githubLink = screen.getByText(/View on GitHub/i)
    expect(githubLink).toBeInTheDocument()
    expect(githubLink.closest('a')).toHaveAttribute('href', 'https://github.com/Vishnu-sai-teja/staffusion')
  })
})
