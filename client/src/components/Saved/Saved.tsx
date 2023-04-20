import Card from "../Card/Card";

type props = {
  place: any;
};

function Saved({ place }: props): JSX.Element {
  return (
    <div></div>
    // <div>{place && place.map((e: any, i: number) => <Card places={e} />)}</div>
  );
}

export default Saved;
