import AntStatus, { Ant, Status } from "./AntStatus";

interface AntsProps {
  ants: Ant[];
  antProbability: Record<string, number>;
  antStatus: Record<string, Status>;
}

function Ants({ ants, antProbability, antStatus }: AntsProps) {
  return (
    <>
      {ants.length ? (
        ants.map((ant: Ant) => {
          return (
            <AntStatus
              key={ant.name}
              ant={ant}
              status={antStatus[ant.name] || Status["not yet run"]}
              winProbability={antProbability[ant.name]}
            ></AntStatus>
          );
        })
      ) : (
        <div>No Ants Loaded</div>
      )}
    </>
  );
}

export default Ants;
