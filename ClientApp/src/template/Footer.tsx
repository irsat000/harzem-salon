import React from 'react';
import { House, Telephone } from 'react-bootstrap-icons';


const Footer: React.FC<{
    aboutusSection: React.RefObject<HTMLDivElement>
}> = ({ aboutusSection }) => {

    return (
        <footer ref={aboutusSection}>
            <div className='about_us'>
                <div className='contact-cont'>
                    <h5>Bize ulaşın</h5>
                    <div className='contact_details'>
                        <div className='contact_item'>
                            <div className='contact_icon'><Telephone /></div>
                            <span>0 (224) 368 22 53 - İşyeri Telefonu</span>
                        </div>
                        <div className='contact_item'>
                            <div className='contact_icon'><Telephone /></div>
                            <span>0 (539) 359 73 13 - Harzem Akdeniz</span>
                        </div>
                        <div className='contact_item'>
                            <div className='contact_icon'><Telephone /></div>
                            <span>0 (543) 819 20 19 - Songül Akdeniz</span>
                        </div>
                        <div className='contact_item'>
                            <div className='contact_icon'><House /></div>
                            <span>Siteler Mahallesi, Kanuni Cad Yuvacık Sitesi, Daire No 78/A, 16330 Yıldırım/Bursa</span>
                        </div>
                    </div>
                </div>
                <div className='workplace-cont'>
                    <div className='workplace_on_map'>
                        <img src={require('../assets/images/workplace/workplace_map.png')} alt='Harita üzerinde İşyeri adresi' />
                    </div>
                    <div className='workplace_photos'>
                        <img src={require('../assets/images/workplace/workplace_from_outside.jpg')} alt='İşyeri fotoğrafı 1' />
                        <img src={require('../assets/images/workplace/workplace_from_outside.jpg')} alt='İşyeri fotoğrafı 2' />
                    </div>
                </div>
            </div>
            <div className='copyright'>
                <span>Telif Hakkı © 2023 - Tüm haklar saklıdır.</span>
            </div>
        </footer>
    )
}

export default Footer;