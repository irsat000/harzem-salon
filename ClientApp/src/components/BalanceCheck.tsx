import React from 'react';
import { XLg } from 'react-bootstrap-icons';


const BalanceCheck: React.FC<{
    balanceCheckActive: boolean,
    setBalanceCheckActive: (e: boolean) => void
}> = ({ balanceCheckActive, setBalanceCheckActive }) => {

    const checkBalance = (e: any) => {
        e.preventDefault();

        const payload = {
            customerNo: e.target.customerNo.value,
            pinCode: e.target.pinCode.value
        }

        console.log(payload);
    }

    const handleClose = () => {
        setBalanceCheckActive(false)
    }

    return (
        <div className={`balance_check-cont ${balanceCheckActive ? 'active' : ''}`} onClick={() => handleClose()}>
            <form className='balance_check' onClick={(e) => e.stopPropagation()} onSubmit={(e) => checkBalance(e)}>
                <div className='bc-close' onClick={() => handleClose()}>
                    <XLg />
                </div>
                <h3>Kupon Sorgula</h3>
                <input type='text' name='customerNo' placeholder='Müşteri NO' />
                <input type='text' name='pinCode' placeholder='PIN Kodu' />
                <button type='submit'>Gönder</button>
                <span>Fatma Sönmez Başak: <span className='positive'>1850.50 TL</span></span>
            </form>
        </div>
    )
}

export default BalanceCheck;