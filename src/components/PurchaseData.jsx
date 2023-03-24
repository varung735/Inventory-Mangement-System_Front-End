import React, { useState, useEffect } from 'react';
import displayDataCSS from "../styles/displaydata.module.css";
import Modal from './Modal';

function PurchaseData() {

  const [purchase, setPurchase] = useState(...[]);
  const [modal, setModal] = useState(false);

  const closeModal = () => {
    setModal(!modal);
  }

  const getPurchases = async () => {

    const res = await fetch('/purchases/getPurchases', {
      method: 'GET',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'content-Type': 'application/json'
      },
      credentials: 'include'
    });

    const resData = await res.json();
    // console.log(resData.purchases);

    setPurchase(resData.purchases);
  }

  const deletePurchases = async (id) => {

    await fetch(`/purchases/deletePurchases/${id}`, {
      method: 'DELETE',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'content-Type': 'application/json'
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
        <button className={displayDataCSS.button} onClick={() => setModal(!modal)}>ADD PURCHASE</button>
      </div>

      <div className={displayDataCSS.showData}>
        <DataProp purchasesProp={ purchase } deletePurchase={deletePurchases}/>
        {modal && <Modal prop={'Purchase'} closeModal={closeModal}/>}
      </div>
    </div>
  )
}

function DataProp({ purchasesProp, deletePurchase }) {
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
            return <TableRowProp key={purchase._id} purchase={purchase} deletePurchase={deletePurchase}/>
          })}
        </tbody>
      </table>
    </div>
  );
}

function TableRowProp({ purchase, deletePurchase }) {

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
      <td><button className={displayDataCSS.tabBtn}>Update</button></td>
      <td><button className={displayDataCSS.tabBtn} onClick={() => {deletePurchase(purchase._id)}}>Delete</button></td>
    </tr>
  );
}

export default PurchaseData