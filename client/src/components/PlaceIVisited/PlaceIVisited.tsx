import Card from "../Card/Card";

type props = {
  visited: any;
};

function PlaceIVisited({ visited }: props): JSX.Element {
  // TOFIX
  return (
    <div>
      {visited && visited.map((e: any, i: number) => <Card places={e}  login={e} profile={e} cookies={e} />)}
    </div>
  );
}

export default PlaceIVisited;
