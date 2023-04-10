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
import { Country } from "../../types";
import { Rating } from "react-simple-star-rating";
import { postPublication } from "../../redux/actions/Publications";
import SelectSearch from "react-select-search";

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

  const cloudinaryRef = useRef<any>();
  const widgetRef = useRef<any>();

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  let photosArray: object[] = [];
  let videosArray: object[] = [];

  const [post, setPost] = useState<any>({
    privacity: "Public",
    text: "",
    tag: [],
    photo: photosArray,
    video: videosArray,
    rate: 0,
    clasification: "",
    location: "",
    name: "",
  });

  let tags = ["#hola", "#prueba", "#prueba 2", "prueba 3"];

  const handleTag = (e: any) => {
    e.preventDefault();
    if (!post.tag.includes(e.target.value)) {
      setPost({
        ...post,
        tag: [...post.tag, e.target.value],
      });
    }
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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(postPublication(post));
  };

  useEffect(() => {
    cloudinaryRef.current = (window as any).cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dtioqvhiz",
        uploadPreset: "prueba",
        sources: ["local"],
        showUploadMoreButton: false,
        showCompletedButton: true,
      },
      function (_error: unknown, result: any) {
        if (result.info.resource_type === "image") {
          photosArray.push({
            type: "image",
            url: result.info.url,
          });
        }
        if (result.info.resource_type === "video") {
          videosArray.push({
            type: "video",
            url: result.info.url,
          });
        }
      }
    );
  }, []);

  const handleUpload = (e: any) => {
    e.preventDefault();
    widgetRef.current.open();
  };

  console.log("post", post);

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
              <img src={profileImage} alt="" width="72" height="72" />
              <div className={style.infoUser}>
                <h3>Emma Lopez</h3>
                <div className={style.infoUserPrivacity}>
                  <img src={user} alt="" />
                  <select onChange={handleSelect} name="privacity">
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                  </select>
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
            <aside className={style.tags}>
              <select onChange={handleTag} name="tag" placeholder="Add Tags!">
                <option value="" disabled selected hidden>
                  Add Tags!
                </option>
                {tags && tags.map((e) => <option value={e}>{e}</option>)}
              </select>
              {post.tag && post.tag.map((e: any) => <h2>{e}</h2>)}
            </aside>

            <aside className={style.buttons}>
              <button onClick={handleUpload}>
                <img
                  src={addPhoto}
                  alt=""
                  width="98"
                  height="98"
                  className={style.media}
                />
              </button>
              <button onClick={handleUpload}>
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
