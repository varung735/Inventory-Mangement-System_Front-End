import React, { useState, useEffect } from 'react';
import displayDataCSS from "../styles/displaydata.module.css";
import Modal from './Modal';
import Cookies from 'js-cookie';

function PurchaseData() {

  const [purchase, setPurchase] = useState(...[]);
  const [modal, setModal] = useState(false);
  const [operation, setOperation] = useState("");
  const [updateItem, setUpdateItem] = useState(...[]);

  const closeModal = () => {
    setModal(!modal);
  }

  const getPurchases = async () => {

    const res = await fetch('https://ims-backend-3u4x.onrender.com/purchases/getPurchases', {
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
    // console.log(resData.purchases);

    setPurchase(resData.purchases);
  }

  const deletePurchases = async (id) => {

    await fetch(`https://ims-backend-3u4x.onrender.com/purchases/deletePurchases/${id}`, {
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

    setPurchase(purchase.filter(purchase => purchase._id !== id));
  }

  useEffect(() => {
    getPurchases();
  }, []);

  return (
    <div className={displayDataCSS.container}>
      <div className={displayDataCSS.buttons}>
        <button className={displayDataCSS.button} onClick={() => {setModal(!modal); setOperation("addPurchase"); setUpdateItem({})}}>ADD PURCHASE</button>
      </div>

      <div className={displayDataCSS.showData}>
        <DataProp purchasesProp={ purchase } deletePurchase={deletePurchases} modal={modal} setModal={setModal} setOperation={setOperation} setUpdateItem={setUpdateItem}/>
        {modal && <Modal prop={'Purchase'} closeModal={closeModal} propObject={purchase} setPropObject={setPurchase} updateItem={updateItem} operation={operation}/>}
      </div>
    </div>
  )
}

function DataProp({ purchasesProp, deletePurchase, modal, setModal, setOperation, setUpdateItem }) {
  return (
    <div className={displayDataCSS.dataProp}>
      <table className={displayDataCSS.table}>
        <thead>
          <tr>
            <th>Purchase Name</th>
            <th>Purchased From</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Added On</th>
            <th>Added By</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {purchasesProp && purchasesProp.map((purchase) => {
            return <TableRowProp key={purchase._id} purchase={purchase} deletePurchase={deletePurchase} modal={modal} setModal={setModal} setOperation={setOperation} setUpdateItem={setUpdateItem}/>
          })}
        </tbody>
      </table>
    </div>
  );
}

function TableRowProp({ purchase, deletePurchase, modal, setModal, setOperation, setUpdateItem }) {

  const formatDate = (date) => {
    const formatedDate = new Date(date).toLocaleDateString();
    return formatedDate;
  }

  return (
    <tr id='data'>
      <td>{purchase.purchase_name}</td>
      <td>{purchase.purchased_from}</td>
      <td>{purchase.type}</td>
      <td>{purchase.amount}</td>
      <td>{purchase.quantity}</td>
      <td>{purchase.unit}</td>
      <td>{formatDate(purchase.date)}</td>
      <td>{purchase.added_by}</td>
      <td><button className={displayDataCSS.tabBtn} onClick={() => {setModal(!modal); setOperation("updatePurchase"); setUpdateItem(purchase)}}>Update</button></td>
      <td><button className={displayDataCSS.tabBtn} onClick={() => {deletePurchase(purchase._id)}}>Delete</button></td>
    </tr>
  );
}

export default PurchaseData