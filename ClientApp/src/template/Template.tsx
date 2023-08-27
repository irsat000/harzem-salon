import React from 'react';

const Template: React.FC<{
  children: any
}> = ({ children }) => {
  return (
    <div className="page_content">
      <header>
        <div className='header_1'>
          <span className='business_name'>Siteler Kuaför & Güzellik Salonu</span>
          <div className='account-cont'>
            <span>BAKİYE: 0,00 TL</span>
          </div>
        </div>
        <div className='header_seperator'></div>
        <div className='header_2'>
          <h1 className='brand_name'>HARZEM Salon</h1>
          <nav>
            
          </nav>
        </div>
        <div className='header_2'>

        </div>
      </header>
      <nav>
        {/* Navigation menu */}
      </nav>
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
