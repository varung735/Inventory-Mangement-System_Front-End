import React from 'react';
import sideNavCSS from "../styles/sidenav.module.css";

function SideNav({ link }) {

   const sideNavLink = (event) => {
      link(event.target.classList[1]);
   }

  return (
    <div className={sideNavCSS.container}>
       <div className={`${sideNavCSS.sideNavLink} ${"sales"}`} id={"sales"} onClick={(event) => {sideNavLink(event)}}>
          <h1 className={`${sideNavCSS.link} ${"sales"}`} >Sales</h1>
       </div>
       <div className={`${sideNavCSS.sideNavLink} ${"purchases"}`} id={"purchases"} onClick={(event) => {sideNavLink(event)}}>
          <h1 className={`${sideNavCSS.link} ${"purchases"}`}>Purchases</h1>
       </div>
       <div className={`${sideNavCSS.sideNavLink} ${"expenses"}`} id={"expenses"} onClick={(event) => {sideNavLink(event)}}>
          <h1 className={`${sideNavCSS.link} ${"expenses"}`}>Expenses</h1>
       </div>
       <div className={`${sideNavCSS.sideNavLink} ${"inventory"}`} id={"inventory"} onClick={(event) => {sideNavLink(event)}}>
          <h1 className={`${sideNavCSS.link} ${"inventory"}`}>Inventory</h1>
       </div>
       <div className={`${sideNavCSS.sideNavLink} ${"stock"}`} id={"stock"} onClick={(event) => {sideNavLink(event)}}>
          <h1 className={`${sideNavCSS.link} ${"stock"}`}>Stock</h1>
       </div>
       <div className={`${sideNavCSS.sideNavLink} ${"employees"}`} id={"employees"} onClick={(event) => {sideNavLink(event)}}>
          <h1 className={`${sideNavCSS.link} ${"employees"}`}>Employees</h1>
       </div>
       <div className={`${sideNavCSS.sideNavLink} ${"salary"}`} id={"salary"} onClick={(event) => {sideNavLink(event)}}>
          <h1 className={`${sideNavCSS.link} ${"salary"}`}>Salary</h1>
       </div>
       <div className={`${sideNavCSS.sideNavLink} ${"ledger"}`} id={"ledger"} onClick={(event) => {sideNavLink(event)}}>
          <h1 className={`${sideNavCSS.link} ${"ledger"}`}>Ledger</h1>
       </div>
       <div className={sideNavCSS.sideNavLink} onClick={(event) => {sideNavLink(event)}}>
          <h1 className={sideNavCSS.link}>Log Out</h1>
       </div>
    </div>
  )
}

export default SideNav