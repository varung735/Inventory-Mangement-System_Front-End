import React, { useState } from 'react';
import displayDataCSS from "../styles/displaydata.module.css";

function LedgerData() {
    return (
        <div className={displayDataCSS.container}>
            <div className={displayDataCSS.buttons}>
                <button className={displayDataCSS.button}>ADD ACCOUNT</button>
            </div>

            <div className={displayDataCSS.showData}>
                <DataAccordion />
            </div>
        </div>
    )
}

function DataAccordion() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={displayDataCSS.accordion}>
            <div className={displayDataCSS.accordionName} onClick={() => {setIsOpen(!isOpen)}}>
                <h1 className={displayDataCSS.accTitle}>Account_Name</h1>
                {isOpen ? <img src="/images/minus.svg" alt="minus.svg" className={displayDataCSS.accIcon} /> : 
                    <img src="/images/plus.svg" alt="plus.svg" className={displayDataCSS.accIcon} />
                }
            </div>
            {isOpen && <div className={displayDataCSS.accordionData}>
                <div className={displayDataCSS.accBtns}>
                    <button className={displayDataCSS.accBtn}>Add Entry</button>
                    <button className={displayDataCSS.accBtn}>Export Data</button>
                </div>
                <DataProp />
            </div>}
        </div>
    );
}

function DataProp() {
    return (
        <div className={displayDataCSS.dataProp}>
            <table className={displayDataCSS.table}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Voucher No.</th>
                        <th>Debit</th>
                        <th>Credit</th>
                        <th>Balance</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr id='data'>
                        <td>12 Aug 2023</td>
                        <td>Cash</td>
                        <td>V-1410</td>
                        <td>16000</td>
                        <td>8000</td>
                        <td>8000</td>
                        <td><button className={displayDataCSS.tabBtn}>Update</button></td>
                        <td><button className={displayDataCSS.tabBtn}>Delete</button></td>
                    </tr>
                    <tr id='data'>
                        <td>12 Aug 2023</td>
                        <td>Cash</td>
                        <td>V-1410</td>
                        <td>0</td>
                        <td>2000</td>
                        <td>6000</td>
                        <td><button className={displayDataCSS.tabBtn}>Update</button></td>
                        <td><button className={displayDataCSS.tabBtn}>Delete</button></td>
                    </tr>
                    <tr id='data'>
                        <td>12 Aug 2023</td>
                        <td>Cash</td>
                        <td>V-1411</td>
                        <td>2000</td>
                        <td>4000</td>
                        <td>4000</td>
                        <td><button className={displayDataCSS.tabBtn}>Update</button></td>
                        <td><button className={displayDataCSS.tabBtn}>Delete</button></td>
                    </tr>
                    
                </tbody>
            </table>
        </div>
    );
}

export default LedgerData