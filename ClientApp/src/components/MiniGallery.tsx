import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, XLg } from 'react-bootstrap-icons';
import { OurService } from '../pages/Home';



// Thumbnail Carousel for Our Services


/*gallery.map((image, index) => (
    <img key={index} src={image} className={`${index === activeIndex ? 'active' : ''}`} alt={`Fotoğraf ${index}`} onClick={(e) => e.stopPropagation()} />
))*/


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
            const importMiniGalleryImages = async () => {
                const updatedMiniGalleryData = await Promise.all(
                    miniGalleryData.map(async (s) => {
                        if (activeCategory === "Hepsi" || activeCategory === s.serviceName) {
                            return await Promise.all(
                                s.miniGalleryImages.map(async (image) => {
                                    const importedImage = await import(`../assets/images/mini_gallery/${image}`);
                                    return importedImage.default;
                                })
                            );
                        } else {
                            // Return an empty array so it doesn't register as undefined
                            return [];
                        }
                    })
                );
                // Flatten the array of arrays of image URLs
                setMiniGalleryImgList(updatedMiniGalleryData.flat());
            };
            importMiniGalleryImages();
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