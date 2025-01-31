
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header'
import SideNav from '../../components/SideNav'
import Footer from '../../components/Footer'
import * as XLSX from 'xlsx';
import packageInfo from '../../../package.json';
import Loader from '../../components/Loader';

function BIReport() {
    const BASE_URL=packageInfo.proxy; //Web Config api
    const [showLoader, setShowLoader] = useState(false);
    const [Channel, setChannel] = useState([]);
    const [ChannelName, setChannelName] = useState();
    const handleChange = (e) => {
        debugger;
        const { name, checked } = e.target;
        setChannelName(name)
        if (name === "allSelect") {
            let tempUser = Channel.map((user) => {
                return { ...user, isChecked: checked };
            });
            setChannel(tempUser);
        } else {
            let tempUser = Channel.map((user) =>
                user.BI_AUTOID === name ? { ...user, isChecked: checked } : user
            
      );
            setChannel(tempUser);
        }
    };

    //Start Export Data
    function GetExportExcelldata() {

        setShowLoader(true);
        setTimeout(() => {
            
            let Data = { ChannelName, StartDate, EndDate }
            console.log(Data);
            fetch(BASE_URL+"/GetRevenueDetailWithFilter/" + StartDate + "/" + EndDate + "/" + ChannelName)
                .then(data => {
                    return data.json();
                })
                .then(post => {
                   
                    const worksheet = XLSX.utils.json_to_sheet(post);
                    const workbook = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(workbook, worksheet, "BIReport");
                    XLSX.writeFile(workbook, "BIReport.xlsx");


                });

            setShowLoader(false);
        }, 5 * 1000)

        
    }

    /*Start Bind Channel*/
    
 
    useEffect(() => {
        const getChannel = async () => {
            const req = await fetch(BASE_URL+"/GetChannelMaster");
            const getres = await req.json();
            setChannel(await getres);
            //setUsers(await getres);

        }
       
        getChannel();


    }, [BASE_URL]);


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
                                    <div className="x_content" style={{ marginBottom: 5 }}>
                                        <div className="card card-primary">
                                            <div className="card-header">
                                                <h3 className="card-title">BI Spot Details</h3>
                                            </div>
                                        </div>

                                        <div className="card-body">
                                            {
                                                showLoader && <Loader />
                                            }
                                            <div className="row">
                                                <div className="col-sm-6" style={{ overflowY: "scroll", overflowX: "hidden", height: 400 }} >
                                                    {/* select */}
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Channel</label>
                                                        <div className="form-check">
                                                            <input
                                                                type="checkbox"
                                                                className="form-check-input"
                                                                name="allSelect"
                                                                checked={!Channel.some((Channels) => Channels?.isChecked !== true)}
                                                                onChange={handleChange}
                                                            />
                                                            <label className="form-check-label ms-2">All Select</label>
                                                        </div>
                                                        {Channel.map((Channels, index) => (
                                                            <div className="form-check" key={index}>
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    name={Channels.BI_AUTOID}
                                                                    checked={Channels?.isChecked || false}
                                                                    onChange={handleChange}
                                                                />
                                                                <label className="form-check-label ms-2">{Channels.BI_CHANNEL}</label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="col-sm-3">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">From Date</label>
                                                        <br />
                                                        <input id="dateRequired" type="date" name="dateRequired" defaultValue={defaultValue} value={StartDate} onChange={(e) => { setStartDate(e.target.value) }} />
                                                        <br></br>
                                                        <br></br>
                                                        <button className="btn btn-primary btn-user btn-block" onClick={GetExportExcelldata} >
                                                            Excell Report
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="col-sm-3">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">To Date</label>
                                                        <br />
                                                        <input id="dateRequired" type="date" name="dateRequired" defaultValue={defaultValue} value={EndDate} onChange={(e) => { setEndDate(e.target.value) }} />
                                                        <br></br>
                                                        <br></br>
                                                        <button className="btn btn-primary btn-user btn-block" onClick={GetExportExcelldata} >
                                                          Pivot Report
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                
                                                <div className="col-sm-3">
                                                    {/* select */}
                                                    <div className="form-group">
                                                        
                                                    </div>
                                                </div>
                                                <div className="col-sm-3">
                                                    <div className="form-group">
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
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

export default BIReport


