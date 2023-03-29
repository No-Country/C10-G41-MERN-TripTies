import { useEffect, useState } from "react";
import style from "../../styles/SectionDiscover/SectionDiscover.module.css";

type props = {
  hashTag: any;
  handleHash: (value: any) => void;
};
function SectionDiscover({ hashTag, handleHash }: props): JSX.Element {
  return (
    <section className={style.hashTagContainer}>
      <h2 className={style.hashTagTitle}>Discover</h2>
      {hashTag &&
        hashTag.map((e: any) => (
          <button
            key={e.id}
            className={style.hashTagButton}
            onClick={handleHash}
            value={e.tag}
          >
            {e.tag}
          </button>
        ))}
    </section>
  );
}

export default SectionDiscover;
