import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from '../src/components/User/Login'
import RevenueReport from '../src/components/Report/RevenueReport'
import BIReport from '../src/components/Report/BIReport'
import CurrenctLocation from '../src/components/Location/CurrenctLocation'
import LocationMap from '../src/components/Location/LocationMap'
import ShellReport from  '../src/components/Report/ShellReport'
import Preport from  './components/Report/Preport'
import ChannelMaster from  './components/Master/ChannelMaster'
import UserMaster from  './components/Master/UserMaster'
import AgencyMaster from  './components/Master/AgencyMaster'
import AdvertiserMaster from  './components/Master/AdvertiserM'
import Location from  './components/Master/Location'
import ChatBot from  './components/Master/ChatBotShell'
import "./App.css"; // Custom CSS file

function App() {

    return (
        <Router>
            <Routes>
            <Route path='/' element={<Login />}></Route>
            <Route path='/dashboard' element={<Dashboard />}></Route>
            <Route path='/RevenueReport' element={<RevenueReport />}></Route>
            <Route path='/BIReport' element={<BIReport />}></Route>
            <Route path='/CurrenctLocation' element={<CurrenctLocation />}></Route>
            <Route path='/LocationMap' element={<LocationMap />}></Route>
            <Route path='/ShellReport' element={<ShellReport />}></Route>
            <Route path='/Preport' element={<Preport />}></Route>
            <Route path='/ChannelMaster' element={<ChannelMaster />}></Route>
            <Route path='/UserMaster' element={<UserMaster />}></Route>
            <Route path='/AgencyMaster' element={<AgencyMaster />}></Route>
            <Route path='/AdvertiserMaster' element={<AdvertiserMaster />}></Route>
            <Route path='/Location' element={<Location />}></Route>
            <Route path='/Location' element={<Location />}></Route>
            <Route path='/ChatBot' element={<ChatBot />}></Route>
            </Routes>
        </Router>

    );
}

export default App;