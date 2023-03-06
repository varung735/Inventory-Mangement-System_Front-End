import React from 'react';
import displayDataCSS from "../styles/displaydata.module.css";

function ExpenseData() {
  return (
    <div className={displayDataCSS.container}>
      <div className={displayDataCSS.buttons}>
        <button className={displayDataCSS.button}>ADD EXPENSE</button>
      </div>

      <div className={displayDataCSS.showData}>
        <DataProp />
      </div>
    </div>
  )
}

function DataProp() {
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
          <tr id='data'>
            <td>Product Name</td>
            <td>Product Type</td>
            <td>XYZ co. Ltd.</td>
            <td>1600</td>
            <td>Pradeep</td>
            <td><button className={displayDataCSS.tabBtn}>Update</button></td>
            <td><button className={displayDataCSS.tabBtn}>Delete</button></td>
          </tr>
          <tr id='data'>
            <td>Product Name</td>
            <td>Product Type</td>
            <td>PQR CO. Ltd.</td>
            <td>1500</td>
            <td>Pradeep</td>
            <td><button className={displayDataCSS.tabBtn}>Update</button></td>
            <td><button className={displayDataCSS.tabBtn}>Delete</button></td>
          </tr>
          <tr id='data'>
            <td>Product Name</td>
            <td>Product Type</td>
            <td>ABC CO. Ltd.</td>
            <td>1200</td>
            <td>Pradeep</td>
            <td><button className={displayDataCSS.tabBtn}>Update</button></td>
            <td><button className={displayDataCSS.tabBtn}>Delete</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseData