/* eslint-disable jsx-a11y/anchor-is-valid */
import React , { useEffect,useState,useCallback }  from "react";
import Header from '../Header'
import SideNav from '../SideNav'
import Footer from '../Footer'
import packageInfo from '../../../package.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UserMaster = () => {
    const BASE_URL=packageInfo.proxy; //Web Config api
    const [UserList, SetUserList] = useState([]);
    const [buttonText, setButtonText] = useState("Save"); // Initial button text
const GetUserDetails = useCallback(() => {
        fetch(BASE_URL + '/GetUserDetails')
            .then((result) => result.json())
            .then((resp) => {
                SetUserList(resp);
            })
            .catch((error) => console.error('Error fetching user details:', error));
    }, [BASE_URL]); 

useEffect(() => {
        GetUserDetails();
}, [GetUserDetails]); 

    const [UserModel, setUserModel] = useState({
        displayName: "",
        userName: "",
        password: "",
        employeeCode: "",
        emailId: "",
        mobileNo: "",
        roleType: "",
        authenticateType: "",
        authenticateLocation: "",
        status: "active",
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setUserModel({
          ...UserModel,
          [name]: value,
        });
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        let items ={UserModel}
       fetch(BASE_URL+'/SaveUserMaster',
    {
        method:"POST",
        headers:
        {
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        body:JSON.stringify(items)
    }).then((result)=>{
        
        result.json().then((resp)=>{
            if(result.status===200)
            {
              GetUserDetails();
              toast.success(resp.outputMassage.Msg);
              console.log(resp.outputMassage.Msg);
            //alert(resp.outputMassage.Msg);
            }
            else
            { 
                toast.error(resp.outputMassage.Msg);
                //alert(resp.outputMassage.Msg);
               
                console.log(resp.outputMassage.Msg);
            }
        })
    })
      };

      const handleClear = () => {
        setUserModel({
          displayName: "",
          userName: "",
          password: "",
          employeeCode: "",
          emailId: "",
          mobileNo: "",
          roleType: "",
          authenticateType: "",
          authenticateLocation: "",
          status: "true",
        });
        setButtonText("Save");
      };

      //User Edit Option.
      const [editData, setEditData] = useState([]);
      const handleUserEdit = (item) => {
        setEditData(item); // Set the selected item for editing
        console.log(editData.lgLoginID);
        setUserModel(item);
        setButtonText("Update");
      };

      //User Delete Option.
       const handleUserDelete = (item) => {
        toast.success('User Delete Succeffully');
        console.log(item.lgLoginID);
        
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
                                        <h3 className="card-title">User-Master</h3>
                                    </div>
                                </div>
                         <form onSubmit={handleSubmit} className="user-form">
                                <div className="card-body">
                                                    
                                                    <div className="row">
                                                        <div className="col-sm-3">
                                                            {/* select */}
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputEmail1">Display Name</label>
                                                                <input
                                                                    type="text"
                                                                    name="displayName"
                                                                    className="form-control"
                                                                    placeholder="Enter Display Name"
                                                                    value={UserModel.displayName}
                                                                    onChange={handleChange}
                                                                    required
                                                                    />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputPassword1">User Name</label>
                                                                <input
                                                                   type="text"
                                                                   name="userName"
                                                                    className="form-control"
                                                                    placeholder="Enter userName "
                                                                   value={UserModel.userName}
                                                                   onChange={handleChange}
                                                                   required
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-3">
                                                            {/* select */}
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputPassword1">Password</label>
                                                                <input
                                                                     type="password"
                                                                     name="password"
                                                                      className="form-control"
                                                                    placeholder="Enter password "
                                                                     value={UserModel.password}
                                                                     onChange={handleChange}
                                                                     required
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputPassword1">Employee Code</label>
                                                                <input
                                                                    type="text"
                                                                    name="employeeCode"
                                                                     className="form-control"
                                                                    placeholder="Enter employeeCode "
                                                                    value={UserModel.employeeCode}
                                                                    onChange={handleChange}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-sm-3">
                                                            {/* select */}
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputPassword1">Email ID</label>
                                                                <input
                                                                     type="email"
                                                                     name="emailId"
                                                                     className="form-control"
                                                                    placeholder="Enter emailId "
                                                                     value={UserModel.emailId}
                                                                     onChange={handleChange}
                                                                     required
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputPassword1">Mobile No</label>
                                                                <input
                                                                   type="text"
                                                                   name="mobileNo"
                                                                    className="form-control"
                                                                    placeholder="Enter mobileNo "
                                                                   value={UserModel.mobileNo}
                                                                   onChange={handleChange}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-3">
                                                            {/* select */}
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputPassword1">Role Type</label>
                                                                <select className="form-control"
                                                                        name="roleType"
                                                                        value={UserModel.roleType}
                                                                        onChange={handleChange}
                                                                        required
                                                                        >
                                                                        <option value="">--Select--</option>
                                                                        <option value="ADMIN">Admin</option>
                                                                        <option value="USER">User</option>
                                                                        </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <label htmlFor="exampleInputPassword1">Authenticate Location</label>
                                                            <select className="form-control"
                                                                name="authenticateType"
                                                                value={UserModel.authenticateType}
                                                                onChange={handleChange}
                                                                required
                                                                >
                                                                <option value="">--Select--</option>
                                                                <option value="WINDOWS">WINDOWS</option>
                                                                <option value="LDAP">LDAP</option>
                                                                </select>
                                                           
                                                            </div>
                                                    </div>


                                                    <div className="row">
                                                        <div className="col-sm-3">
                                                            {/* select */}
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputPassword1">Authenticate Type</label>
                                                                <select className="form-control"
                                                                name="authenticateLocation"
                                                                value={UserModel.authenticateLocation}
                                                                onChange={handleChange}
                                                                required
                                                                >
                                                                <option value="">--Select--</option>
                                                                <option value="NOIDA">NOIDA</option>
                                                                <option value="MUMBAI">MUMBAI</option>
                                                                <option value="HYDERBAD">HYDERBAD</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-3">
                                                           
                                                            <div className="form-group">
                                                                <label>
                                                                    Status
                                                                </label>
                                                                <div className="sshswitch">
                                                                    <input
                                                                        name="StatusActive"
                                                                        className="one"
                                                                        type="radio"
                                                                        id="lgActiveA"
                                                                        checked={UserModel.status === "active"}
                                                                        defaultValue={1}
                                                                    />
                                                                    <label htmlFor="one" className="sshswitch__label">
                                                                        Active
                                                                    </label>
                                                                    <input
                                                                        name="StatusActive"
                                                                        className="two"
                                                                        type="radio"
                                                                        id="lgActiveD"
                                                                        defaultValue={0}
                                                                        checked={UserModel.status === "Deactive"}

                                                                        defaultChecked="checked"
                                                                    />
                                                                    <label htmlFor="two" className="sshswitch__label">
                                                                        Inactive
                                                                    </label>
                                                                    <div className="sshswitch__indicator"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-3">
                                                            {/* select */}
                                                            <div className="form-group">
                                                                <br></br>
                                                                <button type="submit" className="btn btn-primary">
                                                                {buttonText}
                                                    </button>
                                                                                                   <ToastContainer />
                                                   
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-3">
                                                            {/* select */}
                                                            <div className="form-group">
                                                            <br></br>
                                                            <button type="submit" onClick={handleClear} className="btn btn-primary">
                                                        Clear
                                                    </button>
                                                            </div>
                                                        </div>
                                                    </div>

                                              




                                </div>
                         </form>

                            </div>
                        </div>

                        <div className="col-sm-12">
            <table id="example1" className="table table-bordered table-striped dataTable dtr-inline" aria-describedby="example1_info">
            <thead>
              <tr>
                <th className="sorting" 
                  tabIndex={0} aria-controls="example1" rowSpan={1} colSpan={1} 
                  aria-label="CSS grade: activate to sort column ascending">
                  DisplayName
                </th>
                <th className="sorting" 
                  tabIndex={0} aria-controls="example1" rowSpan={1} colSpan={1} 
                  aria-label="CSS grade: activate to sort column ascending">
                  UserName
                </th>
                <th className="sorting" 
                  tabIndex={0} aria-controls="example1" rowSpan={1} colSpan={1} 
                  aria-label="CSS grade: activate to sort column ascending">
                  EmployeeCode
                </th>
                <th className="sorting" 
                  tabIndex={0} aria-controls="example1" rowSpan={1} colSpan={1} 
                  aria-label="CSS grade: activate to sort column ascending">
                  Location
                </th>
                <th className="sorting" 
                  tabIndex={0} aria-controls="example1" rowSpan={1} colSpan={1} 
                  aria-label="CSS grade: activate to sort column ascending">
                  CreatedDate
                </th>
                <th className="sorting" 
                  tabIndex={0} aria-controls="example1" rowSpan={1} colSpan={1} 
                  aria-label="CSS grade: activate to sort column ascending">
                  Status
                </th>
                <th>
                  Edit
                </th>
                <th>
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
            {
                 UserList.map((item, i) =>
                 (
                   <tr key={i} className="even">
                    <td className="sorting_1 dtr-control" tabIndex={0}>
                     {item.displayName}
                    </td>
                    <td className="sorting_1 dtr-control" tabIndex={0}>
                     {item.userName}
                    </td>
                    <td className="sorting_1 dtr-control" tabIndex={0}>
                     {item.employeeCode}
                    </td>
                    <td className="sorting_1 dtr-control" tabIndex={0}>
                     {item.authenticateLocation}
                    </td>
                    <td className="sorting_1 dtr-control" tabIndex={0}>
                     {item.lgCreatedDate}
                    </td>
                    <td className="sorting_1 dtr-control" tabIndex={0}>
                     {item.status}
                    </td>
                    <td >
                    <input type="hidden" value={item.lgLoginID} />

                    <a className="btn btn-info btn-sm" >
                    <i className="fas fa-edit" onClick={() => handleUserEdit(item)} ></i> Edit
                    </a>
                    </td>
                    <td>
                    <a className="btn btn-danger btn-sm" >
                    <i className="fas fa-trash" onClick={() => handleUserDelete(item)} ></i> Delete
                    </a>
                    </td>
                   
                   </tr>
                   ))
                 }                              
              
              </tbody>
            
          </table>
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

export default UserMaster;
