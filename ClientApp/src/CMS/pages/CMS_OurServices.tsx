import React, { useEffect, useMemo, useState } from 'react';
import CMS_TEMPLATE from '../components/CMS_Template';
import { defaultFetchGet } from '../../utility/fetchUtils';
import SaveAll from '../components/CMS_SaveAll';
import { OurServicesModel, ServiceCategory } from '../../pages/Home';
import { convertToAscii } from '../../utility/utils';
import { ScaleUpImage } from '../../pages/Gallery';


const CMS_OUR_SERVICES = () => {
    // Use useEffect here and fetch from database
    const [ourServicesData, setOurServicesData] = useState<OurServicesModel>([]);

    useEffect(() => {
        fetch(`https://localhost:7173/api/content/our_services`, defaultFetchGet())
            .then((res) => {
                switch (res.status) {
                    case 404:
                        // List is empty, it's ok for cms
                        console.log(`Our services list is empty but it's ok`);
                        break;
                    case 200:
                        return res.json();
                    default:
                        throw new Error(`HTTP error! status: ${res.status}`);
                }
            })
            .then(async (data) => {
                if (data && data.categories) {
                    // Replace image urls with the rendered ones.
                    const updatedCategories = await Promise.all(
                        data.categories.map(async (cate: ServiceCategory) => {
                            const updatedOurServices = await Promise.all(
                                cate.ourServices.map(async (service) => {
                                    const updatedImages = (await Promise.all(
                                        service.miniGalleryImages.map(async (imgLink) => {
                                            try {
                                                const importedImage = await import(`../../assets/images/mini_gallery/${imgLink}`);
                                                return importedImage.default;
                                            } catch (error) {
                                                return null;
                                            }
                                        })
                                    )).filter((image) => image !== null); // Clean from nulls when there are errors

                                    return {
                                        ...service,
                                        miniGalleryImages: updatedImages,
                                    };
                                })
                            );

                            return {
                                ...cate,
                                ourServices: updatedOurServices
                            }
                        }));
                    setOurServicesData(updatedCategories);
                }
            })
            .catch((err) => console.error('Error fetching data:', err));
    }, []);

    // Category code and name mapping
    const categoryMap: { [key: string]: string } = useMemo(() => {
        return {
            'sac': 'Saç',
            'tirnak': 'Tırnak',
            'makyaj': 'Makyaj',
            'kirpik': 'Kirpik',
            'dudak': 'Dudak',
            'epilasyon_depilasyon': 'Epilasyon Depilasyon'
        };
    }, []);

    // Deletes from the our services which then will replace the database records when saved
    const handleDelete = (cateIndex: number, indexToDelete: number) => {
        const tempData = [...ourServicesData];
        tempData[cateIndex].ourServices = tempData[cateIndex].ourServices.filter((_, index) => index !== indexToDelete);
        setOurServicesData(tempData);
    };

    // Deletes from the images of services
    const handleDeleteImage = (cateIndex: number, serviceIndex: number, indexToDelete: number) => {
        const tempData = [...ourServicesData];
        tempData[cateIndex].ourServices[serviceIndex].miniGalleryImages =
            tempData[cateIndex].ourServices[serviceIndex].miniGalleryImages.filter((_, index) => index !== indexToDelete);
        setOurServicesData(tempData);
    };

    // New service form data
    const [newServiceData, setNewServiceData] = useState({
        cateCode: 'sac',
        serviceName: ''
    });
    // New service, handle inputs
    const handleNewServiceChange = (e: any) => {
        const { name, value } = e.target;
        setNewServiceData({
            ...newServiceData,
            [name]: value,
        });
    };

    // Add new record to combos
    const handleNewService = (e: any) => {
        e.preventDefault();

        if (newServiceData.serviceName.trim().length < 3) {
            alert('Hizmet adı en az 3 karakter olmalı');
            return;
        }

        // Get and check the category index based on cateCode
        const cateIndex = ourServicesData.findIndex(cate => cate.cateCode === newServiceData.cateCode);
        if (cateIndex === -1) {
            throw new Error("Category not found.");
        }

        // Create a copy of the original
        const updatedData = [...ourServicesData];

        // Create a new service object
        updatedData[cateIndex].ourServices.push({
            serviceName: newServiceData.serviceName,
            serviceCode: convertToAscii(newServiceData.serviceName),
            miniGalleryImages: []
        });

        // Update the our services
        setOurServicesData(updatedData);

        // Clear the form data after pushing
        setNewServiceData({
            ...newServiceData,
            serviceName: ''
        });
    }

    // 0: Default, 1: Loading, 2: Success
    const [saveAllStatus, setSaveAllStatus] = useState(0);
    // Update database
    const handleSaveAll = () => {
        if (ourServicesData.length < 1) {
            alert("Liste boş!");
            return;
        }

        setSaveAllStatus(1);
        fetch(`https://localhost:7173/cms/update-our_services`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(ourServicesData)
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


    // Scale up for image
    const [scaleUpActive, setScaleUpActive] = useState(false);
    const [sclupImage, setSclupImage] = useState<undefined | string>(undefined);

    const handleScaleUp = (imageUrl: string) => {
        setSclupImage(imageUrl);
        setScaleUpActive(true);
    }

    return (
        <CMS_TEMPLATE panelTitle='HİZMETLERİMİZ'>
            <ScaleUpImage imageUrl={sclupImage} setSclupImage={setSclupImage} scaleUpActive={scaleUpActive} setScaleUpActive={setScaleUpActive} />
            <div className="cms_main-our_services">
                <div className="new_service">
                    <form onSubmit={handleNewService}>
                        <select name='cateCode' className='cateCode' value={newServiceData.cateCode} onChange={handleNewServiceChange}>
                            <option value='sac'>Saç</option>
                            <option value='tirnak'>Tırnak</option>
                            <option value='makyaj'>Makyaj</option>
                            <option value='kirpik'>Kirpik</option>
                            <option value='dudak'>Dudak</option>
                            <option value='epilasyon_depilasyon'>Epilasyon Depilasyon</option>
                        </select>
                        <input type='text'
                            placeholder='Hizmet adı'
                            className='serviceName'
                            name='serviceName'
                            value={newServiceData.serviceName}
                            onChange={handleNewServiceChange} />
                        <button type='submit' className='submit_button'>Yeni Ekle</button>
                    </form>
                </div>
                {ourServicesData.length > 0 ? <>
                    <div className="our_services_cont">
                        {ourServicesData.map((cate, cIndex) => {
                            let cateName = categoryMap[cate.cateCode];
                            if (!cateName) { return null; }
                            return (
                                <div className="our_services_list-item" key={cIndex}>
                                    <h3 className='cateName'>{cateName}</h3>
                                    {cate.ourServices.length > 0 ? cate.ourServices.map((service, sIndex) => (
                                        <div className="service-item" key={'service_' + sIndex}>
                                            <div className="service-wrap">
                                                <span className='serviceName'>{service.serviceName}</span>
                                                <span className='add_image'>Yeni Foto</span>
                                                <span className='delete' onClick={() => handleDelete(cIndex, sIndex)}>Sil</span>
                                            </div>
                                            {!service.miniGalleryImages.length || // 0 is falsy
                                                <div className="mini_gallery">
                                                    {service.miniGalleryImages.map((imgLink, mgiIndex) => {
                                                        return (
                                                            <div className="img_wrap" key={mgiIndex}>
                                                                <img src={imgLink} alt={`Mini galeri fotoğrafı ${mgiIndex}`} onClick={() => handleScaleUp(imgLink)} />
                                                                <span className='delete' onClick={() => handleDeleteImage(cIndex, sIndex, mgiIndex)}>Sil</span>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            }
                                        </div>
                                    )) : <span className='service_list_empty'>Bu kategoride hizmet yok!</span>}
                                </div>
                            )
                        })}
                    </div>
                    <SaveAll saveAllStatus={saveAllStatus} handleSaveAll={handleSaveAll} />
                </> : <h3>Hiç bir hizmet yok!</h3>
                }
            </div>
        </CMS_TEMPLATE>
    )
}

export default CMS_OUR_SERVICES;