import React from 'react'

interface ErrorBoundaryState {
  hasError: boolean
}

/**
 * Top-level React error boundary that catches unhandled component-tree errors
 * and renders a minimal recovery UI instead of leaving the visitor with a
 * blank page. Wrap around the full application tree so any sub-component
 * throw is caught at a single, consistent point.
 */
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px 24px', textAlign: 'center' }}>
          <h2>Something went wrong</h2>
          <p>An unexpected error occurred. Please refresh the page to continue.</p>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
