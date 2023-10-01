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
                        <iframe title='İşyeri Konumu' loading="lazy" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6096.6532366155325!2d29.12184203596804!3d40.17954413712012!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ca3f41f951cbcb%3A0x43df58d8dd889a13!2sSiteler%20Kuaf%C3%B6r%20%26%20G%C3%BCzellik%20ve%20A%C4%9Fda%20Salonu!5e0!3m2!1sen!2str!4v1693843058034!5m2!1sen!2str"></iframe>
                    </div>
                    <div className='workplace_photos'>
                        <img src={require('../assets/images/workplace/workplace_from_outside1.webp')} loading="lazy" alt='İşyeri fotoğrafı 1' />
                        <img src={require('../assets/images/workplace/workplace_from_outside2.webp')} loading="lazy" alt='İşyeri fotoğrafı 2' />
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