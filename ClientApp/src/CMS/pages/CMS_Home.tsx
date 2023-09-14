import React, { useEffect } from 'react';
import CMS_Template from '../components/CMS_Template';
import { useNavigate } from 'react-router-dom';


const CMS_HOME = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        //navigate('/panel/giris'); // will send to login if the user doesn't have any login credentials

    }, [])

    return (
        <CMS_Template>

        </CMS_Template>
    )
}

export default CMS_HOME;