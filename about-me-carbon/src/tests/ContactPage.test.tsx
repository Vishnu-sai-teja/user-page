import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import ContactPage from '../pages/ContactPage'

function renderContactPage() {
  render(
    <MemoryRouter>
      <ContactPage />
    </MemoryRouter>
  )
}

describe('ContactPage', () => {
  it('renders page heading', () => {
    renderContactPage()
    expect(screen.getByText(/Get in touch/i)).toBeInTheDocument()
  })

  it('renders page overline', () => {
    renderContactPage()
    expect(screen.getByText(/^Contact$/i)).toBeInTheDocument()
  })

  it('renders email link', () => {
    renderContactPage()
    const emailLink = screen.getByRole('link', { name: /vishnusaiteja\.3004@gmail\.com/i })
    expect(emailLink).toBeInTheDocument()
    expect(emailLink).toHaveAttribute('href', 'mailto:vishnusaiteja.3004@gmail.com')
  })

  it('renders GitHub link', () => {
    renderContactPage()
    const ghLink = screen.getByRole('link', { name: /GitHub/i })
    expect(ghLink).toBeInTheDocument()
    expect(ghLink).toHaveAttribute('href', 'https://github.com/Vishnu-sai-teja')
  })

  it('renders LinkedIn link', () => {
    renderContactPage()
    const liLink = screen.getByRole('link', { name: /LinkedIn/i })
    expect(liLink).toBeInTheDocument()
    expect(liLink.getAttribute('href')).toContain('linkedin')
  })

  it('renders Kaggle link', () => {
    renderContactPage()
    const kgLink = screen.getByRole('link', { name: /Kaggle/i })
    expect(kgLink).toBeInTheDocument()
    expect(kgLink.getAttribute('href')).toContain('kaggle')
  })

  it('renders closing statement about Bangalore', () => {
    renderContactPage()
    expect(screen.getByText(/Bangalore/i)).toBeInTheDocument()
  })

  it('external links have target _blank and rel noopener', () => {
    renderContactPage()
    const ghLink = screen.getByRole('link', { name: /GitHub/i })
    expect(ghLink).toHaveAttribute('target', '_blank')
    expect(ghLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('email link does not have target _blank', () => {
    renderContactPage()
    const emailLink = screen.getByRole('link', { name: /vishnusaiteja\.3004@gmail\.com/i })
    expect(emailLink).not.toHaveAttribute('target', '_blank')
  })
})
