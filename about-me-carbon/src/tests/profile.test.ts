import { profilePageData } from '../content/profile'
import {
  buildExperienceMeta,
  buildProjectCardLabel,
  buildSectionHref,
  countSkillItems,
} from '../utils/profile'

describe('profile helpers', () => {
  it('builds in-page section links', () => {
    expect(buildSectionHref('projects')).toBe('#projects')
    expect(buildSectionHref('contact')).toBe('#contact')
  })

  it('formats experience metadata into one scan line', () => {
    expect(buildExperienceMeta(profilePageData.experience[0])).toBe(
      'October 2025 - Present | Bangalore, India',
    )
  })

  it('creates descriptive project labels for cards', () => {
    expect(buildProjectCardLabel(profilePageData.projects[0])).toBe(
      'Multi-Agent Resume Parser. Built with LangChain, LangGraph, LangSmith, Python.',
    )
  })

  it('counts the total number of listed skills', () => {
    expect(countSkillItems(profilePageData.skillGroups)).toBe(20)
  })
})