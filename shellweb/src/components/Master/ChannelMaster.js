/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Header from '../Header'
import SideNav from '../SideNav'
import Footer from '../Footer'
import { useEffect, useState,useCallback } from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { ExportToExcel } from '../ExportToExcel'
import packageInfo from '../../../package.json';
//import { LocalStorage } from '@azure/msal-browser';

const ChannelMaster = () => {
    const BASE_URL=packageInfo.proxy; //Web Config api
    const [data, setData] = React.useState([])
    const fileName = "ChannelList";
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 8;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = users.slice(firstIndex, lastIndex);
    const npage = Math.ceil(users.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

const GetData = useCallback(() => {
       
    const token = localStorage.getItem('token'); 

    if (!token) {
        alert("No token found in localStorage");
        return;
    }

    fetch(BASE_URL + '/GetChannelMaster', {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
            .then((result) => result.json())
            .then((resp) => {
                setUsers(resp);
                setData(resp);
            })
            .catch((error) => console.error('Error fetching user details:', error));
    }, [BASE_URL]); 

useEffect(() => {
    GetData();
}, [GetData]);

    function prePage() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }
    function nextPage() {
        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1);
        }
    }
    function changePage(id) {
        setCurrentPage(id);
    }

    return (
        <div>
            <SideNav />
            <Header />
            <div className="content-wrapper">
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="card card-primary">
                                            <div className="card-header">
                                                <h3 className="card-title">Channel List</h3>
                                            </div>
                                           
                                            <table className='table'>
                                                <thead>
                                                    <th>ID</th>
                                                    <th>Company</th>
                                                    <th>Channel</th>
                                                    <th ><ExportToExcel apiData={data}  fileName={fileName} /></th>
                                                    
                                                </thead>
                                                <tbody>
                                                    {
                                                        records.map((item, i) =>
                                                        (
                                                            <tr key={i}>
                                                                <td>
                                                                    {i + 1}
                                                                </td>
                                                                <td>
                                                                    {item.BI_COMPANY}
                                                                </td>
                                                                <td>
                                                                    {item.BI_CHANNEL}
                                                                </td>

                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                            <nav>
                                                <ul className='pagination'>
                                                    <li className='page-item'>
                                                        <a className='page-link' onClick={prePage}>Prev</a>
                                                    </li>
                                                    {
                                                        numbers.map((n, i) =>
                                                        (
                                                            <li key={i} className={`page-item ${currentPage === n ? 'active' : ''}`} >
                                                                <a className='page-link' onClick={() => changePage(n)}>{n}</a>
                                                            </li>
                                                        ))
                                                    }
                                                    <li className='page-item'>
                                                        <a className='page-link' onClick={nextPage}>Next</a>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    )
}

export default ChannelMaster