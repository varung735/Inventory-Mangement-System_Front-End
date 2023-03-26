import React from 'react';
import formsCSS from '../../styles/form.module.css';

function PurchasesForm() {
  return (
    <div className={formsCSS.container}>
      <form action="submit" method="post">

        <div className={formsCSS.formDiv}>
          <label>Purchase Name</label>
          <input type="text" placeholder='Enter the Purchase Name' className={formsCSS.input} />
        </div>

        <div className={formsCSS.formDiv}>
          <label>Purchase Type</label>
          <input type="text" placeholder='Enter the Product Type' className={formsCSS.input} />
        </div>

        <div className={formsCSS.formDiv}>
          <label>Amount</label>
          <input type="number" placeholder='Enter the Purchase Amount' className={formsCSS.input} />
        </div>

        <div className={formsCSS.formDiv}>
          <label>Quantity</label>
          <input type="number" placeholder='Enter the quantity' className={formsCSS.input} />
        </div>

        <div className={formsCSS.formDiv}>
          <label>Unit</label>
          <input type="text" placeholder='Enter the Unit' className={formsCSS.input} />
        </div>

        <div className={formsCSS.formDiv}>
          <label>Purchased From</label>
          <input type="text" placeholder='Enter the Name of the Company' className={formsCSS.input} />
        </div>

        <div className={formsCSS.formDiv}>
          <label>Date</label>
          <input type="date" placeholder='Enter the Date' className={formsCSS.input} />
        </div>

        <div className={formsCSS.formDiv}>
          <label>Added By</label>
          <input type="text" placeholder='Enter the Employee Name' className={formsCSS.input} />
        </div>

        <button className={formsCSS.formButton}>SUBMIT</button>

      </form>
    </div>
  )
}

export default PurchasesForm