import React, { useState } from 'react';
import formsCSS from '../../styles/form.module.css';

function StocksForm({ stock, setStock, operation, updateItem }) {

  const formatDate = (date) => {
    if(date != null) {
      const formatedDate = new Date(date).toISOString().split('T')[0];
      return formatedDate;
    }
  }

  const [stockName, setStockName] = useState(updateItem.stock_name || "");
  const [category, setCategory] = useState(updateItem.category || "");
  const [cost, setCost] = useState(updateItem.cost || "");
  const [available, setAvailable] = useState(updateItem.available || "");
  const [unit, setUnit] = useState(updateItem.unit || "");
  const [date, setDate] = useState(formatDate(updateItem.date) || "");
  const [addedBy, setAddedBy] = useState(updateItem.added_by || "");

  const addStock = async () => {
    const res = await fetch('/stocks/addStocks', {
      method: 'POST',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'content-Type': 'application/json'
      },
      body: JSON.stringify({
        stock_name: stockName,
        category: category,
        cost: cost,
        available: available,
        unit: unit,
        date: date,
        added_by: addedBy
      }),
      credentials: 'include'
    });

    const resData= await res.json();
    console.log(resData);

    setStock(stock => [...stock, resData.added_stock]);
  }

  const updateStock = async (id) => {
    const res = await fetch(`/stocks/updateStocks/${id}`, {
      method: 'PUT',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'content-Type': 'application/json'
      },
      body: JSON.stringify({
        stock_name: stockName,
        category: category,
        cost: cost,
        available: available,
        unit: unit,
        date: date,
        added_by: addedBy
      }),
      credentials: 'include'
    });

    const resData= await res.json();
    console.log(resData);

    setStock(stock.filter(stock => stock._id !== id));
    setStock(stock => [...stock, resData.updated_stock]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(operation === "updateStock"){
      updateStock(updateItem._id);
    }
    else{
      addStock();
      setStockName("");
      setCategory("");
      setCost("");
      setAvailable("");
      setUnit("");
      setDate("");
      setAddedBy("");
    }
  }

  return (
    <div className={formsCSS.container}>
      <form action="submit" method="post" onSubmit={handleSubmit}>

        <div className={formsCSS.formDiv}>
          <label>Stock Name</label>
          <input type="text" placeholder='Enter the Stock Name' className={formsCSS.input}
           value={stockName} onChange={(e) => setStockName(e.target.value)}/>
        </div>

        <div className={formsCSS.formDiv}>
          <label>Category</label>
          <input type="text" placeholder='Enter the Category' className={formsCSS.input}
           value={category} onChange={(e) => setCategory(e.target.value)}/>
        </div>

        <div className={formsCSS.formDiv}>
          <label>Cost</label>
          <input type="number" placeholder='Enter the Cost' className={formsCSS.input} 
           value={cost} onChange={(e) => setCost(e.target.value)}/>
        </div>

        <div className={formsCSS.formDiv}>
          <label>Available</label>
          <input type="number" placeholder='Enter the Unit' className={formsCSS.input}
           value={available} onChange={(e) => setAvailable(e.target.value)}/>
        </div>

        <div className={formsCSS.formDiv}>
          <label>Unit</label>
          <input type="text" placeholder='Enter the Unit' className={formsCSS.input}
           value={unit} onChange={(e) => setUnit(e.target.value)}/>
        </div>

        <div className={formsCSS.formDiv}>
          <label>Date</label>
          <input type="date" placeholder='Enter the Unit' className={formsCSS.input}
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

export default StocksForm