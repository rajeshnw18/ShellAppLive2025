import Header from "./components/Header"
import Home from "./components/Home"
import Footer from "./components/Footer"
import SideNav from "./components/SideNav"
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState();

    useEffect(() => {
        debugger;
        const loggedInUser = localStorage.getItem("auth");
        if (loggedInUser) {
            setUser(loggedInUser);
            console.log(user);
        }
        else {
            navigate("/");
        }
    }, [navigate, user]);

    return (
        <div>
            <Header />
            <Home />
            <SideNav />
            <Footer />

        </div>
    )
}
export default Dashboard