import style from "../../styles/SectionDiscover/SectionDiscover.module.css";

interface HashTagTypes {
  id: number;
  tag: string;
}

function SectionDiscover(): JSX.Element {
  const hashTag: HashTagTypes[] = [
    {
      id: 1,
      tag: "#Paris",
    },
    {
      id: 2,
      tag: "#Vietnam",
    },
    {
      id: 3,
      tag: "#Madrid",
    },
    {
      id: 4,
      tag: "#BarHoppingAmsterdam",
    },
    {
      id: 5,
      tag: "#VisitCostaRica",
    },
  ];
  return (
    <div className={style.hashTagContainer}>
      <h2 className={style.hashTagTitle}>Discover</h2>
      {hashTag &&
        hashTag.map((e) => (
          <button className={style.hashTagButton} key={e.id}>
            {e.tag}
          </button>
        ))}
    </div>
  );
}

export default SectionDiscover;
