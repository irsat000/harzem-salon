import React, { useEffect } from 'react';
import CMS_TEMPLATE from '../components/CMS_Template';
import { useNavigate } from 'react-router-dom';


const CMS_HOME = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Will send to testimonials, if not logged in, then template will send to login
        navigate('/panel/yorumlar');
    }, [navigate])

    return (
        <CMS_TEMPLATE panelTitle=''>
            <></>
        </CMS_TEMPLATE>
    )
}

export default CMS_HOME;