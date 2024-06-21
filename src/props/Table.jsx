import React from 'react';
import displayDataCSS from "../styles/displaydata.module.css";
import TableRow from "./TableRow";

function Table({ tableheadings, props, deleteFunction, modal, setModal, setOperation, setUpdateItem }) {
  return (
    <div className={displayDataCSS.dataProp}>
      <table className={displayDataCSS.table}>
        <thead>
          <tr>
            { tableheadings && tableheadings.map((item, index) => {
                return <th key={index}>{item}</th>
            }) }
          </tr>
        </thead>
        <tbody>
          {props && props.map((item) => {
            return <TableRow key={item._id} prop={item} deleteFunction={deleteFunction} modal={modal} setModal={setModal} setOperation={setOperation} setUpdateItem={setUpdateItem}/>
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Table;