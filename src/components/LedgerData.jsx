import React, { useState, useEffect } from 'react';
import displayDataCSS from "../styles/displaydata.module.css";
import Modal from './Modal';
import Cookies from "js-cookie";

function LedgerData() {

    const [ledger, setLedger] = useState(...[]);
    const [modal, setModal] = useState(false);
    const [operation, setOperation] = useState("");
    const [updateItem, setUpdateItem] = useState(...[]);
    const [accountId, setAccountId] = useState("");

    const closeModal = () => {
        setModal(!modal);
    }

    const getLedgers = async () => {

        const res = await fetch('https://ims-backend-3u4x.onrender.com/ledgers/getLedgers', {
            method: 'GET',
            dataType: 'json',
            headers: {
                'Accept': 'application/json',
                'content-Type': 'application/json',
                'token': Cookies.get('token')
            },
            credentials: 'include'
        });

        const resData = await res.json();
        // console.log(resData);

        setLedger(resData.ledgers);
    }

    //function to delete the complete ledger account from DB
    const deleteLedger = async (id) => {
        const res = await fetch(`https://ims-backend-3u4x.onrender.com/ledgers/deleteLedgers/${id}`, {
            method: 'DELETE',
            dataType: 'json',
            headers: {
                'Accept': 'application/json',
                'content-Type': 'application/json',
                'token': Cookies.get('token')
            },
            credentials: 'include'
        });

        const resData = await res.json();
        console.log(resData);

        alert("deleted ledger successfully.");
    }

    //function to delete a single entry inside a ledger account
    const deleteEntry = async (id, entryId) => {
        const res = await fetch('https://ims-backend-3u4x.onrender.com/entries/deleteEntry', {
            method: 'DELETE',
            dataType: 'json',
            headers: {
                'Accept': 'application/json',
                'content-Type': 'application/json',
                'token': Cookies.get('token')
            },
            body: {
                accoount_id: id,
                entry_id: entryId
            },
            credentials: true
        });

        const resData = await res.json();
        console.log(resData);

        alert("deleted entry successfully.");
    }

    useEffect(() => {
        getLedgers();
    }, [ledger]);

    return (
        <div className={displayDataCSS.container}>
            <div className={displayDataCSS.buttons}>
                <button className={displayDataCSS.button} onClick={() => {setModal(!modal); setOperation("addAccount"); setUpdateItem({})}}>ADD ACCOUNT</button>
            </div>

            <div className={displayDataCSS.showData}>
                {ledger && ledger.map((ledger) => {
                    return <DataAccordion key={ledger._id} deleteLedger={deleteLedger} deleteEntry={deleteEntry} ledgersProp={ledger} modal={modal} setModal={setModal} 
                    setOperation={setOperation} setUpdateItem={setUpdateItem} setAccountId={setAccountId}/>
                })}
                {modal && <Modal prop={'Ledger'} closeModal={closeModal} propObject={ledger} setPropObject={setLedger} operation={operation} updateItem={updateItem} accountId={accountId}/>}
            </div>
        </div>
    )
}

function DataAccordion({ ledgersProp, deleteLedger, deleteEntry, modal, setModal, setOperation, setUpdateItem, setAccountId }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={displayDataCSS.accordion}>
            <div className={displayDataCSS.accordionName} onClick={() => { setIsOpen(!isOpen) }}>
                <h1 className={displayDataCSS.accTitle}>{ledgersProp.account_of}</h1>
                {isOpen ? <img src="/images/minus.svg" alt="minus.svg" className={displayDataCSS.accIcon} /> :
                    <img src="/images/plus.svg" alt="plus.svg" className={displayDataCSS.accIcon} />
                }
            </div>
            {isOpen && <div className={displayDataCSS.accordionData}>
                <div className={displayDataCSS.accBtns}>
                    <button className={displayDataCSS.accBtn} onClick={() => {setModal(!modal); setOperation("addEntry"); setUpdateItem({}); setAccountId(ledgersProp._id)}}>Add Entry</button>
                    <button className={displayDataCSS.accBtn} onClick={() => {deleteLedger(ledgersProp._id)}}>Delete Account</button>
                </div>
                <DataProp entriesProp={ledgersProp.entries} deleteEntry={deleteEntry} modal={modal} setModal={setModal} setOperation={setOperation} 
                setUpdateItem={setUpdateItem} accId={ledgersProp._id} setAccountId={setAccountId}/>
            </div>}
        </div>
    );
}

function DataProp({ entriesProp, deleteEntry, modal, setModal, setOperation, setUpdateItem, accId, setAccountId }) {

    return (
        <div className={displayDataCSS.dataProp}>
            <table className={displayDataCSS.table}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Debit</th>
                        <th>Credit</th>
                        <th>Balance</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {entriesProp && entriesProp.map((entry) => {
                        return <TableRowProp key={entry._id} entry={entry} deleteEntry={deleteEntry} modal={modal} setModal={setModal} setOperation={setOperation} 
                        setUpdateItem={setUpdateItem} accId={accId} setAccountId={setAccountId} />
                    })}

                </tbody>
            </table>
        </div>
    );
}

function TableRowProp({ entry, modal, deleteEntry, setModal, setOperation, setUpdateItem, accId, setAccountId }) {

    const formatDate = (date) => {
        const formatedDate = new Date(date).toLocaleDateString();
        return formatedDate;
    }

    return (
        <tr id='data'>
            <td>{formatDate(entry.date)}</td>
            <td>{entry.description}</td>
            <td>{entry.debit}</td>
            <td>{entry.credit}</td>
            <td>{entry.balance}</td>
            <td><button className={displayDataCSS.tabBtn} onClick={() => {setModal(!modal); setOperation("updateEntry"); setUpdateItem(entry); setAccountId(accId)}}>Update</button></td>
            <td><button className={displayDataCSS.tabBtn} onClick={() => {deleteEntry(accId, entry._id)}}>Delete</button></td>
        </tr>
    );
}

export default LedgerData