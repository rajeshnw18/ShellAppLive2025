/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../User/Login.css'
import packageInfo from '../../../package.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useMsal } from "@azure/msal-react";
import Cookies from "js-cookie";

const Login = () => {

  const {user,loginWithRedirect ,isAuthenticated,logout}= useAuth0 ();
  console.log("current User:", user)
  Cookies.set("username", user, { expires: 7 }); // Store cookie for 7 days
  const { instance } = useMsal();
  
  const handleazureLogin = async () => {
    try {
      await instance.loginPopup({
        scopes: ["User.Read"],
      });
      console.log("Login Successful!");
    } catch (error) {
      console.error("Login Failed:", error);
    }
  };

  const BASE_URL=packageInfo.proxy; //Web Config api
  

  const [lgUserName, setUsername] = useState('');
  const [lgPassword, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [UserDisplayName, setUserDisplayName] = useState('');
  const navigate=useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(lgUserName)
    try {
      const response = await axios.post(BASE_URL+'/login', {
        lgUserName,
        lgPassword,
      });
      if(response.status===200)
        {
            setUserDisplayName(response.data.userName);
            console.log(UserDisplayName);
            window.localStorage.setItem("isLogIn", true)
            localStorage.setItem('auth', response.data.userName);
            localStorage.setItem('token', response.data.auth);
            localStorage.setItem('LoginWithGoogle', false)
            toast.success('Login Successful!');
            navigate("/dashboard");
        }
        else
        {  
            setMessage(response.data.message);
            toast.error(response.data.message);
            navigate("/");
        }

    } catch (error) {
      setMessage(error.response?.data?.message || 'Server API is not Working !');
    }
  };
    
    return (
        <div>

            <div className="container">

                {/*  <!-- Outer Row --> */}
                <div className="row justify-content-center">

                    <div className="col-xl-10 col-lg-12 col-md-9">

                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                {/* <!-- Nested Row within Card Body --> */}
                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-block bg-login-image">
                                    <img
                                                        
                                                        src="dist/img/Login_Header_1.png"
                                                        alt="User profile picture"
                                                    />
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Shell Report</h1>
                                            </div>
                                            <form onSubmit={handleLogin}>
                                            <div className="user">
                                                <div className="form-group">
                                                   <input type="text"  className="form-control form-control-user" value={lgUserName}
                                                        onChange={(e) => setUsername(e.target.value)} placeholder="Login Name"
                                                    />

                                                </div>
                                                <div className="form-group">
                                                    <input type="password" className="form-control form-control-user"
                                                        value={lgPassword} onChange={(e) => { setPassword(e.target.value) }}
                                                        placeholder="Password" />
                                                </div>
                                                <div className="form-group">
                                                    
                                                </div>
                                                <button className="btn btn-primary btn-user btn-block" type="submit">Login</button>
                                                {isAuthenticated? 
                                                ( 
                                                    window.localStorage.setItem("isLogIn", true),
                                                    localStorage.setItem('auth', user.name),
                                                    localStorage.setItem('LoginWithGoogle', true),
                                                    navigate("/dashboard"),
                                                <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log Out</button>
                                                ):
                                                ( 
                                                <button className="btn btn-primary btn-user btn-block" onClick={() => loginWithRedirect()}>Log with Google</button>
                                                )}
                                                \*<button className="btn btn-primary btn-user btn-block" onClick={() => handleazureLogin()}>Log with Microsoft</button>
                                               
                                               
                                                 <ToastContainer />
                                                <hr />
                                               
                                               
                                                {message && <p>{message}</p>}
                                               <br></br>
                                               <br></br>
                                               <br></br>
                                               <br></br>
                                               <br></br>
                                               <br></br>
                                            </div>
                                            </form>
                                            
                                            <hr />
                                            <div className="text-center">
                                            <br></br>
                                            </div>
                                            <div className="text-center">
                                            <br></br>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Login