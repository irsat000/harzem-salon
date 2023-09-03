import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, XLg } from 'react-bootstrap-icons';



// Thumbnail Carousel for Our Services


const MiniGallery: React.FC<{
    miniGallery: React.RefObject<HTMLDivElement>,
    miniGalleryActive: boolean,
    setMiniGalleryActive: (e: boolean) => void
}> = ({ miniGallery, miniGalleryActive, setMiniGalleryActive }) => {
    const gallery = [
        require('../assets/images/gallery_temp/1.jpg'),
        require('../assets/images/gallery_temp/2.jpg'),
        require('../assets/images/gallery_temp/3.jpg'),
        require('../assets/images/gallery_temp/4.jpg')
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const [activeCategory, setActiveCategory] = useState('Hepsi');

    return (
        <div className={`minigallery-cont ${miniGalleryActive ? 'active' : ''}`} ref={miniGallery}>
            <div className='mg-close' onClick={() => setMiniGalleryActive(false)}>
                <XLg />
            </div>
            <div className='mg-carousel'>
                <div className='mg-prev' onClick={() => setActiveIndex((prevIndex) => (prevIndex - 1 + gallery.length) % gallery.length)}>
                    <ChevronLeft />
                </div>
                {gallery.map((image, index) => (
                    <img key={index} src={image} className={`${index === activeIndex ? 'active' : ''}`} />
                ))}
                <div className='mg-next' onClick={() => setActiveIndex((prevIndex) => (prevIndex + 1) % gallery.length)}>
                    <ChevronRight />
                </div>
            </div>
            <div className="mg-slider">
                {gallery.map((image, index) => (
                    <img key={index} src={image} className={`${index === activeIndex ? 'active' : ''}`} onClick={() => setActiveIndex(index)} />
                ))}
            </div>
            <div className="mg-seperator">
                <div></div>
            </div>
            <div className="mg-nav">
                <span className={activeCategory === 'Hepsi' ? 'active' : ''} onClick={() => setActiveCategory('Hepsi')}>Hepsi</span>
                <span className={activeCategory === 'Kesim' ? 'active' : ''} onClick={() => setActiveCategory('Kesim')}>Kesim</span>
                <span className={activeCategory === 'Boya' ? 'active' : ''} onClick={() => setActiveCategory('Boya')}>Boya</span>
                <span className={activeCategory === 'Fön' ? 'active' : ''} onClick={() => setActiveCategory('Fön')}>Fön</span>
                <span className={activeCategory === 'Topuz' ? 'active' : ''} onClick={() => setActiveCategory('Topuz')}>Topuz</span>
            </div>
        </div>
    )
}

export default MiniGallery;