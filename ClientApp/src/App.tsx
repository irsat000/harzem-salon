import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PAGE_HOME from './pages/Home';
import PAGE_OFFERS from './pages/Offers';
import PAGE_GALLERY from './pages/Gallery';
import CMS_HOME from './CMS/pages/CMS_Home';
import CMS_LOGIN from './CMS/pages/CMS_Login';
import CMS_TESTIMONIALS from './CMS/pages/CMS_Testimonials';
import CMS_OFFERS from './CMS/pages/CMS_Offers';
import CMS_OUR_SERVICES from './CMS/pages/CMS_OurServices';
import CMS_GALLERY from './CMS/pages/CMS_Gallery';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<PAGE_HOME />} />
      <Route path="/kampanyalar" element={<PAGE_OFFERS />} />
      <Route path="/galeri" element={<PAGE_GALLERY />} />

      <Route path="/panel" element={<CMS_HOME />} />
      <Route path="/panel/giris" element={<CMS_LOGIN />} />
      <Route path="/panel/yorumlar" element={<CMS_TESTIMONIALS />} />
      <Route path="/panel/kampanyalar" element={<CMS_OFFERS />} />
      <Route path="/panel/hizmetlerimiz" element={<CMS_OUR_SERVICES />} />
      <Route path="/panel/galeri" element={<CMS_GALLERY />} />
    </Routes>
  );
}
export default App;