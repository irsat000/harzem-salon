import React, { useEffect, useState } from 'react';
import Template from '../components/Template';
import '../styles/offers.css';
import { defaultFetchGet } from '../utility/fetchUtils';



type DiscountCombination = {
    id: number,
    combination: string
}

type DiscountCombinationsModel = DiscountCombination[];


const PAGE_OFFERS = () => {

    const [discountCombinationsData, setDiscountCombinationsData] = useState<DiscountCombinationsModel | null>(null);

    useEffect(() => {
        const cachedDiscountCombinationsData = localStorage.getItem(`cachedDiscountCombinationsData`);

        if (cachedDiscountCombinationsData) {
            setDiscountCombinationsData(JSON.parse(cachedDiscountCombinationsData));
        } else {
            fetch(`https://localhost:7173/api/content/discount_combinations`, defaultFetchGet())
                .then((res) => {
                    switch (res.status) {
                        case 404:
                            throw new Error(`Discount combination list is empty!`);
                        case 200:
                            return res.json();
                        default:
                            throw new Error(`HTTP error! status: ${res.status}`);
                    }
                })
                .then((data) => {
                    setDiscountCombinationsData(data.discountCombinations);
                    localStorage.setItem(`cachedDiscountCombinationsData`, JSON.stringify(data.discountCombinations));
                })
                .catch((err) => console.error('Error fetching data:', err));
        }
    }, [])

    return (
        <Template isHomepage={false}>
            <>
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
                {discountCombinationsData ?
                    <div className='offer-item'>
                        <div className='offer-header'>
                            <h1>Kombinasyon Tarifeleri</h1>
                        </div>
                        <div className='offer-details'>
                            <p>
                                Listelenen hizmet kombinasyonlarında harcama yaptığınızda <span className='highlighted'>%5</span> indirim sunuyoruz.
                            </p>
                            <div className='offer_detail-seperator'></div>
                            <ul>
                                {discountCombinationsData.map(comb => (<li key={comb.id}>{comb.combination}</li>))}
                            </ul>
                        </div>
                    </div> : <></>
                }
            </>
        </Template>
    )
}

export default PAGE_OFFERS;