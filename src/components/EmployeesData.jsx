import React, { useState, useEffect } from 'react';
import employeeCSS from "../styles/employee.module.css";
import Modal from './Modal';

function EmployeesData() {
  const [employees, setEmployees] = useState(...[]);
  const [modal, setModal] = useState(false);
  const [operation, setOperation] = useState("");
  const [updateItem, setUpdateItem] = useState(...[]);

  const closeModal = () => {
    setModal(!modal);
  }

  const getEmployees = async () => {
    const res = await fetch('/employees/getEmployees', {
      method: 'GET',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'content-Type': 'application/json'
      }
    });

    const resData = await res.json();
    console.log(resData.employees);

    setEmployees(resData.employees);
  }

  const deleteEmployee = async (id) => {

    await fetch(`/employees/deleteEmployee/${id}`, {
      method: 'DELETE',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'content-Type': 'application/json'
      },
      credentials: 'include'
    });

    // const resData = await res.json();
    // console.log(resData);

    setEmployees(employees.filter(employee => employee._id !== id));
  }

  useEffect(() => {
    getEmployees();
  }, [])


  return (
    <div className={employeeCSS.container}>

      <div className={employeeCSS.header}>
        <button className={employeeCSS.headerBtn} onClick={() => {setModal(!modal); setOperation("addEmployee"); setUpdateItem({})}}>ADD EMPLOYEE</button>
      </div>

      <div className={employeeCSS.content}>
        {employees && employees.map((employee) => {
          return <EmployeeProp key={employee._id} employeesProp={employee} deleteEmployee={deleteEmployee} modal={modal} setModal={setModal} setOperation={setOperation} setUpdateItem={setUpdateItem}/>
        })}
        {modal && <Modal prop={'Employee'} closeModal={closeModal} propObject={employees} setPropObject={setEmployees} operation={operation} updateItem={updateItem}/>}
      </div>

    </div>
  )
}

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

export default EmployeesData