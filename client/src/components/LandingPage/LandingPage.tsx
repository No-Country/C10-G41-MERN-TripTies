import imgFly from "../../img/fly-paper.png"
import style from "../../styles/LandingPage/LandingPage.module.css"

const LandingPage = ():JSX.Element => {
    return (
        <>
            <div>
                <img src={imgFly} alt="imgFly" />
            </div>
            <h1>TripTies</h1>
        </>
    )
}

export default LandingPage;