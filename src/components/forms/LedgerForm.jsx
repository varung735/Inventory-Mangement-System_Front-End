import React, { useState } from 'react';
import formsCSS from '../../styles/form.module.css';
import Cookies from 'js-cookie'

function LedgerForm({ ledger, setLedger, operation, updateItem, accountId }) {

  const formatDate = (date) => {
    if(date != null) {
      const formatedDate = new Date(date).toISOString().split('T')[0];
      return formatedDate;
    }
  }

  const [accountName, setAccountName] = useState(updateItem.account_of || "");
  const [date, setDate] = useState(formatDate(updateItem.date) || "");
  const [description, setDescription] = useState(updateItem.description || "");
  const [debit, setDebit] = useState(updateItem.debit || 0);
  const [credit, setCredit] = useState(updateItem.credit || 0);
  const [balance, setBalance] = useState(updateItem.balance || 0);

  //function to add ledger account to DB
  const addAccount = async () => {
    const res = await fetch('https://ims-backend-3u4x.onrender.com/ledgers/addLedgers', {
      method: 'POST',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'content-Type': 'application/json',
        'token': Cookies.get('token')
      },
      body: JSON.stringify({
        account_of: accountName,
        entries: [{
          date: date,
          description: description,
          debit: debit,
          credit: credit,
          balance: balance
        }]
      }),
      credentials: 'include'
    });

    const resData = await res.json();
    console.log(resData);

    alert("added account successfully.");
  }

  //function to add an entry inside ledger account
  const addEntry = async () => {
    const res = await fetch('https://ims-backend-3u4x.onrender.com/entries/addEntry', {
      method: 'POST',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'content-Type': 'application/json',
        'token': Cookies.get('token')
      },
      body: JSON.stringify({
        account_id: accountId,
        date: date,
        description: description,
        debit: debit,
        credit: credit,
        balance: balance
      }),
      credentials: 'include'
    });

    const resData = await res.json();
    console.log(resData);

    alert("added entry successfully.");
  }

  //function to update an entry inside ledger account
  const updateEntry = async (entryId) => {
    const res = await fetch('/entries/updateEntry', {
      method: 'PUT',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'content-Type': 'application/json',
        'token': Cookies.get('token')
      },
      body: JSON.stringify({
        account_id: accountId,
        entry_id: entryId,
        date: date,
        description: description,
        debit: debit,
        credit: credit,
        balance: balance
      }),
      credentials: 'include'
    });

    const resData = await res.json();
    console.log(resData);

    alert("updated entry successfully.");
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(operation === "addEntry"){
      addEntry();
      setDate("");
      setDescription("");
      setDebit(0);
      setCredit(0);
      setBalance(0);
    }
    else if(operation === "updateEntry"){
      updateEntry(updateItem._id);
    }
    else{
      addAccount();
      setAccountName("");
      setDate("");
      setDescription("");
      setDebit(0);
      setCredit(0);
      setBalance(0);
    }

  }

  return (
    <div className={formsCSS.container}>
      <form action="submit" method="post" onSubmit={handleSubmit}>

        { operation === "addAccount" && <div className={formsCSS.formDiv}>
          <label>Account Name</label>
          <input type="text" placeholder='Enter Account Name' className={formsCSS.input}
           value={accountName} onChange={(e) => setAccountName(e.target.value)}/>
        </div>}

        <div className={formsCSS.formDiv}>
          <label>Date</label>
          <input type="date" placeholder='Enter the Entry Date' className={formsCSS.input}
           value={date} onChange={(e) => setDate(e.target.value)}/>
        </div>
        
        <div className={formsCSS.formDiv}>
          <label>Description</label>
          <input type="text" placeholder='Enter the Entry Description' className={formsCSS.input}
           value={description} onChange={(e) => setDescription(e.target.value)}/>
        </div>
        
        <div className={formsCSS.formDiv}>
          <label>Debit</label>
          <input type="number" placeholder='Enter the Debit' className={formsCSS.input}
           value={debit} onChange={(e) => setDebit(e.target.value)}/>
        </div>
        
        <div className={formsCSS.formDiv}>
          <label>Credit</label>
          <input type="number" placeholder='Enter the Credit' className={formsCSS.input}
           value={credit} onChange={(e) => setCredit(e.target.value)}/>
        </div>
        
        <div className={formsCSS.formDiv}>
          <label>Balance</label>
          <input type="number" placeholder='Enter the Balance' className={formsCSS.input}
           value={balance} onChange={(e) => setBalance(e.target.value)}/>
        </div>

        <button className={formsCSS.formButton}>SUBMIT</button>

      </form>
    </div>
  )
}

export default LedgerForm