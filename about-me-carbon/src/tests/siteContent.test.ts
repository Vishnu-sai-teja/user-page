import { filterProjects, findProjectBySlug, siteContent } from "../siteContent";

describe("site content helpers", () => {
  it("finds a project by slug when it exists", () => {
    expect(findProjectBySlug(siteContent.projects, "staffusion")?.title).toBe("Staffusion");
  });

  it("returns undefined for an unknown project slug", () => {
    expect(findProjectBySlug(siteContent.projects, "unknown-project")).toBeUndefined();
  });

  it("returns the full list when the project query is empty", () => {
    expect(filterProjects(siteContent.projects, "")).toHaveLength(siteContent.projects.length);
  });

  it("filters projects across title, category, summary, and technology text", () => {
    expect(filterProjects(siteContent.projects, "gans").map((project) => project.slug)).toEqual([
      "skin-cancer-detection"
    ]);
    expect(filterProjects(siteContent.projects, "agent systems").map((project) => project.slug)).toEqual([
      "multi-agent-resume-parser"
    ]);
  });
});