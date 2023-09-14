import React from 'react';



const CMS_LOGIN = () => {

    return (
        <div className='cms-login-cont'>
            <h3>Panel Giriş</h3>
            <form className='cms-login-form' onSubmit={() => { }}>
                <div className="form_inputs">
                    <input type='text' placeholder='Admin Adı' />
                    <input type='password' placeholder='Şifre' />
                </div>
                <button type='submit'>Giriş</button>
            </form>
        </div>
    )
}

export default CMS_LOGIN;