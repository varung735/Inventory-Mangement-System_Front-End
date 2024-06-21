import React from 'react';
import modalCSS from '../styles/modal.module.css';
import PurchasesForm from '../components/forms/PurchasesForm';
import SalesForm from '../components/forms/SalesForm';
import ExpensesForm from "../components/forms/ExpensesForm";
import InventoryForm from '../components/forms/InventoryForm';
import StocksForm from '../components/forms/StocksForm';
import EmployeeForm from '../components/forms/EmployeeForm';
import SalaryForm from '../components/forms/SalaryForm';
import LedgerForm from '../components/forms/LedgerForm';

function Modal({ prop, closeModal, propObject, setPropObject, operation, updateItem, empId, accountId }) {

    return (
        <div className={modalCSS.container}>
            <div className={modalCSS.modalBox}>
                
                <div className={modalCSS.header}>
                    <h1 className={modalCSS.title}>Add {prop}</h1>
                    <img src='/images/cross.svg' alt='cross-mark' className={modalCSS.crossBtn} onClick={() => closeModal()}/>
                </div>

                <div className={modalCSS.modalContent}>
                    {prop === "Sale" && <SalesForm sales={propObject} setSales={setPropObject} operation={operation} updateItem={updateItem} />}
                    {prop === "Purchase" && <PurchasesForm purchase={propObject} setPurchase={setPropObject} operation={operation} updateItem={updateItem} />}
                    {prop === "Expense" && <ExpensesForm expense={propObject} setExpense={setPropObject} operation={operation} updateItem={updateItem} />}
                    {prop === "Inventory" && <InventoryForm inventory={propObject} setInventory={setPropObject} operation={operation} updateItem={updateItem} />}
                    {prop === "Stock" && <StocksForm stock={propObject} setStock={setPropObject} operation={operation} updateItem={updateItem} />}
                    {prop === "Employee" && <EmployeeForm employee={propObject} setEmployee={setPropObject} operation={operation} updateItem={updateItem} />}
                    {prop === "Salary" && <SalaryForm salary={propObject} setSalary={setPropObject} operation={operation} updateItem={updateItem} empId={empId} />}
                    {prop === "Ledger" && <LedgerForm ledger={propObject} setLedger={setPropObject} operation={operation} updateItem={updateItem} accountId={accountId} />}
                </div>
            </div>
        </div>
    )
}

export default Modal