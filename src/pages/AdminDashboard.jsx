import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import dashboardCSS from '../styles/dashboard.module.css';
import SideNav from '../components/SideNav';
import { Outlet } from 'react-router-dom';
// import { getRequest } from '../API/api';

function Dashboard() {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const loggedUserInfo = async () => {
    const user = await Cookies.get('user');
    console.log(JSON.parse(Cookies.get('user')));
    console.log(Cookies.get('token'));

    // const user = await getRequest(`employees/getEmployee/${userId}`);
    
    Cookies.set('user-role', user.employee.role);
 }
 
 useEffect(() => {
    loggedUserInfo();
 }, []);

  return (
    <div className={dashboardCSS.container}>

      {/* NavBar */}
      <div className={dashboardCSS.navbar}>
        <img src="/images/bars.svg" alt="bars" className={dashboardCSS.barsIcon} onClick={()=>{setSideNavOpen(!sideNavOpen)}}/>
        <h1 className={dashboardCSS.navbarTitle}>Inventory Management System</h1>
      </div>

      {/* Main Content */}
      <div className={dashboardCSS.mainContent}>

        {/* sidenav */}
        <div style={sideNavOpen ? {width: "16%"} : {width: "0%"}}>
          {sideNavOpen && <SideNav />}
        </div>

        {/* Main Content */}
        <div className={dashboardCSS.displayData} style={sideNavOpen ? {width: "84%"} : {width: "100%"}}>
          <Outlet />
        </div>

      </div>
    </div>
  )
}

export default Dashboard