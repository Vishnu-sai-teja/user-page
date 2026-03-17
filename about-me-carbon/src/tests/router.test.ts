import React from "react";
import { act, render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { buildHashHref, normalizeHashPath, parseHashRoute, useHashRoute } from "../router";

/**
 * Exposes the current hash route as text so the hook can be tested through a
 * normal render path instead of depending on a dedicated hook utility.
 */
function HashRouteProbe({ projectSlugs }: { readonly projectSlugs: readonly string[] }) {
  const route = useHashRoute(projectSlugs);
  const routeLabel = route.kind === "project-detail" ? `${route.kind}:${route.slug}` : route.kind;

  return React.createElement("span", null, routeLabel);
}

describe("hash router", () => {
  it("normalizes empty and slash hashes to the home route", () => {
    expect(normalizeHashPath("")).toBe("/");
    expect(normalizeHashPath("#/")) .toBe("/");
  });

  it("normalizes route fragments with and without a leading slash", () => {
    expect(normalizeHashPath("#about")).toBe("/about");
    expect(normalizeHashPath("#/projects/")).toBe("/projects");
    expect(normalizeHashPath("#///")).toBe("/");
  });

  it("builds hash hrefs for route links", () => {
    expect(buildHashHref("/")).toBe("#/");
    expect(buildHashHref("/about")).toBe("#/about");
  });

  it("parses the supported routes and falls back to home on unknown content", () => {
    expect(parseHashRoute("#/", ["staffusion"]).kind).toBe("home");
    expect(parseHashRoute("#/about", ["staffusion"]).kind).toBe("about");
    expect(parseHashRoute("#/projects", ["staffusion"]).kind).toBe("projects");
    expect(parseHashRoute("#/projects/staffusion", ["staffusion"])) .toEqual({
      kind: "project-detail",
      slug: "staffusion"
    });
    expect(parseHashRoute("#/projects/unknown", ["staffusion"]).kind).toBe("home");
  });

  it("updates when the browser hash changes and removes the listener on unmount", () => {
    const removeListenerSpy = vi.spyOn(window, "removeEventListener");

    window.location.hash = "#/";

    const { unmount } = render(React.createElement(HashRouteProbe, { projectSlugs: ["staffusion"] }));

    expect(screen.getByText("home")).toBeInTheDocument();

    act(() => {
      window.location.hash = "#/projects/staffusion";
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    });

    expect(screen.getByText("project-detail:staffusion")).toBeInTheDocument();

    unmount();

    expect(removeListenerSpy).toHaveBeenCalledWith("hashchange", expect.any(Function));

    removeListenerSpy.mockRestore();
  });
});