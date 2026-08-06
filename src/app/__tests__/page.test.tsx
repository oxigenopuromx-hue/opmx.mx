import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "../page";

describe("Home", () => {
  it("renders the hero headline", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { level: 1, name: /opinión pública, con datos/i }),
    ).toBeInTheDocument();
  });

  it("links to the demo, clearly labeled as such", () => {
    render(<Home />);
    const demoLink = screen.getByRole("link", { name: /ver demostración/i });
    expect(demoLink).toHaveAttribute("href", "/demo/michoacan-gubernatura-junio-2026");
    expect(screen.getByText(/demostración de interfaz/i)).toBeInTheDocument();
  });
});
