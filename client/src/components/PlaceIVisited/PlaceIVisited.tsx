import Card from "../Card/Card";

type props = {
  visited: any;
};

function PlaceIVisited({ visited }: props): JSX.Element {
  return (
    <div>
      {/* {visited && visited.map((e: any, i: number) => <Card places={e} />)} */}
    </div>
  );
}

export default PlaceIVisited;
