import { useEffect } from "react";
import { getPublicationsSave } from "../../redux/actions/Users";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import Card from "../Card/Card";

type props = {
  place: any;
};

function Saved({ place }: props): JSX.Element {
  const dispatch = useAppDispatch();
  const selector = useAppSelector;
  const saved = selector((state) => state.save);

  console.log(saved);

  useEffect(() => {
    dispatch(getPublicationsSave());
  }, []);
  return <div>Hola</div>;
}

export default Saved;
