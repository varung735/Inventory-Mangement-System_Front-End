import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import dashboardCSS from '../styles/dashboard.module.css';
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
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [sidenavLink, setSideNavLink] = useState("sales");

  const getSideNavLink = (link) => {
    setSideNavLink(link);
  }

  const loggedUserInfo = async () => {
    const userId = Cookies.get('user-role');
    // console.log(userId);

    const res = await fetch(`https://ims-backend-3u4x.onrender.com/employees/getEmployee/${userId}`, {
      method: 'GET',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'content-Type': 'application/json'
      }
    });

    const resData = await res.json();
    console.log(resData.employee);

    Cookies.set('user-role', resData.employee.role);
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