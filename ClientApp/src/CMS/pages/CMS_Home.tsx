import React, { useEffect } from 'react';
import CMS_TEMPLATE from '../components/CMS_Template';
import { useNavigate } from 'react-router-dom';


const CMS_HOME = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // will send to login if the user doesn't have any login credentials, otherwise musteriler
        navigate('/panel/yorumlar');

    }, [navigate])
    
    return (
        <CMS_TEMPLATE panelTitle=''>

        </CMS_TEMPLATE>
    )
}

export default CMS_HOME;