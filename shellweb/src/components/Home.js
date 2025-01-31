/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Chart from "react-apexcharts";
import LocationDashBoard from "../../../shellweb/src/components/Location/LocationDashBoard";
import Loader from './Loader';
import packageInfo from '../../package.json';

const Home = () => {

    //var UserName = localStorage.getItem('auth');
    const [showLoader, setShowLoader] = useState(false);
    const [shellData, setshellData] = useState([]);
    const [biData, setbiData] = useState([]);
    const [sChannelName, setsChannelName] = useState([]);
    const [AmountinLakh, setAmountinLakh] = useState([]);
    const [sBIChannelName, setBIChannelName] = useState([]);
    const [BIAmountinLakh, setBIAmountinLakh] = useState([]);
    const [shellSysDateTime, setshellSysDateTime] = useState([]);
    const [shellbiSysDateTime, setshellbiSysDateTime] = useState([]);

    useEffect(() => {
        const BASE_URL=packageInfo.proxy; //Web Config api
        const StartDate = "2024-04-01";
        const EndDate = "2025-03-31";
        const sReport = "SHELL";
        const sChannel = [];
        const sAmount = [];
        const getShelldata = async () => {
            const reqData = await fetch(BASE_URL+"/GetRevenueBarGraph/" + StartDate + "/" + EndDate + "/" + sReport);
           debugger;
            const resData = await reqData.json(); // Parse JSON
            // Check if resData is an array and contains the inner array
            if (Array.isArray(resData) && resData.length > 0) {
                const innerArray = resData[0]; // Get the first array
                setshellData(resData[0]);
                if (Array.isArray(innerArray)) {
                innerArray.forEach(item => {
                    
                    if (item.RAW_CHANNELNAME === "NEWS18 INDIA" || item.RAW_CHANNELNAME === "CNN-NEWS18" || item.RAW_CHANNELNAME === "NEWS18 LOKMAT") {
                        setshellSysDateTime("[ Last Syn:-" + item.RAW_DATE.toString()+ " ]")
                        sChannel.push(item.RAW_CHANNELNAME.toString());
                        sAmount.push(parseInt(item.RAW_SHELL_TOTAL_SPOT.toString()));
                    }
                });
                } else {
                console.log("The first element of resData is not an array:", innerArray);
                }
            } 
            setsChannelName(sChannel);
            setAmountinLakh(sAmount);
        }
        // BI DATA
        const sBIReport = "BI";
        const sBIChannel = [];
        const sBIAmount = [];
        const getBIdata = async () => {
            const reqData = await fetch(BASE_URL+"/GetRevenueBarGraph/" + StartDate + "/" + EndDate + "/" + sBIReport);
            const resData = await reqData.json(); // Parse JSON
            // Check if resData is an array and contains the inner array
            if (Array.isArray(resData) && resData.length > 0) {
                const innerArray = resData[0]; // Get the first array
                setbiData(resData[0]);
                if (Array.isArray(innerArray)) {
                innerArray.forEach(item => {
                    
                    if (item.RAW_CHANNELNAME === "NEWS18 INDIA" || item.RAW_CHANNELNAME === "CNN-NEWS18" || item.RAW_CHANNELNAME === "NEWS18 LOKMAT") {
                        setshellbiSysDateTime("[ Last Syn:-" + item.RAW_DATE.toString()+ " ]")
                        sBIChannel.push(item.RAW_CHANNELNAME.toString());
                        sBIAmount.push(parseInt(item.RAW_BI_SHELL_TOTAL_SPOT.toString()));
                    }
                });
                } else {
                console.log("The first element of resData is not an array:", innerArray);
                }
            }

            setBIChannelName(sBIChannel);
            setBIAmountinLakh(sBIAmount);
        }

        getShelldata();
        getBIdata();

    }, []);

    function GetSynShellReport() {
      const BASE_URL=packageInfo.proxy; //Web Config api
        setShowLoader(true);
        setTimeout(() => {
        const StartDate = "2024-04-01";
        const EndDate = "2025-03-31";
        const sReport = "SynShell";
        fetch(BASE_URL+"/GetRevenueBarGraph/" + StartDate + "/" + EndDate + "/" + sReport)
            .then(data => {
                return data.json();
            })
            .then(post => {

                setshellData(post)

            });
            setShowLoader(false);
        }, 5 * 1000)

    }
    function GetSynBIShellReport() {

       

    }
    const GetrdshellNoida = e => {
        const ssChannel = [];
        const ssAmount = [];
        if (Array.isArray(shellData) && shellData.length > 0) {
            const innerArray = shellData; 
            if (Array.isArray(innerArray)) {
            innerArray.forEach(item => {
                if (e.target.value === "Mumbai") {

                    if (item.RAW_CHANNELNAME === "CNBC AWAAZ" || item.RAW_CHANNELNAME=== "CNBC BAJAR" || item.RAW_CHANNELNAME=== "CNBC HD" || item.RAW_CHANNELNAME === "CNBC TV18") {
    
                        setshellSysDateTime("[ Last Syn:-" + item.RAW_DATE + " ]")
                        ssChannel.push(item.RAW_CHANNELNAME);
                        ssAmount.push(parseInt(item.RAW_SHELL_TOTAL_SPOT));
                        setsChannelName(ssChannel);
                        setAmountinLakh(ssAmount);
                    }
                }

                if (e.target.value === "Noida") {
                    if (item.RAW_CHANNELNAME === "NEWS18 INDIA" || item.RAW_CHANNELNAME === "CNN-NEWS18" || item.RAW_CHANNELNAME=== "NEWS18 LOKMAT") {
    
                        setshellSysDateTime("[ Last Syn:-" + item.RAW_DATE + " ]")
                        ssChannel.push(item.RAW_CHANNELNAME);
                        ssAmount.push(parseInt(item.RAW_SHELL_TOTAL_SPOT));
                        setsChannelName(ssChannel);
                        setAmountinLakh(ssAmount);
                    }
                }
                if (e.target.value === "Hyd8") {
                    if (item.RAW_CHANNELNAME === "NEWS18 JAMMU/KASHMIR/LADAKH/HIMACHAL" || item.RAW_CHANNELNAME === "NEWS 18 KERALA" || item.RAW_CHANNELNAME === "NEWS18 MADHYAPRADESH / CHATTISGARH" || item.RAW_CHANNELNAME === "NEWS18 RAJASTHAN" || item.RAW_CHANNELNAME === "NEWS 18 ASSAM / NORTHEAST" || item.RAW_CHANNELNAME === "NEWS 18 TAMILNADU" || item.RAW_CHANNELNAME === "NEWS18 UTTARPRADESH / UTTRAKHAND" || item.RAW_CHANNELNAME === "NEWS18 BIHAR / JHARKHAND") {
    
                        setshellSysDateTime("[ Last Syn:-" + item.RAW_DATE + " ]")
                        ssChannel.push(item.RAW_CHANNELNAME);
                        ssAmount.push(parseInt(item.RAW_SHELL_TOTAL_SPOT));
                        setsChannelName(ssChannel);
                        setAmountinLakh(ssAmount);
                    }
                }
                if (e.target.value === "Hyd5") {
                    if (item.RAW_CHANNELNAME === "NEWS 18 ODIA " || item.RAW_CHANNELNAME === "NEWS18 GUJARATI" || item.RAW_CHANNELNAME === "NEWS18 PUNJAB/HARYANA" || item.RAW_CHANNELNAME === "NEWS18 BANGLA" || item.RAW_CHANNELNAME === "NEWS 18 KANNADA ") {
    
                        setshellSysDateTime("[ Last Syn:-" + item.RAW_DATE+ " ]")
                        ssChannel.push(item.RAW_CHANNELNAME);
                        ssAmount.push(parseInt(item.RAW_SHELL_TOTAL_SPOT));
                        setsChannelName(ssChannel);
                        setAmountinLakh(ssAmount);
                    }
                }
                if (e.target.value === "All") {
                    setshellSysDateTime("[ Last Syn:-" + item.RAW_DATE + " ]")
                    ssChannel.push(item.RAW_CHANNELNAME);
                    ssAmount.push(parseInt(item.RAW_SHELL_TOTAL_SPOT));
                    setsChannelName(ssChannel);
                    setAmountinLakh(ssAmount);
                }

            });
            } else {
            console.log("The first element of resData is not an array:", innerArray);
            }
        }

        
        
    }

    const GetrdshellBINoida = e => {
        const ssbiChannel = [];
        const ssBIAmount = [];
        if (Array.isArray(biData) && biData.length > 0) {
            const innerArray = biData; 
            if (Array.isArray(innerArray)) {
            innerArray.forEach(item => {
                if (e.target.value === "Mumbai") {

                    if (item.RAW_CHANNELNAME === "CNBC AWAAZ" || item.RAW_CHANNELNAME=== "CNBC BAJAR" || item.RAW_CHANNELNAME=== "CNBC HD" || item.RAW_CHANNELNAME === "CNBC TV18") {
    
                        setshellSysDateTime("[ Last Syn:-" + item.RAW_DATE + " ]")
                        ssbiChannel.push(item.RAW_CHANNELNAME);
                        ssBIAmount.push(parseInt(item.RAW_SHELL_TOTAL_SPOT));
                        setBIChannelName(ssbiChannel);
                        setBIAmountinLakh(ssBIAmount);

                    }
                }

                if (e.target.value === "Noida") {
                    if (item.RAW_CHANNELNAME === "NEWS18 INDIA" || item.RAW_CHANNELNAME === "CNN-NEWS18" || item.RAW_CHANNELNAME=== "NEWS18 LOKMAT") {
    
                        setshellSysDateTime("[ Last Syn:-" + item.RAW_DATE + " ]")
                        ssbiChannel.push(item.RAW_CHANNELNAME);
                        ssBIAmount.push(parseInt(item.RAW_SHELL_TOTAL_SPOT));
                        setBIChannelName(ssbiChannel);
                        setBIAmountinLakh(ssBIAmount);
                    }
                }
                if (e.target.value === "Hyd8") {
                    if (item.RAW_CHANNELNAME === "NEWS18 JAMMU/KASHMIR/LADAKH/HIMACHAL" || item.RAW_CHANNELNAME === "NEWS 18 KERALA" || item.RAW_CHANNELNAME === "NEWS18 MADHYAPRADESH / CHATTISGARH" || item.RAW_CHANNELNAME === "NEWS18 RAJASTHAN" || item.RAW_CHANNELNAME === "NEWS 18 ASSAM / NORTHEAST" || item.RAW_CHANNELNAME === "NEWS 18 TAMILNADU" || item.RAW_CHANNELNAME === "NEWS18 UTTARPRADESH / UTTRAKHAND" || item.RAW_CHANNELNAME === "NEWS18 BIHAR / JHARKHAND") {
    
                        setshellSysDateTime("[ Last Syn:-" + item.RAW_DATE + " ]")
                        ssbiChannel.push(item.RAW_CHANNELNAME);
                        ssBIAmount.push(parseInt(item.RAW_SHELL_TOTAL_SPOT));
                        setBIChannelName(ssbiChannel);
                        setBIAmountinLakh(ssBIAmount);
                    }
                }
                if (e.target.value === "Hyd5") {
                    if (item.RAW_CHANNELNAME === "NEWS 18 ODIA " || item.RAW_CHANNELNAME === "NEWS18 GUJARATI" || item.RAW_CHANNELNAME === "NEWS18 PUNJAB/HARYANA" || item.RAW_CHANNELNAME === "NEWS18 BANGLA" || item.RAW_CHANNELNAME === "NEWS 18 KANNADA ") {
    
                        setshellSysDateTime("[ Last Syn:-" + item.RAW_DATE + " ]")
                        ssbiChannel.push(item.RAW_CHANNELNAME);
                        ssBIAmount.push(parseInt(item.RAW_SHELL_TOTAL_SPOT));
                        setBIChannelName(ssbiChannel);
                        setBIAmountinLakh(ssBIAmount);
                    }
                }
                if (e.target.value === "All") {
                    setshellSysDateTime("[ Last Syn:-" + item.RAW_DATE + " ]")
                        ssbiChannel.push(item.RAW_CHANNELNAME);
                        ssBIAmount.push(parseInt(item.RAW_SHELL_TOTAL_SPOT));
                        setBIChannelName(ssbiChannel);
                        setBIAmountinLakh(ssBIAmount);
                }

            });
            } else {
            console.log("The first element of resData is not an array:", innerArray);
            }
        }



    }
    

    return (
        <div>
            {/* Content Wrapper. Contains page content */}
            <div className="content-wrapper">
                {/* Content Header (Page header) */}

                {/* /.content-header */}
                {/* Main content */}
                <section className="content">
                    <div className="container-fluid">
                        {/* Small boxes (Stat box) */}
                        <div className="row">
                            <div className="col-lg-3 col-6">
                                {/* small box */}
                                <div className="small-box bg-info">
                                    <div className="inner">
                                        <h3>150</h3>
                                        <p>Revenue Data</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-bag" />
                                    </div>
                                    <Link to="/RevenueReport" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" />
                                    </Link>
                                </div>
                            </div>
                            {/* ./col */}
                            <div className="col-lg-3 col-6">
                                {/* small box */}
                                <div className="small-box bg-success">
                                    <div className="inner">
                                        <h3>53<sup style={{ fontSize: 20 }}>%</sup></h3>
                                        <p>Perfect Spot</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-stats-bars" />
                                    </div>

                                    <Link to="/PerfectSpotDetails" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" />
                                    </Link>
                                </div>
                            </div>
                            {/* ./col */}
                            <div className="col-lg-3 col-6">
                                {/* small box */}
                                <div className="small-box bg-warning">
                                    <div className="inner">
                                        <h3>44</h3>
                                        <p>Log Status</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-person-add" />
                                    </div>
                                    <Link to="/TransferLogStatus" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" />
                                    </Link>
                                </div>
                            </div>
                            {/* ./col */}
                            <div className="col-lg-3 col-6">
                                {/* small box */}
                                <div className="small-box bg-danger">
                                <div className="inner">
                                <LocationDashBoard/>
                                    </div>
                                    <div className="icon">
                                   
                                    </div>
                                    <Link to="/LocationMap" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" />
                                    </Link>
                                </div>
                            </div>
                            {/* ./col */}
                        </div>

                    </div>{/* /.container-fluid */}
                </section>
                {/* /.content */}
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            {
                                showLoader && <Loader />
                            }
                            <div className="col-lg-6" >
                                <div className="card">
                                    <div className="card-header border-0">
                                        <div className="d-flex justify-content-between">
                                            {/*<h3 className="card-title">Shell-Revenue FY 24-25</h3>*/}
                                            <a className="dropdown-item" href="/" data-toggle="modal" data-target="#SHELLREVENUEREPORT">
                                                <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                                SHELL-Revenue FY 24-25 {shellSysDateTime}
                                            </a>
                                            <a>
                                                <i className="nav-icon fas fa-chart-pie"  onClick={GetSynShellReport} />
                                            </a>
                                            
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="col-sm-10">
                                            <div className="form-group clearfix">
                                                <div className="col-sm-12">
                                                    <div className="form-group clearfix">
                                                        <div className="icheck-success d-inline">
                                                            <input type="radio" name="r3" value="All" id="rdshellAll" onChange={GetrdshellNoida} />
                                                            <label htmlFor="rdshellAll">All</label>
                                                        </div>
                                                        <div className="icheck-success d-inline">
                                                            <input type="radio" name="r3" value="Noida" id="rdshellNoida" onChange={GetrdshellNoida} defaultChecked="Yes"  />
                                                            <label htmlFor="rdshellNoida">Noida</label>
                                                        </div>
                                                        <div className="icheck-success d-inline">
                                                            <input type="radio" name="r3" value="Mumbai"  onChange={GetrdshellNoida} id="rdshellMumbai" />
                                                            <label htmlFor="rdshellMumbai">Mumbai</label>
                                                        </div>
                                                        <div className="icheck-success d-inline">
                                                            <input type="radio" name="r3" value="Hyd5"  onChange={GetrdshellNoida} id="rdshellHyd5" />
                                                            <label htmlFor="rdshellHyd5">Hyd5</label>
                                                        </div>
                                                        <div className="icheck-success d-inline">
                                                            <input type="radio" name="r3" value="Hyd8" onChange={GetrdshellNoida} id="rdshellHyd8" />
                                                            <label htmlFor="rdshellHyd8">Hyd8</label>
                                                        </div>
                                                    </div>
                                                </div>

                                               
                                            </div>
                                        </div>
                                        <div className="col-sm-10">
                                            <Chart
                                                type="pie"
                                                series={AmountinLakh}
                                                width={500}
                                                height={600}
                                                options={{
                                                    title: {
                                                    },
                                                    noData: { text: "Empty Data" },

                                                    labels: sChannelName

                                                }}
                                            >
                                            </Chart>
                                        </div>
                                        

                                    </div>
                                </div>

                            </div>

                            <div className="col-lg-6">
                                <div className="card">
                                    <div className="card-header border-0">
                                        <div className="d-flex justify-content-between">
                                            {/*<h3 className="card-title">Shell-Revenue FY 24-25</h3>*/}
                                            <a className="dropdown-item" href="/" data-toggle="modal" data-target="#BIREVENUEREPORT">
                                                <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                                BI-Revenue FY 24-25 {shellbiSysDateTime}
                                            </a>
                                            <a>
                                                <i className="nav-icon fas fa-chart-pie" onClick={GetSynBIShellReport} />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="col-sm-10">
                                            <div className="form-group clearfix">
                                                <div className="col-sm-12">
                                                    <div className="form-group clearfix">
                                                        <div className="icheck-success d-inline">
                                                            <input type="radio" name="rdBi" value="All" onChange={GetrdshellBINoida} id="rdAll" />
                                                            <label htmlFor="rdAll">All</label>
                                                        </div>
                                                        <div className="icheck-success d-inline">
                                                            <input type="radio" name="rdBi" value="Noida" onChange={GetrdshellBINoida} defaultChecked="Yes" id="rdNoida" />
                                                            <label htmlFor="rdNoida">Noida</label>
                                                        </div>
                                                        <div className="icheck-success d-inline">
                                                            <input type="radio" name="rdBi" value="Mumbai" onChange={GetrdshellBINoida}  id="rdMumbai" />
                                                            <label htmlFor="rdMumbai">Mumbai</label>
                                                        </div>
                                                        <div className="icheck-success d-inline">
                                                            <input type="radio" name="rdBi" value="Hyd5" onChange={GetrdshellBINoida} id="rdHyd5" />
                                                            <label htmlFor="rdHyd5">Hyd5</label>
                                                        </div>
                                                        <div className="icheck-success d-inline">
                                                            <input type="radio" name="rdBi" value="Hyd8" onChange={GetrdshellBINoida}  id="rdHyd8" />
                                                            <label htmlFor="rdHyd8">Hyd8</label>
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                        <Chart
                                            type="pie"
                                            series={BIAmountinLakh}
                                            width={500}
                                            height={600}
                                            options={{
                                                title: {
                                                   
                                                },
                                                noData: { text: "Empty Data" },

                                                labels: sBIChannelName

                                            }}
                                        >
                                        </Chart>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
              {/*  <!-- SHELL - REVENUEREPORT Modal--> */}
              <div className="modal fade" id="SHELLREVENUEREPORT" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">SHELL-Revenue FY 24-25 </h5>
                                <button className="close" name="X" type="button" data-dismiss="modal" aria-label="Close">
                                </button>
                                <button style={{ background: "#007bff" }}>X</button>

                            </div>
                            <table class=" table-bordered graphTable">
                                <tr style={{ background: "#007bff" }}>
                                    <th>Channel</th>
                                    <th>Amount</th>
                                </tr>
                                {shellData.map((name) =>
                                    <tr>
                                        <td>{name.RAW_CHANNELNAME}</td>
                                        <td>{name.RAW_SHELL_TOTAL_SPOT}</td>
                                    </tr>
                                )}
                            </table>
                        </div>
                    </div>
                </div>
                {/*  <!-- BI-  REVENUEREPORT Modal--> */}
                <div className="modal fade" id="BIREVENUEREPORT" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">BI-Revenue FY 24-25 </h5>
                                <button className="close" name="X" type="button" data-dismiss="modal" aria-label="Close">
                                </button>
                                <button style={{ background: "#007bff" }}>X</button>

                            </div>
                            <table class=" table-bordered graphTable">
                                <tr style={{ background: "#007bff" }}>
                                    <th>Channel</th>
                                    <th>Amount</th>
                                </tr>
                                {biData.map((name) =>
                                    <tr>
                                        <td>{name.RAW_CHANNELNAME}</td>
                                        <td>{name.RAW_BI_SHELL_TOTAL_SPOT}</td>
                                    </tr>
                                )}
                            </table>
                        </div>
                    </div>
                </div>
              
            </div>
            {/* /.content-wrapper */}

        </div>


    )
}

export default Home


