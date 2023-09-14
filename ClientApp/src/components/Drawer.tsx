import React from 'react';
import { XLg } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import '../styles/drawer.css';


const Drawer: React.FC<{
    drawerActive: boolean,
    setDrawerActive: (e: boolean) => void,
    setBalanceCheckActive: (e: boolean) => void,
    isHomepage: boolean,
    scrollToSection: (section: React.RefObject<HTMLDivElement>) => void,
    aboutusSection: React.RefObject<HTMLDivElement>,
    ourservicesSection?: React.RefObject<HTMLDivElement>
}> = ({ drawerActive, setDrawerActive, setBalanceCheckActive, isHomepage, scrollToSection, aboutusSection, ourservicesSection }) => {

    const handleClose = () => {
        setDrawerActive(false)
    }

    return (
        <div className={`drawer-cont ${drawerActive ? 'active' : ''}`} onClick={() => handleClose()}>
            <div className='drawer' onClick={(e) => e.stopPropagation()}>
                <img src={require('../assets/images/nails_transparent.png')} alt='Mobil menü fotoğrafı' className='drawer-header'/>
                <button type='button' className='d-check_balance-btn' onClick={() => {
                    handleClose()
                    setBalanceCheckActive(true)
                }}>Kupon Sorgula</button>
                <ul>
                    {isHomepage && ourservicesSection
                        ? <li><button onClick={() => {
                            handleClose()
                            scrollToSection(ourservicesSection)
                        }}>HİZMETLER</button></li>
                        : <li><Link to='/'>ANASAYFA</Link></li>
                    }
                    <li><Link to='/galeri'>GALERİ</Link></li>
                    <li><button onClick={() => {
                        handleClose()
                        scrollToSection(aboutusSection)
                    }}>HAKKIMIZDA</button></li>
                </ul>
            </div>
        </div>
    )
}

export default Drawer;