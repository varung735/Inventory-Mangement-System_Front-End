import React, {useState, useEffect} from 'react';
import displayDataCSS from "../styles/displaydata.module.css";

function SalaryData() {
  const [salary, setSalary] = useState(...[]);

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

  useEffect(() => {
    getEmployees();
  }, []) 

  return (
    <div className={displayDataCSS.container}>
       {salary && salary.map((salary) => {
        return <DataAccordion key={salary._id} employeeProp={salary} />
       })}
    </div>
  )
}

function DataAccordion({ employeeProp }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
      <div className={displayDataCSS.accordion}>
          <div className={displayDataCSS.accordionName} onClick={() => { setIsOpen(!isOpen) }}>
              <h1 className={displayDataCSS.accTitle}>{employeeProp.emp_name}</h1>
              {isOpen ? <img src="/images/minus.svg" alt="minus.svg" className={displayDataCSS.accIcon} /> :
                  <img src="/images/plus.svg" alt="plus.svg" className={displayDataCSS.accIcon} />
              }
          </div>
          {isOpen && <div className={displayDataCSS.accordionData}>
              <div className={displayDataCSS.accBtns}>
                  <button className={displayDataCSS.accBtn}>Pay Salary</button>
                  <button className={displayDataCSS.accBtn}>Export Data</button>
              </div>
              <DataProp salaryProp={ employeeProp.salary } />
          </div>}
      </div>
  );
}

function DataProp({ salaryProp }) {

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
                      return <TableRowProp key={salary._id} salary={salary} />
                  }) }

              </tbody>
          </table>
      </div>
  );
}

function TableRowProp({ salary }) {

  const formatDate = (date) => {
    const formatedDate = new Date(date).toLocaleDateString();
    return formatedDate;
  }

  return (
      <tr id='data'>
          <td>{salary.amount}</td>
          <td>{formatDate(salary.paid_on)}</td>
          <td><button className={displayDataCSS.tabBtn}>Update</button></td>
          <td><button className={displayDataCSS.tabBtn}>Delete</button></td>
      </tr>
  );
}

export default SalaryData