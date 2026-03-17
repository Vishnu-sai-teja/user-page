import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

vi.mock("../content/recommendations.generated", () => ({
  recommendationsPageData: {
    books: [
      {
        slug: "fallback-book",
        title: "Fallback Book",
        creator: null,
        year: null,
        description: null,
        imageUrl: null,
        sourceUrl: null,
        metadata: [{ label: "Format", value: "Paperback" }],
      },
    ],
    movies: [
      {
        slug: "fallback-movie",
        title: "Fallback Movie",
        creator: "Fallback Director",
        year: null,
        description: "A mocked movie entry used to exercise null-state rendering.",
        imageUrl: null,
        sourceUrl: null,
        metadata: [{ label: "Runtime", value: "120 min" }],
      },
    ],
  },
}));

import { AboutMeApp } from "../App";

describe("Recommendations fallbacks", () => {
  it("renders fallback creator, description, placeholder artwork, and null source links without crashing", () => {
    render(
      <MemoryRouter initialEntries={["/recommendations"]}>
        <AboutMeApp />
      </MemoryRouter>
    );

    expect(screen.getByText("Fallback Book")).toBeInTheDocument();
    expect(screen.getByText("Creator unavailable")).toBeInTheDocument();
    expect(screen.getByText("Description unavailable from the source record.")).toBeInTheDocument();
    expect(screen.getByText(/artwork unavailable for fallback book/i)).toBeInTheDocument();
    expect(screen.getByText("Fallback Director")).toBeInTheDocument();
    expect(screen.getByText(/artwork unavailable for fallback movie/i)).toBeInTheDocument();
    expect(screen.getAllByText("View source")).toHaveLength(2);
  });
});