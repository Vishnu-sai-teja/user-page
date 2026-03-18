import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, useLocation } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import AppShell from '../components/AppShell'

function LocationDisplay() {
  const location = useLocation()
  return <div data-testid="location">{location.pathname}</div>
}

function TestWrapper({ initialPath = '/' }) {
  return (
    <MemoryRouter initialEntries={[initialPath]}>
      <AppShell>
        <LocationDisplay />
        <div>Page content</div>
      </AppShell>
    </MemoryRouter>
  )
}

describe('AppShell', () => {
  it('renders site title', () => {
    render(<TestWrapper />)
    expect(screen.getByText(/Vishnu Nagabandi/i)).toBeInTheDocument()
  })

  it('renders all navigation links', () => {
    render(<TestWrapper />)
    expect(screen.getAllByText(/Home/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/About/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Experience/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Projects/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Recommendations/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Contact/i).length).toBeGreaterThan(0)
  })

  it('renders children content', () => {
    render(<TestWrapper />)
    expect(screen.getByText('Page content')).toBeInTheDocument()
  })

  it('renders footer', () => {
    render(<TestWrapper />)
    expect(screen.getByText(/Carbon Design System/i)).toBeInTheDocument()
  })

  it('marks active nav item with aria-current', () => {
    render(<TestWrapper initialPath="/about" />)
    const aboutLinks = screen.getAllByText(/^About$/i)
    const activeLink = aboutLinks.find(
      (el) => el.closest('a')?.getAttribute('aria-current') === 'page'
    )
    expect(activeLink).toBeTruthy()
  })

  it('toggles mobile menu on button click', () => {
    render(<TestWrapper />)
    const menuBtn = screen.getByTestId('mobile-menu-btn')
    expect(menuBtn).toBeInTheDocument()
    fireEvent.click(menuBtn)
    expect(screen.getByTestId('mobile-menu-btn').getAttribute('aria-label')).toBe('Close navigation menu')
    // close it
    fireEvent.click(screen.getByTestId('mobile-menu-btn'))
    expect(screen.getByTestId('mobile-menu-btn').getAttribute('aria-label')).toBe('Open navigation menu')
  })

  it('navigates when clicking site title', () => {
    render(<TestWrapper initialPath="/about" />)
    const titleLink = screen.getByText(/Vishnu Nagabandi/i)
    fireEvent.click(titleLink)
    expect(screen.getByTestId('location').textContent).toBe('/')
  })

  it('navigates when clicking a desktop nav link', () => {
    render(<TestWrapper initialPath="/" />)
    // find desktop nav link for About (DesktopLinks renders them)
    const desktopLinks = document.querySelectorAll('nav[aria-label="Site navigation"] a')
    const aboutLink = Array.from(desktopLinks).find(
      (el) => el.textContent?.includes('About')
    ) as HTMLElement
    expect(aboutLink).toBeTruthy()
    fireEvent.click(aboutLink)
    expect(screen.getByTestId('location').textContent).toBe('/about')
  })

  it('navigates when clicking a mobile nav link', () => {
    render(<TestWrapper initialPath="/" />)
    // open mobile menu using data-testid
    const menuBtn = screen.getByTestId('mobile-menu-btn')
    fireEvent.click(menuBtn)
    // find mobile nav link for Experience
    const mobileLinks = document.querySelectorAll('nav[aria-label="Mobile navigation"] a')
    const expLink = Array.from(mobileLinks).find(
      (el) => el.textContent?.includes('Experience')
    ) as HTMLElement
    expect(expLink).toBeTruthy()
    fireEvent.click(expLink)
    expect(screen.getByTestId('location').textContent).toBe('/experience')
  })
})
