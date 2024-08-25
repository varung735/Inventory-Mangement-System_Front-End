import React, { useEffect, useState } from 'react';
import Table from '../../props/Table';
import { getRequest } from '../../API/api';
import { routes_v_1 } from '../../API/routes';
import SnackBar from '../../components/SnackBar';

function Stock() {
  const [stocks, setStocks] = useState([]);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [viewSnackBar, setViewSnackBar] = useState(false);
  // const [trigger, setTrigger] = useState(0);
  const heading = ['Item Name', 'Quantity', 'Unit', 'Cost Price', 'Selling Price'];

  useEffect(() => {
    getStocks();
    // eslint-disable-next-line
  }, []);

  function snackBar() {
    setViewSnackBar(true);
    setTimeout(() => {
      setViewSnackBar(false);
    }, 8000);
  }

  async function getStocks() {
    const response = await getRequest(routes_v_1.stocks.getStocks);
    setSuccess(response.success);
    setMessage(response.message);
    setStocks(response.stocks);
    snackBar();
  }

  return (
    <div>
      { viewSnackBar && <SnackBar success={success} message={message} viewSnackBar={viewSnackBar} setViewSnackbar={setViewSnackBar} /> }
      <Table 
       tableheadings={heading}
       props={stocks}
       operations={[]}
       operationFunctions={[]}/>
    </div>
  )
}

export default Stock