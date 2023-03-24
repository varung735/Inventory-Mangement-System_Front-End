import React, { useState, useEffect } from 'react';
import displayDataCSS from "../styles/displaydata.module.css";
import Modal from './Modal';

function InventoryData() {

  const [inventory, setInventory] = useState(...[]);
  const [modal, setModal] = useState(false);

  const closeModal = () => {
    setModal(!modal);
  }

  const getInventories = async () => {

    const res = await fetch('/inventories/getInventory', {
      method: 'GET',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'content-Type': 'application/json'
      },
      credentials: 'include'
    });

    const resData = await res.json();
    // console.log(resData.inventories);

    setInventory(resData.inventories);
  }

  const deleteInventory = async (id) => {

    await fetch(`/inventories/deleteInventory/${id}`, {
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

    setInventory(inventory.filter(inventory => inventory._id !== id));
  }

  useEffect(() => {
    getInventories();
  }, []);

  return (
    <div className={displayDataCSS.container}>
      <div className={displayDataCSS.buttons}>
        <button className={displayDataCSS.button} onClick={() => setModal(!modal)}>ADD INVENTORY</button>
      </div>

      <div className={displayDataCSS.showData}>
        <DataProp inventoryProp={inventory} deleteInventory={deleteInventory}/>
        {modal && <Modal prop={'Inventory'} closeModal={closeModal} />}
      </div>
    </div>
  )
}

function DataProp({ inventoryProp, deleteInventory }) {
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
          { inventoryProp && inventoryProp.map((inventory) => {
            return <TableRowProp key={inventory._id} inventory={inventory} deleteInventory={deleteInventory}/>
          }) }
        </tbody>
      </table>
    </div>
  );
}

function TableRowProp({ inventory, deleteInventory }) {
  return (
    <tr id='data'>
      <td>{inventory.item_name}</td>
      <td>{inventory.type}</td>
      <td>{inventory.quantity}</td>
      <td>{inventory.unit}</td>
      <td>{inventory.added_by}</td>
      <td><button className={displayDataCSS.tabBtn}>Update</button></td>
      <td><button className={displayDataCSS.tabBtn} onClick={() => {deleteInventory(inventory._id)}}>Delete</button></td>
    </tr>
  );
}

export default InventoryData