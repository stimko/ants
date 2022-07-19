import { Card } from "@mui/material";

export interface Ant {
  name: string;
  length: number;
  color: string;
  weight: number;
}

export enum Status {
  "in progress",
  "completed",
  "not yet run",
}

interface AntProps {
  ant: Ant;
  status: Status;
  winProbability: number;
}

function AntStatus({ ant, status, winProbability }: AntProps) {
  return (
    <Card
      sx={{ maxWidth: 345, height: 100 }}
      variant="outlined"
      className="Ant"
    >
      <div>{ant.name}</div>
      <div>{Status[status]}</div>
      <div>{winProbability}</div>
    </Card>
  );
}

export default AntStatus;
