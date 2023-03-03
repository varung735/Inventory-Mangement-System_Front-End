import React from 'react';
import sideNavCSS from "../styles/sidenav.module.css";

function SideNav({ link }) {

  return (
    <div className={sideNavCSS.container}>
       <div className={sideNavCSS.sideNavLink} onClick={() => {link("sales")}}>
          <h1 className={sideNavCSS.link}>Sales</h1>
       </div>
       <div className={sideNavCSS.sideNavLink} onClick={() => {link("purchases")}}>
          <h1 className={sideNavCSS.link}>Purchases</h1>
       </div>
       <div className={sideNavCSS.sideNavLink} onClick={() => {link("Expenses")}}>
          <h1 className={sideNavCSS.link}>Expenses</h1>
       </div>
       <div className={sideNavCSS.sideNavLink} onClick={() => {link("inventory")}}>
          <h1 className={sideNavCSS.link}>Inventory</h1>
       </div>
       <div className={sideNavCSS.sideNavLink} onClick={() => {link("stock")}}>
          <h1 className={sideNavCSS.link}>Stock</h1>
       </div>
       <div className={sideNavCSS.sideNavLink} onClick={() => {link("employees")}}>
          <h1 className={sideNavCSS.link}>Employees</h1>
       </div>
       <div className={sideNavCSS.sideNavLink} onClick={() => {link("salary")}}>
          <h1 className={sideNavCSS.link}>Salary</h1>
       </div>
       <div className={sideNavCSS.sideNavLink} onClick={() => {link("logout")}}>
          <h1 className={sideNavCSS.link}>Log Out</h1>
       </div>
    </div>
  )
}

export default SideNav