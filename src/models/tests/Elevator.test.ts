import { describe, it, assert, vi, expect } from "vitest";
import { Elevator } from "../Elevator";

describe("Elevator", () => {
  const audioMock = {
    play: vi.fn(),
  } as unknown as HTMLAudioElement;

  it("should start at floor 0", () => {
    const elevator = new Elevator(1, 0, audioMock);
    assert.equal(elevator.currentFloor, 0);
  });

  it("should be idle at start", () => {
    const elevator = new Elevator(1, 0, audioMock);
    assert.equal(elevator.isIdle, true);
  });

  it("should move to the specified floor", async () => {
    const elevator = new Elevator(1, 0, audioMock);
    const spy = vi.spyOn(audioMock, 'play');

    elevator.moveToFloor(5);
    assert.equal(elevator.isIdle, false);

    // Wait for elevator to reach the floor
    await new Promise((resolve) => setTimeout(resolve, 2500));
    assert.equal(elevator.currentFloor, 5);
    assert.equal(elevator.isIdle, true);
    expect(spy).toHaveBeenCalledOnce();
  });
});
