import style from "../../styles/ModalPost/ModalPost.module.css";
import cross from "../../img/cross.png";
import profileImage from "../../img/profileImage.png";
import user from "../../img/userpost.png";
import dropDownArrow from "../../img/dropdownpost.png";
import addPhoto from "../../img/AddPhoto.png";
import addVideo from "../../img/AddVideo.png";
import { useEffect, useRef, useState } from "react";
import { getCountries } from "../../redux/actions/VariablesActions";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { Country, Profile } from "../../types";
import { Rating } from "react-simple-star-rating";
import { postPublication } from "../../redux/actions/Publications";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

type props = {
  visible: boolean;
  setVisible: (e: boolean) => void;
  profile: Profile;
};

const clasification = [
  "Hotel & lodging",
  "Sights & monuments",
  "Food & beverage",
  "Transportation",
];

function ModalPost({ visible, setVisible, profile }: props): JSX.Element {
  const dispatch = useAppDispatch();
  const selector = useAppSelector;
  const nav = useNavigate();

  const countries = selector<Country[]>((state) => state.countries);
  let filterCountry = countries.map((e: any) => e.name.common);

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  const [post, setPost] = useState<any>({
    privacity: "Public",
    text: "",
    tag: ["#Paris"],
    photo: [
      {
        url: "https://res.cloudinary.com/dtioqvhiz/image/upload/v1681420019/506659-eiffel-tower_uruuy6.webp",
        type: "image",
      },
      {
        url: "https://res.cloudinary.com/dtioqvhiz/image/upload/v1681420007/paris_37bc088a_1280x720_zyikii.jpg",
        type: "image",
      },
      {
        url: "https://res.cloudinary.com/dtioqvhiz/image/upload/v1681420007/230324090551-01-visiting-france-during-protests-what-to-know-top_od59li.jpg",
        type: "image",
      },
    ],
    video: [
      {
        url: "https://res.cloudinary.com/dtioqvhiz/video/upload/v1681420038/y2mate.com_-_Par%C3%ADs_Francia_una_ciudad_hermosa_y_tur%C3%ADstica_v240P_jbn2rr.mp4",
        type: "video",
      },
    ],
    rate: 0,
    clasification: "",
    location: "",
    name: "",
  });

  let tags = [
    "#hola",
    "#prueba",
    "#prueba 2",
    "prueba 3",
    "#hola111",
    "#prueba111",
    "#prueba 2111111",
    "prueba 311111",
  ];

  const handleTag = (e: any) => {
    e.preventDefault();
    if (!post.tag.includes(e.target.value) && post.tag.length < 3) {
      setPost({
        ...post,
        tag: [...post.tag, e.target.value],
      });
    }
  };

  const deleteHandleTag = (e: any) => {
    e.preventDefault();
    setPost({
      ...post,
      tag: post.tag.filter((tag: string) => tag !== e.target.value),
    });
  };

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

  const handleSubmit = () => {
    dispatch(postPublication(post)).then(() => nav("/home"));
  };

  return (
    <div className={style.modalContainer}>
      {visible ? (
        <section className={style.modal}>
          <form onSubmit={handleSubmit} className={style.container}>
            <aside className={style.modalHeader}>
              <h3>Create post</h3>
              <label
                onClick={() => setVisible(false)}
                style={{ cursor: "pointer" }}
              >
                <img src={cross} alt="" width={20} height={20} />
              </label>
            </aside>
            <aside className={style.modalInfoUser}>
              <img
                src={profile.photo === "" ? user : profile.photo}
                alt=""
                width="72"
                height="72"
                style={{ borderRadius: "50%" }}
              />
              <div className={style.infoUser}>
                <h3>
                  {profile.first_name} {profile.last_name}
                </h3>
                <div className={style.infoUserPrivacity}>
                  <img src={user} alt="" />
                  <select
                    className={style.selectPrivacity}
                    onChange={handleSelect}
                    name="privacity"
                  >
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                  </select>
                  <img
                    className={style.dropDownArrowPrivacity}
                    src={dropDownArrow}
                    alt=""
                  />
                </div>
              </div>
            </aside>
            <textarea
              className={style.text}
              placeholder="What would you like to share?"
              onChange={handleChange}
              name="text"
              value={post.text}
            ></textarea>
            <aside className={style.tags}>
              <div className={style.selectTag}>
                <select onChange={handleTag} name="tag" placeholder="Add Tags!">
                  <option value="" disabled selected hidden>
                    Add Tags!
                  </option>
                  {tags && tags.map((e) => <option value={e}>{e}</option>)}
                </select>
                <img src={dropDownArrow} alt="" />
              </div>

              <div className={style.previewTag}>
                {post.tag &&
                  post.tag.map((e: string) => (
                    <>
                      <h3>{e}</h3>
                      <button onClick={deleteHandleTag} value={e}>
                        X
                      </button>
                    </>
                  ))}
              </div>
            </aside>

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
                  <option value="" disabled selected hidden>
                    Add clasification!
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
                  <option value="" disabled selected hidden>
                    Add location!
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
              <button
                disabled={
                  post.text === "" ||
                  post.clasification === "" ||
                  post.location === "" ||
                  post.name === ""
                }
                type="submit"
              >
                Post
              </button>
            </aside>
          </form>
        </section>
      ) : null}
    </div>
  );
}

export default ModalPost;
