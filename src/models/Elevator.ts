export interface ElevatorStatus {
  id: number;
  currentFloor: number;
  idle: boolean;
}

export class Elevator {
  private idle = true;
  constructor(
    public readonly id: number,
    private floor: number,
    private audio: HTMLAudioElement,
  ) {
    this.floor = 0;
  }

  get currentFloor(): number {
    return this.floor;
  }

  get isIdle(): boolean {
    return this.idle === true;
  }

  get status(): ElevatorStatus {
    return {
      id: this.id,
      currentFloor: this.currentFloor,
      idle: this.idle,
    };
  }

  moveToFloor(floor: number): void {
    console.log(`Inside elevator ${this.id}: moving to floor ${floor}`);
    this.idle = false;
    this.moveElevator(floor);
  }
  
  private moveElevator(floor: number): void {
    const direction = floor > this.floor ? 1 : -1;
    this.floor += direction;
  
    if (this.floor !== floor) {
      setTimeout(() => {
        this.moveElevator(floor);
      }, 500);
    } else {
      this.idle = true;
      this.audio.play();
    }
  }
}
