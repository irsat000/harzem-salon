import React, { useRef } from 'react';
import Template from '../template/Template';
import { BoxArrowLeft, House, List, Telephone } from 'react-bootstrap-icons';

export const Page_Home = () => {
    // Refs of section for scrolling down with links
    const gallerySection = useRef<HTMLDivElement>(null);
    const aboutusSection = useRef<HTMLDivElement>(null);

    const scrollToSection = (section: React.RefObject<HTMLDivElement>) => {
        //section.current?.scrollIntoView({ behavior: 'smooth' }); //Work perfectly well aswell

        // 50 pixel higher than the section for better UX
        if (section.current) {
            const yOffset = -50;
            const y = section.current.getBoundingClientRect().top + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <div className="page_content">
            <header>
                <div className='header_1'>
                    <span className='business_name'>Siteler Kuaför & Güzellik Salonu</span>
                    <div className='drawer_btn'>
                        <List />
                    </div>
                    <div className='balance-cont'>
                        <div className='account-logout'>
                            <BoxArrowLeft />
                        </div>
                        <span>BAKİYE: 0,00 TL</span>
                    </div>
                </div>
                <div className='header_seperator'></div>
                <div className='header_2'>
                    <h1 className='brand_name'>HARZEM Salon</h1>
                    <nav>
                        <div className='srv_dd_menu'>
                            <h5>HİZMETLER</h5>
                            <ul>
                                <li><a href='#'>Saç</a></li>
                                <li><a href='#'>Tırnak</a></li>
                                <li><a href='#'>Makyaj</a></li>
                                <li><a href='#'>Kirpik</a></li>
                                <li><a href='#'>Dudak</a></li>
                                <li><a href='#'>Epilasyon & Depilasyon</a></li>
                            </ul>
                        </div>
                        <a onClick={() => scrollToSection(gallerySection)}>GALERİ</a>
                        <a onClick={() => scrollToSection(aboutusSection)}>HAKKIMIZDA</a>
                    </nav>
                </div>
                <div className='header_3'>
                    <button type='button'>
                        Kampanyalar
                    </button>
                </div>
            </header>
            <main>
                <p className='appointment_contact_info'>
                    Randevu almak için arayabilirsiniz - <span>0 (543) 819 20 19</span>
                </p>
                <div className='section-header'>
                    <div></div>
                    <h2>HİZMETLERİMİZ</h2>
                    <div></div>
                </div>
                <section className='our_services-section'>
                    <div className='service_item'>
                        <img src={require('../assets/images/services/sac.png')} alt='Saç hizmetleri' />
                        <h4>Saç</h4>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo vero tempora unde aliquam ipsum eius assumenda harum autem, quae voluptates minima illum, necessitatibus alias suscipit, quisquam itaque facere modi nulla!</p>
                        <button type='button'>Detaylar</button>
                    </div>
                    <div className='service_item'>
                        <img src={require('../assets/images/services/tirnak.png')} alt='Tırnak hizmetleri' />
                        <h4>Tırnak</h4>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo vero tempora unde aliquam ipsum eius assumenda harum autem, quae voluptates minima illum, necessitatibus alias suscipit, quisquam itaque facere modi nulla!</p>
                        <button type='button'>Detaylar</button>
                    </div>
                    <div className='service_item'>
                        <img src={require('../assets/images/services/makyaj.jpg')} alt='Makyaj hizmetleri' />
                        <h4>Makyaj</h4>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo vero tempora unde aliquam ipsum eius assumenda harum autem, quae voluptates minima illum, necessitatibus alias suscipit, quisquam itaque facere modi nulla!</p>
                        <button type='button'>Detaylar</button>
                    </div>
                    <div className='service_item'>
                        <img src={require('../assets/images/services/kirpik.jpg')} alt='Kirpik hizmetleri' />
                        <h4>Kirpik</h4>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo vero tempora unde aliquam ipsum eius assumenda harum autem, quae voluptates minima illum, necessitatibus alias suscipit, quisquam itaque facere modi nulla!</p>
                        <button type='button'>Detaylar</button>
                    </div>
                    <div className='service_item'>
                        <img src={require('../assets/images/services/dudak.png')} alt='Dudak hizmetleri' />
                        <h4>Dudak</h4>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo vero tempora unde aliquam ipsum eius assumenda harum autem, quae voluptates minima illum, necessitatibus alias suscipit, quisquam itaque facere modi nulla!</p>
                        <button type='button'>Detaylar</button>
                    </div>
                    <div className='service_item'>
                        <img src={require('../assets/images/services/epilasyon.jpg')} alt='Epilasyon ve Depilasyon hizmetleri' />
                        <h4>Epilasyon & Depilasyon</h4>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo vero tempora unde aliquam ipsum eius assumenda harum autem, quae voluptates minima illum, necessitatibus alias suscipit, quisquam itaque facere modi nulla!</p>
                        <button type='button'>Detaylar</button>
                    </div>
                </section>
                <div className='section-header' ref={gallerySection}>
                    <div></div>
                    <h2>GALERİ</h2>
                    <div></div>
                </div>
                <section className='gallery-section'>
                    <div className='gallery-item'><img src={require('../assets/images/gallery_temp/1.jpg')} alt='Gallery image' /></div>
                    <div className='gallery-item'><img src={require('../assets/images/gallery_temp/2.jpg')} alt='Gallery image' /></div>
                    <div className='gallery-item'><img src={require('../assets/images/gallery_temp/3.jpg')} alt='Gallery image' /></div>
                    <div className='gallery-item'><img src={require('../assets/images/gallery_temp/4.jpg')} alt='Gallery image' /></div>
                    <div className='gallery-item'><img src={require('../assets/images/gallery_temp/5.jpg')} alt='Gallery image' /></div>
                    <div className='gallery-item'><img src={require('../assets/images/gallery_temp/6.jpg')} alt='Gallery image' /></div>
                    <div className='gallery-item'><img src={require('../assets/images/gallery_temp/7.jpg')} alt='Gallery image' /></div>
                    <div className='gallery-item'><img src={require('../assets/images/gallery_temp/8.jpg')} alt='Gallery image' /></div>
                    <div className='gallery-item'><img src={require('../assets/images/gallery_temp/9.jpg')} alt='Gallery image' /></div>
                    <div className='gallery-item'><img src={require('../assets/images/gallery_temp/10.jpg')} alt='Gallery image' /></div>
                    <div className='gallery_showmore'>
                        <button type='button'>Daha fazla göster</button>
                    </div>
                </section>
            </main>
            <footer ref={aboutusSection}>
                <div className='about_us'>
                    <div className='contact-cont'>
                        <h5>Bize ulaş</h5>
                        <div className='contact_details'>
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
                            <img src={require('../assets/images/workplace/workplace_map.png')} alt='Workplace on map' />
                        </div>
                        <div className='workplace_photos'>
                            <img src={require('../assets/images/workplace/workplace_from_outside.jpg')} alt='Workplace photo from outside' />
                            <img src={require('../assets/images/workplace/workplace_from_outside.jpg')} alt='Workplace photo from outside' />
                        </div>
                    </div>
                </div>
                <div className='copyright'>
                    <span>Telif Hakkı © 2023 - Tüm haklar saklıdır.</span>
                </div>
            </footer>
        </div>
    )
};
