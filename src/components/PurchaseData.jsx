import React from 'react';
import displayDataCSS from "../styles/displaydata.module.css";

function PurchaseData() {

  return (
    <div className={displayDataCSS.container}>
        <div className={displayDataCSS.buttons}>
            <button className={displayDataCSS.button}>ADD PURCHASE</button>
        </div>

        <div className={displayDataCSS.showData}>
            <DataProp />
        </div>
    </div>
  )
}

function DataProp() {
  return(
    <div className={displayDataCSS.dataProp}>
      <table className={displayDataCSS.table}>
        <thead>
          <tr>
            <th>Purchase Name</th>
            <th>Type</th>
            <th>Cost</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Added By</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr id='data'>
            <td>Product Name</td>
            <td>Product Type</td>
            <td>1500</td>
            <td>50</td>
            <td>Kgs.</td>
            <td>Pradeep</td>
            <td><button className={displayDataCSS.tabBtn}>Update</button></td>
            <td><button className={displayDataCSS.tabBtn}>Delete</button></td>
          </tr>
          <tr id='data'>
            <td>Product Name</td>
            <td>Product Type</td>
            <td>1500</td>
            <td>500</td>
            <td>units</td>
            <td>Pradeep</td>
            <td><button className={displayDataCSS.tabBtn}>Update</button></td>
            <td><button className={displayDataCSS.tabBtn}>Delete</button></td>
          </tr>
          <tr id='data'>
            <td>Product Name</td>
            <td>Product Type</td>
            <td>1500</td>
            <td>25</td>
            <td>Kgs</td>
            <td>Pradeep</td>
            <td><button className={displayDataCSS.tabBtn}>Update</button></td>
            <td><button className={displayDataCSS.tabBtn}>Delete</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PurchaseData