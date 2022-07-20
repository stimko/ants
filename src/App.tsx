import React, { useState } from "react";
import "./App.css";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { Ant, Status } from "./components/AntStatus";
import generateAntWinLikelihoodCalculator from "./utils/generateAntWinLikelihoodCalculator";
import getAnts from "./services/getAnts";
import Ants from "./components/Ants";

function App() {
  const [ants, setAnts] = useState<Ant[]>([]);

  const [raceStatus, setRaceStatus] = useState(Status["not yet run"]);
  const [antStatus, setAntStatus] = useState<Record<string, Status>>({});
  const [antProbability, setAntProbability] = useState<Record<string, number>>(
    {}
  );

  const handleCalculationComplete = (
    likelihoodOfAntWinning: number,
    name: string
  ) => {
    setAntProbability((prevState) => ({
      ...prevState,
      [name]: likelihoodOfAntWinning,
    }));
    setAntStatus((prevState) => {
      const updatedStatus = { ...prevState, [name]: Status.completed };
      if (ants.every((ant) => updatedStatus[ant.name] === Status.completed)) {
        setRaceStatus(Status.completed);
      }
      return updatedStatus;
    });
  };

  const calculateWinStats = () => {
    ants.forEach((ant) => {
      setAntStatus((prevState) => {
        return { ...prevState, [ant.name]: Status["in progress"] };
      });
      generateAntWinLikelihoodCalculator()((prob: number) => {
        handleCalculationComplete(prob, ant.name);
      });
    });
  };

  const loadAnts = () => {
    setAnts([]);
    setAntProbability({});
    setAntStatus({});
    getAnts((ants) => setAnts(ants));
  };

  const startRace = () => {
    setRaceStatus(Status["in progress"]);
    calculateWinStats();
  };

  return (
    <div className="App">
      <Box>
        <AppBar>
          <Toolbar>
            <Button variant="contained" className="loadAnts" onClick={loadAnts}>
              {"Load Ants"}
            </Button>
            <Button
              variant="contained"
              className="startRace"
              onClick={startRace}
              sx={{ ml: 3 }}
            >
              {"Start Race"}
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box component="main">
        <Toolbar />
        <div>
          Race Status: <div>{Status[raceStatus]}</div>
        </div>

        <Ants
          ants={ants.sort((a, b) => {
            const probA: number = antProbability[a.name] || 0;
            const probB: number = antProbability[b.name] || 0;

            return probB - probA;
          })}
          antProbability={antProbability}
          antStatus={antStatus}
        />
      </Box>
    </div>
  );
}

export default App;
