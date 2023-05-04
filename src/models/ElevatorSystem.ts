import { Elevator, ElevatorStatus } from "./Elevator";
import elevatorSound from "../assets/elevatorSound.mp3";

export class ElevatorSystem {
  private requests: number[] = [];
  public elevators: Elevator[] = [];
  private id = 0;
  private floorsAmount: number;
  private audio = new Audio(elevatorSound);

  constructor(startingElevators: number, floorsAmount: number) {
    this.floorsAmount = floorsAmount;
    this.audio.loop = false;
    for (let i = 0; i < startingElevators; i++) {
      this.elevators.push(new Elevator(this.id, 0, this.audio));
      this.id++;
    }
    setInterval(() => {
      this.runElevatorRequests();
    }, 100);
  }

  getElevators(): ElevatorStatus[] {
    return this.elevators.map((elevator) => elevator.status);
  }

  requestElevator(floor: number) {
    if (isNaN(floor)) {
      throw new Error("Invalid floor: not a number");
    }

    const isValidFloor = floor >= 0 && floor <= this.floorsAmount;
    const elevatorIsAlreadyAtFloor = this.elevators.some(
      (elevator) => elevator.currentFloor === floor
    );

    if (
      !this.requests.includes(floor) &&
      isValidFloor &&
      !elevatorIsAlreadyAtFloor
    ) {
      this.requests.push(floor);
    }
  }

  runElevatorRequests(): void {
    const idleElevators = this.elevators.filter((elevator) => elevator.isIdle);
    if (this.requests.length && idleElevators.length) {
      const requestedFloor = this.requests.shift() as number;

      const closestElevator = this.getClosestElevator(
        requestedFloor,
        idleElevators
      );
      closestElevator.moveToFloor(requestedFloor);
    }
  }

  private getClosestElevator(
    requestedFloor: number,
    elevators: Elevator[]
  ): Elevator {
    return elevators.reduce((a, b) =>
      Math.abs(b.currentFloor - requestedFloor) <
      Math.abs(a.currentFloor - requestedFloor)
        ? b
        : a
    );
  }
}
