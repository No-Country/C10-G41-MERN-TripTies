import { useState } from "react";
import style from "../../styles/SlideShow/SlideShow.module.css";
import arrowLeft from "../../img/arrow-circle-left.png";
import arrowRight from "../../img/arrow-circle-right.png";
interface mediaType {
  [x: string]: any;
  concat: any;
  map(arg0: (e: any, i: number) => JSX.Element): import("react").ReactNode;
  url: string;
  type: string;
}
type props = {
  media: mediaType[];
};

function SlideShow({ media }: props): JSX.Element {
  let [current, setCurrent] = useState(0);
  let dataComplete = [media[0].concat(media[1])];
  let dataLength = media[0].length + media[1].length;

  const next = () => {
    setCurrent((current) =>
      current === dataComplete[0].length - 1 ? 0 : current + 1
    );
  };

  const prev = () => {
    setCurrent((current) =>
      current === 0 ? dataComplete[0].length - 1 : current - 1
    );
  };

  return (
    <div className={style.containerSlider}>
      <div
        className={style.slider}
        style={{ transform: `translateX(-${current * 550}px)` }}
      >
        {media &&
          media[0].map((e, i) => <img key={i} src={e.url} alt={e.type} />)}
        {media &&
          media[1].map((e, i) => (
            <video
              key={i}
              src={e.url}
              width={550}
              height={350}
              controls
            ></video>
          ))}
      </div>
      <h2>
        {current + 1} / {dataLength}
      </h2>
      <div className={style.containerButtons}>
        {dataLength > 1 && (
          <>
            <section>
              <button onClick={prev}>
                <img src={arrowLeft} width="30" height="30" />
              </button>
            </section>
            <section>
              <button onClick={next}>
                <img src={arrowRight} width="30" height="30" />
              </button>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default SlideShow;
