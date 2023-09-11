import React, { useEffect, useState } from 'react';
import Template from '../components/Template';
import '../styles/gallery.css';
import { XLg } from 'react-bootstrap-icons';
import { defaultFetchGet } from '../utility/fetchUtils';


export type GalleryImage = {
    id: number;
    imageLink: string;
    title: string;
    uploadDate: string;
}


const ScaleUpImage: React.FC<{
    imageUrl?: string,
    setSclupImage: (e: string | undefined) => void,
    scaleUpActive: boolean,
    setScaleUpActive: (e: boolean) => void
}> = ({ imageUrl, setSclupImage, scaleUpActive, setScaleUpActive }) => {

    const closeScaleUp = () => {
        setSclupImage(undefined);
        setScaleUpActive(false);
    }

    return (
        <div className={`image_scaleup ${scaleUpActive ? 'active' : ''}`} onClick={() => closeScaleUp()}>
            <div className='sclup-close' onClick={() => closeScaleUp()}>
                <XLg />
            </div>
            {imageUrl ? (
                <img src={imageUrl} alt="Yakınlaştırılmış fotoğraf" onClick={(e) => e.stopPropagation()} />
            ) : (
                <div className="image-error" onClick={(e) => e.stopPropagation()}>Fotoğraf bulunamadı</div>
            )}
        </div>
    )
}


const PAGE_GALLERY = () => {

    const [scaleUpActive, setScaleUpActive] = useState(false);
    const [sclupImage, setSclupImage] = useState<undefined | string>(undefined);

    const handleScaleUp = (imageUrl: string) => {
        setSclupImage(imageUrl);
        setScaleUpActive(true);
    }


    const [galleryData, setGalleryData] = useState<GalleryImage[] | null>(null);

    useEffect(() => {
        const cachedGalleryData = localStorage.getItem(`cachedGalleryData`);

        if (cachedGalleryData) {
            setGalleryData(JSON.parse(cachedGalleryData));
        } else {
            fetch(`https://localhost:7173/api/content/gallery`, defaultFetchGet())
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
                    data.gallery = await Promise.all(
                        data.gallery.map(async (image: GalleryImage) => {
                            const importedImage = await import(`../assets/images/gallery/${image.imageLink}`);
                            const newDate = new Date(image.uploadDate);
                            return {
                                id: image.id,
                                imageLink: importedImage.default,
                                title: image.title,
                                uploadDate: newDate.toLocaleDateString()
                            };
                        })
                    );
                    setGalleryData(data.gallery);
                    localStorage.setItem(`cachedGalleryData`, JSON.stringify(data.gallery));
                })
                .catch((err) => console.error('Error fetching data:', err));
        }
    }, []);

    return (
        <Template isHomepage={false}>
            <>
                <ScaleUpImage imageUrl={sclupImage} setSclupImage={setSclupImage} scaleUpActive={scaleUpActive} setScaleUpActive={setScaleUpActive} />
                <div className='gallery-header'>
                    <div></div>
                    <h1>GALERİ</h1>
                    <div></div>
                </div>
                <div className='gallery-cont'>
                    {galleryData ? galleryData.map((item, index) => (
                        <div key={index} className='gallery-item'>
                            <div className="image-wrap">
                                <img src={item.imageLink} alt='Galeri fotoğrafı' onClick={() => handleScaleUp(item.imageLink)} />
                            </div>
                            <div className='gallery_item_details'>
                                <p>{item.title}</p>
                                <span>Tarih - {item.uploadDate}</span>
                            </div>
                        </div>
                    )) : <></>}
                </div>
            </>
        </Template>
    )
}

export default PAGE_GALLERY;