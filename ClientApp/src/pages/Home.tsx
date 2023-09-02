import React, { useRef } from 'react';
import { TestimonialCarousel } from '../components/TestimonialCarousel';
import Template from '../template/Template';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/index.css'



const Page_Home = () => {
    // Refs of section for scrolling down with links
    const gallerySection = useRef<HTMLDivElement>(null);
    const ourservicesSection = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    return (
        <Template isHomepage={true} gallerySection={gallerySection} ourservicesSection={ourservicesSection}>
            <p className='appointment_contact_info'>
                Randevu almak için arayabilirsiniz - <span>0 (543) 819 20 19</span>
            </p>
            <div className='section-header' ref={ourservicesSection}>
                <div></div>
                <h2>HİZMETLERİMİZ</h2>
                <div></div>
            </div>
            <section className='our_services-section'>
                <div className='service_item'>
                    <img src={require('../assets/images/services/sac.png')} alt='Saç hizmetleri' />
                    <h4>Saç</h4>
                    <ul>
                        <li>- Kesim</li>
                        <li>- Boya</li>
                        <li>- Fön</li>
                        <li>- Topuz</li>
                    </ul>
                    <span>Songül - 05438192019</span>
                    <button type='button'>Mini Galeri</button>
                </div>
                <div className='service_item'>
                    <img src={require('../assets/images/services/tirnak.png')} alt='Tırnak hizmetleri' />
                    <h4>Tırnak</h4>
                    <ul>
                        <li>- Manikür</li>
                        <li>- Protez tırnak</li>
                        <li>- Kalıcı oje</li>
                    </ul>
                    <span>Harzem - 05393597313</span>
                    <button type='button'>Mini Galeri</button>
                </div>
                <div className='service_item'>
                    <img src={require('../assets/images/services/makyaj.jpg')} alt='Makyaj hizmetleri' />
                    <h4>Makyaj</h4>
                    <ul>
                        <li>- Kalıcı makyaj</li>
                        <li>- Makyaj</li>
                        <li>- BB Glow</li>
                    </ul>
                    <span>Harzem - 05393597313</span>
                    <button type='button'>Mini Galeri</button>
                </div>
                <div className='service_item'>
                    <img src={require('../assets/images/services/kirpik.jpg')} alt='Kirpik hizmetleri' />
                    <h4>Kirpik</h4>
                    <ul>
                        <li>- İpek kirpik</li>
                        <li>- Kirpik lifting</li>
                    </ul>
                    <span>Harzem - 05393597313</span>
                    <button type='button'>Mini Galeri</button>
                </div>
                <div className='service_item'>
                    <img src={require('../assets/images/services/dudak.png')} alt='Dudak hizmetleri' />
                    <h4>Dudak</h4>
                    <ul>
                        <li>- İğnesiz dudak dolgusu</li>
                    </ul>
                    <span>Harzem - 05393597313</span>
                    <button type='button'>Mini Galeri</button>
                </div>
                <div className='service_item'>
                    <img src={require('../assets/images/services/epilasyon.jpg')} alt='Epilasyon ve Depilasyon hizmetleri' />
                    <h4>Epilasyon & Depilasyon</h4>
                    <ul>
                        <li>- Lazer epilasyon</li>
                        <li>- İğneli epilasyon</li>
                        <li>- Kaş & Bıyık</li>
                        <li>- Ağda</li>
                    </ul>
                    <span>Songül - 05438192019</span>
                    <button type='button'>Mini Galeri</button>
                </div>
            </section>
            <TestimonialCarousel />
            <div className='section-header' ref={gallerySection}>
                <div></div>
                <h2>GALERİ</h2>
                <div></div>
            </div>
            <section className='gallery-section'>
                <div className='gallery-item'><img src={require('../assets/images/gallery_temp/1.jpg')} alt='Galeri fotoğrafı' /></div>
                <div className='gallery-item'><img src={require('../assets/images/gallery_temp/2.jpg')} alt='Galeri fotoğrafı' /></div>
                <div className='gallery-item'><img src={require('../assets/images/gallery_temp/3.jpg')} alt='Galeri fotoğrafı' /></div>
                <div className='gallery-item'><img src={require('../assets/images/gallery_temp/4.jpg')} alt='Galeri fotoğrafı' /></div>
                <div className='gallery-item'><img src={require('../assets/images/gallery_temp/5.jpg')} alt='Galeri fotoğrafı' /></div>
                <div className='gallery-item'><img src={require('../assets/images/gallery_temp/6.jpg')} alt='Galeri fotoğrafı' /></div>
                <div className='gallery-item'><img src={require('../assets/images/gallery_temp/7.jpg')} alt='Galeri fotoğrafı' /></div>
                <div className='gallery-item'><img src={require('../assets/images/gallery_temp/8.jpg')} alt='Galeri fotoğrafı' /></div>
                <div className='gallery-item'><img src={require('../assets/images/gallery_temp/9.jpg')} alt='Galeri fotoğrafı' /></div>
                <div className='gallery-item'><img src={require('../assets/images/gallery_temp/10.jpg')} alt='Galeri fotoğrafı' /></div>
                <div className='gallery_showmore'>
                    <Link to='/galeri'>Daha fazla göster</Link>
                </div>
            </section>
        </Template>
    )
};

export default Page_Home;