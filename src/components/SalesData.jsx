import React, { useState, useEffect } from 'react';
import displayDataCSS from "../styles/displaydata.module.css";

function SalesData() {

  const [sales, setSales] = useState(...[]);

  const getSales = async () => {
    
    const res = await fetch('/sales/getSales', {
      method: 'GET',
      dataType: 'json',
      headers:{
        'Accept': 'application/json',
        'content-Type': 'application/json'
      },
      credentials: 'include'
    })

    const resData = await res.json(); 
    console.log(resData);

    setSales(resData.sales);
  }

  useEffect(() => {
    getSales();
  }, []);
  

  return (
    <div className={displayDataCSS.container}>
      <div className={displayDataCSS.buttons}>
        <button className={displayDataCSS.button}>ADD SALES</button>
      </div>

      <div className={displayDataCSS.showData}>
        <DataProp salesProp={sales}/>
      </div>
    </div>
  )
}

function DataProp({ salesProp }) {
  return (
    <div className={displayDataCSS.dataProp}>
      <table className={displayDataCSS.table}>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Type</th>
            <th>Selling Price</th>
            <th>Sold At</th>
            <th>Units Sold</th>
            <th>Added By</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {salesProp && salesProp.map((sale) => {
            return <tr id='data'>
              <td>{sale.product_name}</td>
              <td>{sale.type}</td>
              <td>{sale.selling_price}</td>
              <td>{sale.sold_at}</td>
              <td>{sale.units_sold}</td>
              <td>{sale.unit}</td>
              <td><button className={displayDataCSS.tabBtn}>Update</button></td>
              <td><button className={displayDataCSS.tabBtn}>Delete</button></td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  );
}

export default SalesData