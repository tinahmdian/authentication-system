import React, {useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
interface props{
    message:string,
    typeMessage:'success' | 'error' | 'warning' | 'info',
    setMessage:React.Dispatch<React.SetStateAction<string>>
}
function Alerts({message,typeMessage,setMessage}:props){
    useEffect(() => {
        if (message!==null){
            toast(  <div style={{ fontFamily: 'iranYeken', fontSize: '0.998rem' }}>
                {message}
            </div>, {type:typeMessage,});
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