import React from 'react';
import displayDataCSS from "../styles/displaydata.module.css";

function PurchaseData() {

  return (
    <div className={displayDataCSS.container}>
        <div className={displayDataCSS.buttons}>
            <button className={displayDataCSS.button}>Add Purchase</button>
        </div>

        <div className={displayDataCSS.showData}>
            <DataProp />
        </div>
    </div>
  )
}

function DataProp() {
  return(
    <div>Data Prop</div>
  );
}

export default PurchaseData