import React, { useState } from 'react';
import Template from '../components/Template';
import '../styles/gallery.css';
import { XLg } from 'react-bootstrap-icons';



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
    const date = new Date();

    const gallery = [
        {
            image: require('../assets/images/gallery_temp/1.jpg'),
            description: "Bugün de böyle bir şeyler yaptık 1 :)",
            uploadDate: date.toLocaleDateString()
        },
        {
            image: require('../assets/images/gallery_temp/2.jpg'),
            description: "Bugün de böyle bir şeyler yaptık 2 :)",
            uploadDate: date.toLocaleDateString()
        },
        {
            image: require('../assets/images/gallery_temp/3.jpg'),
            description: "Bugün de böyle bir şeyler yaptık 3 :)",
            uploadDate: date.toLocaleDateString()
        },
        {
            image: require('../assets/images/gallery_temp/4.jpg'),
            description: "Bugün de böyle bir şeyler yaptık 4 :)",
            uploadDate: date.toLocaleDateString()
        },
        {
            image: require('../assets/images/gallery_temp/5.jpg'),
            description: "Bugün de böyle bir şeyler yaptık 5 :)",
            uploadDate: date.toLocaleDateString()
        },
        {
            image: require('../assets/images/gallery_temp/6.jpg'),
            description: "Bugün de böyle bir şeyler yaptık 6 :)",
            uploadDate: date.toLocaleDateString()
        },
        {
            image: require('../assets/images/gallery_temp/7.jpg'),
            description: "Bugün de böyle bir şeyler yaptık 7 :)",
            uploadDate: date.toLocaleDateString()
        },
        {
            image: require('../assets/images/gallery_temp/8.jpg'),
            description: "Bugün de böyle bir şeyler yaptık 8 :)",
            uploadDate: date.toLocaleDateString()
        },
        {
            image: require('../assets/images/gallery_temp/9.jpg'),
            description: "Bugün de böyle bir şeyler yaptık 9 :)",
            uploadDate: date.toLocaleDateString()
        },
        {
            image: require('../assets/images/gallery_temp/10.jpg'),
            description: "Bugün de böyle bir şeyler yaptık 10 :)",
            uploadDate: date.toLocaleDateString()
        },
    ];

    const [scaleUpActive, setScaleUpActive] = useState(false);
    const [sclupImage, setSclupImage] = useState<undefined | string>(undefined);

    const handleScaleUp = (imageUrl: string) => {
        setSclupImage(imageUrl);
        setScaleUpActive(true);
    }

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
                    {gallery.map((item, index) => (
                        <div key={index} className='gallery-item'>
                            <img src={item.image} alt='Galeri fotoğrafı' onClick={() => handleScaleUp(item.image)} />
                            <div className='gallery_item_details'>
                                <p>{item.description}</p>
                                <span>Tarih - {item.uploadDate}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        </Template>
    )
}

export default PAGE_GALLERY;