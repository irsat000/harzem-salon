import React, { useEffect, useState } from 'react';
import Template from '../components/Template';
import '../styles/offers.css';
import { defaultFetchGet } from '../utility/fetchUtils';
import { apiLink } from '../utility/utils';





const PAGE_OFFERS = () => {

    const [discountCombinationsData, setDiscountCombinationsData] = useState<string[] | null>(null);

    useEffect(() => {
        const cachedDiscountCombinationsData = JSON.parse(sessionStorage.getItem(`cachedDiscountCombinationsData`) || 'null');

        if (cachedDiscountCombinationsData) {
            setDiscountCombinationsData(cachedDiscountCombinationsData);
        } else {
            fetch(`${apiLink}/api/content/discount_combinations`, defaultFetchGet())
                .then((res) => {
                    switch (res.status) {
                        case 404:
                            return Promise.reject(`Discount combination list is empty!`);
                        case 200:
                            return res.json();
                        default:
                            return Promise.reject(`HTTP error! status: ${res.status}`);
                    }
                })
                .then((data) => {
                    // Assign data and cache it
                    setDiscountCombinationsData(data.discountCombinations);
                    sessionStorage.setItem(`cachedDiscountCombinationsData`, JSON.stringify(data.discountCombinations));
                })
                .catch((err) => console.error('Error fetching data:', err));
        }
    }, [])

    return (
        <Template isHomepage={false}>
            <>
                {/*
                <div className='offer-item'>
                    <div className='offer-header'>
                        <h1>Arkadaşını Getir</h1>
                    </div>
                    <div className='offer-details'>
                        <p>
                            Getirdiğiniz her bir kişinin harcamalarının <span className='highlighted'>%5'i</span> size kupon olarak yansıyacaktır. (Burada gelen kişi referansından aldığı key'i verebilir ya da anneme referansını söyleyebilir.)
                        </p>
                    </div>
                </div>
                <div className='offer-seperator'></div>
                */}
                {discountCombinationsData && discountCombinationsData.length ?
                    <div className='offer-item'>
                        <div className='offer-header'>
                            <h1>Kombinasyon Tarifeleri</h1>
                        </div>
                        <div className='offer-details'>
                            <p>
                                Listelenen hizmet kombinasyonlarında harcama yaptığınızda <span className='highlighted'>%5</span> indirim sunuyoruz.
                            </p>
                            <div className='offer-detail-seperator'></div>
                            <ul>
                                {discountCombinationsData.map((comb, index) => (<li key={index}>{comb}</li>))}
                            </ul>
                        </div>
                    </div>
                    :
                    <div className='offer-item'>
                        <div className='offer-header'>
                            <h1>Henüz kampanyamız yok.</h1>
                        </div>
                    </div>
                }
            </>
        </Template >
    )
}

export default PAGE_OFFERS;