import { render, screen, within } from '@testing-library/react'

import App from '../App'

describe('About Me application', () => {
  it('renders the hero with Vishnu\'s identity and current role', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: /Vishnu Sai Teja Nagabandi/i }),
    ).toBeInTheDocument()
    expect(screen.getAllByText(/Graduate AI Engineer at SAGE/i)).toHaveLength(2)
    expect(
      screen.getByText(/grounded AI systems across multi-agent workflows, voice AI, and document intelligence/i),
    ).toBeInTheDocument()
  })

  it('renders all required page sections', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {
        name: /Background, interests, and current direction/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /Production AI, document systems, and ML infrastructure/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /Languages, frameworks, cloud, and libraries/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /Representative work across agents, generation, and medical imaging/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /Formal grounding in computer science/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /Reach out if the work overlaps/i,
      }),
    ).toBeInTheDocument()
  })

  it('shows the experience, skills, projects, and education content from the profile', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: /SAGE \| Graduate AI Engineer/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /PIBIT \| AI\/ML Engineer/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /AiDash \| Data Science Intern/i })).toBeInTheDocument()

    expect(screen.getByRole('heading', { name: /^Languages$/i })).toBeInTheDocument()
    expect(screen.getAllByText('LangGraph')).toHaveLength(2)
    expect(screen.getByText('Azure')).toBeInTheDocument()

    expect(screen.getByRole('heading', { name: /Multi-Agent Resume Parser/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Staffusion/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Skin Cancer Detection/i })).toBeInTheDocument()

    expect(
      screen.getByRole('heading', {
        name: /Indian Institute of Information Technology, Nagpur/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByText(/Score: 98.2%/i)).toBeInTheDocument()
  })

  it('renders sticky navigation anchors for the major sections', () => {
    render(<App />)

    const nav = screen.getByRole('navigation', { name: /Primary sections/i })

    expect(within(nav).getByRole('link', { name: /Summary/i })).toHaveAttribute(
      'href',
      '#summary',
    )
    expect(within(nav).getByRole('link', { name: /Projects/i })).toHaveAttribute(
      'href',
      '#projects',
    )
    expect(within(nav).getByRole('link', { name: /Contact/i })).toHaveAttribute(
      'href',
      '#contact',
    )
  })

  it('provides working contact links and CTA buttons', () => {
    render(<App />)

    expect(screen.getByRole('link', { name: /Email Vishnu/i })).toHaveAttribute(
      'href',
      'mailto:vishnusaiteja.3004@gmail.com',
    )
    expect(screen.getByRole('link', { name: /^GitHub$/i })).toHaveAttribute(
      'href',
      'https://github.com/Vishnu-sai-teja',
    )
    expect(screen.getByRole('link', { name: /^LinkedIn$/i })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/vishnu-sai-teja-nag',
    )
    expect(screen.getByRole('link', { name: /kaggle.com\/vishnusaitejan/i })).toHaveAttribute(
      'href',
      'https://www.kaggle.com/vishnusaitejan',
    )
    expect(screen.getByRole('link', { name: /\+91 8978044062/i })).toHaveAttribute(
      'href',
      'tel:+918978044062',
    )
  })
})
