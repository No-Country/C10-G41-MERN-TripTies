import { useState } from "react";
import style from "../../styles/Search/Search.module.css";

function Search({ places }: any): JSX.Element {
  const [string, setString] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setString(e.target.value);
  };

  const handleSubmit = (e: any) => {
    if (string) {
      let filter = places.filter(
        (e: any) => e.place.toLowerCase() === string.toLowerCase()
      );
      return filter;
    }
  };

  return (
    <div className={style.navSearch}>
      <input
        type="text"
        className={style.navInput}
        placeholder="Where are you going?"
        onChange={(e) => handleChange(e)}
        value={string}
        name="value"
      />
    </div>
  );
}

export default Search;
