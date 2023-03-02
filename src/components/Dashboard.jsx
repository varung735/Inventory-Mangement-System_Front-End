import React, { useState } from 'react'
import dashboardCSS from '../styles/dashboard.module.css'
import SideNav from './SideNav'

function Dashboard() {
  const [sideNavOpen, setSideNavOpen] = useState(false);

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
        {sideNavOpen && <SideNav />}

        {/* Main Content */}
        

      </div>
    </div>
  )
}

export default Dashboard