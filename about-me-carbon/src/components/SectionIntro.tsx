interface SectionIntroProps {
  readonly eyebrow: string
  readonly title: string
  readonly summary: string
}

/**
 * Renders the shared section heading pattern so every major block keeps a
 * consistent Carbon-native rhythm and hierarchy.
 */
export function SectionIntro({ eyebrow, title, summary }: SectionIntroProps) {
  return (
    <div className="section-intro-block">
      <p className="cds--label-01 section-eyebrow">{eyebrow}</p>
      <h2 className="cds--productive-heading-04 section-title">{title}</h2>
      <p className="cds--body-long-01 section-summary">{summary}</p>
    </div>
  )
}
