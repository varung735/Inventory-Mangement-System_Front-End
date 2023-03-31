import React, {useState, useEffect} from 'react';
import displayDataCSS from "../styles/displaydata.module.css";
import Modal from './Modal';

function SalaryData() {
  const [salary, setSalary] = useState(...[]);
  const [modal, setModal] = useState(false);
  const [operation, setOperation] = useState("");
  const [updateItem, setUpdateItem] = useState(...[]);
  const [empId, setEmpId] = useState("");

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
    // console.log(resData.employees);

    setSalary(resData.employees);
  }

  const deleteSalary = async (empId, salaryId) => {
    const res = await fetch('/salaries/deleteSalary', {
      method: 'DELETE',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: empId,
        salary_id: salaryId
      }),
      credentials: 'include'
    });

    const resData = await res.json();
    console.log(resData);
  }

  useEffect(() => {
    getEmployees();
  }, [salary]) 

  return (
    <div className={displayDataCSS.container}>
       {salary && salary.map((salary) => {
        return <DataAccordion key={salary._id} employeeProp={salary} deleteSalary={deleteSalary} modal={modal} setModal={setModal} setOperation={setOperation} setUpdateItem={setUpdateItem} setEmpId={setEmpId}/>
       })}
       {modal && <Modal prop={'Salary'} closeModal={closeModal} propObject={salary} setPropObject={setSalary} operation={operation} updateItem={updateItem} empId={empId}/>}
    </div>
  )
}

function DataAccordion({ employeeProp, deleteSalary, modal, setModal, setOperation, setUpdateItem, setEmpId }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
      <div className={displayDataCSS.accordion}>
          <div className={displayDataCSS.accordionName} onClick={() => { setIsOpen(!isOpen); setOperation("addSalary"); setUpdateItem({}); setEmpId(employeeProp._id) }}>
              <h1 className={displayDataCSS.accTitle}>{employeeProp.emp_name}</h1>
              {isOpen ? <img src="/images/minus.svg" alt="minus.svg" className={displayDataCSS.accIcon} /> :
                  <img src="/images/plus.svg" alt="plus.svg" className={displayDataCSS.accIcon} />
              }
          </div>
          {isOpen && <div className={displayDataCSS.accordionData}>
              <div className={displayDataCSS.accBtns}>
                  <button className={displayDataCSS.accBtn} onClick={() => {setModal(!modal); setOperation("AddSalary"); setUpdateItem({}); setEmpId(employeeProp._id) }}>Pay Salary</button>
                  <button className={displayDataCSS.accBtn}>Export Data</button>
              </div>
              <DataProp salaryProp={employeeProp.salary} employeeId={employeeProp._id} deleteSalary={deleteSalary} modal={modal} setModal={setModal} setOperation={setOperation} setUpdateItem={setUpdateItem} setEmpId={setEmpId}/>
          </div>}
      </div>
  );
}

function DataProp({ salaryProp, deleteSalary, modal, setModal, setOperation, setUpdateItem, employeeId, setEmpId }) {

  return (
      <div className={displayDataCSS.dataProp}>
          <table className={displayDataCSS.table}>
              <thead>
                  <tr>
                      <th>Amount</th>
                      <th>Paid On</th>
                      <th>Update</th>
                      <th>Delete</th>
                  </tr>
              </thead>
              <tbody>
                  { salaryProp && salaryProp.map((salary) => {
                      return <TableRowProp key={salary._id} salary={salary} deleteSalary={deleteSalary} modal={modal} setModal={setModal} setOperation={setOperation} setUpdateItem={setUpdateItem} employeeId={employeeId} setEmpId={setEmpId}/>
                  }) }

              </tbody>
          </table>
      </div>
  );
}

function TableRowProp({ salary, deleteSalary, modal, setModal, setOperation, setUpdateItem, employeeId, setEmpId }) {

  const formatDate = (date) => {
    const formatedDate = new Date(date).toLocaleDateString();
    return formatedDate;
  }

  return (
      <tr id='data'>
          <td>{salary.amount}</td>
          <td>{formatDate(salary.paid_on)}</td>
          <td><button className={displayDataCSS.tabBtn} onClick={() => {setModal(!modal); setOperation("updateSalary"); setUpdateItem(salary); setEmpId(employeeId)}}>Update</button></td>
          <td><button className={displayDataCSS.tabBtn} onClick={() => { deleteSalary(employeeId, salary._id) }}>Delete</button></td>
      </tr>
  );
}

export default SalaryData