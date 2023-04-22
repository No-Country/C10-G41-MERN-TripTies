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
import { Country, Profile, Tags } from "../../types";
import { Rating } from "react-simple-star-rating";
import { postPublication } from "../../redux/actions/Publications";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import React from "react";
import makeAnimated from "react-select/animated";
import Creatable, { useCreatable } from "react-select/creatable";
import Select from "react-select";
import Loading from "../Loading/Loading";
import axios from "axios";
import Swal from "sweetalert2";

type props = {
  visible: boolean;
  setVisible: (e: boolean) => void;
  profile: Profile;
  login: string;
  tags: any;
  loadingModal: boolean;
};

const clasification = [
  "Hotel & lodging",
  "Sights & monuments",
  "Food & beverage",
  "Transportation",
];

function ModalPost({
  visible,
  setVisible,
  profile,
  login,
  tags,
  loadingModal,
}: props): JSX.Element {
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
    tag: [],
    photo: [],
    video: [],
    rate: 0,
    clasification: "",
    location: "",
    name: "",
  });

  const [value, setValue] = useState("");

  //Configuration of Select Countries
  const optionsCountry = countries?.map((e: any) => {
    return { value: e.name.common, label: e.name.common };
  });

  //Configuration of Select Clasifications
  const optionClasification = clasification?.map((e: any) => {
    return { value: e, label: e };
  });

  //Configuration of Select Tags
  const options = tags?.map((e: any) => {
    return { value: e.tag, label: e.tag };
  });
  const animatedComponents = makeAnimated();

  const handleTag = (e: any) => {
    if (!post.tag.includes(e.value) && post.tag.length < 3) {
      setPost({
        ...post,
        tag: [...post.tag, e.value],
      });
      if (value !== "") {
        setPost({
          ...post,
          tag: [...post.tag, value],
        });
      }
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
      [e.target?.name]: e.target?.value,
    });
  };

  const handleSelectCountry = (e: any) => {
    setPost({
      ...post,
      location: e.value,
    });
  };

  const handleSelectClasification = (e: any) => {
    setPost({
      ...post,
      clasification: e.value,
    });
  };

  const handleCreate = (inputValue: string) => {
    if (!post.tag.includes(inputValue) && post.tag.length < 3) {
      setPost({
        ...post,
        tag: [...post.tag, `#${inputValue}`],
      });
    }
  };

  console.log(post);

  const handleSubmit = (e: any) => {
    dispatch(postPublication(post)).then(() => nav("/home"));
  };

  const handleUpdatePhotos = async (e: any) => {
    e.preventDefault();
    const files = e.target.files[0];
    const data = new FormData();
    data.append("file", files);
    data.append("upload_preset", "tripties");

    const response = await axios
      .post("https://api.cloudinary.com/v1_1/dtpsfvnfo/image/upload", data)
      .then((res: { data: { secure_url: string}; }) => {

        setPost({
          ...post,
          photo: [...post.photo, { url: res.data.secure_url, type: "image" }],
        })
      }).then(()=> Swal.fire({ title: "Image upload", icon: "success" })
      )
  };

  const handleUpdateVideos = async (e: any) => {
    e.preventDefault();
    const files = e.target.files[0];
    const data = new FormData();
    data.append("file", files);
    data.append("upload_preset", "tripties");

    const response = await axios
      .post("https://api.cloudinary.com/v1_1/dtpsfvnfo/video/upload", data)
      .then((res: { data: { url: any; }; }) => {
        console.log(res);
        setPost({
          ...post,
          video: [...post.video, { url: res.data.url, type: "video" }],
        });
      });
  };

  return (
    <div className={style.modalContainer}>
      {visible && login ? (
        <section className={style.modal}>
          {loadingModal ? (
            <Loading />
          ) : (
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
                  src={profile.photoUser}
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
                <div className={style.reactSelectContainer}>
                  <Creatable
                    isClearable
                    onCreateOption={handleCreate}
                    value={value}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    options={options}
                    placeholder="Select 3 tags!"
                    onChange={handleTag}
                    styles={{
                      placeholder: (state: any) => ({
                        ...state,
                        color: "#6c5206",
                      }),
                      control: (state: any) => ({
                        ...state,
                        fontSize: 16,
                        color: "#6c5206",
                        minWidth: 150,
                        initialLetter: "#",
                        background: "none",
                        border: "none",
                      }),
                      indicatorSeparator: (state: any) => ({
                        ...state,
                        display: "none",
                      }),
                      indicatorsContainer: (state: any) => ({
                        ...state,
                        display: "none",
                      }),
                    }}
                  ></Creatable>
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
                <label htmlFor="photo" className={style.media}>
                  <img src={addPhoto} alt="" width="98" height="98" />
                  <input type="file" id="photo" onChange={handleUpdatePhotos} />
                </label>

                <label htmlFor="video" className={style.media}>
                  <img
                    src={addVideo}
                    alt=""
                    width="98"
                    height="98"
                    className={style.media}
                  />
                  <input type="file" id="video" onChange={handleUpdateVideos} />
                </label>
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
                  <Select
                    options={optionClasification}
                    onChange={handleSelectClasification}
                    maxMenuHeight={120}
                    placeholder="Add Clasification!"
                    styles={{
                      placeholder: (state: any) => ({
                        ...state,
                        color: "#6c5206",
                      }),
                      control: (base: any, state: any) => ({
                        ...base,
                        color: "#6c5206",
                        minWidth: 150,
                        initialLetter: "#",
                        background: "none",
                        border: "none",
                      }),
                      indicatorSeparator: (state: any) => ({
                        ...state,
                        display: "none",
                      }),
                      indicatorsContainer: (state: any) => ({
                        ...state,
                        display: "none",
                      }),
                    }}
                  ></Select>
                  <img src={dropDownArrow} alt="" />
                </div>

                <div className={style.reactSelectContainer}>
                  <Select
                    options={optionsCountry}
                    onChange={handleSelectCountry}
                    maxMenuHeight={120}
                    placeholder="Add location!"
                    styles={{
                      placeholder: (state: any) => ({
                        ...state,
                        color: "#6c5206",
                      }),
                      control: (base: any, state: any) => ({
                        ...base,
                        color: "#6c5206",
                        minWidth: 150,
                        initialLetter: "#",
                        background: "none",
                        border: "none",
                      }),
                      indicatorSeparator: (state: any) => ({
                        ...state,
                        display: "none",
                      }),
                      indicatorsContainer: (state: any) => ({
                        ...state,
                        display: "none",
                      }),
                    }}
                  ></Select>
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
                  // disabled={
                  //   post.text === "" ||
                  //   post.clasification === "" ||
                  //   post.location === "" ||
                  //   post.name === ""
                  // }
                  type="submit"
                >
                  Post
                </button>
              </aside>
            </form>
          )}
        </section>
      ) : null}
    </div>
  );
}

export default ModalPost;
