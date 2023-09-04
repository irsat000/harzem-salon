import React from 'react';
import Template from '../template/Template';
import '../styles/offers.css';




const Page_Offers = () => {

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
                            <li>Saç + Boya</li>
                            <li>Protez tırnak + Kalıcı oje</li>
                            <li>Kaş & Bıyık + Ağda</li>
                        </ul>
                    </div>
                </div>
            </>
        </Template>
    )
}

export default Page_Offers;