import React from 'react';
import sideNavCSS from "../styles/sidenav.module.css";

function SideNav({ link }) {

   const sideNavLink = (event) => {
      link(event.target.classList[1]);
   }

  return (
    <div className={sideNavCSS.container}>
       <div className={`${sideNavCSS.sideNavLink} ${"sales"}`} onClick={(event) => {sideNavLink(event)}}>
          <h1 className={`${sideNavCSS.link} ${"sales"}`} >Sales</h1>
       </div>
       <div className={`${sideNavCSS.sideNavLink} ${"purchases"}`} onClick={(event) => {sideNavLink(event)}}>
          <h1 className={`${sideNavCSS.link} ${"purchases"}`}>Purchases</h1>
       </div>
       <div className={`${sideNavCSS.sideNavLink} ${"expenses"}`} onClick={(event) => {sideNavLink(event)}}>
          <h1 className={`${sideNavCSS.link} ${"expenses"}`}>Expenses</h1>
       </div>
       <div className={`${sideNavCSS.sideNavLink} ${"inventory"}`} onClick={(event) => {sideNavLink(event)}}>
          <h1 className={`${sideNavCSS.link} ${"inventory"}`}>Inventory</h1>
       </div>
       <div className={`${sideNavCSS.sideNavLink} ${"stock"}`} onClick={(event) => {sideNavLink(event)}}>
          <h1 className={`${sideNavCSS.link} ${"stock"}`}>Stock</h1>
       </div>
       <div className={`${sideNavCSS.sideNavLink} ${"employees"}`} onClick={(event) => {sideNavLink(event)}}>
          <h1 className={`${sideNavCSS.link} ${"employees"}`}>Employees</h1>
       </div>
       <div className={`${sideNavCSS.sideNavLink} ${"salary"}`} onClick={(event) => {sideNavLink(event)}}>
          <h1 className={`${sideNavCSS.link} ${"salary"}`}>Salary</h1>
       </div>
       <div className={sideNavCSS.sideNavLink} onClick={(event) => {sideNavLink(event)}}>
          <h1 className={sideNavCSS.link}>Log Out</h1>
       </div>
    </div>
  )
}

export default SideNav