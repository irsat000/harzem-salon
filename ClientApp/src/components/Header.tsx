import React from 'react';
import { List } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';


const Header: React.FC<{
    isHomepage: boolean,
    setBalanceCheckActive: (e: boolean) => void,
    setDrawerActive: (e: boolean) => void,
    scrollToSection: (section: React.RefObject<HTMLDivElement>) => void,
    aboutusSection: React.RefObject<HTMLDivElement>,
    gallerySection?: React.RefObject<HTMLDivElement>,
    ourservicesSection?: React.RefObject<HTMLDivElement>
}> = ({ isHomepage, setBalanceCheckActive, setDrawerActive, scrollToSection, aboutusSection, gallerySection, ourservicesSection }) => {
    const navigate = useNavigate();

    return (
        <header className={isHomepage ? 'extended' : ''}>
            <div className='header-1'>
                <span className='business-name'>Siteler Kuaför & Güzellik Salonu</span>
                <div className='drawer-btn' onClick={() => setDrawerActive(true)}>
                    <List />
                </div>
                {/*<div className='balance-cont'>
                    <button type='button' onClick={() => setBalanceCheckActive(true)}>Kupon Sorgula</button>
                </div>*/}
            </div>
            <div className='header-seperator'></div>
            <div className='header-2'>
                <Link to='/' className='brand_name'>HARZEM Salon</Link>
                <nav>
                    {/*<div className='dropdown-menu'>
                        <Link to='/hizmetlerimiz'>HİZMETLER</Link>
                        <ul>
                            <li><Link to='/hizmetlerimiz?hizmet=sac'>Saç</Link></li>
                            <li><Link to='/hizmetlerimiz?hizmet=tirnak'>Tırnak</Link></li>
                            <li><Link to='/hizmetlerimiz?hizmet=makyaj'>Makyaj</Link></li>
                            <li><Link to='/hizmetlerimiz?hizmet=kirpik'>Kirpik</Link></li>
                            <li><Link to='/hizmetlerimiz?hizmet=dudak'>Dudak</Link></li>
                            <li><Link to='/hizmetlerimiz?hizmet=epilasyon'>Epilasyon & Depilasyon</Link></li>
                        </ul>
                    </div>*/}
                    {isHomepage && ourservicesSection
                        ? <button onClick={() => scrollToSection(ourservicesSection)}>HİZMETLER</button>
                        : <Link to='/'>ANASAYFA</Link>
                    }
                    <Link to='/galeri'>GALERİ</Link>
                    <button onClick={() => scrollToSection(aboutusSection)}>HAKKIMIZDA</button>
                </nav>
            </div>
            <div className='header-3'>
                <button type='button' onClick={() => navigate('/kampanyalar')}>
                    Kampanyalar
                </button>
            </div>
        </header>
    )
}

export default Header;