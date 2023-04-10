import React, { useState } from 'react';
import formsCSS from '../../styles/form.module.css';
import Cookies from "js-cookie";

function SalaryForm({ salary, setSalary, operation, updateItem, empId }) {

  const formatDate = (date) => {

    if(date != null) {
      const formatedDate = new Date(date).toISOString().split('T')[0];
      return formatedDate;
    }
  }

  const [paidOn, setPaidOn] = useState(formatDate(updateItem.paid_on) || "");
  const [amount, setAmount] = useState(updateItem.amount || "");

  const addSalary = async () => {
    const res = await fetch('https://ims-backend-3u4x.onrender.com/salaries/addSalary', {
      method: 'POST',
      dataType: 'json',
      headers: {
        "Accept": "application/json",
        "content-Type": "application/json",
        'token': Cookies.get('token')
      },
      body: JSON.stringify({
        id: empId,
        paid_on: paidOn,
        amount: amount
      }),
      credentials: 'include'
    });

    const resData = await res.json();
    // console.log(resData);

    alert("added salary successfully");
  }

  const updateSalary = async (id, salaryId) => {
    const res = await fetch('https://ims-backend-3u4x.onrender.com/salaries/updateSalary', {
      method: 'PUT',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'content-Type': 'application/json',
        'token': Cookies.get('token')
      },
      body: JSON.stringify({
        id: id,
        salary_id: salaryId,
        paid_on: paidOn,
        amount: amount
      }),
      credentials: 'include'
    });

    const resData = await res.json();
    console.log(resData);

    alert("updated salary successfully");
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(operation === "updateSalary"){
      updateSalary(empId, updateItem._id);
    }
    else{
      addSalary();
      setPaidOn("");
      setAmount("");
    }
  }

  return (
    <div className={formsCSS.container}>
      <form action="submit" method="post" onSubmit={handleSubmit}>

        <div className={formsCSS.formDiv}>
          <label>Paid On</label>
          <input type="date" placeholder='Enter the Date' className={formsCSS.input}
           value={paidOn} onChange={(e) => setPaidOn(e.target.value)}/>
        </div>

        <div className={formsCSS.formDiv}>
          <label>Amount</label>
          <input type="text" placeholder='Enter the Category' className={formsCSS.input}
           value={amount} onChange={(e) => setAmount(e.target.value)}/>
        </div>

        <button className={formsCSS.formButton}>SUBMIT</button>

      </form>
    </div>
  )
}

export default SalaryForm