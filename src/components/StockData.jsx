import React, { useState, useEffect } from 'react';
import displayDataCSS from "../styles/displaydata.module.css";

function StockData() {

  const [stock, setStock] = useState(...[]);

  const getStocks = async () => {

    const res = await fetch('/stocks/getStocks', {
      method: 'GET',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'content-Type': 'application/json'
      },
      credentials: 'include'
    });

    const resData = await res.json();
    // console.log(resData.stocks);

    setStock(resData.stocks);
  }

  const deleteStock = async (id) => {

    const res = await fetch(`/stocks/deleteStocks/${id}`, {
      method: 'DELETE',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'content-Type': 'application/json'
      },
      credentials: 'include'
    });

    const resData = await res.json();
    // console.log(resData);

    setStock(stock.filter(stock => stock._id !== id));
  }

  useEffect(() => {
    getStocks();
  }, []);

  return (
    <div className={displayDataCSS.container}>
      <div className={displayDataCSS.buttons}>
        <button className={displayDataCSS.button}>ADD STOCK</button>
      </div>

      <div className={displayDataCSS.showData}>
        <DataProp stocksProp={stock}  deleteStock={deleteStock}/>
      </div>
    </div>
  )
}

function DataProp({ stocksProp, deleteStock }) {
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
          { stocksProp && stocksProp.map((stock) => {
            return <TableRowProp key={stock._id} stock={stock} deleteStock={deleteStock}/>
          }) }
        </tbody>
      </table>
    </div>
  );
}

function TableRowProp({ stock, deleteStock }) {
  return (
    <tr id='data'>
      <td>{stock.stock_name}</td>
      <td>{stock.category}</td>
      <td>{stock.cost}</td>
      <td>{stock.available}</td>
      <td>{stock.unit}</td>
      <td>{stock.added_by}</td>
      <td><button className={displayDataCSS.tabBtn}>Update</button></td>
      <td><button className={displayDataCSS.tabBtn} onClick={() => {deleteStock(stock._id)}}>Delete</button></td>
    </tr>
  );
}

export default StockData