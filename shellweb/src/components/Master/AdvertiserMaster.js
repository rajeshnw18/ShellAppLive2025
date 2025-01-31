
import Header from '../../components/Header'
import SideNav from '../../components/SideNav'
import Footer from '../../components/Footer'
import React, { useState } from "react";
import axios from "axios";


function AdvertiserMaster() {
    const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await axios.post("http://localhost:5001/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUploadedFiles(response.data); // Update table with uploaded files
      alert("Files uploaded successfully!");
    } catch (error) {
      console.error("Error uploading files:", error);
    }
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
                                                <h3 className="card-title">Agency Master</h3>
                                            </div>
                                        </div>

                                        <div className="card-body">
                                        <div>
      <h1>File Upload</h1>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      <h2>Uploaded Files</h2>
      <table border="1">
        <thead>
          <tr>
            <th>File Name</th>
            <th>File Size (KB)</th>
          </tr>
        </thead>
        <tbody>
          {uploadedFiles.map((file, index) => (
            <tr key={index}>
              <td>{file.name}</td>
              <td>{(file.size / 1024).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
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

export default AdvertiserMaster


