import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import dashboardCSS from '../styles/dashboard.module.css';
import stockCSS from '../styles/stocks.module.css';
import { deleteRequest, getRequest, patchRequest, postRequest } from '../API/api';
import { routes_v_1 } from '../API/routes';
import SnackBar from '../components/SnackBar';
import Modal from '../modals/Modal';
import StockDiv from '../components/stocks/StockDiv';

function StockDashboard() {
    const alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const [stock, setStock] = useState([{}]);
    const [searchText, setSearchText] = useState();
    const [alpha, setAlpha] = useState(alphabets[0]);
    const [trigger, setTrigger] = useState(0);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [viewSnackBar, setViewSnackBar] = useState(false);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        getRequest(`${routes_v_1.stocks.getByAlphabet}?alphabet=${alpha}`)
        .then(response => {console.log(response); setStock(response.stocks)})
        .catch(error => console.error(error));
    }, [alpha, trigger]);

    function snackBar() {
        setViewSnackBar(true);
        setTimeout(() => {
          setViewSnackBar(false);
        }, 8000);
    }

    function closeModal() {
        setModal(!modal);
    }

    async function searchStock() {
        const response = await getRequest(`${routes_v_1.stocks.searchStock}?term=${searchText}`);
        setSuccess(response.success);
        setMessage(response.message);
        setStock(response.stocks);
        snackBar();
    }

    async function addStock(stock) {
        const response = await postRequest(`${routes_v_1.stocks.addStock}`, stock);
        setSuccess(response.success);
        setMessage(response.message);
        snackBar();
        setTrigger(trigger + 1);
    }

    async function restockItem(id, quantity) {
        const response = await patchRequest(routes_v_1.stocks.restock, { 
            stockId: id,
            quantity: quantity
        });
        setSuccess(response.success);
        setMessage(response.message);
        snackBar();
    }

    async function deleteItem(id) {
        const response = await deleteRequest(routes_v_1.stocks.deleteStock, {
            stockId: id
        });
        console.log(id);
        setSuccess(response.success);
        setMessage(response.message);
        snackBar();
        setTrigger(trigger + 1);
    }

    function addActiveClass(index) {
        const activeDiv = document.querySelector(`.${stockCSS.active}`);

        if(activeDiv !== null) {
            activeDiv.classList.remove(`${stockCSS.active}`);
        }

        
        const div = document.getElementById(alphabets[index]);
        div.classList.add(`${stockCSS.active}`);
        
        setAlpha(div.id);
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
            <div className={stockCSS.container}>
                { viewSnackBar && <SnackBar success={success} message={message} viewSnackBar={viewSnackBar} setViewSnackbar={setViewSnackBar} /> }
                { modal && <Modal prop={'Stock'} closeModal={closeModal} operation={addStock}/> }
                {/* Search Bar */}
                <div className={stockCSS.searchDiv}>
                    <div className={stockCSS.searchBox}>
                        <input type="text" className={stockCSS.searchInput} 
                        placeholder='Enter the Search Text Here'
                        value={searchText}
                        onChange={(e) => {setSearchText(e.target.value)}}
                        />
                        <button className={stockCSS.searchButton} onClick={() => {searchStock()}}>Search</button>
                    </div>
                    <div className={stockCSS.addButtonDiv}>
                        <button className={stockCSS.addButton} onClick={() => {setModal(!modal)}}>Add Stock</button>
                    </div>
                </div>

                {/* Stocks */}
                <div className={stockCSS.stocks}>

                    {/* Pagination Tabs */}
                    <div className={stockCSS.pagination}>
                        { alphabets && alphabets.map((item, index) => {
                            if(item === 'A'){
                                return (
                                    <div key={index} id={item} className={`${stockCSS.alphabetsDiv} ${stockCSS.active}`} onClick={() => {addActiveClass(index)}}>
                                        <h1 className={stockCSS.alphabets}>{item}</h1>
                                    </div>
                                )
                            }
                            return (
                                <div key={index} id={item} className={stockCSS.alphabetsDiv} onClick={() => {addActiveClass(index)}}>
                                    <h1 className={stockCSS.alphabets}>{item}</h1>
                                </div>   
                            )
                        }) }
                    </div>

                    {/* Stock Cards */}
                    <div className={stockCSS.stockCards}>
                        { stock && stock.map((item) => {
                            return <StockDiv item={item} 
                                        restockItem={restockItem} 
                                        deleteItem={deleteItem} 
                                        trigger={trigger} 
                                        setTrigger={setTrigger}
                                    />
                        }) }
                    </div>

                </div>

            </div>

        </div>
    )
}

export default StockDashboard