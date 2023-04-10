import React, { useState } from 'react';
import formsCSS from '../../styles/form.module.css';
import Cookies from 'js-cookie';

function InventoryForm({ inventory, setInventory, operation, updateItem }) {

  const [itemName, setItemName] = useState(updateItem.item_name || "");
  const [type, setType] = useState(updateItem.type || "");
  const [quantity, setQuantity] = useState(updateItem.quantity || "");
  const [unit, setUnit] = useState(updateItem.unit || "");
  const [addedBy, setAddedBy] = useState(updateItem.added_by || "");
  
  const addInventory = async () => {
    const res = await fetch('https://ims-backend-3u4x.onrender.com/inventories/addInventory', {
      method: 'POST',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'content-Type': 'application/json',
        'token': Cookies.get('token')
      },
      body: JSON.stringify({
        item_name: itemName,
        type: type,
        quantity: quantity,
        unit: unit,
        added_by: addedBy
      }),
      credentials: 'include'
    })

    const resData = await res.json();
    console.log(resData);

    setInventory(inventory => [...inventory, resData.added_inventory]);
    alert("added inventory item successfully.");
  }

  const updateInventory = async (id) => {
    const res = await fetch(`https://ims-backend-3u4x.onrender.com/inventories/updateInventory/${id}`, {
      method: 'PUT',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'content-Type': 'application/json',
        'token': Cookies.get('token')
      },
      body: JSON.stringify({
        item_name: itemName,
        type: type,
        quantity: quantity,
        unit: unit,
        added_by: addedBy
      }),
      credentials: 'include'
    })

    const resData = await res.json();
    console.log(resData);

    setInventory(inventory.filter(inventory => inventory._id !== id));
    setInventory(inventory => [...inventory, resData.updated_inventory]);

    alert("updated inventory successfully.");
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(operation === "updateInventory"){
      updateInventory(updateItem._id);
    }
    else{
      addInventory();
      setItemName("");
      setType("");
      setQuantity("");
      setUnit("");
      setAddedBy("");
    }
  }

  return (
    <div className={formsCSS.container}>
      <form action="submit" method="post" onSubmit={handleSubmit}>

        <div className={formsCSS.formDiv}>
          <label>Inventory Name</label>
          <input type="text" placeholder='Enter the Expense Name' className={formsCSS.input}
            value={itemName} onChange={(e) => setItemName(e.target.value)}/>
        </div>

        <div className={formsCSS.formDiv}>
          <label>Inventory Type</label>
          <input type="text" placeholder='Enter the Expense Type' className={formsCSS.input} 
            value={type} onChange={(e) => setType(e.target.value)}/>
        </div>

        <div className={formsCSS.formDiv}>
          <label>Quantity</label>
          <input type="text" placeholder='Enter the Quantity' className={formsCSS.input} 
           value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
        </div>

        <div className={formsCSS.formDiv}>
          <label>Unit</label>
          <input type="text" placeholder='Enter the Unit' className={formsCSS.input} 
           value={unit} onChange={(e) => setUnit(e.target.value)}/>
        </div>

        <div className={formsCSS.formDiv}>
          <label>Added By</label>
          <input type="text" placeholder='Enter the Employee Name' className={formsCSS.input} 
           value={addedBy} onChange={(e) => setAddedBy(e.target.value)}/>
        </div>

        <button className={formsCSS.formButton}>SUBMIT</button>

      </form>
    </div>
  )
}

export default InventoryForm