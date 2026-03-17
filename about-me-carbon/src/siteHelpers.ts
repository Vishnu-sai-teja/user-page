import type { KnowledgeEntry, ProjectEntry } from './siteContent'

type FilterKnowledgeOptions = {
  readonly kind: KnowledgeEntry['kind']
  readonly query: string
}

type KnowledgeCounts = Record<KnowledgeEntry['kind'], number>

function normalizeSearchValue(value: string): string {
  return value.trim().toLowerCase()
}

function includesSearchValue(candidate: string, normalizedQuery: string): boolean {
  return candidate.toLowerCase().includes(normalizedQuery)
}

/**
 * Filters the public project index using a visitor query across titles,
 * summaries, focus areas, technology tags, and evidence lines.
 */
export function filterProjects(
  projects: readonly ProjectEntry[],
  query: string,
): readonly ProjectEntry[] {
  const normalizedQuery = normalizeSearchValue(query)

  if (normalizedQuery === '') {
    return projects
  }

  return projects.filter((project) => {
    const searchableValues = [
      project.title,
      project.summary,
      project.focus,
      project.year,
      ...project.technologies,
      ...project.evidence,
    ]

    return searchableValues.some((value) => includesSearchValue(value, normalizedQuery))
  })
}

/**
 * Filters the notes collections by stream type and visitor query so the notes
 * page can keep bookmarks, recommendations, and writing distinct.
 */
export function filterKnowledgeEntries(
  entries: readonly KnowledgeEntry[],
  options: FilterKnowledgeOptions,
): readonly KnowledgeEntry[] {
  const normalizedQuery = normalizeSearchValue(options.query)

  return entries.filter((entry) => {
    if (entry.kind !== options.kind) {
      return false
    }

    if (normalizedQuery === '') {
      return true
    }

    const baseSearchValues = [entry.title, entry.summary, ...entry.tags]

    if (entry.kind === 'bookmark') {
      return [...baseSearchValues, entry.source].some((value) => includesSearchValue(value, normalizedQuery))
    }

    if (entry.kind === 'recommendation') {
      return [...baseSearchValues, entry.creator].some((value) => includesSearchValue(value, normalizedQuery))
    }

    return baseSearchValues.some((value) => includesSearchValue(value, normalizedQuery))
  })
}

/**
 * Counts entries per notes stream so the tab labels can communicate volume and
 * make the site structure legible at a glance.
 */
export function countKnowledgeEntries(entries: readonly KnowledgeEntry[]): KnowledgeCounts {
  return entries.reduce<KnowledgeCounts>(
    (counts, entry) => ({
      ...counts,
      [entry.kind]: counts[entry.kind] + 1,
    }),
    {
      writing: 0,
      bookmark: 0,
      recommendation: 0,
    },
  )
}