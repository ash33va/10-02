import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductTable from './ProductTable';
import Settings from './Settings';
import { FaCog } from 'react-icons/fa'; // Иконка настроек

function App() {
  return (
    <Router>
      <div className="app">
        <header className="header">
          <h1>Таблица товаров</h1>
          <div className="settings-icon">
            <FaCog size={24} />
            <a href="/settings">Настройки</a>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<ProductTable />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
