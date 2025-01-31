/* eslint-disable jsx-a11y/anchor-is-valid */

import Header from '../Header'
import SideNav from '../SideNav'
import Footer from '../Footer'
import React, { useState ,useEffect} from "react";
import axios from "axios";
import packageInfo from '../../../package.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AdvertiserM = () => {
    const BASE_URL=packageInfo.proxy; //Web Config api
    const [buttonText, setButtonText] = useState("Save"); // Initial button text
    const [files, setFiles] = useState([]);
    const [AgencyId, setAgencyId] = useState([]);
    const [AGENCYNAME, setAGENCYNAME] = useState([]);
    const [SAPCODE, setSAPCODE] = useState([]);
    const [PAYMENTTERM, setPAYMENTTERM] = useState([]);
    const [PANNO, setPANNO] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);
  
useEffect(() => {
    GetAdvertiserMaster();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    
      // Fetch uploaded data from the backend
      const GetAdvertiserMaster = async () => {
        try {
          const response = await axios.get(BASE_URL+"/GetAdvertiserMaster");
          setUploadedFiles(response.data);
        } catch (error) {
          console.error("Error fetching uploaded data:", error);
        }
      };

 const handleFileChange = (event) => {
      const selectedFiles = Array.from(event.target.files);
      setFiles(selectedFiles);
    };
    const handleUpload = async () => {

        if (!AGENCYNAME ||  files.length === 0) {
              toast.error("Please Enter Agency Name and upload at least one file.");
            return;
          }
      const formData = new FormData();
      formData.append("AGENCYNAME", AGENCYNAME);
      formData.append("SAPCODE", SAPCODE);
      formData.append("PAYMENTTERM", PAYMENTTERM);
      formData.append("PANNO", PANNO);
      formData.append("Id", AgencyId);
      files.forEach((file) => {
      formData.append("files", file);
      
      });
      console.log(formData);
      try {
        const response = await axios.post(BASE_URL+"/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setUploadedFiles(response.data); // Update table with uploaded files
        GetAdvertiserMaster();
        toast.success("Files uploaded successfully!");
        setAGENCYNAME('');
        setSAPCODE('');
        setPANNO('');
        setPAYMENTTERM('');
        setFiles('')
        setButtonText('Save')
      } catch (error) {
        toast.error("Error uploading files");
      }
    };

    const handleClear = () => {
      setAGENCYNAME('');
      setSAPCODE('');
      setPANNO('');
      setPAYMENTTERM('');
      setButtonText('Save');
      setFiles('')

    }
      const handleDownload = (filePath, fileName) => {
        const link = document.createElement("a");
        link.href = `http://localhost:5002/api/AdvertiserFile?path=${encodeURIComponent(filePath)}`;
        link.download = fileName; // Set the file name for the downloaded file
        link.click();
      };

//Advertiser Edit Option.
const handleAdvertiserEdit = (item) => {
             setAGENCYNAME(item.AGENCYNAME);
             setSAPCODE(item.SAPCODE);
             setPANNO(item.PANNO);
             setPAYMENTTERM(item.PAYMENTTERM);
             setAgencyId(item.Id)
             setButtonText('Update');
};
//Advertiser Delete Option.
const handleAdvertiserDelete = async (item) => {
   const AGENCYNAME=item.AGENCYNAME;
   const response = await axios.post(BASE_URL+'/AdvertiserDelete', {
    AGENCYNAME
  });
  debugger
  if(response.status===200)
    {
       toast.success(response.message);
    }
    else
    {
      toast.error('Error So please try again');
    }
   GetAdvertiserMaster();
   
};

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
                                        <h3 className="card-title">Advertiser Master</h3>
                                    </div>
                                </div>
                         
                                <div className="card-body">
                                                    
                                                    <div className="row">
                                                        <div className="col-sm-3">
                                                            {/* select */}
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputEmail1">Agency Name</label>
                                                                <input
                                                                    type="text"
                                                                    name="displayName"
                                                                    className="form-control"
                                                                    placeholder="Enter Agency Name"
                                                                    value={AGENCYNAME}
                                                                    onChange={(e) => setAGENCYNAME(e.target.value)}
                                                                    
                                                                    />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputPassword1">SAP Code</label>
                                                                <input
                                                                   type="text"
                                                                   name="userName"
                                                                    className="form-control"
                                                                    placeholder="Enter SAP Code "
                                                                    value={SAPCODE}
                                                                    onChange={(e) => setSAPCODE(e.target.value)}
                                                                   
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputPassword1">Payment Term</label>
                                                                <input
                                                                   type="text"
                                                                   name="userName"
                                                                    className="form-control"
                                                                    placeholder="Enter Payment Term "
                                                                  
                                                                    value={PAYMENTTERM}
                                                                    onChange={(e) => setPAYMENTTERM(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputPassword1">Pan No</label>
                                                                <input
                                                                   type="text"
                                                                   name="userName"
                                                                    className="form-control"
                                                                    placeholder="Enter Pan No "
                                                                  
                                                                    value={PANNO}
                                                                    onChange={(e) => setPANNO(e.target.value)}
                                                               
                                                                />
                                                            </div>
                                                        </div>
                                                       
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-3">
                                                            {/* select */}
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputEmail1">File Upload</label>
                                                                <input
                                                                    type="file"
                                                                    name="displayName"
                                                                    className="form-control"
                                                                    placeholder="Enter Agency Name"
                                                                    multiple onChange={handleFileChange}
                                                                    
                                                                    />
                                                          </div>
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <div >
                                                               
                                                                <br></br>
                                                                
                                                            <button className="btn btn-primary" onClick={handleUpload}>{buttonText}</button>
                                                            <ToastContainer />

                                                            </div>
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <div className="form-group">
                                                            <br></br>
                                                                 <button className="btn btn-primary" onClick={handleClear}>Clear</button>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <div className="form-group">
                                                               
                                                            </div>
                                                        </div>
                                                       
                                                    </div>
                                                    <div className="row">
                                                    
      <table border="1" className="table table-bordered table-striped dataTable dtr-inline">
        <thead>
          <tr>
            <th>Advertiser Name</th>
            <th>SAP Code</th>
            <th>Payment Term</th>
            <th>Pan No</th>
            <th>File Name</th>
            <th>Download</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {uploadedFiles.map((file, index) => (
            <tr key={index}>
                <td>{file.AGENCYNAME}</td>
                <td>{file.SAPCODE}</td>
                <td>{file.PAYMENTTERM}</td>
                <td>{file.PANNO}</td>
                <td>{file.FileName}</td>
                <td>
                <a className="btn btn-info btn-sm" >
                    <i className="fas fa-download" onClick={() => handleDownload(file.FilePath, file.FileName)} ></i>
                </a>
                 
              </td>
                <td >
                    <a className="btn btn-info btn-sm" >
                    <i className="fas fa-edit" onClick={() => handleAdvertiserEdit(file)} ></i>
                    </a>
               </td>
                    <td>
                    <a className="btn btn-danger btn-sm" >
                    <i className="fas fa-trash" onClick={() => handleAdvertiserDelete(file)}  ></i>
                    </a>
                    </td>
            </tr>
          ))}
        </tbody>
      </table>
                                                    </div>

                                                   
                                </div>
                       

                            </div>
                        </div>

           
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
};

export default AdvertiserM;
