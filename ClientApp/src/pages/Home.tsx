import React, { useEffect, useRef, useState } from 'react';
import TestimonialCarousel from '../components/TestimonialCarousel';
import MiniGallery from '../components/MiniGallery';
import Template from '../components/Template';
import { Link } from 'react-router-dom';
import '../styles/home.css'
import { defaultFetchGet } from '../utility/fetchUtils';
import { ScaleUpImage } from './Gallery';


export type OurService = {
    serviceName: string;
    serviceCode: string;
    miniGalleryImages: string[];
};

export type ServiceCategory = {
    cateCode: string;
    ourServices: OurService[];
};

export type OurServicesModel = ServiceCategory[];





const PAGE_HOME = () => {
    // Refs of section for scrolling down with links
    const gallerySection = useRef<HTMLDivElement>(null);
    const ourservicesSection = useRef<HTMLDivElement>(null);

    const miniGallery = useRef<HTMLDivElement>(null);
    const [miniGalleryActive, setMiniGalleryActive] = useState(false);

    const [homeGalleryData, setHomeGalleryData] = useState<string[] | null>(null);
    const [miniGalleryData, setMiniGalleryData] = useState<OurService[] | null>(null);
    const [ourServicesData, setOurServicesData] = useState<OurServicesModel | null>(null);
    //const navigate = useNavigate();

    const handleMiniGallery = (cateCode: string) => {
        // Get one category using cateCode
        // It has service and image list, required for mini gallery.
        const miniGallery = ourServicesData?.find(sc => sc.cateCode === cateCode)?.ourServices;
        if (!miniGallery) {
            // Reset mini gallery for new category
            setMiniGalleryData(null);
            return;
        }
        setMiniGalleryData(miniGallery);
        setMiniGalleryActive(true);
    }


    useEffect(() => {

        // Our services data
        const cachedOurServicesData = sessionStorage.getItem(`ourServicesData`);

        if (cachedOurServicesData) {
            setOurServicesData(JSON.parse(cachedOurServicesData));
        } else {
            fetch(`https://localhost:7173/api/content/our_services`, defaultFetchGet())
                .then((res) => {
                    switch (res.status) {
                        case 404:
                            throw new Error(`Category or our services are empty!`);
                        case 200:
                            return res.json();
                        default:
                            throw new Error(`HTTP error! status: ${res.status}`);
                    }
                })
                .then((data) => {
                    setOurServicesData(data.categories);
                    sessionStorage.setItem(`ourServicesData`, JSON.stringify(data.categories));
                })
                .catch((err) => console.error('Error fetching data:', err));
        }

        // Home gallery data
        const cachedHomeGalleryData = sessionStorage.getItem(`cachedHomeGalleryData`);

        if (cachedHomeGalleryData) {
            setHomeGalleryData(JSON.parse(cachedHomeGalleryData));
        } else {
            fetch(`https://localhost:7173/api/content/home_gallery`, defaultFetchGet())
                .then((res) => {
                    switch (res.status) {
                        case 404:
                            throw new Error(`Testimonial list is empty!`);
                        case 200:
                            return res.json();
                        default:
                            throw new Error(`HTTP error! status: ${res.status}`);
                    }
                })
                .then(async (data) => {
                    const updated = data.gallery.map((imageLink: string) => 'https://localhost:7173/i/gallery/' + imageLink)
                    setHomeGalleryData(updated);
                    sessionStorage.setItem(`cachedHomeGalleryData`, JSON.stringify(updated));
                })
                .catch((err) => console.error('Error fetching data:', err));
        }
    }, []);

    const ListOurServices: React.FC<{
        cateCode: string;
    }> = ({ cateCode }) => {
        return (ourServicesData ?
            <ul>
                {ourServicesData.find(c => c.cateCode === cateCode)!.ourServices.map((service: OurService) => (
                    <li key={service.serviceCode}>- {service.serviceName}</li>
                ))}
            </ul> : <></>
        )
    }

    const MiniGalleryButton: React.FC<{
        cateCode: string;
    }> = ({ cateCode }) => {
        const isEmpty = !(ourServicesData?.find(c => c.cateCode === cateCode)?.ourServices?.flatMap(s => s.miniGalleryImages).length ?? 0);
        return (
            <button className={`${isEmpty ? 'unavailable' : ''}`} type='button' onClick={() => isEmpty ? null : handleMiniGallery(cateCode)}>Mini Galeri</button>
        )
    }


    // Scale up for image
    const [scaleUpActive, setScaleUpActive] = useState(false);
    const [sclupImage, setSclupImage] = useState<undefined | string>(undefined);

    const handleScaleUp = (imageUrl: string) => {
        setSclupImage(imageUrl);
        setScaleUpActive(true);
    }

    return (
        <Template isHomepage={true} gallerySection={gallerySection} ourservicesSection={ourservicesSection}>
            <ScaleUpImage imageUrl={sclupImage} setSclupImage={setSclupImage} scaleUpActive={scaleUpActive} setScaleUpActive={setScaleUpActive} />
            <MiniGallery miniGalleryData={miniGalleryData} miniGallery={miniGallery} miniGalleryActive={miniGalleryActive} setMiniGalleryActive={setMiniGalleryActive} />
            <p className='appointment_contact_info'>
                Randevu için arayınız - <span>0 (543) 819 20 19</span>
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
                    <ListOurServices cateCode='sac' />
                    <span>05438192019</span>
                    <MiniGalleryButton cateCode='sac' />
                </div>
                <div className='service_item'>
                    <img src={require('../assets/images/services/tirnak.png')} alt='Tırnak hizmetleri' />
                    <h4>Tırnak</h4>
                    <ListOurServices cateCode='tirnak' />
                    <span>05393597313</span>
                    <MiniGalleryButton cateCode='tirnak' />
                </div>
                <div className='service_item'>
                    <img src={require('../assets/images/services/makyaj.jpg')} alt='Makyaj hizmetleri' />
                    <h4>Makyaj</h4>
                    <ListOurServices cateCode='makyaj' />
                    <span>05393597313</span>
                    <MiniGalleryButton cateCode='makyaj' />
                </div>
                <div className='service_item'>
                    <img src={require('../assets/images/services/kirpik.jpg')} alt='Kirpik hizmetleri' />
                    <h4>Kirpik</h4>
                    <ListOurServices cateCode='kirpik' />
                    <span>05393597313</span>
                    <MiniGalleryButton cateCode='kirpik' />
                </div>
                <div className='service_item'>
                    <img src={require('../assets/images/services/dudak.png')} alt='Dudak hizmetleri' />
                    <h4>Dudak</h4>
                    <ListOurServices cateCode='dudak' />
                    <span>05393597313</span>
                    <MiniGalleryButton cateCode='dudak' />
                </div>
                <div className='service_item'>
                    <img src={require('../assets/images/services/epilasyon.jpg')} alt='Epilasyon ve Depilasyon hizmetleri' />
                    <h4>Epilasyon & Depilasyon</h4>
                    <ListOurServices cateCode='epilasyon_depilasyon' />
                    <span><span>05393597313</span>-<span>05438192019</span></span>
                    <MiniGalleryButton cateCode='epilasyon_depilasyon' />
                </div>
            </section>
            <TestimonialCarousel />
            {homeGalleryData ? <>
                <div className='section-header' ref={gallerySection}>
                    <div></div>
                    <h2>GALERİ</h2>
                    <div></div>
                </div>
                <section className='gallery-section'>
                    {homeGalleryData.map((image, index) => (
                        <div className='gallery-item' key={index}>
                            <img src={image} alt={`Galeri fotoğrafı ${index}`} onClick={() => handleScaleUp(image)} />
                        </div>
                    ))}
                    <div className='gallery_showmore'>
                        <Link to='/galeri'>Daha fazla göster</Link>
                    </div>
                </section>
            </> : <></>}
        </Template>
    )
};

export default PAGE_HOME;