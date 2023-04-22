import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../img/Logo.png";
import Loading from "../Loading/Loading";
import style from "../../styles/PageLoading/PageLoading.module.css";
function PageLoading(): JSX.Element {
  const nav = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      nav("/home");
    }, 800);
  }, []);
  return (
    <div className={style.container}>
      <section className={style.title}>
        <img src={logo} alt="" />
        <h1>Trip Ties</h1>
      </section>
      <section className={style.loading}>
        <Loading />
      </section>
    </div>
  );
}

export default PageLoading;
