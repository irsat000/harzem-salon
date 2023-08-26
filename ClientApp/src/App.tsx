import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page_Home } from './pages/Home';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Page_Home />} />
    </Routes>
  );
}
export default App;