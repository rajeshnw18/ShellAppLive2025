/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";


const SideNav = () => {

    
    var UserName = localStorage.getItem('auth');
    return (
        <div >
            {/* Main Sidebar Container */}
            <aside className="main-sidebar sidebar-dark-blue elevation-4" style={{ background: "rgb(17, 104, 198)" }} >
                {/* Brand Logo */}
               
                <Link to="/dashboard" className="brand-link">
                    <img src="dist/img/Shell_Icon.jpg" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                    <span className="brand-text font-weight-light">Shell Report</span>
                </Link>
                {/* Sidebar */}
                <div className="sidebar">
                    {/* Sidebar user panel (optional) */}
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <img src="dist/img/Rajesh.jpg" className="img-circle elevation-2" alt="User Image" />

                        </div>
                        <div className="info">
                             <Link to="/dashboard" className="d-block">{UserName}
                                  </Link>
                        </div>
                    </div>
                    {/* SidebarSearch Form */}

                    {/* Sidebar Menu */}
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}

<li className="nav-item">
            <Link to="/dashboard" className="nav-link">
                <i className="nav-icon fas fa-chart-pie" />
                <p>
                    Dashboard
                </p>
            </Link>
           
 </li>

 <li className="nav-item">
            <Link to="/RevenueReport" className="nav-link">
                <i className="nav-icon fas fa-tree" />
                <p>
                    Shell-Report
                </p>
            </Link>
 </li>

 <li className="nav-item">
            <Link to="/BIReport" className="nav-link">
                <i className="nav-icon fas fa-edit" />
                <p>
                    BI-Report
                </p>
            </Link>
 </li>

 <li className="nav-item">
            <Link to="/dashboard" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>
                    DB-History
                </p>
            </Link>
 </li>

 <li className="nav-item">
            <Link to="/ChannelMaster" className="nav-link">
                <i className="nav-icon fas fa-table" />
                <p>
                Channel Master
                </p>
            </Link>
 </li>
 <li className="nav-item">
            <Link to="/UserMaster" className="nav-link">
                <i className="nav-icon fas fa-table" />
                <p>
                User Master
                </p>
            </Link>
 </li>
 <li className="nav-item">
            <Link to="/AgencyMaster" className="nav-link">
                <i className="nav-icon fas fa-table" />
                <p>
                Agency Master
                </p>
            </Link>
 </li>
 <li className="nav-item">
            <Link to="/AdvertiserMaster" className="nav-link">
                <i className="nav-icon fas fa-table" />
                <p>
                Advertiser Master
                </p>
            </Link>
 </li>
 <li className="nav-item">
            <Link to="/ShellReport" className="nav-link">
                <i className="nav-icon fas fa-table" />
                <p>
                CurrenctLocation
                </p>
            </Link>
 </li>
 <li className="nav-item">
            <Link to="/Location" className="nav-link">
                <i className="nav-icon fas fa-table" />
                <p>
                Location
                </p>
            </Link>
 </li>
 <li className="nav-item">
            <Link to="/ChatBot" className="nav-link">
                <i className="nav-icon fas fa-table" />
                <p>
                ChatBot
                </p>
            </Link>
 </li>

 
                        </ul>
                    </nav>
                    {/* /.sidebar-menu */}
                </div>
                {/* /.sidebar */}
            </aside >

        </div >
    )
}

export default SideNav
