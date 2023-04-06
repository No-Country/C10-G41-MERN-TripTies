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
import { createUser } from "../../redux/actions/Users";
import swal from "sweetalert";

type props = {
  setInput: any;
  newUser: object;
};

function SocialNetworks({ setInput, newUser }: props): JSX.Element {
  const dispatch = useAppDispatch();

  const [userGoogle, setUserGoogle] = useState<Users>({
    password: "",
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    photo: "",
  });

  const [userFacebook, setUserFacebook] = useState<Users>({
    password: "",
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    photo: "",
  });

  // ESTO NO FUNCIONA TODAVIA

  const onResolveGoogle = ({ data, provider }: IResolveParams) => {
    swal({
      title: "Attention",
      text: `Recaudaremos informacion de tu cuenta de ${provider} para ayudarte a completar el registro`,
      icon: "info",
    }).then(
      setInput({
        username: data && data.name,
        email: data && data.email,
        firstName: data && data.first_name,
        lastName: data && data.last_name,
        photo: data && data.picture,
        password: "",
      })
    );
  };

  console.log(newUser);

  const onResolveFacebook = ({ data }: IResolveParams) => {
    swal({
      title: "All the fields are required",
      icon: "warning",
    }).then(() => {
      setInput({
        username: data && data.name,
        email: data && data.email,
        firstName: data && data.first_name,
        lastName: data && data.last_name,
        photo: data && data.picture.data.url,
        password: "",
      });
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
    console.log(err);
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
