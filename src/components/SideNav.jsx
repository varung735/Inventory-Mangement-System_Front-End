import React from 'react';
import sideNavCSS from "../styles/sidenav.module.css";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function SideNav({ link }) {
   const navigate = useNavigate();

   //send the data back to the parent which is Dashboard component
   const sideNavLink = (event) => {
      link(event.target.classList[1]);
   }

   //get the role from the cookies
   const role = Cookies.get('user-role');
   // console.log(role);

   //handles logout feature
   const logout = async () => {
      try {

         const res = await fetch('https://ims-backend-3u4x.onrender.com/employees/logout', {
            method: 'GET',
            dataType: 'json',
            headers: {
               'Accept': 'application/json',
               'content-Type': 'application/json'
            },
            credentials: 'include'
         });

         const resData = await res.json();
         // console.log(resData);

         if (resData.success) {
            Cookies.remove('user-role');
            navigate('/');
         }
         else {
            console.log(resData.error)
         }

      } catch (error) {
         console.log(error);
      }

   }

   return (
      <div className={sideNavCSS.container}>
         <div className={`${sideNavCSS.sideNavLink} ${"sales"}`} id={"sales"} onClick={(event) => { sideNavLink(event) }}>
            <h1 className={`${sideNavCSS.link} ${"sales"}`} >Sales</h1>
         </div>
         <div className={`${sideNavCSS.sideNavLink} ${"purchases"}`} id={"purchases"} onClick={(event) => { sideNavLink(event) }}>
            <h1 className={`${sideNavCSS.link} ${"purchases"}`}>Purchases</h1>
         </div>
         <div className={`${sideNavCSS.sideNavLink} ${"expenses"}`} id={"expenses"} onClick={(event) => { sideNavLink(event) }}>
            <h1 className={`${sideNavCSS.link} ${"expenses"}`}>Expenses</h1>
         </div>
         <div className={`${sideNavCSS.sideNavLink} ${"inventory"}`} id={"inventory"} onClick={(event) => { sideNavLink(event) }}>
            <h1 className={`${sideNavCSS.link} ${"inventory"}`}>Inventory</h1>
         </div>
         <div className={`${sideNavCSS.sideNavLink} ${"stock"}`} id={"stock"} onClick={(event) => { sideNavLink(event) }}>
            <h1 className={`${sideNavCSS.link} ${"stock"}`}>Stock</h1>
         </div>
         { role === "admin" && <div className={`${sideNavCSS.sideNavLink} ${"employees"}`} id={"employees"} onClick={(event) => { sideNavLink(event) }}>
            <h1 className={`${sideNavCSS.link} ${"employees"}`}>Employees</h1>
         </div>}
         {role === "admin" && <div className={`${sideNavCSS.sideNavLink} ${"salary"}`} id={"salary"} onClick={(event) => { sideNavLink(event) }}>
            <h1 className={`${sideNavCSS.link} ${"salary"}`}>Salary</h1>
         </div>}
         {role === "admin" && <div className={`${sideNavCSS.sideNavLink} ${"ledger"}`} id={"ledger"} onClick={(event) => { sideNavLink(event) }}>
            <h1 className={`${sideNavCSS.link} ${"ledger"}`}>Ledger</h1>
         </div>}
         <div className={sideNavCSS.sideNavLink} onClick={() => { logout() }}>
            <h1 className={sideNavCSS.link}>Log Out</h1>
         </div>
      </div>
   )
}

export default SideNav