/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable no-template-curly-in-string */

import Header from '../Header'
import SideNav from '../SideNav'
import Footer from '../Footer'
import React, { useState, useEffect,useCallback } from 'react';
import axios from "axios";
import packageInfo from '../../../package.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Location = () => {
  const BASE_URL=packageInfo.proxy; //Web Config api
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [locations, setLocations] = useState([]);
  const [editingId, setEditingId] = useState('Save');
  const MyContext = React.createContext();


  const [form, setForm] = useState({ country: '', state: '', city: '', locationName: '',activeStatus:false,id: ''});

  const fetchCountries = useCallback(async () => {
    debugger;
    const response = await axios.get(BASE_URL +'/GetCountryMaster');
    setCountries(response.data);
    console.log(response.data)
}, [BASE_URL]);

const fetchLocations = useCallback(async () => {
    const response = await axios.get(BASE_URL +'/GetlocationMaster');
    setLocations(response.data);
   console.log(response.data)
}, [BASE_URL]);

useEffect(() => {
    fetchCountries();
    fetchLocations();
}, [fetchCountries, fetchLocations]);

  const fetchStates = async (countryId) => {
    const response = await axios.get(`${BASE_URL}/GetCountryWiseStateMaster/${countryId}`);
    setStates(response.data);
};

  const fetchCities = async (stateId) => {
      const response = await axios.get(`${BASE_URL}/GetCityWiseStateMaster/${stateId}`);
      setCities(response.data);

  };

  function handleClear ()
  {
    setForm({ country: '', state: '', city: '', locationName: '',activeStatus:false,id: ''});
    setEditingId('Save')
  }

  const handleSave = async () => {
   debugger;
      if (form.country && form.state && form.city && form.locationName) {
          await axios.post(BASE_URL +"/SaveLocation", form);
          fetchLocations();
          toast.success('Save data successfully ')
          setEditingId('Save');
          setForm({activeStatus:false})
          setForm({ country: '', state: '', city: '', locationName: '',activeStatus:false,id: '' });
      }
      else
      { toast.error('Please Enter Location Name !')}
  };

  async function bindState(cnCountryID)
  {
        const response = await axios.get(`${BASE_URL}/GetCountryWiseStateMaster/${cnCountryID}`);
        setStates(response.data);
  }
  async function bindCity(stStateID)
  {
    const response = await axios.get(`${BASE_URL}/GetCityWiseStateMaster/${stStateID}`);
    setCities(response.data);
  }

  const handleEdit = (location) => {
      setForm({
      country: location.cnCountryID,// Set CountryId
      state: location.stStateID,// Set CountryId
      city: location.ctCityID,// Set CountryId
      locationName: location.locationName,
      activeStatus: location.activeStatus,
      id:location.id
    });
    bindState(location.cnCountryID);
    bindCity(location.stStateID);
    setEditingId('Update');
    console.log(location.country);
  };

  const handleDelete = async (id) => {
    const response = await axios.get(`${BASE_URL}/DeleteLocation/${id}`);
       fetchLocations();
      toast.success('Delete data successfully . ')
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
                                        <h3 className="card-title">Location Master</h3>
                                    </div>
                                </div>
                         
                                <div className="card-body">
                                                    
                                                    <div className="row">
                                                        <div className="col-sm-3">
                                                            {/* select */}
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputEmail1">Country</label>
                                                                <select  className="form-control" value={form.country} onChange={(e) => { setForm({ ...form, country: e.target.value }); fetchStates(e.target.value); }}>
                                                                <option value="">Select Country</option>
                                                                {countries.map(country => <option key={country.cnCountryID} value={country.cnCountryID}>{country.cnCountryName}</option>)}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputPassword1">State</label>
                                                                <select className="form-control" value={form.state} onChange={(e) => { setForm({ ...form, state: e.target.value }); fetchCities(e.target.value); }}>
                                                                <option value="">Select State</option>
                                                                {states.map(state => <option key={state.stStateID} value={state.stStateID}>{state.stStateName}</option>)}
                                                            </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputPassword1">City</label>
                                                                <select className="form-control" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}>
                                                                <option value="">Select City</option>
                                                                {cities.map(city => <option key={city.ctCityID} value={city.ctCityID}>{city.ctCityName}</option>)}
                                                            </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputPassword1">Location Name</label>
                                                               
                                                                <input
                                                                  type="text"
                                                                   className="form-control"
                                                                  placeholder="Enter Location Name"
                                                                  value={form.locationName}
                                                                  onChange={(e) => setForm({ ...form, locationName: e.target.value })}
                                                              />
                                                            </div>
                                                        </div>
                                                       
                                                    </div>

                                                       <div className="row">
                                                       <div className="col-sm-3">
                                                                                                                <div className="form-group">
                                                                                                                <label>
                                                                        <input
                                                                        className="form-control"
                                                                            type="checkbox"
                                                                            checked={form.activeStatus} onChange={(e) => setForm({ ...form, activeStatus: e.target.checked })}
                                                                        />
                                                                        Active
                                                                        </label>


                                                                                                                </div>
                                                                                                            </div>

                                                                                                           
                                                                                                            <div className="col-sm-3">
                                                                                                                <div >
                                                                                                                   
                                                                                                                    <br></br>
                                                                                                                    
                                                                                                                <button className="btn btn-primary"  onClick={handleSave} >{editingId}</button>
                                                                                                                <ToastContainer />
                                                    
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className="col-sm-3">
                                                                                                                <div className="form-group">
                                                                                                                <br></br>
                                                                                                                     <button onClick={handleClear} className="btn btn-primary" >Clear</button>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className="col-sm-3">
                                                                                                                <div className="form-group">
                                                                                                                   
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className="col-sm-3">
                                                                                                                <div className="form-group">
                                                                                                                   
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                 
                                                    <div className="row">
                                                    
      <table id="countryTable" border="1" className="table table-bordered table-striped dataTable dtr-inline">
        <thead>
          <tr>
            <th>Country</th>
            <th>State</th>
            <th>City</th>
            <th>Location</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
        {locations.map(loc => (
                            <tr key={loc.cnCountryID}>
                            <td>{loc.country}</td>
                            <td>{loc.state}</td>
                            <td>{loc.city}</td>
                            <td>{loc.locationName}</td>
                            <td style={{
                  color: loc.activeStatus ? "green" : "red",
                  fontWeight: "bold",
                }}>{loc.activeStatus ? "Active" : "Inactive"}</td>
                            <td>
                            <a className="btn btn-info btn-sm" >
                    <i className="fas fa-edit" onClick={() => handleEdit(loc)} ></i>
                    </a>
                            </td>
                            <td>
                    <a className="btn btn-danger btn-sm" >
                    <i className="fas fa-trash" onClick={() => handleDelete(loc.id)}  ></i>
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

export default Location;
