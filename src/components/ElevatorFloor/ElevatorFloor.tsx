import { Box, styled, useTheme } from "@mui/system";
import { FC } from "react";

export interface ElevatorFloor {
  floorNumber: number;
  isElevatorPresent?: boolean;
  opened?: boolean;
}

const StyledElevatorFloor = styled(Box)(({ theme }) => ({
  width: "100px",
  height: "150px",
  backgroundColor: theme.palette.primary?.main,
  cursor: "pointer",
  display: "flex",
  flexFlow: "column",
}));

const StyledElevatorFloorHeader = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.info?.dark,
  display: "flex",
  justifyContent: "center",
}));
const StyledElevatorFloorBody = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  height: "100%",
}));

export const ElevatorFloor: FC<ElevatorFloor> = ({
  floorNumber,
  isElevatorPresent,
  opened,
}) => {
  const theme = useTheme();

  const renderOpened = () => {
    return (
      <Box
        sx={{
          width: "100%",
          backgroundColor: "silver",
          border: "3px solid black",
          transition: "background-color 0.5s ease",
        }}
      >
        <Box
          sx={{
            height: theme.spacing(0.5),
            backgroundColor: "yellow",
          }}
        ></Box>
      </Box>
    );
  };

  const renderClosed = () => {
    return (
      <Box
        sx={{
          width: theme.spacing(0.5),
          backgroundColor: isElevatorPresent ? "yellow" : "grey",
          transition: "background-color 0.5s ease",
        }}
      ></Box>
    );
  };

  return (
    <StyledElevatorFloor>
      <StyledElevatorFloorHeader>
        <Box
          sx={{
            backgroundColor: "white",
            pl: 0.5,
            pr: 0.5,
            color: isElevatorPresent
              ? theme.palette.success?.light
              : theme.palette.warning?.light,
          }}
        >
          {floorNumber}
        </Box>
      </StyledElevatorFloorHeader>
      <StyledElevatorFloorBody>
        {opened ? renderOpened() : renderClosed()}
      </StyledElevatorFloorBody>
    </StyledElevatorFloor>
  );
};
