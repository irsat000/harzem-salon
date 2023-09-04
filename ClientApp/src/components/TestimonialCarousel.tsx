
import React, { useEffect, useState } from 'react';


const TestimonialCarousel = () => {

    const testimonials = [
        {
            comment: "Çalışanlar işlerini özenle yapıyor, Songül hanım işinin çok ehli. 3 yıldır devamlı müşterisiyim.",
            fullname: "Sümbül Güneş"
        },
        {
            comment: "Hayatımda gördüğüm en iyi hizmeti burada aldım. Kullanılan ürünler gayet kaliteli.",
            fullname: "Fatma Sönmez"
        },
        {
            comment: "Özgü tam bir kıro, odası gibi dükkanı da temizlemiyor.",
            fullname: "İrşat Akdeniz"
        }
    ];

    // Testomonial Carousel index and stop sign
    const [activeIndex, setActiveIndex] = useState(0);
    const [intervalPaused, setIntervalPaused] = useState(false);

    // If intervalPaused is not true, this changes the shown testomonial every 5 seconds
    useEffect(() => {
        const carouselInterval = setInterval(() => {
            if (intervalPaused == false) {
                setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
            }
        }, 5000);

        return () => clearInterval(carouselInterval);
    }, [intervalPaused, testimonials]);

    // Allows buttons to switch between testomonials.
    // Stops the automatic change for 10 seconds, good for UX
    // intervalPaused == false condition makes sure there won't be multiple waiting setTimeout
    const handleDotClick = (index: number) => {
        setActiveIndex(index);
        if (intervalPaused == false) {
            setIntervalPaused(true);
            setTimeout(() => {
                setIntervalPaused(false);
            }, 10000);
        }
    };

    return (
        <>
            <div className='section-header'>
                <div></div>
                <h2>REFERANSLAR</h2>
                <div></div>
            </div>
            <section className='testimonial-section'>
                <div className='testimonial-carousel' style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className={`testimonial ${index === activeIndex ? 'active' : ''}`} >
                            <p className="customerComment">"{testimonial.comment}"</p>
                            <p className="customerFullname">- {testimonial.fullname}</p>
                        </div>
                    ))}
                </div>
                <div className="testimonial-slider">
                    {testimonials.map((_, index) => (
                        <div key={index} className={`dot ${index === activeIndex ? 'active' : ''}`} onClick={() => handleDotClick(index)} />
                    ))}
                </div>
            </section>
        </>
    )
}

export default TestimonialCarousel;