import React, { useState } from 'react';
import { XLg } from 'react-bootstrap-icons';
import '../styles/balance_check.css'


type CustomerInfo = {
    name: string,
    balance: number
}

const BalanceCheck: React.FC<{
    balanceCheckActive: boolean,
    setBalanceCheckActive: (e: boolean) => void
}> = ({ balanceCheckActive, setBalanceCheckActive }) => {

    const [customerData, setCustomerData] = useState<CustomerInfo | null>(null);

    const checkBalance = (e: any) => {
        e.preventDefault();

        const payload = {
            customerNo: e.target.customerNo.value,
            pinCode: e.target.pinCode.value
        };

        console.log(payload);

        setCustomerData({
            name: 'Fatma Sönmez Gürsu',
            balance: 1950.85
        });
    }

    const handleClose = () => {
        setBalanceCheckActive(false);
    }

    return (
        <div className={`balance-check-cont ${balanceCheckActive ? 'active' : ''}`} onClick={() => handleClose()}>
            <form className='balance_check' onClick={(e) => e.stopPropagation()} onSubmit={(e) => checkBalance(e)}>
                <div className='bc-close' onClick={() => handleClose()}>
                    <XLg />
                </div>
                <h3>Kupon Sorgula</h3>
                <input type='text' name='customerNo' placeholder='Müşteri NO' />
                <input type='text' name='pinCode' placeholder='PIN Kodu' />
                <button type='submit'>Gönder</button>
                <span className={customerData ? 'active' : ''}>{customerData?.name}: <span className='positive'>{customerData?.balance} TL</span></span>
            </form>
        </div>
    )
}

export default BalanceCheck;