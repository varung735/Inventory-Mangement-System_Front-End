import React, { useState, useEffect } from 'react';
import displayDataCSS from "../styles/displaydata.module.css";
import Modal from './Modal';
import Cookies from 'js-cookie';

function SalesData() {

  const [sales, setSales] = useState(...[]);
  const [modal, setModal] = useState(false);
  const [operation, setOperation] = useState(""); 
  const [updateItem, setUpdateItem] = useState(...[]); //sales item which is to be updated in DB

  const closeModal = () => {
    setModal(!modal);
  }

  const getSales = async () => {

    const res = await fetch('https://ims-backend-3u4x.onrender.com/sales/getSales', {
      method: 'GET',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'content-Type': 'application/json',
        'token': Cookies.get('token')
      },
      credentials: 'include'
    })

    const resData = await res.json();
    // console.log(resData);

    setSales(resData.sales);
  }

  const deleteSales = async (id) => {
    await fetch(`https://ims-backend-3u4x.onrender.com/sales/deleteSales/${id}`, {
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

    setSales(sales.filter(sale => sale._id !== id));
    alert("sale deleted successfully.");
  }

  useEffect(() => {
    getSales();
  }, []);


  return (
    <div className={displayDataCSS.container}>
      <div className={displayDataCSS.buttons}>
        <button className={displayDataCSS.button} onClick={() => {setModal(!modal); setOperation("addSales"); setUpdateItem({})}}>ADD SALES</button>
      </div>

      <div className={displayDataCSS.showData}>
        <DataProp salesProp={sales} deleteSale={deleteSales} modal={modal} setModal={setModal} setOperation={setOperation} setUpdateItem={setUpdateItem}/>
        {modal && <Modal prop={'Sale'} closeModal={closeModal} propObject={sales} setPropObject={setSales} operation={operation} updateItem={updateItem}/>}
      </div>
    </div>
  )
}

function DataProp({ salesProp, deleteSale, modal, setModal, setOperation, setUpdateItem }) {
  // console.log(salesProp);
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
            <th>Unit</th>
            <th>Added On</th>
            <th>Added By</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {salesProp && salesProp.map((sale) => {
            return <TableRowProp key={sale._id} saleProp={sale} deleteSale={deleteSale} modal={modal} setModal={setModal} setOperation={setOperation} setUpdateItem={setUpdateItem}/>
          })}
        </tbody>
      </table>
    </div>
  );
}

function TableRowProp({ saleProp, deleteSale, modal, setModal ,setOperation, setUpdateItem }) {
  const formatDate = (date) => {
    const formatedDate = new Date(date).toISOString().split('T')[0];
    return formatedDate;
  }

  return (
    <tr id='data'>
      <td>{saleProp.product_name}</td>
      <td>{saleProp.type}</td>
      <td>{saleProp.selling_price}</td>
      <td>{saleProp.sold_at}</td>
      <td>{saleProp.units_sold}</td>
      <td>{saleProp.unit}</td>
      <td>{formatDate(saleProp.date)}</td>
      <td>{saleProp.added_by}</td>
      <td><button className={displayDataCSS.tabBtn} onClick={() => { setModal(!modal); setOperation("updateSales"); setUpdateItem(saleProp) }}>Update</button></td>
      <td><button className={displayDataCSS.tabBtn} onClick={() => { deleteSale(saleProp._id) }}>Delete</button></td>
    </tr>
  );
}

export default SalesData