import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import App, { SiteApp } from '../App'
import { ErrorBoundary } from '../App'

function renderRoute(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <SiteApp />
    </MemoryRouter>,
  )
}

describe('SiteApp', () => {
  it('renders through the hash-router wrapper used in production', () => {
    window.history.replaceState({}, '', '/#/')

    render(<App />)

    expect(
      screen.getByRole('heading', { name: /Vishnu Sai Teja Nagabandi/i }),
    ).toBeInTheDocument()
  })

  it('renders the home page with the main thesis and site structure', () => {
    renderRoute('/')

    expect(
      screen.getByRole('heading', { name: /Vishnu Sai Teja Nagabandi/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/I build grounded AI systems for voice, documents, and multi-agent workflows/i),
    ).toBeInTheDocument()
    expect(screen.getByText(/A small system, not a resume dump/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Email Vishnu/i })).toBeInTheDocument()
  })

  it('renders the about page and expands experience details', async () => {
    const user = userEvent.setup()

    renderRoute('/about')

    expect(
      screen.getByRole('heading', { name: /I like AI work that survives contact with reality/i }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /SAGE \| Graduate AI Engineer/i }))

    expect(
      screen.getByText(/Designed and productionized ReWOO-based agents/i),
    ).toBeInTheDocument()
    expect(screen.getByText(/Languages, frameworks, and working tools/i)).toBeInTheDocument()
  })

  it('filters the projects page and switches to the table view', async () => {
    const user = userEvent.setup()

    renderRoute('/projects')

    const search = screen.getByPlaceholderText(/Search projects/i)
    await user.type(search, 'GANs')

    expect(screen.getByRole('heading', { name: /Skin Cancer Detection/i })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: /Staffusion/i })).not.toBeInTheDocument()

    await user.click(screen.getByRole('tab', { name: /table/i }))

    const projectTable = screen.getByRole('table', { name: /Project index/i })

    expect(projectTable).toBeInTheDocument()
    expect(within(projectTable).getByText(/Skin Cancer Detection/i)).toBeInTheDocument()
  })

  it('shows an empty state when project search has no matches', async () => {
    const user = userEvent.setup()

    renderRoute('/projects')

    await user.type(screen.getByPlaceholderText(/Search projects/i), 'nonexistent')

    expect(screen.getByText(/No matching projects/i)).toBeInTheDocument()
  })

  it('renders the notes page, filters bookmarks, and shows recommendations', async () => {
    const user = userEvent.setup()

    renderRoute('/notes')

    expect(
      screen.getByRole('heading', { name: /Inputs, outputs, and references worth keeping nearby/i }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('tab', { name: /bookmarks/i }))
    await user.type(screen.getByPlaceholderText(/Search notes/i), 'protocol')

    const bookmarkTable = screen.getByRole('table', { name: /Current inputs/i })
    expect(within(bookmarkTable).getByText(/Model Context Protocol/i)).toBeInTheDocument()

    await user.clear(screen.getByPlaceholderText(/Search notes/i))
    await user.click(screen.getByRole('tab', { name: /recommendations/i }))

    expect(screen.getByText(/Designing Data-Intensive Applications/i)).toBeInTheDocument()
  })

  it('shows a stream-specific empty state on the notes page', async () => {
    const user = userEvent.setup()

    renderRoute('/notes')

    await user.click(screen.getByRole('tab', { name: /recommendations/i }))
    await user.type(screen.getByPlaceholderText(/Search notes/i), 'no results here')

    expect(screen.getByText(/No matches in this stream/i)).toBeInTheDocument()
  })

  it('renders the not-found route with a way back home', () => {
    renderRoute('/missing')

    expect(screen.getByRole('heading', { name: /That page does not exist here/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Return home/i })).toBeInTheDocument()
  })
})

describe('ErrorBoundary', () => {
  function Bomb(): never {
    throw new Error('test explosion')
  }

  it('shows the fallback UI when a child throws', async () => {
    const user = userEvent.setup()
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>,
    )

    expect(screen.getByRole('heading', { name: /Something went wrong/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Try again/i })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /Try again/i }))

    consoleErrorSpy.mockRestore()
  })
})