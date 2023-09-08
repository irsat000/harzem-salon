import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PAGE_HOME from './pages/Home';
import PAGE_OFFERS from './pages/Offers';
import PAGE_GALLERY from './pages/Gallery';
import CMS from './pages/CMS';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<PAGE_HOME />} />
      <Route path="/kampanyalar" element={<PAGE_OFFERS />} />
      <Route path="/galeri" element={<PAGE_GALLERY />} />
      <Route path="/panel" element={<CMS />} />
    </Routes>
  );
}
export default App;