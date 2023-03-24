import React, { useState, useEffect } from 'react';
import displayDataCSS from "../styles/displaydata.module.css";
import Modal from './Modal';

function ExpenseData() {

  const [expense, setExpense] = useState(...[]);
  const [modal, setModal] = useState(false);

  const closeModal = () => {
    setModal(!modal);
  }

  const getExpenses = async () => {

    const res = await fetch('/expenses/getExpenses', {
      method: 'GET',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'content-Type': 'application/json'
      },
      credentials: 'include'
    });

    const resData = await res.json();
    // console.log(resData.expenses);

    setExpense(resData.expenses);
  }

  const deleteExpenses = async (id) => {

    await fetch(`/expenses/deleteExpenses/${id}`, {
      method: 'DELETE',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'content-Type': 'application/json'
      },
      credentials: 'include'
    }); //for debugging, you can put this code block to a variable like "const res = await fetch"
    // the commented code in line below will log the response below in the console

    // const resData = await res.json();
    // console.log(resData);

    setExpense(expense.filter(expense => expense._id !== id));
  }

  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <div className={displayDataCSS.container}>
      <div className={displayDataCSS.buttons}>
        <button className={displayDataCSS.button} onClick={() => setModal(!modal)}>ADD EXPENSE</button>
      </div>

      <div className={displayDataCSS.showData}>
        <DataProp expenseProp={expense} deleteExpense={deleteExpenses}/>
        {modal && <Modal prop={'Expense'} closeModal={closeModal} />}
      </div>
    </div>
  )
}

function DataProp({ expenseProp, deleteExpense }) {
  return (
    <div className={displayDataCSS.dataProp}>
      <table className={displayDataCSS.table}>
        <thead>
          <tr>
            <th>Expense Name</th>
            <th>Type</th>
            <th>Paid to</th>
            <th>Amount</th>
            <th>Added By</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          { expenseProp && expenseProp.map((expense) => {
            return <TableRowProp key={expense._id} expense={expense} deleteExpense={deleteExpense}/>
          }) }
        </tbody>
      </table>
    </div>
  );
}

function TableRowProp({ expense, deleteExpense }) {
  return (
    <tr id='data'>
      <td>{expense.expense_name}</td>
      <td>{expense.type}</td>
      <td>{expense.paid_to}</td>
      <td>{expense.amount}</td>
      <td>{expense.added_by}</td>
      <td><button className={displayDataCSS.tabBtn}>Update</button></td>
      <td><button className={displayDataCSS.tabBtn} onClick={() => {deleteExpense(expense._id)}}>Delete</button></td>
    </tr>
  );
}

export default ExpenseData