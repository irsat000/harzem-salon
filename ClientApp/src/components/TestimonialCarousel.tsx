
import React, { useEffect, useMemo, useState } from 'react';
import { defaultFetchGet } from '../utility/fetchUtils';

type Testimonial = {
    id: number;
    fullName: string;
    content: string;
}

const TestimonialCarousel = () => {

    const [testimonialsData, setTestimonialsData] = useState<Testimonial[] | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    // Stop sign
    const [intervalPaused, setIntervalPaused] = useState(false);

    useEffect(() => {
        const cachedTestimonialsData = JSON.parse(localStorage.getItem(`cachedTestimonialsData`) || 'null');

        if (cachedTestimonialsData && new Date() < new Date(cachedTestimonialsData.expire)) {
            setTestimonialsData(cachedTestimonialsData.testimonials);
        } else {
            fetch(`https://localhost:7173/api/content/testimonials`, defaultFetchGet())
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
                .then((data) => {
                    // Create expiration date
                    const expirationDate = new Date();
                    expirationDate.setDate(expirationDate.getDate() + 2);

                    // Assign data and cache it
                    setTestimonialsData(data.testimonials);
                    localStorage.setItem(`cachedTestimonialsData`, JSON.stringify({
                        testimonials: data.testimonials,
                        expire: expirationDate
                    }));
                })
                .catch((err) => console.error('Error fetching data:', err));
        }
    }, []);

    // Seperate than data fetching logic to prevent infinite loop
    // If intervalPaused is not true, this changes the shown testomonial every 5 seconds
    useEffect(() => {
        if (testimonialsData) {
            const carouselInterval = setInterval(() => {
                if (!intervalPaused) {
                    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
                }
            }, 5000);

            return () => clearInterval(carouselInterval);
        }
    }, [testimonialsData, intervalPaused]);

    // Allows buttons to switch between testomonials.
    // Stops the automatic change for 10 seconds, good for UX
    // intervalPaused == false condition makes sure there won't be multiple waiting setTimeout
    const handleDotClick = (index: number) => {
        setActiveIndex(index);
        if (intervalPaused === false) {
            setIntervalPaused(true);
            setTimeout(() => {
                setIntervalPaused(false);
            }, 10000);
        }
    };

    return testimonialsData ? <>
        <div className='section-header'>
            <div></div>
            <h2>REFERANSLAR</h2>
            <div></div>
        </div>
        <section className='testimonial-section'>
            <div className='testimonial-carousel' style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
                {testimonialsData.map((testimonial, index) => (
                    <div key={index} className={`testimonial ${index === activeIndex ? 'active' : ''}`} >
                        <p className="customerComment">"{testimonial.content}"</p>
                        <p className="customerFullname">- {testimonial.fullName}</p>
                    </div>
                ))}
            </div>
            <div className="testimonial-slider">
                {testimonialsData.map((_, index) => (
                    <div key={index} className={`dot ${index === activeIndex ? 'active' : ''}`} onClick={() => handleDotClick(index)} />
                ))}
            </div>
        </section>
    </> : <></>;
}

export default TestimonialCarousel;