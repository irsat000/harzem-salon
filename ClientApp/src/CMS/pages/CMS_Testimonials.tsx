import React, { useEffect, useState } from 'react';
import CMS_Template from '../components/CMS_Template';


const CMS_TESTIMONIALS = () => {
    // Use useEffect here and fetch from database
    const [testimonials, setTestimonials] = useState([
        {
            "id": 1,
            "fullName": "Sümbül Güneş",
            "content": "Çalışanlar işlerini özenle yapıyor, Songül hanım işinin çok ehli. 3 yıldır devamlı müşterisiyim."
        },
        {
            "id": 2,
            "fullName": "Fatma Sönmez",
            "content": "Hayatımda gördüğüm en iyi hizmeti burada aldım. Kullanılan ürünler gayet kaliteli."
        },
        {
            "id": 3,
            "fullName": "Suzan Söke",
            "content": "Sırada beklerken diğer müşterilerle bol bol sohbet ettik. Sadece çalışanlar değil, müşteriler de kaliteli insanlar."
        },
        {
            "id": 4,
            "fullName": "Ayşe Gümüş",
            "content": "Songül hanımla çok eskiden beri arkadaşız. Yine de müşterilerin hakkına girip sırada beni öne geçirmiyor. Dürüst insanlar her zaman hak ettiğine sahip olur."
        }
    ]);

    // Deletes from the testomonials which then will replace the database records when saved
    const handleDelete = (indexToDelete: number) => {
        const updatedTestimonials = testimonials.filter((_, index) => index !== indexToDelete);
        setTestimonials(updatedTestimonials);
    };

    // New testimonial form data
    const [tFormData, setTFormData] = useState({
        fullName: '',
        content: '',
    });

    // Generic state change handling
    const handleTFormChange = (e: any) => {
        const { name, value } = e.target;
        setTFormData({
            ...tFormData,
            [name]: value,
        });
    };

    const handleNewTestimonial = (e: any) => {
        e.preventDefault();

        // New object
        const newTestimonial = {
            id: 0,
            fullName: tFormData.fullName,
            content: tFormData.content,
        };

        // Update the testimonials using spread operator
        const updatedTestimonials = [...testimonials, newTestimonial];
        setTestimonials(updatedTestimonials);

        // Clear the form data after adding the testimonial
        setTFormData({
            fullName: '',
            content: '',
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
                {testimonials && testimonials.length > 0 ?
                    <div className="testimonial_list">
                        {testimonials.map((t, index) => (
                            <div className="testimonial-item" key={index}>
                                <span className='fullName'>{t.fullName}</span>
                                <p className='content'>{t.content}</p>
                                <div className="options">
                                    <span className='delete' onClick={() => handleDelete(index)}>Sil</span>
                                    <span className='update'>Güncelle</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    : <h3>Hiç yorum yok!</h3>}
                <div className="save-cont">
                    <button type='button'>Değişiklikleri Kaydet</button>
                </div>
            </div>
        </CMS_Template>
    )
}

export default CMS_TESTIMONIALS;