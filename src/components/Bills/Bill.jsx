import React from 'react';
import Table from '../../props/Table';
import billCSS from '../../styles/bills.module.css';

function Bill({ items }) {
    const tableHeadings = ['Item Name', 'Quantity', 'Price', 'Total'];

    function printBill() {
        const printWindow = window.open('', '', 'height: 400px, width: 800px');
        const content = document.getElementById("bill").innerHTML;
        
        printWindow.document.open();
        printWindow.document.write(`
            <html>
            <head>
                <title>Print</title>
                <style>
                    body{ 
                        width: 400px;
                    }
                    table, th, td { 
                        width: 100%;
                        border: 1px solid #000;
                        border-collapse: collapse;
                    }
                    thead { border-bottom: 1px solid #000; }
                    tr { border-bottom: 1px solid #000; }
                    button { display: none; }
                    h1{ 
                        margin-bottom: 0;
                        font-size: 1rem;
                        font-weight: 300; 
                    }
                    .name-holder{
                        display: flex;
                        align-item: center;
                        justify-content: space-between;
                        border: 1px solid #000;
                    }
                </style>
                </head>
                <body>
                    <div class="name-holder">
                        <h1>XYZ Stores</h1>
                        <h1>+91 97653XXXXX</h1>
                    </div>
                    ${content}
                </body>
            </html>    
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        // window.print();
    }

    return (
        <div className={billCSS.printBillDiv} id='bill'>
            <Table
                tableheadings={tableHeadings}
                props={items} />
            <button style={{ width: 100 + '%' }} className={billCSS.custButton}
             onClick={() => {printBill()}}>Print</button>
        </div>
    )
}

export default Bill