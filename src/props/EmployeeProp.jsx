import React from 'react';
import employeeCSS from "../styles/employee.module.css";

function EmployeeProp({ employeesProp, deleteEmployee, modal, setModal, setOperation, setUpdateItem }) {

    const formatDate = (date) => {
      const formatedDate = new Date(date).toLocaleDateString();
      return formatedDate;
    }
  
    return (
      <div className={employeeCSS.empDiv}>
  
        <div className={employeeCSS.imgDiv}>
          <img src='/images/avatar.jpg' alt='human avatar' className={employeeCSS.empImg} />
        </div>
  
        <div className={employeeCSS.empDetDiv}>
          <h1 className={employeeCSS.empName}>{employeesProp.emp_name}</h1>
          <p className={employeeCSS.empDetail}>Designation: {employeesProp.designation}</p>
          <p className={employeeCSS.empDetail}>Address: {employeesProp.address}</p>
          <p className={employeeCSS.empDetail}>Aadhar No.: {employeesProp.aadhar_no}</p>
          <p className={employeeCSS.empDetail}>PAN No.: {employeesProp.pan_no}</p>
          <p className={employeeCSS.empDetail}>A/C No.: {employeesProp.ac_no}</p>
          <p className={employeeCSS.empDetail}>Bank Name: {employeesProp.bank_name}</p>
          <p className={employeeCSS.empDetail}>IFSC Code: {employeesProp.ifsc_code}</p>
          <p className={employeeCSS.empDetail}>Email: {employeesProp.email}</p>
          <p className={employeeCSS.empDetail}>Contact: {employeesProp.contact_no}</p>
          <p className={employeeCSS.empDetail}>Hired On: {formatDate(employeesProp.hired_on)}</p>
          <p className={employeeCSS.empDetail}>Status: {employeesProp.emp_status}</p>
          <div className={employeeCSS.buttons}>
            <button className={employeeCSS.button} onClick={() => {setModal(!modal); setOperation("updateEmployee"); setUpdateItem(employeesProp)}}>Update</button>
            <button className={employeeCSS.button} onClick={() => { deleteEmployee(employeesProp._id) }}>Delete</button>
          </div>
        </div>
  
      </div>
    );
  }

  export default EmployeeProp;