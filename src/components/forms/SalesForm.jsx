import React, { useState } from 'react';
import formsCSS from '../../styles/form.module.css';

function SalesForm({ sales, setSales, operation, updateItem }) {

  const formatDate = (date) => {
    if(date != null) {
      const formatedDate = new Date(date).toISOString().split('T')[0];
      return formatedDate;
    }
  }

  const [productName, setProductName] = useState(updateItem.product_name || "");
  const [type, setType] = useState(updateItem.type || "");
  const [sellingPrice, setSellingPrice] = useState(updateItem.selling_price || "");
  const [soldAt, setSoldAt] = useState(updateItem.sold_at || "");
  const [unitsSold, setUnitsSold] = useState(updateItem.units_sold || "");
  const [unit, setUnit] = useState(updateItem.unit || "");
  const [date, setDate] = useState("" || formatDate(updateItem.date));
  const [addedBy, setAddedBy] = useState(updateItem.added_by || "");
  
  //to add a sale in the DB
  const addSales = async () => {

    const res = await fetch('/sales/addSales', {
      method: 'POST',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'content-Type': 'application/json'
      },
      body: JSON.stringify({
        product_name: productName,
        type: type,
        selling_price: sellingPrice,
        sold_at: soldAt,
        units_sold: unitsSold,
        unit: unit,
        date: date,
        added_by: addedBy
      }),
      credentials: 'include'
    });

    const resData = await res.json();
    console.log(resData);

    //It take the previous array spreaded out with spread operator and will add the new object with the old array
    //with the setSales function it will the sales value in useSate in file "SalesData.jsx"
    //In simple words, The object will appear soon after we add the value
    setSales(sales => [...sales, resData.sale]);
  }

  // to update a existing sale in DB
  const updateSales = async (id) => {
    const res = await fetch(`/sales/updateSales/${id}`, {
      method: 'PUT',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'content-Type': 'application/json'
      },
      body: JSON.stringify({
        product_name: productName,
        type: type,
        selling_price: sellingPrice,
        sold_at: soldAt,
        units_sold: unitsSold,
        unit: unit,
        date: date,
        added_by: addedBy
      }),
      credentials: 'include'
    });

    const resData = await res.json();
    console.log(resData);

    setSales(sales.filter(sale => sale._id !== id));
    setSales(sales => [...sales, resData.updated_sale]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (operation === "updateSales") {
      updateSales(updateItem._id);
    } else {
      addSales();
      setProductName("");
      setType("");
      setSellingPrice(0);
      setSoldAt(0);
      setUnitsSold(0);
      setUnit("");
      setDate("");
      setAddedBy("");
    }
  }

  return (
    <div className={formsCSS.container}>
      <form action="submit" method="post" onSubmit={handleSubmit}>

        <div className={formsCSS.formDiv}>
          <label>Product Name</label>
          <input type="text" placeholder='Enter the Product Name' className={formsCSS.input}
            value={productName}
            onChange={(e) => { setProductName(e.target.value) }}
          />
        </div>

        <div className={formsCSS.formDiv}>
          <label>Product Type</label>
          <input type="text" placeholder='Enter the Product Type' className={formsCSS.input}
            value={type}
            onChange={(e) => { setType(e.target.value) }}
          />
        </div>

        <div className={formsCSS.formDiv}>
          <label>Selling Price</label>
          <input type="number" placeholder='Enter the Selling Price' className={formsCSS.input}
            value={sellingPrice}
            onChange={(e) => { setSellingPrice(e.target.value) }} />
        </div>

        <div className={formsCSS.formDiv}>
          <label>Sold At</label>
          <input type="number" placeholder='Enter Sold At' className={formsCSS.input}
            value={soldAt}
            onChange={(e) => { setSoldAt(e.target.value) }} />
        </div>

        <div className={formsCSS.formDiv}>
          <label>Units Sold</label>
          <input type="number" placeholder='Enter the Number Of Units Sold' className={formsCSS.input}
            value={unitsSold}
            onChange={(e) => { setUnitsSold(e.target.value) }} />
        </div>

        <div className={formsCSS.formDiv}>
          <label>Unit</label>
          <input type="text" placeholder='Enter the Unit of Product' className={formsCSS.input}
            value={unit}
            onChange={(e) => { setUnit(e.target.value) }} />
        </div>

        <div className={formsCSS.formDiv}>
          <label>Date</label>
          <input type="date" placeholder='Enter the Date' className={formsCSS.input}
            value={date}
            onChange={(e) => { setDate(e.target.value) }} />
        </div>

        <div className={formsCSS.formDiv}>
          <label>Added By</label>
          <input type="text" placeholder='Enter the Employee Name' className={formsCSS.input}
            value={addedBy}
            onChange={(e) => { setAddedBy(e.target.value) }} />
        </div>

        <button className={formsCSS.formButton}>SUBMIT</button>

      </form>
    </div>
  )
}

export default SalesForm