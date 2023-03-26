import React from 'react';
import formsCSS from '../../styles/form.module.css';

function ExpensesForm() {
  return (
    <div className={formsCSS.container}>
      <form action="submit" method="post">

        <div className={formsCSS.formDiv}>
          <label>Expense Name</label>
          <input type="text" placeholder='Enter the Expense Name' className={formsCSS.input} />
        </div>

        <div className={formsCSS.formDiv}>
          <label>Expense Type</label>
          <input type="text" placeholder='Enter the Expense Type' className={formsCSS.input} />
        </div>

        <div className={formsCSS.formDiv}>
          <label>Paid To</label>
          <input type="text" placeholder='Enter the Company Name' className={formsCSS.input} />
        </div>

        <div className={formsCSS.formDiv}>
          <label>Amount</label>
          <input type="number" placeholder='Enter the Expense Amount' className={formsCSS.input} />
        </div>

        {/* <div className={formsCSS.formDiv}>
          <label>Date</label>
          <input type="date" placeholder='Enter the Date' className={formsCSS.input} />
        </div> */}

        <div className={formsCSS.formDiv}>
          <label>Added By</label>
          <input type="text" placeholder='Enter the Employee Name' className={formsCSS.input} />
        </div>

        <button className={formsCSS.formButton}>SUBMIT</button>

      </form>
    </div>
  )
}

export default ExpensesForm