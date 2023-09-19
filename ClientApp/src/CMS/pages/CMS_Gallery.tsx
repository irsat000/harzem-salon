import React, { useEffect, useState } from 'react';
import CMS_TEMPLATE from '../components/CMS_Template';
import { GalleryImage, ScaleUpImage } from '../../pages/Gallery';
import { defaultFetchGet } from '../../utility/fetchUtils';
import SaveAll from '../components/CMS_SaveAll';


// Allowed types for upload
//const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];

const CMS_GALLERY = () => {
    const [galleryData, setGalleryData] = useState<GalleryImage[]>([]);

    useEffect(() => {
        fetch(`https://localhost:7173/api/content/gallery`, defaultFetchGet())
            .then((res) => {
                switch (res.status) {
                    case 404:
                        // List is empty, it's ok for cms
                        console.log(`Gallery list is empty but it's ok`);
                        break;
                    case 200:
                        return res.json();
                    default:
                        throw new Error(`HTTP error! status: ${res.status}`);
                }
            })
            .then((data) => {
                const updated = data.gallery.map((img: GalleryImage) => ({
                    ...img,
                    imageLink: 'https://localhost:7173/i/gallery/' + img.imageLink,
                    uploadDate: new Date(img.uploadDate).toLocaleDateString()
                }));
                setGalleryData(updated);
            })
            .catch((err) => console.error('Error fetching data:', err));
    }, []);



    // New image form data
    const [newImage, setNewImage] = useState<File | null>(null);
    const [newDescription, setNewDescription] = useState('');

    const handleNewImageChange = (e: any) => {
        // Get the selected image file
        const selectedImage = e.target.files[0];
        // Check
        if (!selectedImage || selectedImage.type.includes('image/')) {
            alert('Sadece fotoğraflar yüklenebilir!');
            e.target.value = ''; // Clear input
            return;
        }
        // OK
        setNewImage(selectedImage);
    };

    // Upload file and register the image
    const handleNewImageSubmit = (e: any) => {
        e.preventDefault();

        // Check
        if (!newImage || !newImage.type.includes('image/')) {
            alert('Dosya yok ya da fotoğraf değil.');
            setNewImage(null); // Reset newImage
            return;
        }



        const newImageData = {
            imageLink: newImage,
            title: newDescription,
            uploadDate: new Date().toLocaleString()
        }
        console.log(newImageData);
        console.log(galleryData);
    }

    // Scale up images
    const [scaleUpActive, setScaleUpActive] = useState(false);
    const [sclupImage, setSclupImage] = useState<undefined | string>(undefined);

    const handleScaleUp = (imageUrl: string) => {
        setSclupImage(imageUrl);
        setScaleUpActive(true);
    }

    // 0: Default, 1: Loading, 2: Success
    const [saveAllStatus, setSaveAllStatus] = useState(0);
    // Update database
    const handleSaveAll = () => {
        if (galleryData.length === 0) {
            alert("Liste boş!");
            return;
        }

        setSaveAllStatus(1);
        fetch(`https://localhost:7173/cms/update-gallery`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(galleryData)
        })
            .then((res) => {
                switch (res.status) {
                    case 200:
                        setSaveAllStatus(2);
                        break;
                    default:
                        alert("HATA!");
                        throw new Error(`HTTP error! status: ${res.status}`);
                }
            })
            .catch((err) => {
                alert("HATA!");
                console.error('Fetch error:', err)
            })
            .finally(() => {
                // Wait 3 seconds to show Check icon as in Success
                setTimeout(() => {
                    setSaveAllStatus(0);
                }, 3000);
            });
    }

    return (
        <CMS_TEMPLATE panelTitle='GALERİ'>
            <ScaleUpImage imageUrl={sclupImage} setSclupImage={setSclupImage} scaleUpActive={scaleUpActive} setScaleUpActive={setScaleUpActive} />
            <div className='cms_main-gallery'>
                <div className='new_image'>
                    <form onSubmit={handleNewImageSubmit}>
                        <input type='file' name='image' onChange={handleNewImageChange} />
                        <input type='text'
                            placeholder='Açıklama buraya'
                            className='description'
                            name='description'
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)} />
                        <button type='submit' className='submit_button'>Yeni Ekle</button>
                    </form>
                </div>
                {galleryData.length > 0 ? <>
                    <div className='gallery-cont'>
                        {galleryData.map((item, index) => (
                            <div key={index} className='gallery-item'>
                                <div className="image-wrap">
                                    <img src={item.imageLink} alt={`Galeri fotoğrafı ${index}`} onClick={() => handleScaleUp(item.imageLink)} />
                                </div>
                                <div className='gallery_item_details'>
                                    <p>{item.title}</p>
                                    <span>Tarih - {item.uploadDate}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <SaveAll saveAllStatus={saveAllStatus} handleSaveAll={handleSaveAll} />
                </> : <h3>Galeride fotoğraf yok.</h3>}
            </div>
        </CMS_TEMPLATE>
    )
}

export default CMS_GALLERY;