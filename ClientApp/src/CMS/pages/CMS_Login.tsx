import React, { useEffect, useState } from 'react';
import { checkAdmin, loginAdmin } from '../utility/authUtils';
import { useNavigate } from 'react-router-dom';
import { apiLink } from '../../utility/utils';

const CMS_LOGIN = () => {
    const navigate = useNavigate();
    useEffect(() => {
        // Check admin session
        if (checkAdmin()) {
            navigate("/panel");
        }
    }, [navigate]);

    // Form data manager
    const [formData, setFormData] = useState({
        adminName: '',
        adminPassword: ''
    });
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData: any) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Login form submit
    const handleSubmit = (e: any) => {
        e.preventDefault();

        const payload_login = {
            adminName: formData.adminName.trim(),
            adminPassword: formData.adminPassword
        };

         fetch(`${apiLink}/cms/admin-login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(payload_login)
        })
            .then((res) => {
                switch (res.status) {
                    case 200:
                        return res.json();
                    default:
                        throw new Error(`HTTP error! status: ${res.status}`);
                }
            })
            .then((data) => {
                // Write the token as cookie
                loginAdmin(data.token);

                navigate("/panel");
            })
            .catch((err) => {
                alert("Giriş başarısız.");
            })
    }

    return (
        <div className="cms_container">
            <div className='cms-login-cont'>
                <h3>Panel Giriş</h3>
                <form className='cms-login-form' onSubmit={handleSubmit}>
                    <div className="form_inputs">
                        <input type='text' placeholder='Admin Adı' name='adminName' onChange={handleChange} />
                        <input type='password' placeholder='Şifre' name='adminPassword' onChange={handleChange} />
                    </div>
                    <button type='submit'>Giriş</button>
                </form>
            </div>
        </div>
    )
}

export default CMS_LOGIN;