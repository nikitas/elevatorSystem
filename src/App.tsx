import { FC, useCallback, useState } from "react";
import { Box, Button, Card, Grid, styled } from "@mui/material";
import { Building } from "./components/Building/Building";

const App: FC = () => {
  const [buildings, setBuildings] = useState([
    <Building floorAmount={5} />,
    <Building floorAmount={5} />,
  ]);

  const removeBuildings = useCallback(() => {
    if (buildings.length > 1) {
      const copyArr = [...buildings];
      copyArr.pop();
      setBuildings(copyArr);
    }
  }, [buildings]);

  const addBuildings = useCallback(() => {
    if (buildings.length < 10) {
      setBuildings([...buildings, <Building floorAmount={5} />]);
    }
  }, [buildings]);
  return (
    <Root>
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Card sx={{ m: 2, width: "max-content" }}>
            <Button sx={{ m: 1 }} variant="outlined" onClick={addBuildings}>
              Add Building
            </Button>
            <Button
              sx={{ m: 1 }}
              color="error"
              variant="outlined"
              onClick={removeBuildings}
            >
              Remove Building
            </Button>
          </Card>
        </Box>
        <Grid container spacing={2}>
          {buildings.map((building, i) => {
            return (
              <Grid xs={12} md={6} key={i}>
                <Box sx={{ m: 1 }}>{building}</Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Root>
  );
};

const Root = styled("div")`
  padding: 1% 2% 10vh 2%;
  width: 100%;
  min-height: 95vh;
  display: flex;
  justify-content: center;
  align-items: center;

  & a {
    text-decoration: none;
    color: ${({ theme: { palette } }) => palette.primary.main};
  }
`;

export default App;
