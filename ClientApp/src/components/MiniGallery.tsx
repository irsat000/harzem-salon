import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, XLg } from 'react-bootstrap-icons';
import { OurService } from '../pages/Home';



// Thumbnail Carousel for Our Services


const MiniGallery: React.FC<{
    miniGalleryData: OurService[] | null,
    miniGallery: React.RefObject<HTMLDivElement>,
    miniGalleryActive: boolean,
    setMiniGalleryActive: (e: boolean) => void
}> = ({ miniGalleryData, miniGallery, miniGalleryActive, setMiniGalleryActive }) => {

    const [activeIndex, setActiveIndex] = useState(0);
    const [activeCategory, setActiveCategory] = useState('Hepsi');

    const handleMinigalleryClose = () => {
        setMiniGalleryActive(false);
    }

    const [miniGalleryImgList, setMiniGalleryImgList] = useState<string[] | null>(null);

    useEffect(() => {
        if (miniGalleryData) {
            // Get images by category
            // Return an empty array if the array is empty so it doesn't register as undefined
            const updatedMiniGalleryData = miniGalleryData.map((s) => (
                activeCategory === "Hepsi" || activeCategory === s.serviceName
                    ? s.miniGalleryImages.map(img => 'https://localhost:7173/i/mini_gallery/' + img)
                    : []
            ));
            // Flatten the image URLs
            setMiniGalleryImgList(updatedMiniGalleryData.flat());
        }
    }, [miniGalleryData, activeCategory]);

    return miniGalleryImgList && miniGalleryImgList.length > 0 ? (
        <div className={`minigallery-cont ${miniGalleryActive ? 'active' : ''}`} ref={miniGallery}>
            <div className='mg-close' onClick={() => setMiniGalleryActive(false)}>
                <XLg />
            </div>
            <div className="mg-carousel-cont" onClick={() => handleMinigalleryClose()}>
                <div className='mg-carousel'>
                    <div className='mg-prev' onClick={(e) => {
                        setActiveIndex((prevIndex) => (prevIndex - 1 + miniGalleryImgList.length) % miniGalleryImgList.length);
                        e.stopPropagation();
                    }}>
                        <ChevronLeft />
                    </div>
                    {miniGalleryImgList.map((image, index) => (
                        <img
                            className={`${index === activeIndex ? 'active' : ''}`}
                            key={index}
                            src={image}
                            alt={`Fotoğraf ${index}`}
                            onClick={(e) => e.stopPropagation()}
                        />
                    ))}
                    <div className='mg-next' onClick={(e) => {
                        setActiveIndex((prevIndex) => (prevIndex + 1) % miniGalleryImgList.length);
                        e.stopPropagation();
                    }}>
                        <ChevronRight />
                    </div>
                </div>
            </div>
            <div className="mg-slider">
                {miniGalleryImgList.map((image, index) => (
                    <img
                        className={`${index === activeIndex ? 'active' : ''}`}
                        key={index}
                        src={image}
                        alt={`Küçük fotoğraf ${index}`}
                        onClick={() => setActiveIndex(index)}
                    />
                ))}
            </div>
            <div className="mg-seperator">
                <div></div>
            </div>
            <div className="mg-nav">
                <span className={activeCategory === 'Hepsi' ? 'active' : ''} onClick={() => {
                    setActiveCategory('Hepsi');
                    setActiveIndex(0);
                }}>Hepsi</span>
                {miniGalleryData ? miniGalleryData.map((s, index) => (
                    <span key={index} className={activeCategory === s.serviceName ? 'active' : ''} onClick={() => {
                        setActiveCategory(s.serviceName);
                        setActiveIndex(0);
                    }}>{s.serviceName}</span>
                )) : <></>}
            </div>
        </div>
    ) : <></>
}

export default MiniGallery;