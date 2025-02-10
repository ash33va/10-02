import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import './ProductTable.css'; // Подключаем стили

const PageSize = 20; // Количество элементов на одной странице

function ProductTable() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [settings, setSettings] = useState({});

  // Загружаем данные
  useEffect(() => {
    axios.get('https://dummyjson.com/products?limit=10000')
      .then(response => {
        setData(response.data.products); // Сохраняем товары в state
      })
      .catch(error => {
        console.error("Ошибка при загрузке данных:", error);
      });
  }, []);

  // Загружаем настройки из localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Мемоизация отображаемых данных с пагинацией
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * PageSize;
    const endIndex = startIndex + PageSize;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage]);

  // Количество страниц
  const totalPages = Math.ceil(data.length / PageSize);

  // Обработчик переключения страницы
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="product-table-container">
      <h1 className="table-title">Таблица товаров</h1>
      <table className="product-table">
        <thead>
          <tr>
            {settings.id?.visible && <th style={{ width: settings.id?.width, backgroundColor: settings.id?.backgroundColor }}>ID</th>}
            {settings.title?.visible && <th style={{ width: settings.title?.width, backgroundColor: settings.title?.backgroundColor }}>Название</th>}
            {settings.price?.visible && <th style={{ width: settings.price?.width, backgroundColor: settings.price?.backgroundColor }}>Цена</th>}
            {settings.description?.visible && <th style={{ width: settings.description?.width, backgroundColor: settings.description?.backgroundColor }}>Описание</th>}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map(product => (
            <tr key={product.id}>
              {settings.id?.visible && <td>{product.id}</td>}
              {settings.title?.visible && <td>{product.title}</td>}
              {settings.price?.visible && <td>{product.price}</td>}
              {settings.description?.visible && <td>{product.description}</td>}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Пагинация */}
      <div className="pagination">
        <button 
          className="pagination-button" 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage <= 1}>
          Предыдущая
        </button>

        {/* Отображение номера текущей страницы */}
        <span className="pagination-info">
          Страница {currentPage} из {totalPages}
        </span>

        <button 
          className="pagination-button" 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage >= totalPages}>
          Следующая
        </button>
      </div>
    </div>
  );
}

export default ProductTable;
