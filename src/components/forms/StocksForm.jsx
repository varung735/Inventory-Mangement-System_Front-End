import React from 'react';
import formsCSS from '../../styles/form.module.css';

function StocksForm() {
  return (
    <div className={formsCSS.container}>
      <form action="submit" method="post">

        <div className={formsCSS.formDiv}>
          <label>Stock Name</label>
          <input type="text" placeholder='Enter the Stock Name' className={formsCSS.input} />
        </div>

        <div className={formsCSS.formDiv}>
          <label>Category</label>
          <input type="text" placeholder='Enter the Category' className={formsCSS.input} />
        </div>

        <div className={formsCSS.formDiv}>
          <label>Cost</label>
          <input type="number" placeholder='Enter the Cost' className={formsCSS.input} />
        </div>

        <div className={formsCSS.formDiv}>
          <label>Available</label>
          <input type="number" placeholder='Enter the Unit' className={formsCSS.input} />
        </div>

        <div className={formsCSS.formDiv}>
          <label>Unit</label>
          <input type="text" placeholder='Enter the Unit' className={formsCSS.input} />
        </div>

        <div className={formsCSS.formDiv}>
          <label>Date</label>
          <input type="date" placeholder='Enter the Unit' className={formsCSS.input} />
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

export default StocksForm