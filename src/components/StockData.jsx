import React, { useState, useEffect } from 'react';
import displayDataCSS from "../styles/displaydata.module.css";
import Modal from './Modal';
import Cookies from 'js-cookie';

function StockData() {

  const [stock, setStock] = useState(...[]);
  const [modal, setModal] = useState(false);
  const [operation, setOperation] = useState("");
  const [updateItem, setUpdateItem] = useState(...[]);

  const closeModal = () => {
    setModal(!modal);
  }

  const getStocks = async () => {

    const res = await fetch('https://ims-backend-3u4x.onrender.com/stocks/getStocks', {
      method: 'GET',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'content-Type': 'application/json',
        'token': Cookies.get('token')
      },
      credentials: 'include'
    });

    const resData = await res.json();
    // console.log(resData.stocks);

    setStock(resData.stocks);
  }

  const deleteStock = async (id) => {

    await fetch(`https://ims-backend-3u4x.onrender.com/stocks/deleteStocks/${id}`, {
      method: 'DELETE',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'content-Type': 'application/json',
        'token': Cookies.get('token')
      },
      credentials: 'include'
    });

    // const resData = await res.json();
    // console.log(resData);

    setStock(stock.filter(stock => stock._id !== id));
    alert("deleted stocks successfully.");
  }

  useEffect(() => {
    getStocks();
  }, []);

  return (
    <div className={displayDataCSS.container}>
      <div className={displayDataCSS.buttons}>
        <button className={displayDataCSS.button} onClick={() => {setModal(!modal); setOperation("addStock"); setUpdateItem({})}}>ADD STOCK</button>
      </div>

      <div className={displayDataCSS.showData}>
        <DataProp stocksProp={stock} deleteStock={deleteStock} modal={modal} setModal={setModal} setOperation={setOperation} setUpdateItem={setUpdateItem} />
        {modal && <Modal prop={'Stock'} closeModal={closeModal} propObject={stock} setPropObject={setStock} operation={operation} updateItem={updateItem} />}
      </div>
    </div>
  )
}

function DataProp({ stocksProp, deleteStock, modal, setModal, setOperation, setUpdateItem }) {
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
            <th>Added On</th>
            <th>Added By</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          { stocksProp && stocksProp.map((stock) => {
            return <TableRowProp key={stock._id} stock={stock} deleteStock={deleteStock} modal={modal} setModal={setModal} setOperation={setOperation} setUpdateItem={setUpdateItem}/>
          }) }
        </tbody>
      </table>
    </div>
  );
}

function TableRowProp({ stock, deleteStock, modal, setModal, setOperation, setUpdateItem }) {

  const formatDate = (date) => {
    const formatedDate = new Date(date).toLocaleDateString();
    return formatedDate;
  }

  return (
    <tr id='data'>
      <td>{stock.stock_name}</td>
      <td>{stock.category}</td>
      <td>{stock.cost}</td>
      <td>{stock.available}</td>
      <td>{stock.unit}</td>
      <td>{formatDate(stock.date)}</td>
      <td>{stock.added_by}</td>
      <td><button className={displayDataCSS.tabBtn} onClick={() => {setModal(!modal); setOperation("updateStock"); setUpdateItem(stock)}}>Update</button></td>
      <td><button className={displayDataCSS.tabBtn} onClick={() => {deleteStock(stock._id)}}>Delete</button></td>
    </tr>
  );
}

export default StockData