import React, { useState } from 'react'
import dashboardCSS from '../styles/dashboard.module.css'
import PurchaseData from './PurchaseData';
import SalesData from './SalesData';
import SideNav from './SideNav';
import ExpenseData from "./ExpenseData";
import InventoryData from "./InventoryData";
import StockData from "./StockData";
import EmployeesData from "./EmployeesData";
import SalaryData from "./SalaryData";
import LedgerData from "./LedgerData";

function Dashboard() {
  const [sideNavOpen, setSideNavOpen] = useState(true);
  const [sidenavLink, setSideNavLink] = useState("sales");

  const getSideNavLink = (link) => {
    setSideNavLink(link);
  }

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
          {sideNavOpen && <SideNav link={getSideNavLink}/>}
        </div>

        {/* Main Content */}
        <div className={dashboardCSS.displayData} style={sideNavOpen ? {width: "84%"} : {width: "100%"}}>
          {sidenavLink === "sales" && <SalesData />}
          {sidenavLink === "purchases" && <PurchaseData />}
          {sidenavLink === "expenses" && <ExpenseData />}
          {sidenavLink === "inventory" && <InventoryData />}
          {sidenavLink === "stock" && <StockData />}
          {sidenavLink === "employees" && <EmployeesData />}
          {sidenavLink === "salary" && <SalaryData />}
          {sidenavLink === "ledger" && <LedgerData />}
        </div>

      </div>
    </div>
  )
}

export default Dashboard