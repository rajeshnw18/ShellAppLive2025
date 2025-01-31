
import React  from "react";
import Header from '../Header'
import SideNav from '../SideNav'
import Footer from '../Footer'
const Invoice = () => {
 
  return (
<div>
    < Header />
    < SideNav />

    <div className="content-wrapper">
    <div className="card card-primary">
        <div className="card-header">
      <h3 className="card-title">Invoice-Master</h3>
         </div>
    </div>

    <div className="row">
                                                        <div className="col-sm-3">
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputEmail1">Display Name</label>
                                                               
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputPassword1">User Name</label>
                                                               
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputPassword1">Password</label>
                                                               
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputPassword1">Employee Code</label>
                                                                
                                                            </div>
                                                        </div>
                                                    </div>



    </div >
 
    < Footer />
</div >
  )
};

export default Invoice;
