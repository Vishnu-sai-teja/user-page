import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import { ErrorBoundary } from '../components/ErrorBoundary'

/**
 * A child component that unconditionally throws during render so we can exercise
 * the error-caught branches of ErrorBoundary in an isolated, predictable way.
 */
function ThrowOnRender(): never {
  throw new Error('Test render error')
}

describe('ErrorBoundary', () => {
  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <p>Normal content</p>
      </ErrorBoundary>,
    )

    expect(screen.getByText('Normal content')).toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('renders the fallback UI when a child throws during render', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <ErrorBoundary>
        <ThrowOnRender />
      </ErrorBoundary>,
    )

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(
      screen.getByText(/something went wrong\. please refresh the page\./i),
    ).toBeInTheDocument()
    expect(consoleSpy).toHaveBeenCalled()

    consoleSpy.mockRestore()
  })
})
