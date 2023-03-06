import React from 'react';
import displayDataCSS from "../styles/displaydata.module.css";

function InventoryData() {
  return (
    <div className={displayDataCSS.container}>
      <div className={displayDataCSS.buttons}>
        <button className={displayDataCSS.button}>ADD INVENTORY</button>
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
            <th>Inventory Item</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Added By</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr id='data'>
            <td>Rubber</td>
            <td>Raw Material</td>
            <td>1600</td>
            <td>Kgs</td>
            <td>Pradeep</td>
            <td><button className={displayDataCSS.tabBtn}>Update</button></td>
            <td><button className={displayDataCSS.tabBtn}>Delete</button></td>
          </tr>
          <tr id='data'>
            <td>Rubber</td>
            <td>Raw Material</td>
            <td>1600</td>
            <td>Kgs</td>
            <td>Pradeep</td>
            <td><button className={displayDataCSS.tabBtn}>Update</button></td>
            <td><button className={displayDataCSS.tabBtn}>Delete</button></td>
          </tr>
          <tr id='data'>
            <td>Rubber</td>
            <td>Raw Material</td>
            <td>1600</td>
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

export default InventoryData