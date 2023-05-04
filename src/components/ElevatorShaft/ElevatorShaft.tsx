import { Box, styled } from "@mui/system";
import { FC } from "react";
import { ElevatorFloor } from "../ElevatorFloor/ElevatorFloor";
import { ElevatorStatus } from "@/models/Elevator";

export interface ElevatorShaftProps {
  elevator: ElevatorStatus;
  elevatorFloorsNumber: number;
}

const StyledElevatorShaft = styled(Box)(({ theme }) => ({
  margin: theme.spacing(2),
}));

export const ElevatorShaft: FC<ElevatorShaftProps> = ({
  elevatorFloorsNumber,
  elevator,
}) => {
  const elevatorFloors = [...Array(elevatorFloorsNumber).keys()].reverse();

  if (!elevatorFloors) return null;
  return (
    <StyledElevatorShaft data-testid="elevator-shaft">
      {elevatorFloors.map((elevatorFloor) => {
        return (
          <ElevatorFloor
            key={elevatorFloor}
            floorNumber={elevatorFloor}
            opened={elevatorFloor === elevator.currentFloor}
          ></ElevatorFloor>
        );
      })}
    </StyledElevatorShaft>
  );
};
