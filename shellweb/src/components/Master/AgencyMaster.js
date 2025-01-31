
import Header from '../../components/Header'
import SideNav from '../../components/SideNav'
import Footer from '../../components/Footer'
import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Table } from "@mui/material";


import axios from "axios";

function AgencyMaster() {
  const [tableData, setTableData] = useState([]);
  const [fileType, setFileType] = useState("");

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileExtension = file.name.split(".").pop();
    setFileType(fileExtension);

    if (fileExtension === "xlsx" || fileExtension === "xls") {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        setTableData(json);
      };
      reader.readAsArrayBuffer(file);
    } else if (fileExtension === "pdf") {
      const pdfjsLib = await import("pdfjs-dist/build/pdf");
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

      const reader = new FileReader();
      reader.onload = async (event) => {
        const typedArray = new Uint8Array(event.target.result);
        const pdfDoc = await pdfjsLib.getDocument(typedArray).promise;
        const pages = [];
        for (let i = 1; i <= pdfDoc.numPages; i++) {
          const page = await pdfDoc.getPage(i);
          const textContent = await page.getTextContent();
          const text = textContent.items.map((item) => item.str).join(" ");
          pages.push({ page: i, text });
        }
        setTableData(pages);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleSave = async () => {
    try {
      await axios.post("http://localhost:5000/upload", { data: tableData, type: fileType });
      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
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
      <input type="file" accept=".xlsx,.xls,.pdf" onChange={handleFileUpload} />
      <button onClick={handleSave}>Save Data</button>
      <div className="col-sm-12">
            <Table id="example1" className="table table-bordered table-striped dataTable dtr-inline">
           
        <thead>
          <tr>
            {tableData.length > 0 &&
              Object.keys(tableData[0]).map((key, index) => (
                <th key={index}>{key}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, idx) => (
                <td key={idx}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
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

export default AgencyMaster


