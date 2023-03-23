import React, { useState, useEffect } from 'react';
import displayDataCSS from "../styles/displaydata.module.css";

function LedgerData() {

    const [ledger, setLedger] = useState(...[]);

    const getLedgers = async () => {

        const res = await fetch('/ledgers/getLedgers', {
            method: 'GET',
            dataType: 'json',
            headers: {
                'Accept': 'application/json',
                'content-Type': 'application/json'
            },
            credentials: 'include'
        });

        const resData = await res.json();
        // console.log(resData);

        setLedger(resData.ledgers);
    }

    useEffect(() => {
        getLedgers();
    }, []);

    return (
        <div className={displayDataCSS.container}>
            <div className={displayDataCSS.buttons}>
                <button className={displayDataCSS.button}>ADD ACCOUNT</button>
            </div>

            <div className={displayDataCSS.showData}>
                {ledger && ledger.map((ledger) => {
                    return <DataAccordion key={ledger._id} ledgersProp={ledger} />
                })}
            </div>
        </div>
    )
}

function DataAccordion({ ledgersProp }) {
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
                    <button className={displayDataCSS.accBtn}>Add Entry</button>
                    <button className={displayDataCSS.accBtn}>Delete Account</button>
                </div>
                <DataProp entriesProp={ ledgersProp.entries } />
            </div>}
        </div>
    );
}

function DataProp({ entriesProp }) {

    return (
        <div className={displayDataCSS.dataProp}>
            <table className={displayDataCSS.table}>
                <thead>
                    <tr>
                        <th>Date</th>
                        {/* <th>Description</th> */}
                        <th>Debit</th>
                        <th>Credit</th>
                        <th>Balance</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    { entriesProp && entriesProp.map((entry) => {
                        return <TableRowProp key={entry._id} entry={entry} />
                    }) }

                </tbody>
            </table>
        </div>
    );
}

function TableRowProp({ entry }) {
    return (
        <tr id='data'>
            <td>{entry.date}</td>
            {/* <td>{entry.description}</td> */}
            <td>{entry.debit}</td>
            <td>{entry.credit}</td>
            <td>{entry.balance}</td>
            <td><button className={displayDataCSS.tabBtn}>Update</button></td>
            <td><button className={displayDataCSS.tabBtn}>Delete</button></td>
        </tr>
    );
}

export default LedgerData