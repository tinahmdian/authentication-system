'use client'
import React from 'react'
import {useMessage} from "@/context/messageContext";
import {useEffect} from "react";
import {toast, ToastContainer} from "react-toastify";

function Alerts(){
    const {message,setMessage,typeMessage}=useMessage()
    useEffect(() => {
        if (message!==null){
            toast(  <div style={{ fontFamily: 'iranSans', fontSize: '0.998rem' }}>{message}</div>as React.ReactNode, {type:typeMessage,});
            setMessage(null)
        }
    }, [message]);

    return (
        <div
            style={{fontFamily:'iranSans'}}>
            {/*<button onClick={notify}>Notify!</button>*/}
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                // className={'toastify-font'}
                rtl
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    );
}
export default Alerts;