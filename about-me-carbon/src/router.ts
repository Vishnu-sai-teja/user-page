import { useEffect, useState } from "react";

export type HashRoute =
  | { readonly kind: "home" }
  | { readonly kind: "about" }
  | { readonly kind: "projects" }
  | { readonly kind: "project-detail"; readonly slug: string };

/**
 * Normalizes the current hash fragment into a route path so the application can
 * treat `#about` and `#/about/` as the same destination.
 */
export function normalizeHashPath(hash: string): string {
  const withoutHash = hash.replace(/^#/, "").trim();

  if (!withoutHash || withoutHash === "/") {
    return "/";
  }

  const withLeadingSlash = withoutHash.startsWith("/")
    ? withoutHash
    : `/${withoutHash}`;

  return withLeadingSlash.replace(/\/+$/, "") || "/";
}

/**
 * Converts an application path into the hash-based href used by the route
 * links so the site remains deployable on static hosting without section jumps.
 */
export function buildHashHref(path: "/" | "/about" | "/projects" | string): string {
  return path === "/" ? "#/" : `#${path}`;
}

/**
 * Parses the current hash fragment into one of the supported routes, falling
 * back to the home route when the path does not map to known content.
 */
export function parseHashRoute(
  hash: string,
  projectSlugs: readonly string[]
): HashRoute {
  const normalizedPath = normalizeHashPath(hash);

  if (normalizedPath === "/") {
    return { kind: "home" };
  }

  if (normalizedPath === "/about") {
    return { kind: "about" };
  }

  if (normalizedPath === "/projects") {
    return { kind: "projects" };
  }

  if (normalizedPath.startsWith("/projects/")) {
    const slug = normalizedPath.slice("/projects/".length);

    if (projectSlugs.includes(slug)) {
      return { kind: "project-detail", slug };
    }
  }

  return { kind: "home" };
}

/**
 * Tracks the active hash route and updates the UI whenever the browser hash
 * changes, which keeps route state synchronized with direct navigation.
 */
export function useHashRoute(projectSlugs: readonly string[]): HashRoute {
  const [route, setRoute] = useState<HashRoute>(() =>
    parseHashRoute(window.location.hash, projectSlugs)
  );

  useEffect(() => {
    /**
     * Recomputes the route from the latest hash fragment after browser
     * navigation or link clicks.
     */
    function handleHashChange(): void {
      setRoute(parseHashRoute(window.location.hash, projectSlugs));
    }

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [projectSlugs]);

  return route;
}