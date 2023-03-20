import React, { useState, useEffect } from 'react';
import displayDataCSS from "../styles/displaydata.module.css";

function InventoryData() {

  const [inventory, setInventory] = useState(...[]);

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

  useEffect(() => {
    getInventories();
  }, []);

  return (
    <div className={displayDataCSS.container}>
      <div className={displayDataCSS.buttons}>
        <button className={displayDataCSS.button}>ADD INVENTORY</button>
      </div>

      <div className={displayDataCSS.showData}>
        <DataProp inventoryProp={inventory}/>
      </div>
    </div>
  )
}

function DataProp({ inventoryProp }) {
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
            return <TableRowProp key={inventory._id} inventory={inventory}/>
          }) }
        </tbody>
      </table>
    </div>
  );
}

function TableRowProp({ inventory }) {
  return (
    <tr id='data'>
      <td>{inventory.item_name}</td>
      <td>{inventory.type}</td>
      <td>{inventory.quantity}</td>
      <td>{inventory.unit}</td>
      <td>{inventory.added_by}</td>
      <td><button className={displayDataCSS.tabBtn}>Update</button></td>
      <td><button className={displayDataCSS.tabBtn}>Delete</button></td>
    </tr>
  );
}

export default InventoryData