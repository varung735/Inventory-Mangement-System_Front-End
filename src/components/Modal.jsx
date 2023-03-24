import React from 'react';
import modalCSS from '../styles/modal.module.css';
import PurchasesForm from './forms/PurchasesForm';
import SalesForm from './forms/SalesForm';
import ExpensesForm from "./forms/ExpensesForm";
import InventoryForm from './forms/InventoryForm';
import StocksForm from './forms/StocksForm';
import EmployeeForm from './forms/EmployeeForm';
import SalaryForm from './forms/SalaryForm';
import LedgerForm from './forms/LedgerForm';

function Modal({ prop, closeModal }) {
    return (
        <div className={modalCSS.container}>
            <div className={modalCSS.modalBox}>
                
                <div className={modalCSS.header}>
                    <h1 className={modalCSS.title}>Add {prop}</h1>
                    <img src='/images/cross.svg' alt='cross-mark' className={modalCSS.crossBtn} onClick={() => closeModal()}/>
                </div>

                <div className={modalCSS.modalContent}>
                    {prop === "Sale" && <SalesForm />}
                    {prop === "Purchase" && <PurchasesForm />}
                    {prop === "Expense" && <ExpensesForm />}
                    {prop === "Inventory" && <InventoryForm />}
                    {prop === "Stock" && <StocksForm />}
                    {prop === "Employee" && <EmployeeForm />}
                    {prop === "Salary" && <SalaryForm />}
                    {prop === "Ledger" && <LedgerForm />}
                </div>
            </div>
        </div>
    )
}

export default Modal