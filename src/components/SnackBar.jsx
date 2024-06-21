import React from 'react';
import snackBarCss from '../styles/snackbar.module.css';

function SnackBar({ success, message, viewSnackBar, setViewSnackbar }) {
  return (
    <div style={success ? { backgroundColor: 'green' } : { backgroundColor: 'red' }} className={snackBarCss.body}>
        <div className={snackBarCss.container}>
            <h1 className={snackBarCss.message}>{message}</h1>
            <img src="/images/cross.svg" alt="cross" className={snackBarCss.cross} onClick={() => {setViewSnackbar(!viewSnackBar)}}/>
        </div>
    </div>
  )
}

export default SnackBar