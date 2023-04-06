import { useEffect, useState } from "react";
import style from "../../styles/SectionDiscover/SectionDiscover.module.css";

type props = {
  hashTag: any;
  hashTagSaved: any;
  hashTagVisited: any;
  handleHash: (value: any) => void;
  publications: any;
  publicationsSaved: any;
  publicationsVisited: any;
};
function SectionDiscover({
  hashTag,
  hashTagSaved,
  hashTagVisited,
  handleHash,
  publications,
  publicationsSaved,
  publicationsVisited,
}: props): JSX.Element {
  let [arrayHashTag, setArrayHashTag] = useState([]);
  let [arrayHashTagSaved, setArrayHashTagSaved] = useState([]);
  let [arrayHashTagVisited, setArrayHashTagVisited] = useState([]);

  useEffect(() => {
    let arrayTag = hashTag && hashTag.map((e: any) => e.tag);
    setArrayHashTag(arrayTag);
    let arrayHashTagSaved = hashTagSaved && hashTagSaved.map((e: any) => e.tag);
    setArrayHashTagSaved(arrayHashTagSaved);
    let arrayHashTagVisited =
      hashTagVisited && hashTagVisited.map((e: any) => e.tag);
    setArrayHashTagVisited(arrayHashTagVisited);
  }, []);

  let Tags =
    arrayHashTag &&
    arrayHashTag.filter((e, i) => arrayHashTag.indexOf(e) === i);

  let TagsSaved =
    arrayHashTagSaved &&
    arrayHashTagSaved.filter((e, i) => arrayHashTagSaved.indexOf(e) === i);

  let TagVisited =
    arrayHashTagVisited &&
    arrayHashTagVisited.filter((e, i) => arrayHashTagVisited.indexOf(e) === i);

  return (
    <section className={style.hashTagContainer}>
      <h2 className={style.hashTagTitle}>Discover</h2>
      {(publications &&
        Tags &&
        Tags.map((e: any, i) => (
          <button
            key={i}
            className={style.hashTagButton}
            onClick={handleHash}
            value={e}
          >
            {e}
          </button>
        ))) ||
        (publicationsSaved &&
          TagsSaved &&
          TagsSaved.map((e: any, i) => (
            <button
              key={i}
              className={style.hashTagButton}
              onClick={handleHash}
              value={e}
            >
              {e}
            </button>
          ))) ||
        (publicationsVisited &&
          TagVisited &&
          TagVisited.map((e: any, i) => (
            <button
              key={i}
              className={style.hashTagButton}
              onClick={handleHash}
              value={e}
            >
              {e}
            </button>
          )))}
    </section>
  );
}

export default SectionDiscover;
