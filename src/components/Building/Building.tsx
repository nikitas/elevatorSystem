import { Box, styled } from "@mui/system";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { ElevatorShaft } from "../ElevatorShaft/ElevatorShaft";
import { ElevatorControllPanel } from "../ElevatorControllPanel/ElevatorControllPanel";
import { ElevatorSystem } from "@/models/ElevatorSystem";
import { Button, Card, useTheme } from "@mui/material";

export interface BuildingProps {
  floorAmount: number;
  elevatorsAmount?: number;
}

const StyledBuilding = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  flexFlow: "column",
}));

export const Building: FC<BuildingProps> = ({
  floorAmount,
  elevatorsAmount = 2,
}) => {
  const theme = useTheme();
  const [buildingElevatorsNumber, setBuildingElevatorsNumber] =
    useState(elevatorsAmount);
  const system = useRef(
    new ElevatorSystem(buildingElevatorsNumber, floorAmount)
  );

  const removeElevators = useCallback(() => {
    if (buildingElevatorsNumber > 1)
      setBuildingElevatorsNumber(buildingElevatorsNumber - 1);
  }, [buildingElevatorsNumber]);

  const addElevators = useCallback(() => {
    if (buildingElevatorsNumber < 10)
      setBuildingElevatorsNumber(buildingElevatorsNumber + 1);
  }, [buildingElevatorsNumber]);

  useEffect(() => {
    system.current = new ElevatorSystem(buildingElevatorsNumber, floorAmount);
  }, [buildingElevatorsNumber, floorAmount]);

  const [elevators, setElevators] = useState([
    ...system.current.getElevators(),
  ]);

  const requestElevator = useCallback((floor: number) => {
    system.current.requestElevator(floor);
  }, []);

  const update = useCallback(
    () => setElevators([...system.current.getElevators()]),
    [system]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      update();
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ pt: 4, pl: 4}}>
      <StyledBuilding>
        <Box sx={{ border: `10px dashed ${theme.palette.warning.dark}`}}>
          <Card sx={{ m: 2, width: "max-content" }}>
            <Button sx={{ m: 1 }} variant="outlined" onClick={addElevators}>
              Add Elevators
            </Button>
            <Button
              sx={{ m: 1 }}
              color="error"
              variant="outlined"
              onClick={removeElevators}
            >
              Remove Elevators
            </Button>
          </Card>
          <Box sx={{ display: "flex", overflow: "auto" }}>
            <ElevatorControllPanel
              floorsAmount={floorAmount}
              requestElevator={requestElevator}
            />
            {elevators.map((elevator) => (
              <ElevatorShaft
                key={elevator.id}
                elevatorFloorsNumber={floorAmount}
                elevator={elevator}
              />
            ))}
          </Box>
        </Box>
      </StyledBuilding>
    </Box>
  );
};
