import React, { useState } from 'react';
import formsCSS from '../../styles/form.module.css';

function StocksForm({ addStock }) {

  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("");
  const [costPrice, setCostPrice] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);

  async function handleSubmit(e){
    e.preventDefault();
    
    await addStock({
      item_name: itemName,
      quantity: quantity,
      unit: unit,
      cost_price: costPrice,
      selling_price: sellingPrice
    });

    setItemName("");
    setQuantity(0);
    setUnit("")
    setCostPrice(0);
    setSellingPrice(0);
  }

  return (
    <div className={formsCSS.container}>
      <form action="submit" method="post" onSubmit={handleSubmit}>

        <div className={formsCSS.formDiv}>
          <label>Item Name</label>
          <input type="text" placeholder='Enter the Item Name' className={formsCSS.input}
           value={itemName} onChange={(e) => setItemName(e.target.value)}/>
        </div>

        <div className={formsCSS.formDiv}>
          <label>Quantity</label>
          <input type="number" placeholder='Enter the Quantity' className={formsCSS.input}
           value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
        </div>

        <div className={formsCSS.formDiv}>
          <label>Unit</label>
          <input type="text" placeholder='Enter the Unit' className={formsCSS.input}
           value={unit} onChange={(e) => setUnit(e.target.value)}/>
        </div>

        <div className={formsCSS.formDiv}>
          <label>Cost Price</label>
          <input type="number" placeholder='Enter the Cost Price' className={formsCSS.input}
           value={costPrice} onChange={(e) => setCostPrice(e.target.value)}/>
        </div>

        <div className={formsCSS.formDiv}>
          <label>Selling Price</label>
          <input type="number" placeholder='Enter the Selling Price' className={formsCSS.input}
           value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)}/>
        </div>

        <button className={formsCSS.formButton}>SUBMIT</button>

      </form>
    </div>
  )
}

export default StocksForm