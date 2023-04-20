import {
  IResolveParams,
  LoginSocialGoogle,
  LoginSocialFacebook,
} from "reactjs-social-login";
import { useCallback, useEffect, useState } from "react";
import google from "../../img/google.png";
import facebook from "../../img/facebook.png";
import { Users } from "../../types";
import { useAppDispatch } from "../../redux/store/hooks";
import { createUser, loginUser } from "../../redux/actions/Users";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

type props = {
  setInput: any;
  newUser: object;
};

function SocialNetworks({ setInput, newUser }: props): JSX.Element {
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const [userGoogle, setUserGoogle] = useState<Users>({
    password: "",
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    photoUser: "",
  });

  const [userFacebook, setUserFacebook] = useState<Users>({
    password: "",
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    photoUser: "",
  });

  // ESTO NO FUNCIONA TODAVIA

  const onResolveGoogle = ({ data, provider }: IResolveParams) => {
    setUserGoogle({
      username: (data && data.name) || (data && data.email.split("@")[0]),
      email: data && data.email,
      firstName: data && data.first_name,
      lastName: data && data.last_name,
      photoUser: data && data.picture,
      password: `${Math.random().toString(36).substring(2, 7)}`,
    });
  };

  const onResolveFacebook = ({ data }: IResolveParams) => {
    setUserFacebook({
      username: data && data.name,
      email: data && data.email,
      firstName: data && data.first_name,
      lastName: data && data.last_name,
      photoUser: data && data.picture.data.url,
      password: `${Math.random().toString(36).substring(2, 7)}`,
    });
  };

  useEffect(() => {
    if (userGoogle.email !== "") {
      dispatch(createUser(userGoogle));
    } else if (userFacebook.email !== "") {
      dispatch(createUser(userFacebook));
    }
  }, [userGoogle || userFacebook]);

  const onReject = (err: unknown) => {
    throw err;
  };

  return (
    <>
      <LoginSocialGoogle
        client_id={import.meta.env.VITE_GG_APP_ID}
        onResolve={onResolveGoogle}
        onReject={onReject}
        scope={"https://www.googleapis.com/auth/userinfo.email"}
      >
        <img src={google} alt="Google" style={{ cursor: "pointer" }} />
      </LoginSocialGoogle>
      <LoginSocialFacebook
        appId={import.meta.env.VITE_FB_APP_ID}
        onResolve={onResolveFacebook}
        onReject={onReject}
        fieldsProfile={
          "id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
        }
      >
        <img src={facebook} alt="Facebook" style={{ cursor: "pointer" }} />
      </LoginSocialFacebook>
    </>
  );
}

export default SocialNetworks;
