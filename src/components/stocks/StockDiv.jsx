import React, { useState } from 'react';
import stockCSS from '../../styles/stocks.module.css';

function StockDiv({ item, restockItem, deleteItem, trigger, setTrigger }) {
    const [viewRestockForm, setViewRestockForm] = useState(false);
    const [quantity, setQuantity] = useState();

    async function reStock(id, quantity) {
        await restockItem(id, quantity);
        setTrigger(trigger + 1);
        setViewRestockForm(!viewRestockForm);
        setQuantity(0);
    }

    return (
        <div className={stockCSS.stockCard}>
            <h1 className={stockCSS.stockName}>{item.item_name}</h1>
            <p className={stockCSS.stockText}>quantity: {item.quantity} {item.unit}</p>
            <div className={stockCSS.stockForm}>
                { viewRestockForm && <div className={stockCSS.reStockForm}>
                    <input type="number" className={stockCSS.searchInput} value={quantity} onChange={(e) => {setQuantity(e.target.value)}}/>
                    <button className={stockCSS.stockButton} onClick={() => {reStock(item._id, quantity)}}>Add</button>
                </div> }
                <div className={stockCSS.stockButtons}>
                    <button className={stockCSS.stockButton} onClick={() => { setViewRestockForm(!viewRestockForm) }}>Restock</button>
                    <button className={stockCSS.stockButton} onClick={() => { deleteItem(item._id) }}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default StockDiv