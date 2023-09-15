import React, { useEffect, useState } from 'react';
import CMS_Template from '../components/CMS_Template';
import { defaultFetchGet } from '../../utility/fetchUtils';
import { Testimonial } from '../../components/TestimonialCarousel';


const CMS_TESTIMONIALS = () => {
    // Use useEffect here and fetch from database
    const [testimonialsData, setTestimonialsData] = useState<Testimonial[]>([]);

    useEffect(() => {
        fetch(`https://localhost:7173/api/content/testimonials`, defaultFetchGet())
            .then((res) => {
                switch (res.status) {
                    case 404:
                        // List is empty, it's ok for cms
                        break;
                    case 200:
                        return res.json();
                    default:
                        throw new Error(`HTTP error! status: ${res.status}`);
                }
            })
            .then((data) => {
                // Assign data
                setTestimonialsData(data.testimonials);
            })
            .catch((err) => console.error('Error fetching data:', err));
    }, []);

    // Deletes from the testomonials which then will replace the database records when saved
    const handleDelete = (indexToDelete: number) => {
        const updatedTestimonials = testimonialsData.filter((_, index) => index !== indexToDelete);
        setTestimonialsData(updatedTestimonials);
    };

    // New testimonial form data
    const [tFormData, setTFormData] = useState({
        fullName: '',
        content: ''
    });

    // New testimonial handle inputs
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


    // Update database
    const handleSaveAll = () => {
        fetch(`https://localhost:7173/cms/update-testimonials`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(testimonialsData)
        })
            .then((res) => {
                switch (res.status) {
                    case 200:
                        alert("Yorumlar kaydedildi.");
                        break;
                    default:
                        alert("HATA!");
                        throw new Error(`HTTP error! status: ${res.status}`);
                }
            })
            .catch((err) => {
                alert("HATA!");
                console.error('Fetch error:', err)
            });
    }

    return (
        <CMS_Template panelTitle='YORUMLAR'>
            <div className="csm_main-testimonials">
                <div className="new_testimonial">
                    <form className="inputs" onSubmit={handleNewTestimonial}>
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
                        <button type='submit'>Yeni Ekle</button>
                    </form>
                </div>
                {testimonialsData.length > 0 ?
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
                    : <h3>Hiç yorum yok!</h3>}
                <div className="save-cont">
                    <button type='button' onClick={handleSaveAll}>Değişiklikleri Kaydet</button>
                </div>
            </div>
        </CMS_Template>
    )
}

export default CMS_TESTIMONIALS;