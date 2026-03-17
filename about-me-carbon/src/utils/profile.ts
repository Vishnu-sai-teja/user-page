import type {
  ExperienceEntry,
  ProjectEntry,
  SectionId,
  SkillGroup,
} from '../content/profile'

/**
 * Converts a section identifier into the in-page anchor used by the sticky
 * navigation and hero call-to-action buttons.
 */
export function buildSectionHref(sectionId: SectionId): string {
  return `#${sectionId}`
}

/**
 * Formats the short metadata line shown above each experience card so the time
 * range and place read as one compact scan-friendly sentence.
 */
export function buildExperienceMeta(entry: ExperienceEntry): string {
  return `${entry.period} | ${entry.location}`
}

/**
 * Produces a descriptive label for project cards so assistive technology can
 * capture both the project title and the stack at a glance.
 */
export function buildProjectCardLabel(project: ProjectEntry): string {
  return `${project.title}. Built with ${project.technologies.join(', ')}.`
}

/**
 * Counts the total number of listed skill items so the skills section can speak
 * about the breadth of the stack without hard-coding a separate metric.
 */
export function countSkillItems(skillGroups: readonly SkillGroup[]): number {
  return skillGroups.reduce((totalItems, group) => totalItems + group.items.length, 0)
}
