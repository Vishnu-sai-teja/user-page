import { fireEvent, render, screen, within } from "@testing-library/react";
import { vi } from "vitest";

import App, { ErrorBoundary } from "../App";

/**
 * Updates the browser hash before rendering so route-specific tests can land on
 * the exact page state they intend to validate.
 */
function setRoute(hash: string): void {
  window.location.hash = hash;
}

describe("About Me application", () => {
  it("renders the home route with Vishnu's identity, thesis, and orientation rail", () => {
    setRoute("#/");

    render(<App />);

    expect(screen.getByRole("heading", { name: /Vishnu Sai Teja Nagabandi/i })).toBeInTheDocument();
    expect(screen.getByText(/grounded AI systems where live business context/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /A compact personal site for quick scanning and deeper evaluation/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Read the full story/i })).toHaveAttribute("href", "#/about");
  });

  it("renders the about route with narrative, experience, skills, education, and languages", () => {
    setRoute("#/about");

    render(<App />);

    expect(screen.getByRole("heading", { name: /Applied AI work, shaped by systems thinking/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Experience/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /SAGE \| Graduate AI Engineer/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /PIBIT \| AI\/ML Engineer/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /AiDash \| Data Science Intern/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Technical strengths/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Programming languages/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Education/i })).toBeInTheDocument();
    expect(screen.getByText(/German \(Novice\)/i)).toBeInTheDocument();
  });

  it("renders the projects route, filters results, toggles table view, and shows an empty state", () => {
    setRoute("#/projects");

    render(<App />);

    expect(screen.getByRole("heading", { name: /Built work across agent orchestration, generation, and model quality/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Multi-Agent Resume Parser/i })).toBeInTheDocument();

    fireEvent.change(screen.getByRole("textbox", { name: /Search projects/i }), {
      target: { value: "Staffusion" }
    });

    expect(screen.getByRole("heading", { name: /Staffusion/i })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /Skin Cancer Detection/i })).not.toBeInTheDocument();

    fireEvent.click(screen.getByText(/Scan table/i));

    const projectsTable = screen.getByRole("table");

    expect(projectsTable).toBeInTheDocument();
    expect(within(projectsTable).getByText(/Generative modeling/i)).toBeInTheDocument();

    fireEvent.change(screen.getByRole("textbox", { name: /Search projects/i }), {
      target: { value: "nonexistent" }
    });

    expect(screen.getByText(/No table rows to show/i)).toBeInTheDocument();
  });

  it("renders a project detail route with the project metadata and back navigation", () => {
    setRoute("#/projects/multi-agent-resume-parser");

    render(<App />);

    expect(screen.getByRole("heading", { name: /Multi-Agent Resume Parser/i })).toBeInTheDocument();
    expect(screen.getByText(/user feedback loops for real-time accuracy improvements/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Back to projects/i })).toHaveAttribute("href", "#/projects");
  });

  it("exposes direct contact links on the home route", () => {
    setRoute("#/");

    render(<App />);

    expect(screen.getByRole("link", { name: /vishnusaiteja.3004@gmail.com/i })).toHaveAttribute(
      "href",
      "mailto:vishnusaiteja.3004@gmail.com"
    );
    expect(screen.getByRole("link", { name: /^Vishnu-sai-teja$/i })).toHaveAttribute(
      "href",
      "https://github.com/Vishnu-sai-teja"
    );
    expect(screen.getByRole("link", { name: /^Vishnu Sai Teja N$/i })).toHaveAttribute(
      "href",
      "https://www.kaggle.com/vishnusaitejan"
    );
  });

  it("shows the error fallback when a child component throws a rendering error", () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    function ThrowingChild(): JSX.Element {
      throw new Error("test render error");
    }

    render(
      <ErrorBoundary>
        <ThrowingChild />
      </ErrorBoundary>
    );

    expect(screen.getByRole("heading", { name: /Something went wrong/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /vishnusaiteja.3004@gmail.com/i })).toHaveAttribute(
      "href",
      "mailto:vishnusaiteja.3004@gmail.com"
    );

    consoleErrorSpy.mockRestore();
  });
});