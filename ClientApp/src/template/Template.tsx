import React from 'react';
import { BoxArrowLeft, List } from 'react-bootstrap-icons';

const Template: React.FC<{
  children: any
}> = ({ children }) => {
  return (
    <div className="page_content">
      <header>
        <div className='header_1'>
          <span className='business_name'>Siteler Kuaför & Güzellik Salonu</span>
          <div className='drawer_btn'>
            <List />
          </div>
          <div className='balance-cont'>
            <div className='account-logout'>
              <BoxArrowLeft />
            </div>
            <span>BAKİYE: 0,00 TL</span>
          </div>
        </div>
        <div className='header_seperator'></div>
        <div className='header_2'>
          <h1 className='brand_name'>HARZEM Salon</h1>
          <nav>
            <a>HİZMETLER</a>
            <a>GALERİ</a>
            <a>HAKKIMIZDA</a>
          </nav>
        </div>
        <div className='header_3'>
          <button type='button'>
            Kampanyalar
          </button>
        </div>
      </header>
      <main>
        {children} {/* This is where the content from the Page component will go */}
      </main>
      <footer>
        {/* Footer content */}
      </footer>
    </div>
  );
};

export default Template;
