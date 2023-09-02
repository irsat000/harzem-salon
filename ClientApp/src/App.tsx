import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Page_Home from './pages/Home';
import Page_Offers from './pages/Offers';
import Page_Galeri from './pages/Galeri';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Page_Home />} />
      <Route path="/kampanyalar" element={<Page_Offers />} />
      <Route path="/galeri" element={<Page_Galeri />} />
    </Routes>
  );
}
export default App;