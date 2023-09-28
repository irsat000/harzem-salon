import React, { useEffect, useState } from 'react';
import '../../styles/global.css';
import '../../styles/cms.css';
import { List, XLg } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';
import { checkAdmin, logoutAdmin } from '../utility/authUtils';




const CMS_TEMPLATE: React.FC<{
    children: any,
    panelTitle: string
}> = ({ children, panelTitle }) => {
    const navigate = useNavigate();
    useEffect(() => {
        // Check admin session
        if (!checkAdmin()) {
            navigate("/panel/giris");
        }
    }, [navigate]);

    const handleLogOut = () => {
        logoutAdmin();
        alert("Çıkış yapıldı.")
        navigate("/panel/giris");
    }

    const [cmsDrawerActive, setCmsDrawerActive] = useState(false);

    return (
        <div className="cms_container">
            <div className={`cms_drawer-cont ${cmsDrawerActive ? 'active' : ''}`} onClick={() => setCmsDrawerActive(false)}>
                <div className="cms_drawer" onClick={(e) => e.stopPropagation()}>
                    <div className="close-cms_drawer-btn" onClick={() => setCmsDrawerActive(false)}>
                        <XLg />
                    </div>
                    <h3>Panel</h3>
                    <ul className='panel_list'>
                        <li><Link to="/panel/yorumlar">Yorumlar</Link></li>
                        <li><Link to="/panel/teklifler">Teklifler</Link></li>
                        <li><Link to="/panel/hizmetlerimiz">Hizmetlerimiz</Link></li>
                        <li><Link to="/panel/galeri">Galeri</Link></li>
                    </ul>
                    <h3>İşlemler</h3>
                    <ul className='option_list'>
                        <li onClick={handleLogOut}>Çıkış Yap</li>
                    </ul>
                </div>
            </div>
            <nav>
                <h3>Panel</h3>
                <ul className='panel_list'>
                    <li><Link to="/panel/yorumlar">Yorumlar</Link></li>
                    <li><Link to="/panel/kampanyalar">Kampanyalar</Link></li>
                    <li><Link to="/panel/hizmetlerimiz">Hizmetlerimiz</Link></li>
                    <li><Link to="/panel/galeri">Galeri</Link></li>
                </ul>
                <h3>İşlemler</h3>
                <ul className='option_list'>
                    <li onClick={handleLogOut}>Çıkış Yap</li>
                </ul>
            </nav>
            <div className='cms_panel-cont'>
                <header>
                    <div className='cms_drawer-btn' onClick={() => setCmsDrawerActive(true)}>
                        <List />
                    </div>
                </header>
                <main>
                    <h3 className='cms_main-title'>{panelTitle}</h3>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default CMS_TEMPLATE;