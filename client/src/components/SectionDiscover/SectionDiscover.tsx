import { useEffect, useState } from "react";
import style from "../../styles/SectionDiscover/SectionDiscover.module.css";

type props = {
  hashTag: any;
  handleHash: (value: any) => void;
};
function SectionDiscover({ hashTag, handleHash }: props): JSX.Element {
  let [arrayHashTag, setArrayHashTag] = useState([]);

  useEffect(() => {
    let arrayTag = hashTag && hashTag.map((e: any) => e.tag);
    setArrayHashTag(arrayTag);
  }, []);

  let Tags =
    arrayHashTag &&
    arrayHashTag.filter((e, i) => arrayHashTag.indexOf(e) === i);

  return (
    <section className={style.hashTagContainer}>
      <h2 className={style.hashTagTitle}>Discover</h2>
      {Tags &&
        Tags.map((e: any, i) => (
          <button
            key={i}
            className={style.hashTagButton}
            onClick={handleHash}
            value={e}
          >
            {e}
          </button>
        ))}
    </section>
  );
}

export default SectionDiscover;
