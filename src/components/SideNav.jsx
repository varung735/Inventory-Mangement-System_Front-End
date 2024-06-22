import React from 'react';
import { Link } from 'react-router-dom';
import sideNavCSS from "../styles/sidenav.module.css";
// import Cookies from 'js-cookie';

function SideNav({ link }) {
   
   //get the role from the cookies
   // const role = Cookies.get('user-role');
   // console.log(role);
   
   //handles logout feature
   // const logout = async () => {

   //    Cookies.remove('token');
   //    navigate('/');
   // }

   return (
      <div className={sideNavCSS.container}>
         <div className={`${sideNavCSS.sideNavLink} ${"sales"}`}>
            <Link to='home'>
               <h1 className={`${sideNavCSS.link} ${"sales"}`} >Home</h1>
            </Link>
         </div>
         <div className={`${sideNavCSS.sideNavLink} ${"sales"}`}>
            <Link to='home'>
               <h1 className={`${sideNavCSS.link} ${"sales"}`} >Log Out</h1>
            </Link>
         </div>
      </div>
   )
}

export default SideNav