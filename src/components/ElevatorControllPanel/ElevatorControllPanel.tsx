import { Box, styled } from "@mui/system";
import { FC } from "react";
import { ButtonBase } from "@mui/material";

export interface ElevatorControllPanelProps {
  floorsAmount: number;
  requestElevator: (floor: number) => void;
}

const StyledElevatorShaft = styled(Box)(({ theme }) => ({
  margin: theme.spacing(2),
}));

const StyledControlPanel = styled(Box)(() => ({
  height: "150px",
  width: "50px",
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const StyledElevatorButton = styled(ButtonBase)(({ theme }) => ({
  width: "30px",
  height: "30px",
  backgroundColor: theme.palette.warning?.light,
  border: `2px solid grey`,
  borderRadius: "50%",
  "&: hover": {
    backgroundColor: theme.palette.warning?.main,
  },
  cursor: "pointer",
}));

export const ElevatorControllPanel: FC<ElevatorControllPanelProps> = ({
  floorsAmount,
  requestElevator,
}) => {
  const elevatorFloors = [...Array(floorsAmount).keys()].reverse();

  if (!elevatorFloors) return null;
  return (
    <StyledElevatorShaft>
      {elevatorFloors.map((elevatorFloor) => {
        return (
          <StyledControlPanel key={elevatorFloor}>
            <StyledElevatorButton
              onClick={() => {
                requestElevator(elevatorFloor);
              }}
            />
          </StyledControlPanel>
        );
      })}
    </StyledElevatorShaft>
  );
};
