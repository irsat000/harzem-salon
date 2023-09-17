import React from 'react';
import { ArrowClockwise, CheckLg } from 'react-bootstrap-icons';


const SaveAll: React.FC<{
    saveAllStatus: number,
    handleSaveAll: () => void
}> = ({ saveAllStatus, handleSaveAll }) => {
    return (
        <div className="save_all-cont">
            <button type='button' onClick={handleSaveAll} className={saveAllStatus !== 0 ? 'loading' : ''}>
                {saveAllStatus === 1
                    ? <ArrowClockwise className='loading_svg' />
                    : saveAllStatus === 2
                        ? <CheckLg className='success_svg' />
                        : 'Değişiklikleri Kaydet'}
            </button>
        </div>
    );
}

export default SaveAll;