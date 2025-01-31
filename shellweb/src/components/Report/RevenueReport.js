/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header'
import SideNav from '../../components/SideNav'
import Footer from '../../components/Footer'
import * as XLSX from 'xlsx';
import packageInfo from '../../../package.json';

function RevenueReport() {

    const BASE_URL=packageInfo.proxy; //Web Config api
    //Start Export Data
    function GetExportExcelldata() {
        let Data = { ChannelName, StartDate, EndDate }
        console.log(Data);
        fetch(BASE_URL+"/GetRevenueDetailWithFilter/" + StartDate + "/" + EndDate + "/" + ChannelName)
            .then(data => {
                return data.json();
            })
            .then(post => {
                const worksheet = XLSX.utils.json_to_sheet(post);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, "RevenueDetails");
                XLSX.writeFile(workbook, "RevenueDetails.xlsx");

            });
    }

    //Start Filter Condition to Get All Data & Validation

    const [FilterData, GetFilter] = useState([])
    function GetFilterData() {
        debugger;
        let Data = { ChannelName, StartDate, EndDate }
        console.log(Data);
        fetch(BASE_URL+"/GetRevenueDetailWithFilter/" + StartDate + "/" + EndDate + "/" + ChannelName)
            .then(data => {
                return data.json();
            })
            .then(post => {
                GetFilter(post);
                console.log(post);

            });
    }

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 8;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = FilterData.slice(firstIndex, lastIndex);
    const npage = Math.ceil(FilterData.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);
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

    //End Filter Condition to Get All Data & Validation

    /*Start Bind Channel*/
    const [Channel, setChannel] = useState([]);
    const [ChannelName, setChannelName] = useState();
    useEffect(() => {
        debugger;
        
        const getChannel = async () => {
            const req = await fetch(BASE_URL+"/GetChannelMaster");
            const getres = await req.json();
            console.log(getres);
            setChannel(await getres);

        }
        const GetRevenueDetail = async () => {
            const req = await fetch(BASE_URL+"/GetRevenueDetail");
            const getres = await req.json();
            GetFilter(getres);

        }
        getChannel();
        GetRevenueDetail();


    }, [BASE_URL]);


    const handleChannel = (event) => {
        const getChannel = event.target.value;
        setChannelName(getChannel)
        console.log(getChannel)
        event.preventDefault();
    }
    /* End Bind Channel*/

    /*>>>>> Start Date Control */

    const date = new Date();
    const futureDate = date.getDate();
    date.setDate(futureDate);
    const defaultValue = date.toLocaleDateString('en-CA');
    const [StartDate, setStartDate] = useState(defaultValue);
    const [EndDate, setEndDate] = useState(defaultValue);

    /*>>>>> End Date Control */

    return (
        <div>
            <SideNav />
            <Header />

            {/* Content Wrapper. Contains page content */}
            <div className="content-wrapper">
                <section className="content">
                    <div className="container-fluid">
                        {/* Small boxes (Stat box) */}

                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="x_content" style={{ marginBottom: 1 }}>
                                        <div className="card card-primary">
                                            <div className="card-header">
                                                <h3 className="card-title">Revenue Spot Details</h3>
                                            </div>
                                        </div>

                                        <div className="card-body">

                                            <div className="row">
                                                <div className="col-sm-12">
                                                    {/* select */}
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Channel</label>
                                                        <select name="Channel" className="form-control" onChange={(e) => handleChannel(e)}>

                                                            <option>All Channel</option>
                                                            {
                                                                Channel.map((getcon) => (
                                                                    <option key={getcon.BI_CHANNEL} value={getcon.BI_CHANNEL}> {getcon.BI_CHANNEL}</option>
                                                                ))
                                                            }

                                                        </select>

                                                    </div>
                                                </div>

                                            </div>
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    {/* select */}
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">From Date</label>
                                                        <br />
                                                        <input id="dateRequired" type="date" name="dateRequired" defaultValue={defaultValue} value={StartDate} onChange={(e) => { setStartDate(e.target.value) }} />

                                                    </div>
                                                </div>
                                                <div className="col-sm-3">
                                                    {/* select */}
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">To Date</label>
                                                        <br />
                                                        <input id="dateRequired" type="date" name="dateRequired" defaultValue={defaultValue} value={EndDate} onChange={(e) => { setEndDate(e.target.value) }} />

                                                    </div>
                                                </div>
                                                <div className="col-sm-3">
                                                    {/* select */}
                                                    <div className="form-group">
                                                        <br></br>
                                                        <button className="btn btn-primary btn-user btn-block" onClick={GetFilterData} >
                                                            View Summary
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="col-sm-3">
                                                    <div className="form-group">
                                                        <br></br>
                                                        <button className="btn btn-primary btn-user btn-block" onClick={GetExportExcelldata} >
                                                            Excell Report
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>



                                <div className="card">

                                    {/* /.card-header */}

                                    <table id="example1" className="table table-bordered table-striped">
                                        <thead style={{ background: "#007bff" }}>
                                            <th>Year</th>
                                            <th>Company</th>
                                            <th>Month</th>
                                            <th>Channel</th>
                                            <th>ShellSpot</th>
                                            <th>BISpot</th>
                                            <th>Diffrence</th>
                                            <th>Date</th>
                                        </thead>
                                        <tbody>
                                            {
                                                records.map((item, i) =>
                                                (
                                                    <tr key={i}>
                                                        <td>
                                                            {item.RAW_YEAR}
                                                        </td>
                                                        <td>
                                                            {item.RAW_COMPANY}
                                                        </td>
                                                        <td>
                                                            {item.RAW_MONTH}
                                                        </td>
                                                        <td>
                                                            {item.RAW_CHANNELNAME}
                                                        </td>
                                                        <td>
                                                            {item.RAW_SHELL_TOTAL_SPOT}
                                                        </td>
                                                        <td>
                                                            {item.RAW_BI_SHELL_TOTAL_SPOT}
                                                        </td>
                                                        <td>
                                                            {item.RAW_SPOT_DIFFRENCE}
                                                        </td>
                                                        <td>
                                                            {item.RAW_DATE}
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

                                    {/* /.card-body */}
                                </div>

                                {/* /.card */}

                                {/* /.card */}
                            </div>
                            {/* /.col */}
                        </div>



                    </div>{/* /.container-fluid */}
                </section>
                {/* /.content */}
            </div >
            {/* /.content-wrapper */}

            < Footer />
        </div >

    )

}

export default RevenueReport


