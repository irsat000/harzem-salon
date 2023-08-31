import React, { useRef } from 'react';
import { BoxArrowLeft, House, List, Telephone } from 'react-bootstrap-icons';
import { TestimonialCarousel } from '../components/TestimonialCarousel';
import Footer from '../template/Footer';
import Template from '../template/Template';
import { Link, useNavigate } from 'react-router-dom';



const Page_Home = () => {
    // Refs of section for scrolling down with links
    const gallerySection = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    
    return (
        <Template isHomepage={true} gallerySection={gallerySection}>
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