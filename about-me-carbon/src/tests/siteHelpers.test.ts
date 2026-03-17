import { describe, expect, it } from 'vitest'

import { knowledgeEntries, projectEntries } from '../siteContent'
import {
  countKnowledgeEntries,
  filterKnowledgeEntries,
  filterProjects,
} from '../siteHelpers'

describe('siteHelpers', () => {
  it('returns all projects when the search query is empty', () => {
    expect(filterProjects(projectEntries, '')).toEqual(projectEntries)
  })

  it('matches projects by technology and focus terms', () => {
    expect(filterProjects(projectEntries, 'langgraph')).toHaveLength(1)
    expect(filterProjects(projectEntries, 'medical')).toHaveLength(1)
  })

  it('filters knowledge entries by stream and query', () => {
    const bookmarkResults = filterKnowledgeEntries(knowledgeEntries, {
      kind: 'bookmark',
      query: 'protocol',
    })
    const recommendationResults = filterKnowledgeEntries(knowledgeEntries, {
      kind: 'recommendation',
      query: 'architecture',
    })
    const writingResults = filterKnowledgeEntries(knowledgeEntries, {
      kind: 'writing',
      query: 'latency',
    })

    expect(bookmarkResults).toHaveLength(1)
    expect(bookmarkResults[0]?.kind).toBe('bookmark')
    expect(recommendationResults).toHaveLength(1)
    expect(recommendationResults[0]?.kind).toBe('recommendation')
    expect(writingResults).toHaveLength(1)
    expect(writingResults[0]?.kind).toBe('writing')
  })

  it('counts note streams for tab labels', () => {
    expect(countKnowledgeEntries(knowledgeEntries)).toEqual({
      writing: 3,
      bookmark: 4,
      recommendation: 3,
    })
  })
})