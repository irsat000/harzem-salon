import React, { useEffect, useState } from 'react';
import Template from '../components/Template';
import '../styles/gallery.css';
import { XLg } from 'react-bootstrap-icons';
import { defaultFetchGet } from '../utility/fetchUtils';
import { apiLink } from '../utility/utils';


export type GalleryImage = {
    id: number;
    imageLink: string;
    title: string;
    uploadDate: string;
}


/**
* Adds scale up for any image
* @param {string} imageurl - Image link
* @param {Function} setSclupImage - Clean image upon close
* @param {boolean} scaleUpActive - Component state
* @param {Function} setScaleUpActive - On/Off for component
* @returns {JSX.Element} React component.
*
* @example
* const [scaleUpActive, setScaleUpActive] = useState(false);
* const [sclupImage, setSclupImage] = useState<undefined | string>(undefined);
* const handleScaleUp = (imageUrl: string) => {
*     setSclupImage(imageUrl);
*     setScaleUpActive(true);
* }
* 
* <ScaleUpImage imageUrl={sclupImage} setSclupImage={setSclupImage} scaleUpActive={scaleUpActive} setScaleUpActive={setScaleUpActive} />
* 
* <img src={image_link} onClick={() => handleScaleUp(image_link)} />
*/
export const ScaleUpImage: React.FC<{
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
        <div className={`image-scaleup ${scaleUpActive ? 'active' : ''}`} onClick={() => closeScaleUp()}>
            <div className='sclup-close' onClick={() => closeScaleUp()}>
                <XLg />
            </div>
            {imageUrl ? (
                <img src={imageUrl} alt="Yakınlaştırılmış fotoğraf" loading="lazy" onClick={(e) => e.stopPropagation()} />
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

    const [dataLoading, setDataLoading] = useState("loading");
    const [galleryData, setGalleryData] = useState<GalleryImage[]>([]);

    console.log(dataLoading);
    useEffect(() => {
        try {
            const cachedGalleryData = sessionStorage.getItem(`cachedGalleryData`);

            if (cachedGalleryData) {
                setGalleryData(JSON.parse(cachedGalleryData));
                setDataLoading("success");
            } else {
                fetch(`${apiLink}/api/content/gallery`, defaultFetchGet())
                    .then((res) => {
                        switch (res.status) {
                            case 404:
                                return Promise.reject(`Gallery is empty!`);
                            case 200:
                                return res.json();
                            default:
                                return Promise.reject(`HTTP error! status: ${res.status}`);
                        }
                    })
                    .then(async (data) => {
                        const updated = data.gallery.map((img: GalleryImage) => ({
                            ...img,
                            imageLink: apiLink + '/i/gallery/' + img.imageLink,
                            uploadDate: new Date(img.uploadDate).toLocaleDateString()
                        }));
                        setGalleryData(updated);
                        sessionStorage.setItem(`cachedGalleryData`, JSON.stringify(updated));
                        setDataLoading("success");
                    })
                    .catch((err) => {
                        setDataLoading("fail");
                        console.error('Error fetching data:', err);
                    });
            }
        } catch (error) {
            setDataLoading("fail");
        }
    }, []);

    return (
        <Template isHomepage={false}>
            <ScaleUpImage imageUrl={sclupImage} setSclupImage={setSclupImage} scaleUpActive={scaleUpActive} setScaleUpActive={setScaleUpActive} />
            <div className='gallery-header'>
                <div></div>
                <h1>GALERİ</h1>
                <div></div>
            </div>
            <div className='gallery-cont'>
                {dataLoading === "success" && galleryData.length > 0 ?
                    galleryData.map((item, index) => (
                        <div key={index} className='gallery-item'>
                            <div className="image-wrap">
                                <img
                                    src={item.imageLink}
                                    alt={`Galeri fotoğrafı ${index}`}
                                    loading="lazy"
                                    onClick={() => handleScaleUp(item.imageLink)}
                                    onError={() => {
                                        setGalleryData((prevList) => prevList.filter((_, i) => i !== index));
                                    }}
                                />
                            </div>
                            <div className='gallery-item-details'>
                                {item.title && <p>{item.title}</p>}
                                <span>Tarih - {item.uploadDate}</span>
                            </div>
                        </div>
                    )) : dataLoading === "loading" ?
                        <h1>Yükleniyor...</h1> :
                        <h1>Galeride fotoğraf bulunamadı.</h1>
                }
            </div>
        </Template>
    )
}

export default PAGE_GALLERY;