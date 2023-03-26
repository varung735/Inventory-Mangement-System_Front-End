import React from 'react';
import formsCSS from '../../styles/form.module.css';

function InventoryForm() {
  return (
    <div className={formsCSS.container}>
      <form action="submit" method="post">

        <div className={formsCSS.formDiv}>
          <label>Inventory Name</label>
          <input type="text" placeholder='Enter the Expense Name' className={formsCSS.input} />
        </div>

        <div className={formsCSS.formDiv}>
          <label>Inventory Type</label>
          <input type="text" placeholder='Enter the Expense Type' className={formsCSS.input} />
        </div>

        <div className={formsCSS.formDiv}>
          <label>Quantity</label>
          <input type="text" placeholder='Enter the Quantity' className={formsCSS.input} />
        </div>

        <div className={formsCSS.formDiv}>
          <label>Unit</label>
          <input type="number" placeholder='Enter the Unit' className={formsCSS.input} />
        </div>

        <div className={formsCSS.formDiv}>
          <label>Added By</label>
          <input type="text" placeholder='Enter the Employee Name' className={formsCSS.input} />
        </div>

        {/* <div className={formsCSS.formDiv}>
          <label>Date</label>
          <input type="date" placeholder='Enter the Date' className={formsCSS.input} />
        </div> */}

        <button className={formsCSS.formButton}>SUBMIT</button>

      </form>
    </div>
  )
}

export default InventoryForm