import { useEffect, useState } from "react";
import style from "../../styles/SectionDiscover/SectionDiscover.module.css";
import { Tags } from "../../types";
import Loading from "../Loading/Loading";

type props = {
  tags: any;
  setPublications: any;
  setLoading: any;
  setRender: any;
};
function SectionDiscover({
  tags,
  setPublications,
  setLoading,
  setRender,
}: props): JSX.Element {
  let tagsRender = tags.tags
    ?.sort((a: any, b: any) => {
      if (a.number < b.number) return 1;
      if (a.number > b.number) return -1;
      return 0;
    })
    .slice(0, 5);

  const handleTag = (e: any) => {
    setPublications(e.target.value);
    setRender("tag");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <section className={style.hashTagContainer}>
      <h2 className={style.hashTagTitle}>Discover</h2>
      {tagsRender &&
        tagsRender.map((e: any, i: number) => (
          <button
            key={i}
            onClick={(e) => handleTag(e)}
            className={style.hashTagButton}
            value={e.tag}
          >
            {e.tag}
          </button>
        ))}
    </section>
  );
}

export default SectionDiscover;
