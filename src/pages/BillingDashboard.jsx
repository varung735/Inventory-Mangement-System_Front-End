import React, { useEffect, useState } from 'react';
import dashboardCSS from '../styles/dashboard.module.css';
import billCSS from '../styles/bills.module.css';
import { Link } from 'react-router-dom';
import Table from '../props/Table';

function BillingDashboard() {
    const [modal, setModal] = useState(false);
    const [itemName, setItemName] = useState();
    const [quantity, setQuantity] = useState();
    const [item, setItem] = useState({
        itemId: '',
        price: 0
    });
    const [total, setTotal] = useState(0);
    const [completeTotal, setCompleteTotal] = useState(0);
    const [items, setItems] = useState([]);
    const [searchItems, setSearchItems] = useState([
        {
            _id: 1,
            name: 'biscuit',
            price: 250
        },
        {
            _id: 2,
            name: 'paneer',
            price: 100
        },
        {
            _id: 3,
            name: 'cream',
            price: 500
        }
    ]);
    const generateBillHeading = ['Item name', 'Quantity', 'price', 'total', 'edit', 'delete'];

    useEffect(() => {
        setTotal(quantity * item.price);
    }, [quantity, item.price]);

    function searchItem(searchTerm) {
        setSearchItems();
    }

    function selectItem(item) {
        setItemName(item.name);
        setItem({
            itemId: item._id,
            price: item.price
        });
        setQuantity(0);
    }

    function onQuantityChange(e) {
        setQuantity(Number(e.target.value));
    }

    function addItem() {
        setItems([
            ...items,
            {
                _id: item.itemId,
                item: itemName,
                quantity: quantity,
                price: item.price,
                total: total
            }
        ])
        
        setCompleteTotal(completeTotal + total);
        setItemName('');
        setItem({ itemId: '', price: 0 });
        setQuantity(0);
        setTotal(0);   
    }

    return (
        <div className={dashboardCSS.container}>

            {/* NavBar */}
            <div className={dashboardCSS.navbar}>
                <h1 className={dashboardCSS.navbarTitle}>Store Management System</h1>
                <div className={dashboardCSS.navbarLinks}>
                    <Link to='profile' className={dashboardCSS.navbarLink}>Profile</Link>
                    <Link to='/' className={dashboardCSS.navbarLink}>Logout</Link>
                </div>
            </div>

            {/* Main Content */}
            <div className={dashboardCSS.mainContent}>

                {/* Generate Bill */}
                <div className={billCSS.generateBillContainer}>
                    {/* Customer Details */}
                    <div className={billCSS.customerDetails}>
                        <h1 className={billCSS.custHeading}>Customer Details</h1>
                        <div className={billCSS.custFormHolder}>
                            <label htmlFor="" className={billCSS.custLabel}>Name</label>
                            <input type="text" className={billCSS.custInput} />
                        </div>
                        <div className={billCSS.custFormHolder}>
                            <label htmlFor="" className={billCSS.custLabel}>Phone</label>
                            <input type="text" className={billCSS.custInput} />
                        </div>
                    </div>
                    {/* Add Item */}
                    <div className={billCSS.addItems}>
                        <h1 className={billCSS.custHeading}>Add Items</h1>
                        <div className={billCSS.itemSearchHolder}>
                            <div className={billCSS.custFormHolder}>
                                <label htmlFor="item" className={billCSS.custLabel}>Item</label>
                                <input type="text" id="item" className={billCSS.custInput} value={itemName} 
                                onChange={(e) => {searchItem(e.target.value)}}/>
                            </div>
                            { searchItems && <div className={billCSS.searchDiv}>
                                {searchItems.map((item, index) => {
                                    return (
                                        <div key={index} className={billCSS.searchItemDiv} 
                                         onClick={() => {selectItem(item)}}>
                                            <h1 className={billCSS.searchItem}>{item.name}</h1>
                                        </div>
                                    );
                                })}
                            </div> }
                        </div>
                        <div className={billCSS.custFormHolder}>
                            <label htmlFor="item" className={billCSS.custLabel}>ItemId</label>
                            <input type="text" id="item" className={billCSS.custInput} value={item.itemId} disabled/>
                        </div>
                        <div className={billCSS.custFormHolder}>
                            <label htmlFor="quantity" className={billCSS.custLabel}>Quantity</label>
                            <input type="number" id="quantity" className={billCSS.custInput} value={quantity} 
                             onChange={(e) => {onQuantityChange(e)}}/>
                        </div>
                        <div className={billCSS.custFormHolder}>
                            <label htmlFor="quantity" className={billCSS.custLabel}>Price</label>
                            <input type="number" id="quantity" className={billCSS.custInput} value={item.price} disabled/>
                        </div>
                        <div className={billCSS.custFormHolder}>
                            <label htmlFor="quantity" className={billCSS.custLabel}>Total</label>
                            <input type="number" id="quantity" className={billCSS.custInput} value={total} disabled/>
                        </div>
                        <button className={billCSS.custButton} onClick={() => {addItem()}}>Add Items</button>
                        <button className={billCSS.custButton} onClick={() => {setModal(!modal)}}>Print Bill</button>
                        <button className={billCSS.custButton} onClick={() => {setModal(!modal)}}>Reject Bill</button>
                    </div>
                </div>

                {/* Generated Bills */}
                <div className={billCSS.generatedBillsTable}>
                    <div className={billCSS.billItems}>
                        <Table tableheadings={generateBillHeading} 
                            props={items}
                        />
                    </div>
                    <div className={billCSS.billTotal}>
                        <h1 className={billCSS.totalHeading}>Total: {completeTotal}</h1>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default BillingDashboard