import React from 'react';
import sideNavCSS from "../styles/sidenav.module.css";

function SideNav() {
  return (
    <div className={sideNavCSS.container}>
       <SideNavLink linkName={link}/>
    </div>
  )
}

function SideNavLink({ link }) {
    return(
     <div className={sideNavCSS.sideNavLink}>
        <h1 className={sideNavCSS.link}>{link}</h1>
     </div>  
    );
}

function SideNavAccordion({ accordionArray }) {
    return(
      <div className={sideNavCSS.SideNavAccordion}>
        <h1 className={sideNavCSS.accName}></h1>
        <div className={sideNavCSS.accElements}>
            <SideNavLink linkName={link} />
        </div>
      </div>
    );
}

export default SideNav