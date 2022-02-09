import { FC } from "react";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  GoogleLogout,
} from "react-google-login";
import { login } from "infrastructure/backend_api";

const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const onFailure = (response: GoogleLoginResponse | GoogleLoginResponseOffline) =>
  console.log(response);
const SCOPE = "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/tasks";

interface LoginButtonProps {
  isLoggedIn: boolean;
  setUserId: (id: string) => void;
}

const LoginButton: FC<LoginButtonProps> = (props) => {
  const setUserId = props.setUserId;
  const handleGoogleLogin = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    response = response as GoogleLoginResponseOffline;
    login(response.code).then((id: string) => {
      setUserId(id);
    });
  };
  const onLogoutSuccess = () => {
    setUserId("");
  };
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return (
      <GoogleLogout
        clientId={googleClientId}
        buttonText="Logout"
        onLogoutSuccess={onLogoutSuccess}
      />
    );
  }
  return (
    <GoogleLogin
      clientId={googleClientId}
      buttonText="Login"
      onSuccess={handleGoogleLogin}
      onFailure={onFailure}
      prompt="consent"
      responseType="code"
      accessType="offline"
      scope={SCOPE}
      redirectUri="postmessage"
    />
  );
};
export default LoginButton;
