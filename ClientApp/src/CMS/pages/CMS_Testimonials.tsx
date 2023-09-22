import React, { useEffect, useState } from 'react';
import CMS_TEMPLATE from '../components/CMS_Template';
import { defaultFetchGet } from '../../utility/fetchUtils';
import { Testimonial } from '../../components/TestimonialCarousel';
import SaveAll from '../components/CMS_SaveAll';
import { readAdminJwt } from '../utility/authUtils';


const CMS_TESTIMONIALS = () => {
    // Use useEffect here and fetch from database
    const [testimonialsData, setTestimonialsData] = useState<Testimonial[]>([]);

    useEffect(() => {
        fetch(`https://localhost:7173/api/content/testimonials`, defaultFetchGet())
            .then((res) => {
                switch (res.status) {
                    case 404:
                        // List is empty, it's ok for cms
                        console.log(`Testimonial list is empty but it's ok`);
                        break;
                    case 200:
                        return res.json();
                    default:
                        throw new Error(`HTTP error! status: ${res.status}`);
                }
            })
            .then((data) => {
                if (data && data.testimonials) {
                    setTestimonialsData(data.testimonials);
                }
            })
            .catch((err) => console.error('Error fetching data:', err));
    }, []);

    // Deletes from the testimonials which then will replace the database records when saved
    const handleDelete = (indexToDelete: number) => {
        const updatedTestimonials = testimonialsData.filter((_, index) => index !== indexToDelete);
        setTestimonialsData(updatedTestimonials);
    };

    // New testimonial form data
    const [tFormData, setTFormData] = useState({
        fullName: '',
        content: ''
    });

    // New testimonial, handle inputs
    const handleTFormChange = (e: any) => {
        const { name, value } = e.target;
        setTFormData({
            ...tFormData,
            [name]: value,
        });
    };

    // Add new record to testimonials
    const handleNewTestimonial = (e: any) => {
        e.preventDefault();

        if (tFormData.fullName.trim().length < 3) {
            alert('Ad soyad en az 3 karakter olmalı');
            return;
        }
        else if (tFormData.content.trim().length < 10) {
            alert('Yorum en az 10 karakter olmalı');
            return;
        }

        // New object
        const newTestimonial = {
            fullName: tFormData.fullName,
            content: tFormData.content
        };

        // Update the testimonials using spread operator
        const updatedTestimonials = [...testimonialsData, newTestimonial];
        setTestimonialsData(updatedTestimonials);

        // Clear the form data after adding the testimonial
        setTFormData({
            fullName: '',
            content: '',
        });
    }


    // TESTIMONIAL UPDATES

    // To switch between edit modes (one item at a time)
    const [editMode, setEditMode] = useState<number | null>(null);

    // Temp values for the real update
    const [tempValues, setTempValues] = useState<Testimonial | null>(null);
    const handleUpdateInputChange = (e: any) => {
        const { name, value } = e.target;
        setTempValues({
            ...tempValues!,
            [name]: value,
        });
    };

    // Update the testimonialsData
    const handleUpdate = (index: number, updated: Testimonial) => {
        // Create a copy of the current testimonialsData array
        const updatedTestimonialsData = [...testimonialsData];

        // Update the testimonial at the specified index
        updatedTestimonialsData[index] = {
            ...updatedTestimonialsData[index],
            fullName: updated.fullName,
            content: updated.content,
        };

        // Update the state with the new array
        setTestimonialsData(updatedTestimonialsData);

        // Exit edit mode
        setEditMode(null);
    };

    // Cancel edit mode entirely
    const handleUpdateCancel = () => {
        setEditMode(null);
        setTempValues(null);
    }

    // Switch to edit mode and initialize inputs for easier update
    const handleEditMode = (index: number) => {
        setEditMode(index);
        setTempValues(testimonialsData[index]);
    }

    // 0: Default, 1: Loading, 2: Success
    const [saveAllStatus, setSaveAllStatus] = useState(0);
    // Update database
    const handleSaveAll = () => {
        if (testimonialsData.length < 1) {
            alert("Liste boş!");
            return;
        }

        setSaveAllStatus(1);
        fetch(`https://localhost:7173/cms/update-testimonials`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${readAdminJwt()}`
            },
            body: JSON.stringify(testimonialsData)
        })
            .then((res) => {
                switch (res.status) {
                    case 200:
                        setSaveAllStatus(2);
                        break;
                    default:
                        return Promise.reject("HATA!");
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
        <CMS_TEMPLATE panelTitle='YORUMLAR'>
            <div className="cms_main-testimonials">
                <div className="new_testimonial">
                    <form onSubmit={handleNewTestimonial}>
                        <input type='text'
                            placeholder='AD SOYAD'
                            className='fullName'
                            name='fullName'
                            value={tFormData.fullName}
                            onChange={handleTFormChange} />
                        <textarea
                            placeholder='Yorum buraya'
                            className='content'
                            name='content'
                            value={tFormData.content}
                            onChange={handleTFormChange} ></textarea>
                        <button type='submit' className='submit_button'>Yeni Ekle</button>
                    </form>
                </div>
                {testimonialsData.length > 0 ? <>
                    <div className="testimonial_list">
                        {testimonialsData.map((t, index) => {
                            const isEditMode = editMode === index;
                            return (
                                <div className="testimonial-item" key={index}>
                                    {isEditMode && tempValues ?
                                        <div className='update_testimonial'>
                                            <input
                                                type='text'
                                                placeholder='AD SOYAD'
                                                className='fullName'
                                                name='fullName'
                                                value={tempValues.fullName}
                                                onChange={handleUpdateInputChange} />
                                            <textarea
                                                placeholder='Yorum yaz'
                                                className='content'
                                                name='content'
                                                value={tempValues.content}
                                                onChange={handleUpdateInputChange}></textarea>
                                            <div className='update_testimonial_options'>
                                                <button type="reset" onClick={() => handleUpdateCancel()}>Vazgeç</button>
                                                <button type="button" onClick={() => handleUpdate(index, {
                                                    fullName: tempValues.fullName,
                                                    content: tempValues.content
                                                })}>Kaydet</button>
                                            </div>
                                        </div>
                                        : <>
                                            <span className='fullName'>{t.fullName}</span>
                                            <p className='content'>{t.content}</p>
                                            <div className="options">
                                                <span className='delete' onClick={() => handleDelete(index)}>Sil</span>
                                                <span className='update' onClick={() => handleEditMode(index)}>Güncelle</span>
                                            </div>
                                        </>
                                    }
                                </div>
                            )
                        })}
                    </div>
                    <SaveAll saveAllStatus={saveAllStatus} handleSaveAll={handleSaveAll} />
                </> : <h3>Hiç yorum yok!</h3>
                }
            </div>
        </CMS_TEMPLATE>
    )
}

export default CMS_TESTIMONIALS;