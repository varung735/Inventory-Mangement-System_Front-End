import React from 'react';
import displayDataCSS from "../styles/displaydata.module.css";

function TableRow({ prop, deleteFunction, modal, setModal ,setOperation, setUpdateItem }) {
    const propValues = Object.values(prop);
    propValues.shift();
    propValues.pop();

    // const formatDate = (date) => {
    //     const formatedDate = new Date(date).toISOString().split('T')[0];
    //     return formatedDate;
    // }

    return (
        <tr id='data'>
            { propValues && propValues.map((item, index) => {
                return <td key={index} >{item}</td>
            }) }
            <td><button className={displayDataCSS.tabBtn} onClick={() => { setModal(!modal); setOperation("updateSales"); setUpdateItem(prop) }}>Update</button></td>
            <td><button className={displayDataCSS.tabBtn} onClick={() => { deleteFunction(prop._id) }}>Delete</button></td>
        </tr>
    )
}

export default TableRow