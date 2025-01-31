import React from "react";
import { useMsal } from "@azure/msal-react";


const Login = () => {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginPopup()
      .then(response => {
        console.log("Login Success:", response);
      })
      .catch(error => {
        console.error("Login Error:", error);
      });
  };

  return (
    <button onClick={handleLogin}>
      Sign in with Microsoft
    </button>
  );
};

export default Login;
