import { ElevatorSystem } from "@/models/ElevatorSystem";
import { describe, it, assert, beforeEach } from "vitest";

describe("ElevatorSystem", () => {
  let system: ElevatorSystem;

  beforeEach(() => {
    system = new ElevatorSystem(2, 10);
  });

  describe("getElevators", () => {
    it("returns the current status of all elevators", () => {
      const elevators = system.getElevators();
      assert.equal(elevators.length, 2);
      assert.equal(elevators[0].currentFloor, 0);
      assert.equal(elevators[1].currentFloor, 0);
    });

    describe("requestElevator", () => {
      it("adds a valid floor request to the system", () => {
        system.requestElevator(2);
        const requests = system["requests"];
        assert.equal(requests.length, 1);
        assert.equal(requests[0], 2);
      });

      it("ignores a request if the elevator is already at the requested floor", () => {
        const elevator = system["elevators"][0];
        elevator["floor"] = 3;
        system.requestElevator(3);
        const requests = system["requests"];
        assert.equal(requests.length, 0);
      });

      it("adds a request when no elevators are at the requested floor", () => {
        system.requestElevator(5);
        const requests = system["requests"];
        assert.equal(requests.length, 1);
        assert.equal(requests[0], 5);
      });
    });
  });
});
