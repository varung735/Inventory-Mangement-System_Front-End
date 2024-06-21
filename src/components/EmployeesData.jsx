import React, { useState, useEffect } from 'react';
import employeeCSS from "../styles/employee.module.css";
import Modal from './Modal';
import EmployeeProp from '../props/EmployeeProp';
import { deleteRequest, getRequest } from '../API/api';

function EmployeesData() {
  const [employees, setEmployees] = useState(...[]);
  const [modal, setModal] = useState(false);
  const [operation, setOperation] = useState("");
  const [updateItem, setUpdateItem] = useState(...[]);

  const closeModal = () => {
    setModal(!modal);
  }

  const getEmployees = async () => {
    const users = await getRequest('employees/getEmployees');
    console.log(users);
    setEmployees(users.employees);
  }

  const deleteEmployee = async (id) => {

    await deleteRequest(`employees/deleteEmployee/${id}`);

    setEmployees(employees.filter(employee => employee._id !== id));
    alert("deleted employee successfully.");
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

export default EmployeesData