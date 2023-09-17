import React, { useEffect, useState } from 'react';
import CMS_TEMPLATE from '../components/CMS_Template';
import { defaultFetchGet } from '../../utility/fetchUtils';
import SaveAll from '../components/CMS_SaveAll';


const CMS_OFFERS = () => {

    // Use useEffect here and fetch from database
    const [combinationsData, setCombinationsData] = useState<string[]>([]);

    useEffect(() => {
        fetch(`https://localhost:7173/api/content/discount_combinations`, defaultFetchGet())
            .then((res) => {
                switch (res.status) {
                    case 404:
                        // List is empty, it's ok for cms
                        console.log(`Combination list is empty but it's ok`);
                        break;
                    case 200:
                        return res.json();
                    default:
                        throw new Error(`HTTP error! status: ${res.status}`);
                }
            })
            .then((data) => {
                if (data && data.discountCombinations) {
                    setCombinationsData(data.discountCombinations);
                }
            })
            .catch((err) => console.error('Error fetching data:', err));
    }, []);

    // Deletes from the combos which then will replace the database records when saved
    const handleDelete = (indexToDelete: number) => {
        const updatedCombinations = combinationsData.filter((_, index) => index !== indexToDelete);
        setCombinationsData(updatedCombinations);
    };

    // New combo form data
    const [newCombo, setNewCombo] = useState('');

    // Add new record to combos
    const handleNewCombo = (e: any) => {
        e.preventDefault();

        if (newCombo.trim().length < 7) {
            alert('Kombinasyon en az 7 karakter olmalı');
            return;
        }

        // Update the combos using spread operator
        const updatedCombinations = [...combinationsData, newCombo];
        setCombinationsData(updatedCombinations);

        // Clear the form data after adding the combo
        setNewCombo('');
    }

    // 0: Default, 1: Loading, 2: Success
    const [saveAllStatus, setSaveAllStatus] = useState(0);
    // Update database
    const handleSaveAll = () => {
        if (combinationsData.length < 1) {
            alert("Liste boş!");
            return;
        }

        setSaveAllStatus(1);
        fetch(`https://localhost:7173/cms/update-discount_combinations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(combinationsData)
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
        <CMS_TEMPLATE panelTitle='KAMPANYALAR'>
            <div className="cms_main-offers">
                <div className="new_combo_discount">
                    <form onSubmit={handleNewCombo}>
                        <input type='text'
                            placeholder='Kombinasyon'
                            className='combination'
                            name='combination'
                            value={newCombo}
                            onChange={(e) => setNewCombo(e.target.value)} />
                        <button type='submit' className='submit_button'>Yeni Ekle</button>
                    </form>
                </div>
                {combinationsData.length > 0 ? <>
                    <div className="combination_list">
                        {combinationsData.map((combo, index) => (
                            <div className="combo-item" key={index}>
                                <span className='combination'>{combo}</span>
                                <div className="options">
                                    <span className='delete' onClick={() => handleDelete(index)}>Sil</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <SaveAll saveAllStatus={saveAllStatus} handleSaveAll={handleSaveAll} />
                </> : <h3>Hiç bir kombinasyon kampanyası yok!</h3>
                }
            </div>
        </CMS_TEMPLATE>
    )
}

export default CMS_OFFERS;