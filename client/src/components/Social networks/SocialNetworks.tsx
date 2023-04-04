import { IResolveParams, LoginSocialGoogle } from "reactjs-social-login";
import { useCallback, useState } from "react";
import google from "../../img/google.png";
import facebook from "../../img/facebook.png";
import FacebookLogin from "react-facebook-login";

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
      <FacebookLogin
        appId={appID}
        onClick={onLoginStart}
        callback={onResolve}
        fields="name,email,picture,birthday"
        scope="public_profile, email, user_birthday"
        textButton=""
        icon={
          <img src={facebook} alt="Facebook" style={{ cursor: "pointer" }} />
        }
        buttonStyle={{
          border: "none",
          background: "none",
          marginBottom: "5px",
        }}
      />
    </>
  );
}

export default SocialNetworks;
