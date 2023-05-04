import { render, screen } from "@testing-library/react";
import { Building } from "./Building";
import { describe, it, assert } from "vitest";

describe("Building component", () => {
  it("renders the elevators", () => {
    render(<Building floorAmount={5} elevatorsAmount={2} />);
    const elevators = screen.getAllByTestId("elevator-shaft");
    assert.equal(elevators.length, 2);
  });
});
