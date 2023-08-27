import React from 'react';
import Template from '../template/Template';
import { BoxArrowLeft, List } from 'react-bootstrap-icons';

export const Page_Home = () => {
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
                        <a>HİZMETLER</a>
                        <a>GALERİ</a>
                        <a>HAKKIMIZDA</a>
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
                        <h4>Saç hizmetleri</h4>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo vero tempora unde aliquam ipsum eius assumenda harum autem, quae voluptates minima illum, necessitatibus alias suscipit, quisquam itaque facere modi nulla!</p>
                        <button type='button'>Detaylar</button>
                    </div>
                    <div className='service_item'>
                        <img src={require('../assets/images/services/tirnak.png')} alt='Tırnak hizmetleri' />
                        <h4>Tırnak hizmetleri</h4>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo vero tempora unde aliquam ipsum eius assumenda harum autem, quae voluptates minima illum, necessitatibus alias suscipit, quisquam itaque facere modi nulla!</p>
                        <button type='button'>Detaylar</button>
                    </div>
                    <div className='service_item'>
                        <img src={require('../assets/images/services/makyaj.jpg')} alt='Makyaj hizmetleri' />
                        <h4>Makyaj hizmetleri</h4>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo vero tempora unde aliquam ipsum eius assumenda harum autem, quae voluptates minima illum, necessitatibus alias suscipit, quisquam itaque facere modi nulla!</p>
                        <button type='button'>Detaylar</button>
                    </div>
                    <div className='service_item'>
                        <img src={require('../assets/images/services/kirpik.jpg')} alt='Kirpik hizmetleri' />
                        <h4>Kirpik hizmetleri</h4>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo vero tempora unde aliquam ipsum eius assumenda harum autem, quae voluptates minima illum, necessitatibus alias suscipit, quisquam itaque facere modi nulla!</p>
                        <button type='button'>Detaylar</button>
                    </div>
                    <div className='service_item'>
                        <img src={require('../assets/images/services/dudak.png')} alt='Dudak hizmetleri' />
                        <h4>Dudak hizmetleri</h4>
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
                <div className='section-header'>
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
                        <button type='button' className='gallery_showmore-btn'>Daha fazla göster</button>
                    </div>
                </section>
            </main>
            <footer>

            </footer>
        </div>
    )
};
