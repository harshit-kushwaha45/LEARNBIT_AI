import Navbar from './Navbar';
import React,{useContext} from 'react'
import {UserContext} from "../../Context/UserContext";


const DashboardLayout = ({children}) => {
    const {user} = useContext(UserContext);
  return (
    <div>
        <Navbar/>
        {user && <div>{children}</div>}
    </div>
  )
}

export default DashboardLayout