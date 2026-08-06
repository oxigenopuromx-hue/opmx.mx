import { describe, expect, it } from "vitest";
import {
  demoResultsTotalPercentage,
  michoacanGubernaturaDemo,
} from "../michoacan-gubernatura-2026-demo";

describe("michoacanGubernaturaDemo", () => {
  it("matches the exact figures provided in the source material, unaltered", () => {
    const byOption = Object.fromEntries(
      michoacanGubernaturaDemo.results.map((r) => [r.option, r.percentage]),
    );

    expect(byOption).toEqual({
      PAN: 20,
      PRI: 10,
      "Partido Verde": 8,
      "Partido del Trabajo": 5,
      "Movimiento Ciudadano": 3,
      MORENA: 40,
      PRD: 2,
      Michoacán: 6,
      "No respuesta": 3,
    });
  });

  it("sums to 97, not 100 — a documented discrepancy in the source data, never silently corrected", () => {
    expect(demoResultsTotalPercentage).toBe(97);
  });

  it("keeps the demo sample size, margin of error and fieldwork window as provided", () => {
    expect(michoacanGubernaturaDemo.sampleSizeEffective).toBe(1200);
    expect(michoacanGubernaturaDemo.marginOfErrorPercentagePoints).toBe(3.23);
    expect(michoacanGubernaturaDemo.confidenceLevel).toBe(95);
    expect(michoacanGubernaturaDemo.designEffect).toBe(1.3);
    expect(michoacanGubernaturaDemo.fieldwork).toEqual({
      start: "2026-06-04",
      end: "2026-06-10",
    });
  });
});
