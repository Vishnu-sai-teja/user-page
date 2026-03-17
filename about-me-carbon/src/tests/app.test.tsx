import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import App, { AboutMeApp } from "../App";

/**
 * Renders the routed application from a specific starting route so each test
 * can validate page behavior without depending on browser history state.
 */
function renderRoute(route: string): ReturnType<typeof render> {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <AboutMeApp />
    </MemoryRouter>
  );
}

describe("AboutMeApp", () => {
  it("renders the production app wrapper with the GitHub Pages basename", () => {
    window.history.replaceState({}, "", "/user-page/");

    render(<App />);

    expect(screen.getByRole("heading", { name: /building ai systems that have to work/i })).toBeInTheDocument();
  });

  it("renders the home route and navigates through the hero CTA and primary navigation", async () => {
    const user = userEvent.setup();

    renderRoute("/");

    expect(screen.getByRole("heading", { name: /building ai systems that have to work/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("aria-current", "page");

    await user.click(screen.getByRole("link", { name: /explore the full profile/i }));

    expect(screen.getByRole("heading", { name: "About" })).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: "Home" }));

    expect(screen.getByRole("heading", { name: /building ai systems that have to work/i })).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: "About" }));

    expect(screen.getByRole("heading", { name: "About" })).toBeInTheDocument();
  });

  it("renders the about route with the narrative, experience timeline, and skills", () => {
    renderRoute("/about");

    expect(screen.getByText(/my path into ai engineering/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Experience timeline" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Graduate AI Engineer" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Technical skills" })).toBeInTheDocument();
    expect(screen.getByText("LangGraph")).toBeInTheDocument();
  });

  it("filters the projects route and shows the empty state when nothing matches", async () => {
    const user = userEvent.setup();

    renderRoute("/projects");

    expect(screen.getByText("Multi-Agent Resume Parser")).toBeInTheDocument();
    expect(screen.getByText("Staffusion")).toBeInTheDocument();
    expect(screen.getByText("Skin Cancer Detection")).toBeInTheDocument();

    await user.clear(screen.getByRole("textbox", { name: "Filter projects" }));
    await user.type(screen.getByRole("textbox", { name: "Filter projects" }), "diffusion");

    expect(screen.getByText("Staffusion")).toBeInTheDocument();
    expect(screen.queryByText("Multi-Agent Resume Parser")).not.toBeInTheDocument();

    await user.clear(screen.getByRole("textbox", { name: "Filter projects" }));
    await user.type(screen.getByRole("textbox", { name: "Filter projects" }), "nonexistent stack");

    expect(screen.getByText(/no project matched that search/i)).toBeInTheDocument();
  });

  it("renders the recommendations route with books first, movies second, images, and a placeholder for missing artwork", () => {
    renderRoute("/recommendations");

    expect(screen.getByRole("heading", { name: "Book Recommendations" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Movie Recommendations" })).toBeInTheDocument();
    expect(screen.getByText("The Lord of the Rings")).toBeInTheDocument();
    expect(screen.getByText("Avengers: Endgame")).toBeInTheDocument();
    expect(screen.getAllByText(/artwork unavailable for/i).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "View source" }).length).toBeGreaterThan(0);
    expect(screen.getByAltText(/the lord of the rings cover art/i)).toBeInTheDocument();
  });

  it("renders the contact route and supports the mobile navigation trigger and menu item navigation", async () => {
    const user = userEvent.setup();

    renderRoute("/contact");

    expect(screen.getByRole("heading", { name: /reach out/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "vishnusaiteja.3004@gmail.com" })).toHaveAttribute(
      "href",
      "mailto:vishnusaiteja.3004@gmail.com"
    );

    await user.click(screen.getByRole("button", { name: "Menu" }));

    await user.click(
      screen
        .getAllByRole("button")
        .find((button) => button.getAttribute("data-element") === "close") as HTMLElement
    );

    await user.click(screen.getByRole("button", { name: "Menu" }));

    await user.click(screen.getAllByRole("link", { name: "Projects" }).at(-1) as HTMLElement);

    expect(screen.getByRole("heading", { name: "Projects" })).toBeInTheDocument();
  });
});