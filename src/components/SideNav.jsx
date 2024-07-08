import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import sideNavCSS from "../styles/sidenav.module.css";
import Cookies from 'js-cookie';

function SideNav() {
   const [userRole, setUserRole] = useState('');

   useEffect(() => {
      getUserRole();
      // eslint-disable-next-line
   }, []);

   function getUserRole() {
      setUserRole(Cookies.get('user'));
      console.log(userRole);
   }

   return (
      <div className={sideNavCSS.container}>
         <div className={`${sideNavCSS.sideNavLink} ${"sales"}`}>
            <Link to='home' className={sideNavCSS.link}>
               <h1 className={`${sideNavCSS.link} ${"sales"}`} >Home</h1>
            </Link>
         </div>
         <div className={`${sideNavCSS.sideNavLink} ${"sales"}`}>
            <Link to='sales' className={sideNavCSS.link}>
               <h1 className={`${sideNavCSS.link} ${"sales"}`} >Sales</h1>
            </Link>
         </div>
         <div className={`${sideNavCSS.sideNavLink} ${"sales"}`}>
            <Link to='users' className={sideNavCSS.link}>
               <h1 className={`${sideNavCSS.link} ${"sales"}`} >Users</h1>
            </Link>
         </div>
         <div className={`${sideNavCSS.sideNavLink} ${"sales"}`}>
            <Link to='stock' className={sideNavCSS.link}>
               <h1 className={`${sideNavCSS.link} ${"sales"}`} >Stock</h1>
            </Link>
         </div>
         <div className={`${sideNavCSS.sideNavLink} ${"sales"}`}>
            <Link to='/' className={sideNavCSS.link}>
               <h1 className={`${sideNavCSS.link} ${"sales"}`} >Log Out</h1>
            </Link>
         </div>
      </div>
   )
}

export default SideNav