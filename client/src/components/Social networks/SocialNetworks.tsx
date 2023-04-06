import {
  IResolveParams,
  LoginSocialGoogle,
  LoginSocialFacebook,
} from "reactjs-social-login";
import { useCallback, useState } from "react";
import google from "../../img/google.png";
import facebook from "../../img/facebook.png";
// import FacebookLogin from "react-facebook-login";

function SocialNetworks(): JSX.Element {
  const clientID =
    "456183635923-ah5r94hf6iaktfsrstmq4r2gafl73mdr.apps.googleusercontent.com";

  const appID = "139090382264569";

  const [provider, setProvider] = useState("");
  const [profile, setProfile] = useState<any>();

  const onLoginStart = useCallback(() => {
    setProfile(null);
  }, []);

  const onResolve = (response: any) => {
    console.log(response);
  };

  const onReject = (err: unknown) => {
    console.log(err);
  };

  // const onLogoutSuccess = useCallback(() => {
  //   setProfile(null);
  //   setProvider("");
  //   alert("logout success");
  // }, []);
  return (
    <>
      <LoginSocialGoogle
        client_id={clientID}
        onLoginStart={onLoginStart}
        onResolve={onResolve}
        onReject={onReject}
      >
        <img src={google} alt="Google" style={{ cursor: "pointer" }} />
      </LoginSocialGoogle>
      <LoginSocialFacebook
        appId={appID}
        onLoginStart={onLoginStart}
        onResolve={onResolve}
        onReject={onReject}
      >
        <img src={facebook} alt="Facebook" style={{ cursor: "pointer" }} />
      </LoginSocialFacebook>
    </>
  );
}

export default SocialNetworks;
