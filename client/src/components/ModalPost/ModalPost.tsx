import style from "../../styles/ModalPost/ModalPost.module.css";
import cross from "../../img/cross.png";
import profileImage from "../../img/profileImage.png";
import user from "../../img/userpost.png";
import dropDownArrow from "../../img/dropdownpost.png";
import addPhoto from "../../img/AddPhoto.png";
import addPhotoHover from "../../img/AddPhotoHover.png";
import addVideo from "../../img/AddVideo.png";
import addVideoHover from "../../img/AddVideoHover.png";
import stars from "../../img/stars2.png";
import React, { useEffect, useState } from "react";
import { getCountries } from "../../redux/actions/VariablesActions";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { Country } from "../../types";
import { Rating } from "react-simple-star-rating";

type props = {
  visible: boolean;
  setVisible: (e: boolean) => void;
};

const clasification = [
  "Hotel & lodging",
  "Sights & monuments",
  "Food & beverage",
  "Transportation",
];

function ModalPost({ visible, setVisible }: props): JSX.Element {
  const dispatch = useAppDispatch();
  const selector = useAppSelector;

  const countries = selector<Country[]>((state) => state.countries);
  let filterCountry = countries.map((e: any) => e.name.common);

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  const [post, setPost] = useState({
    privacity: "",
    text: "",
    photo: "",
    video: "",
    rate: 0,
    clasification: "",
    location: "",
    name: "",
  });

  const handleRating = (rate: number) => {
    setPost({
      ...post,
      rate: rate,
    });
  };

  const handleChange = (e: any) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelect = (e: any) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={style.modalContainer}>
      {visible ? (
        <section className={style.modal}>
          <div className={style.container}>
            <aside className={style.modalHeader}>
              <h3>Create post</h3>
              <label
                onClick={() => setVisible(false)}
                style={{ cursor: "pointer" }}
              >
                <img src={cross} alt="" />
              </label>
            </aside>
            <aside className={style.modalInfoUser}>
              <img src={profileImage} alt="" width="72" height="72" />
              <div className={style.infoUser}>
                <h3>Emma Lopez</h3>
                <div className={style.infoUserPrivacity}>
                  <img src={user} alt="" />
                  <h5>Public</h5>
                  <img src={dropDownArrow} alt="" />
                </div>
              </div>
            </aside>
            <textarea
              className={style.text}
              placeholder="What would you like to share?"
              onChange={handleChange}
              name="text"
            ></textarea>
            <aside className={style.buttons}>
              <button>
                <img
                  src={addPhoto}
                  alt=""
                  width="98"
                  height="98"
                  className={style.media}
                />
              </button>
              <button>
                <img
                  src={addVideo}
                  alt=""
                  width="98"
                  height="98"
                  className={style.media}
                />
              </button>
            </aside>
            <aside className={style.infoPost}>
              <div className={style.rate}>
                <h5>Rate</h5>
                <Rating
                  onClick={handleRating}
                  fillColorArray={[
                    "#31135e",
                    "#31135e",
                    "#31135e",
                    "#31135e",
                    "#31135e",
                    "#31135e",
                  ]}
                  size={30}
                />
              </div>
              <div className={style.selectContainer}>
                <select
                  onChange={handleSelect}
                  className={style.clasification}
                  name="clasification"
                >
                  <option value="" defaultChecked>
                    Add classification
                  </option>
                  {clasification &&
                    clasification.map((e, i) => (
                      <option key={i} value={e}>
                        {e}
                      </option>
                    ))}
                </select>
                <img src={dropDownArrow} alt="" />
              </div>
              <div className={style.selectContainer}>
                <select
                  onChange={handleSelect}
                  className={style.location}
                  name="location"
                >
                  <option value="" defaultChecked>
                    Add location
                  </option>
                  {filterCountry &&
                    filterCountry.map((e, i) => (
                      <option key={i} value={e}>
                        {e}
                      </option>
                    ))}
                </select>
                <img src={dropDownArrow} alt="" />
              </div>
              <div className={style.selectContainer}>
                <input
                  type="text"
                  onChange={handleChange}
                  name="name"
                  className={style.name}
                  placeholder="Add name"
                />
              </div>
            </aside>
            <aside className={style.buttonPost}>
              <button>Post</button>
            </aside>
          </div>
        </section>
      ) : null}
    </div>
  );
}

export default ModalPost;
