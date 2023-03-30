import { useEffect, useState } from "react";
import style from "../../styles/SectionDiscover/SectionDiscover.module.css";

type props = {
  hashTag: any;
  hashTagSaved: any;
  publicationsSaved: any;
  handleHash: (value: any) => void;
};
function SectionDiscover({
  hashTag,
  hashTagSaved,
  publicationsSaved,
  handleHash,
}: props): JSX.Element {
  let [arrayHashTag, setArrayHashTag] = useState([]);
  let [arrayHashTagSaved, setArrayHashTagSaved] = useState([]);

  useEffect(() => {
    let arrayTag = hashTag && hashTag.map((e: any) => e.tag);
    setArrayHashTag(arrayTag);
    let arrayHashTagSaved = hashTagSaved && hashTagSaved.map((e: any) => e.tag);
    setArrayHashTagSaved(arrayHashTagSaved);
  }, []);

  let Tags =
    arrayHashTag &&
    arrayHashTag.filter((e, i) => arrayHashTag.indexOf(e) === i);

  let TagsSaved =
    arrayHashTagSaved &&
    arrayHashTagSaved.filter((e, i) => arrayHashTagSaved.indexOf(e) === i);

  console.log(Tags);
  console.log(TagsSaved);

  return (
    <section className={style.hashTagContainer}>
      <h2 className={style.hashTagTitle}>Discover</h2>
      {publicationsSaved === false
        ? Tags &&
          Tags.map((e: any, i) => (
            <button
              key={i}
              className={style.hashTagButton}
              onClick={handleHash}
              value={e}
            >
              {e}
            </button>
          ))
        : TagsSaved &&
          TagsSaved.map((e: any, i) => (
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
