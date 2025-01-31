/* eslint-disable jsx-a11y/img-redundant-alt */
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Cookies from "js-cookie";
const Header = () => {
     const {logout}= useAuth0 ();
    var UserName = localStorage.getItem('auth');
    const navigate = useNavigate();
    var LoginType=false;
    function GetLogOuts() {
        debugger;
         LoginType=localStorage.getItem('LoginWithGoogle')
        if(LoginType)
        {
            window.localStorage.removeItem("isLogIn");
            window.localStorage.removeItem("auth");
            window.localStorage.removeItem("LoginWithGoogle");
            localStorage.clear();
            sessionStorage.clear();
            Cookies.remove("username");
            logout({
                logoutParams: { returnTo: window.location.origin },
              });
            navigate("/");
        }
        else
        { window.localStorage.removeItem("isLogIn");
            window.localStorage.removeItem("auth");
            window.localStorage.removeItem("LoginWithGoogle");
            localStorage.clear();
            navigate("/");

        }
       

    }

    return (
        <div>
            {/* Navbar */}
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                {/* Left navbar links */}
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="/" role="button"><i className="fas fa-bars" /></a>
                    </li>
                   
                </ul>
                {/* Right navbar links */}
                <ul className="navbar-nav ml-auto">

                    {/*  <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}
                    <li className="nav-item dropdown no-arrow d-sm-none">

                        {/*   <!-- Dropdown - Messages --> */}
                        <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                            aria-labelledby="searchDropdown">
                            <form className="form-inline mr-auto w-100 navbar-search">

                            </form>
                        </div>
                    </li>


                    <div className="topbar-divider d-none d-sm-block"></div>

                    {/* <!-- Nav Item - User Information --> */}
                    <li className="nav-item dropdown no-arrow">
                        <a className="nav-link dropdown-toggle" href="/" id="userDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="mr-2 d-none d-lg-inline text-gray-600 small">{UserName}</span>
                            
                        </a>
                        {/*  <!-- Dropdown - User Information --> */}
                        <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                            aria-labelledby="userDropdown">
                            <a className="dropdown-item" href="/" data-toggle="modal" data-target="#ProfileModal">
                                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                Profile
                            </a>
                            
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="/" data-toggle="modal" data-target="#logoutModal">
                                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                Logout
                            </a>
                        </div>
                    </li>

                </ul>
            </nav>
            {/* /.navbar */}
            {/*  <!-- Logout Modal--> */}
            <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">�</span>
                            </button>
                        </div>
                        <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                           
                              {LoginType? 
                                                ( 
                                            <button className="btn btn-secondary" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} type="button" data-dismiss="modal">Logout</button>
                         
                                                 ):
                                                ( 
                                                    <button className="btn btn-secondary" onClick={GetLogOuts} type="button" data-dismiss="modal">Logout</button>
                                                )}
                            {/*<a className="btn btn-primary" href="/">Logout</a>*/}
                        </div>
                    </div>
                </div>
            </div>

            {/*  <!-- ProfileModal Modal--> */}
            <div className="modal fade" id="ProfileModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Profile Deatils</h5>
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                               <h1>x</h1>
                            </button>
                        </div>
                        <section className="content">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-12">
                                        {/* Profile Image */}
                                        <div className="card card-primary card-outline">
                                            <div className="card-body box-profile">
                                                <div className="text-center">
                                                    <img
                                                        className="profile-user-img img-fluid img-circle"
                                                        src="dist/img/rajesh.jpg"
                                                        alt="User profile picture"
                                                    />
                                                </div>
                                                <h3 className="profile-username text-center">{UserName}</h3>
                                                <p className="text-muted text-center">Software Engineer</p>
                                               
                                            </div>
                                            {/* /.card-body */}
                                        </div>
                                        {/* /.card */}
                                        {/* About Me Box */}
                                        <div className="card card-primary">
                                            <div className="card-header">
                                                <h3 className="card-title">About Me</h3>
                                            </div>
                                            {/* /.card-header */}
                                            <div className="card-body">
                                                <strong>
                                                    <i className="fas fa-book mr-1" /> Education
                                                </strong>
                                                <p className="text-muted">
                                                    Computer Science 
                                                </p>
                                                <hr />
                                               
                                               
                                                <strong>
                                                    <i className="far fa-file-alt mr-1" /> Notes
                                                </strong>
                                                <p className="text-muted">
                                                    Software Engg.
                                                </p>
                                            </div>
                                            {/* /.card-body */}
                                        </div>
                                        {/* /.card */}
                                    </div>
                                    {/* /.col */}
                                    
                                    {/* /.col */}
                                </div>
                                {/* /.row */}
                            </div>
                            {/* /.container-fluid */}
                        </section>

                    </div>
                </div>
            </div>
        </div>

    )
  }
  
  export default Header