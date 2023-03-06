import React from 'react';
import displayDataCSS from "../styles/displaydata.module.css";

function StockData() {
  return (
    <div className={displayDataCSS.container}>
      <div className={displayDataCSS.buttons}>
        <button className={displayDataCSS.button}>ADD STOCK</button>
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
            <th>Stock Item</th>
            <th>Category</th>
            <th>Cost (in Rs.)</th>
            <th>Available</th>
            <th>Unit</th>
            <th>Added By</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr id='data'>
            <td>Tyre</td>
            <td>35 mm</td>
            <td>500</td>
            <td>1600</td>
            <td>units</td>
            <td>Pradeep</td>
            <td><button className={displayDataCSS.tabBtn}>Update</button></td>
            <td><button className={displayDataCSS.tabBtn}>Delete</button></td>
          </tr>
          <tr id='data'>
            <td>Tyre</td>
            <td>35 mm</td>
            <td>500</td>
            <td>1600</td>
            <td>units</td>
            <td>Pradeep</td>
            <td><button className={displayDataCSS.tabBtn}>Update</button></td>
            <td><button className={displayDataCSS.tabBtn}>Delete</button></td>
          </tr>
          <tr id='data'>
            <td>Tyre</td>
            <td>35 mm</td>
            <td>500</td>
            <td>1600</td>
            <td>units</td>
            <td>Pradeep</td>
            <td><button className={displayDataCSS.tabBtn}>Update</button></td>
            <td><button className={displayDataCSS.tabBtn}>Delete</button></td>
          </tr>
          
        </tbody>
      </table>
    </div>
  );
}

export default StockData