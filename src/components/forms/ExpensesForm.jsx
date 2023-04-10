import React, { useState } from 'react';
import formsCSS from '../../styles/form.module.css';
import Cookies from 'js-cookie';

function ExpensesForm({ expense, setExpense, operation, updateItem }) {

  const [expenseName, setExpenseName] = useState(updateItem.expense_name || "");
  const [type, setType] = useState(updateItem.type || "");
  const [paidTo, setPaidTo] = useState(updateItem.paid_to || "");
  const [amount, setAmount] = useState(updateItem.amount || "");
  const [addedBy, setAddedBy] = useState(updateItem.added_by || "");

  const addExpense = async () => {
    const res = await fetch('https://ims-backend-3u4x.onrender.com/expenses/addExpenses', {
      method: 'POST',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'content-Type': 'application/json',
        'token': Cookies.get('token')
      },
      body: JSON.stringify({
        expense_name: expenseName,
        type: type,
        paid_to: paidTo,
        amount: amount,
        added_by: addedBy
      }),
      credentials: 'include'
    });

    const resData = await res.json();
    console.log(resData);

    setExpense(expense => [...expense, resData.added_expense]);
    alert("added expense successfully.");
  }

  const updateExpense = async (id) => {
    const res = await fetch(`https://ims-backend-3u4x.onrender.com/expenses/updateExpenses/${id}`, {
      method: 'PUT',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'content-Type': 'application/json',
        'token': Cookies.get('token')
      },
      body: JSON.stringify({
        expense_name: expenseName,
        type: type,
        paid_to: paidTo,
        amount: amount,
        added_by: addedBy
      }),
      credentials: 'include'
    });

    const resData = await res.json();
    console.log(resData);

    setExpense(expense.filter(expense => expense._id !== id));
    setExpense(expense => [...expense, resData.updated_expense]);

    alert("updated expense successfully.");
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(operation === "updateExpense"){
      updateExpense(updateItem._id);
    }
    else{
      addExpense();
      setExpenseName("");
      setType("");
      setPaidTo("");
      setAmount("");
      setAddedBy("");
    }
  }

  return (
    <div className={formsCSS.container}>
      <form action="submit" method="post" onSubmit={handleSubmit}>

        <div className={formsCSS.formDiv}>
          <label>Expense Name</label>
          <input type="text" placeholder='Enter the Expense Name' className={formsCSS.input}
            value={expenseName} onChange={(e) => setExpenseName(e.target.value)}/>
        </div>

        <div className={formsCSS.formDiv}>
          <label>Expense Type</label>
          <input type="text" placeholder='Enter the Expense Type' className={formsCSS.input}
            value={type} onChange={(e) => setType(e.target.value)}/>
        </div>

        <div className={formsCSS.formDiv}>
          <label>Paid To</label>
          <input type="text" placeholder='Enter the Company Name' className={formsCSS.input}
            value={paidTo} onChange={(e) => setPaidTo(e.target.value)}/>
        </div>

        <div className={formsCSS.formDiv}>
          <label>Amount</label>
          <input type="number" placeholder='Enter the Expense Amount' className={formsCSS.input}
            value={amount} onChange={(e) => setAmount(e.target.value)}/>
        </div>

        <div className={formsCSS.formDiv}>
          <label>Added By</label>
          <input type="text" placeholder='Enter the Employee Name' className={formsCSS.input} 
            value={addedBy} onChange={(e) => setAddedBy(e.target.value)}/>
        </div>

        <button className={formsCSS.formButton}>SUBMIT</button>

      </form>
    </div>
  )
}

export default ExpensesForm