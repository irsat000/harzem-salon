import React, { useEffect, useMemo, useRef, useState } from 'react';
import TestimonialCarousel from '../components/TestimonialCarousel';
import MiniGallery from '../components/MiniGallery';
import Template from '../components/Template';
import { Link } from 'react-router-dom';
import '../styles/home.css'
import { defaultFetchGet } from '../utility/fetchUtils';
import { ScaleUpImage } from './Gallery';
import { apiLink } from '../utility/utils';
import FadeInElement from '../components/FadeInElement';


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

    useEffect(() => {
        // Our services data
        const cachedOurServicesData = sessionStorage.getItem(`ourServicesData`);

        if (cachedOurServicesData) {
            setOurServicesData(JSON.parse(cachedOurServicesData));
        } else {
            fetch(`${apiLink}/api/content/our_services`, defaultFetchGet())
                .then((res) => {
                    switch (res.status) {
                        case 404:
                            return Promise.reject(`Category or our services are empty!`);
                        case 200:
                            return res.json();
                        default:
                            return Promise.reject(`HTTP error! status: ${res.status}`);
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
            fetch(`${apiLink}/api/content/home_gallery`, defaultFetchGet())
                .then((res) => {
                    switch (res.status) {
                        case 404:
                            return Promise.reject(`Home gallery is empty!`);
                        case 200:
                            return res.json();
                        default:
                            return Promise.reject(`HTTP error! status: ${res.status}`);
                    }
                })
                .then(async (data) => {
                    const updated = data.gallery.map((imageLink: string) => apiLink + '/i/gallery/' + imageLink)
                    setHomeGalleryData(updated);
                    sessionStorage.setItem(`cachedHomeGalleryData`, JSON.stringify(updated));
                })
                .catch((err) => console.error('Error fetching data:', err));
        }
    }, []);

    const serviceList = useMemo(() => {
        const obj = [
            {
                "cateCode": "sac",
                "ourServices": [
                    "Kesim",
                    "Boya",
                    "Fön",
                    "Topuz"
                ]
            },
            {
                "cateCode": "tirnak",
                "ourServices": [
                    "Manikür",
                    "Protez tırnak",
                    "Kalıcı oje"
                ]
            },
            {
                "cateCode": "makyaj",
                "ourServices": [
                    "Kalıcı makyaj",
                    "Makyaj",
                    "BB Glow"
                ]
            },
            {
                "cateCode": "kirpik",
                "ourServices": [
                    "İpek kirpik",
                    "Kirpik kaldırma"
                ]
            },
            {
                "cateCode": "dudak",
                "ourServices": [
                    "İğnesiz dudak dolgusu"
                ]
            },
            {
                "cateCode": "epilasyon_depilasyon",
                "ourServices": [
                    "Lazer epilasyon",
                    "İğneli epilasyon",
                    "Kaş & Bıyık",
                    "Ağda"
                ]
            }
        ]
        return obj;
    }, []);

    const ListOurServices: React.FC<{
        cateCode: string;
    }> = ({ cateCode }) => {
        return (serviceList &&
            <span>{
                serviceList.find(c => c.cateCode === cateCode)!.ourServices.map((service, index) => (
                    index === 0 ? `${service}` : `, ${service}`
                ))
            }</span>
        )
    }

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
            <p className='appointment-contact-info'>
                Randevu için arayınız - <span>0 (224) 368 22 53</span>
            </p>
            <div className='section-header' ref={ourservicesSection}>
                <div></div>
                <h2>HİZMETLERİMİZ</h2>
                <div></div>
            </div>
            <section className='our-services-section'>
                <FadeInElement>
                    <div className='service-item'>
                        <img src={require('../assets/images/services/sac.webp')} loading="lazy" alt='Saç hizmetleri' />
                        <h4>Saç</h4>
                        <p>
                            Salonumuzda saç hizmetleri konusunda uzmanız. Saçınızı istediğiniz şekilde tasarlamak için profesyonel ekibimiz her zaman hizmetinizde.
                        </p>
                        <ListOurServices cateCode='sac' />
                        <MiniGalleryButton cateCode='sac' />
                    </div>
                </FadeInElement>
                <FadeInElement>
                    <div className='service-item'>
                        <img src={require('../assets/images/services/tirnak.webp')} loading="lazy" alt='Tırnak hizmetleri' />
                        <h4>Tırnak</h4>
                        <p>
                            Tırnak bakımında öne çıkan hizmetlerimiz arasında manikür, protez tırnak ve kalıcı oje bulunuyor.
                        </p>
                        <ListOurServices cateCode='tirnak' />
                        <MiniGalleryButton cateCode='tirnak' />
                    </div>
                </FadeInElement>
                <FadeInElement>
                    <div className='service-item'>
                        <img src={require('../assets/images/services/makyaj.webp')} loading="lazy" alt='Makyaj hizmetleri' />
                        <h4>Makyaj</h4>
                        <p>
                            Kalıcı makyajdan günlük makyaja, BB Glow uygulamasına kadar geniş bir yelpazede hizmet sunuyoruz.
                        </p>
                        <ListOurServices cateCode='makyaj' />
                        <MiniGalleryButton cateCode='makyaj' />
                    </div>
                </FadeInElement>
                <FadeInElement>
                    <div className='service-item'>
                        <img src={require('../assets/images/services/kirpik.webp')} loading="lazy" alt='Kirpik hizmetleri' />
                        <h4>Kirpik</h4>
                        <p>
                            Kirpikleriniz için ipek kirpik uygulamalarımız ve kirpik kaldırma hizmetlerimizle gözlerinizi ön plana çıkarıyoruz.
                        </p>
                        <ListOurServices cateCode='kirpik' />
                        <MiniGalleryButton cateCode='kirpik' />
                    </div>
                </FadeInElement>
                <FadeInElement>
                    <div className='service-item'>
                        <img src={require('../assets/images/services/dudak.webp')} loading="lazy" alt='Dudak hizmetleri' />
                        <h4>Dudak</h4>
                        <p>
                            Dudak dolgusu ihtiyaçlarınızı iğnesiz bir şekilde karşılıyoruz. Dudaklarınıza daha dolgun ve çekici bir görünüm kazandırmak için uzmanlarımız sizinle.
                        </p>
                        <ListOurServices cateCode='dudak' />
                        <MiniGalleryButton cateCode='dudak' />
                    </div>
                </FadeInElement>
                <FadeInElement>
                    <div className='service-item'>
                        <img src={require('../assets/images/services/epilasyon.webp')} loading="lazy" alt='Epilasyon ve Depilasyon hizmetleri' />
                        <h4>Epilasyon & Depilasyon</h4>
                        <p>
                            Vücut tüylerinden kalıcı olarak kurtulmak istiyorsanız, hizmetlerimizle size yardımcı olabiliriz.
                        </p>
                        <ListOurServices cateCode='epilasyon_depilasyon' />
                        <MiniGalleryButton cateCode='epilasyon_depilasyon' />
                    </div>
                </FadeInElement>
            </section>

            <FadeInElement>
                <article className='about-us-article intro'>
                    <h1>Güzellik Salonumuz Hakkında</h1>
                    <p>
                        Siteler Kuaför ve Güzellik Salonu, Bursa Yıldırım Sitelerde bayanlar için bir güzellik salonudur. Saç, makyaj, epilasyon, ağda, dövme ve daha fazlası için profesyonel ekipmanlarımız ve tecrübemiz ile sizleri bekliyoruz.
                    </p>
                </article>
            </FadeInElement>

            <TestimonialCarousel />
            {homeGalleryData && <>
                <div className='section-header' ref={gallerySection}>
                    <div></div>
                    <h2>GALERİ</h2>
                    <div></div>
                </div>
                <section className='gallery-section'>
                    {homeGalleryData.map((image, index) => (
                        <div className='gallery-item' key={index}>
                            <img src={image} alt={`Galeri fotoğrafı ${index}`} loading="lazy"
                                onClick={() => handleScaleUp(image)} />
                        </div>
                    ))}
                    <div className='gallery-showmore'>
                        <Link to='/galeri'>Daha fazla göster</Link>
                    </div>
                </section>
            </>}
        </Template>
    )
};

export default PAGE_HOME;