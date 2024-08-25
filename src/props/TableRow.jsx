import React from 'react';
import displayDataCSS from "../styles/displaydata.module.css";

function TableRow({ prop, operations, operationFunctions }) {
    const propValues = Object.values(prop);
    propValues.shift();
    // propValues.pop();

    // const formatDate = (date) => {
    //     const formatedDate = new Date(date).toISOString().split('T')[0];
    //     return formatedDate;
    // }

    return (
        <tr id='data'>
            { propValues && propValues.map((item, index) => {
                return <td key={index} >{item}</td>
            }) }
            { operations && operations.map((item, index) => {
                return(
                    <td key={index}>
                        <button className={displayDataCSS.tabBtn} onClick={() => { operationFunctions[index](prop._id) }}>{item}</button>
                    </td>   
                )
            }) }
        </tr>
    )
}

export default TableRow