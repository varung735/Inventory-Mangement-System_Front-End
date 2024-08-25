import React, { useEffect, useState } from 'react';
import dashboardCSS from '../styles/dashboard.module.css';
import billCSS from '../styles/bills.module.css';
import { Link } from 'react-router-dom';
import Table from '../props/Table';
import Modal from '../modals/Modal';
import { getRequest, postRequest } from '../API/api';
import { routes_v_1 } from '../API/routes';
import SnackBar from '../components/SnackBar';

function BillingDashboard() {
    const [modal, setModal] = useState(false);
    const [custName, setCustName] = useState("");
    const [custPhone, setCustPhone] = useState();
    const [itemName, setItemName] = useState();
    const [quantity, setQuantity] = useState();
    const [item, setItem] = useState({
        itemId: '',
        price: 0
    });
    const [total, setTotal] = useState(0);
    const [completeTotal, setCompleteTotal] = useState(0);
    const [items, setItems] = useState([]);
    const [searchItems, setSearchItems] = useState([]);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [viewSnackBar, setViewSnackBar] = useState(false);
    const generateBillHeading = ['Item name', 'Quantity', 'price', 'total', 'delete'];

    useEffect(() => {
        setTotal(quantity * item.price);
    }, [quantity, item.price]);

    function snackBar() {
        setViewSnackBar(true);
        setTimeout(() => {
          setViewSnackBar(false);
        }, 8000);
    }

    function closeModal() {
        setModal(!modal);
    }

    async function searchItem(searchTerm) {
        const response = await getRequest(`${routes_v_1.stocks.searchStock}?term=${searchTerm}`);
        setSearchItems(response.stocks);
    }

    function selectItem(item) {
        setItemName(item.item_name);
        setItem({
            itemId: item._id,
            price: item.selling_price
        });
        setQuantity();
    }

    function onQuantityChange(e) {
        setQuantity(Number(e.target.value));
    }

    function addItem() {
        if(quantity !== 0 || itemName !== ""){
            setItems([
                ...items,
                {
                    _id: item.itemId,
                    item: itemName,
                    quantity: quantity,
                    price: item.price,
                    total: total
                }
            ]);
            
            setCompleteTotal(completeTotal + total);
            setItemName('');
            setItem({ itemId: '', price: 0 });
            setQuantity(0);
            setTotal(0);
        }
    }

    function deleteItem(id) {
        let foundItem = items.find(item => item._id === id)
        setCompleteTotal(completeTotal - foundItem.total);
        setItems(items.filter(item => item._id !== id));
    }

    async function printBill() {
        if(custName !== "" || custName !== null || custPhone.length === 10 || custPhone !== 0){
            setModal(true);
            const itemArray = items.map(({ _id, quantity }) => { return { stock_item_id: _id, quantity } });
            const response = await postRequest(routes_v_1.bills.generate, {
                custName,
                custPhone,
                items: itemArray,
                amount: completeTotal
            });
    
            setSuccess(response.success);
            setMessage(response.message);
            snackBar();
        }
    }

    function rejectBill() {
        setItems([]);
        setCompleteTotal(0);
        setCustName("");
        setCustPhone(0);
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
                { modal && <Modal prop={"Bill"} items={items} closeModal={closeModal} /> }
                { viewSnackBar && <SnackBar success={success} message={message} viewSnackBar={viewSnackBar} setViewSnackbar={setViewSnackBar} /> }
                {/* Generate Bill */}
                <div className={billCSS.generateBillContainer}>
                    {/* Customer Details */}
                    <div className={billCSS.customerDetails}>
                        <h1 className={billCSS.custHeading}>Customer Details</h1>
                        <div className={billCSS.custFormHolder}>
                            <label htmlFor="" className={billCSS.custLabel}>Name</label>
                            <input type="text" className={billCSS.custInput} value={custName} 
                             onChange={(e) => {setCustName(e.target.value)}} />
                        </div>
                        <div className={billCSS.custFormHolder}>
                            <label htmlFor="" className={billCSS.custLabel}>Phone</label>
                            <input type="text" className={billCSS.custInput} value={custPhone}
                             onChange={(e) => {setCustPhone(e.target.value)}} />
                        </div>
                    </div>
                    {/* Add Item */}
                    <div className={billCSS.addItems}>
                        <h1 className={billCSS.custHeading}>Add Items</h1>
                        <div className={billCSS.itemSearchHolder}>
                            <div className={billCSS.custFormHolder}>
                                <label htmlFor="item" className={billCSS.custLabel}>Item</label>
                                <input type="text" id="item" className={billCSS.custInput} value={itemName} 
                                onChange={(e) => {searchItem(e.target.value); setItem(e.target.value)}} />
                            </div>
                            { searchItems && <div className={billCSS.searchDiv}>
                                {searchItems.map((item) => {
                                    return (
                                        <div key={item._id} className={billCSS.searchItemDiv} 
                                         onClick={() => {selectItem(item)}}>
                                            <h1 className={billCSS.searchItem}>{item.item_name}</h1>
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
                        <button className={billCSS.custButton} onClick={() => {printBill()}}>Print Bill</button>
                        <button className={billCSS.custButton} onClick={() => {rejectBill()}}>Reject Bill</button>
                    </div>
                </div>

                {/* Generated Bills */}
                <div className={billCSS.generatedBillsTable}>
                    <div className={billCSS.billItems}>
                        <Table tableheadings={generateBillHeading} 
                            props={items}
                            operations={['Delete']}
                            operationFunctions={[deleteItem]}
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