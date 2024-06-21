import React, { useState, useEffect } from 'react';
import displayDataCSS from "../styles/displaydata.module.css";
import Modal from '../modals/Modal';
import Table from '../props/Table';
import { deleteRequest, getRequest } from '../API/api';

function SalesData() {

  const [sales, setSales] = useState(...[]);
  const [modal, setModal] = useState(false);
  const [operation, setOperation] = useState(""); 
  const [updateItem, setUpdateItem] = useState(...[]); //sales item which is to be updated in DB
  const headings = ['Product Name','Type', 'Selling Price', 'Sold At', 'Units Sold', 'Unit', 'Added On', 'Added By', 'Update', 'Delete'];

  const closeModal = () => {
    setModal(!modal);
  }

  const getSales = async () => {

    const salesData = await getRequest('sales/getSales');
    setSales(salesData.sales);
  }

  const deleteSales = async (id) => {

    await deleteRequest(`sales/deleteSales/${id}`);

    setSales(sales.filter(sale => sale._id !== id));
    alert("sale deleted successfully.");
  }

  useEffect(() => {
    getSales();
  }, []);


  return (
    <div className={displayDataCSS.container}>
      <div className={displayDataCSS.buttons}>
        <button className={displayDataCSS.button} onClick={() => {setModal(!modal); setOperation("addSales"); setUpdateItem({})}}>ADD SALES</button>
      </div>

      <div className={displayDataCSS.showData}>
        <Table tableheadings={headings} props={sales} deleteFunction={deleteSales} modal={modal} setModal={setModal} setOperation={setOperation} setUpdateItem={setUpdateItem}/>
        {modal && <Modal prop={'Sale'} closeModal={closeModal} propObject={sales} setPropObject={setSales} operation={operation} updateItem={updateItem}/>}
      </div>
    </div>
  )
}

export default SalesData