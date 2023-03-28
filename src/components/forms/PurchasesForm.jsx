import React, { useState } from 'react';
import formsCSS from '../../styles/form.module.css';

function PurchasesForm({ purchase, setPurchase, operation, updateItem }) {

  const formatDate = (date) => {
    if(date != null) {
      const formatedDate = new Date(date).toISOString().split('T')[0];
      return formatedDate;
    }
  }

  
  const [purchaseName, setPurchaseName] = useState(updateItem.purchase_name || "");
  const [type, setType] = useState(updateItem.type || "");
  const [amount, setAmount] = useState(updateItem.amount || "");
  const [quantity, setQuantity] = useState(updateItem.quantity || "");
  const [unit, setUnit] = useState(updateItem.unit || "");
  const [purchasedFrom, setPurchasedFrom] = useState(updateItem.purchased_from || "");
  const [date, setDate] = useState(formatDate(updateItem.date) || "");
  const [addedBy, setAddedBy] = useState(updateItem.added_by || "");
  
  // to add purchase data to DB
  const addPurchase = async () => {
    const res = await fetch('purchases/addPurchases', {
      method: 'POST',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'content-Type': 'application/json'
      },
      body: JSON.stringify({
        purchase_name: purchaseName,
        type: type,
        amount: amount,
        quantity: quantity,
        unit: unit,
        purchased_from: purchasedFrom,
        date: date,
        added_by: addedBy
      }),
      credentials: 'include'
    });

    const resData = await res.json();
    console.log(resData);

    setPurchase(purchase => [...purchase, resData.purchase]);
  }

  //to update the existing data in DB
  const updatePurchase = async (id) => {
    const res = await fetch(`purchases/updatePurchases/${id}`, {
      method: 'PUT',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'content-Type': 'application/json'
      },
      body: JSON.stringify({
        purchase_name: purchaseName,
        type: type,
        amount: amount,
        quantity: quantity,
        unit: unit,
        purchased_from: purchasedFrom,
        date: date,
        added_by: addedBy
      }),
      credentials: 'include'
    });

    const resData = await res.json();
    console.log(resData);

    setPurchase(purchase.filter(purchase => purchase._id !== id));
    setPurchase(purchase => [...purchase, resData.updated_purchase]);

    alert("Purchase Updated.");
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(operation === "updatePurchase"){
      updatePurchase(updateItem._id);
    }
    else{
      addPurchase();
      setPurchaseName("");
      setPurchasedFrom("");
      setType("");
      setAmount("");
      setQuantity("");
      setUnit("");
      setDate("");
      setAddedBy("");
    }
  }

  return (
    <div className={formsCSS.container}>
      <form action="submit" method="post" onSubmit={handleSubmit}>

        <div className={formsCSS.formDiv}>
          <label>Purchase Name</label>
          <input type="text" placeholder='Enter the Purchase Name' className={formsCSS.input} 
            value={purchaseName} onChange={(e) => setPurchaseName(e.target.value)} />
        </div>

        <div className={formsCSS.formDiv}>
          <label>Purchase Type</label>
          <input type="text" placeholder='Enter the Product Type' className={formsCSS.input}
            value={type} onChange={(e) => setType(e.target.value)} />
        </div>

        <div className={formsCSS.formDiv}>
          <label>Amount</label>
          <input type="number" placeholder='Enter the Purchase Amount' className={formsCSS.input}
           value={amount} onChange={(e) => setAmount(e.target.value)}/>
        </div>

        <div className={formsCSS.formDiv}>
          <label>Quantity</label>
          <input type="number" placeholder='Enter the quantity' className={formsCSS.input} 
            value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
        </div>

        <div className={formsCSS.formDiv}>
          <label>Unit</label>
          <input type="text" placeholder='Enter the Unit' className={formsCSS.input} 
           value={unit} onChange={(e) => setUnit(e.target.value)}/>
        </div>

        <div className={formsCSS.formDiv}>
          <label>Purchased From</label>
          <input type="text" placeholder='Enter the Name of the Company' className={formsCSS.input} 
            value={purchasedFrom} onChange={(e) => setPurchasedFrom(e.target.value)}/>
        </div>

        <div className={formsCSS.formDiv}>
          <label>Date</label>
          <input type="date" placeholder='Enter the Date' className={formsCSS.input}
            value={date} onChange={(e) => setDate(e.target.value)}/>
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

export default PurchasesForm