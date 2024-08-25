import React from 'react';
import modalCSS from '../styles/modal.module.css';
import StocksForm from '../components/stocks/StocksForm';
import Bill from '../components/Bills/Bill';

function Modal({ prop, items, closeModal, operation }) {

    return (
        <div className={modalCSS.container}>
            <div className={modalCSS.modalBox}>
                
                <div className={modalCSS.header}>
                    <h1 className={modalCSS.title}>Add {prop}</h1>
                    <img src='/images/cross.svg' alt='cross-mark' className={modalCSS.crossBtn} onClick={() => closeModal()}/>
                </div>

                <div className={modalCSS.modalContent}>
                    {prop === "Stock" && <StocksForm addStock={operation} />}
                    {prop === "Bill" && <Bill items={items} />}
                </div>
            </div>
        </div>
    )
}

export default Modal