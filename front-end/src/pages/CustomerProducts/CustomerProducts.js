// lógica da página de produtos copiada do código do meu amigo Erick Silva https://github.com/tryber/sd-012-project-delivery-app/tree/main-group-8-front-products-bugs-fix/front-end
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import api from '../../helper/api';
import Card from '../../components/Card/Card';
import currencyFormatter from '../../helper/currencyFormatter';
import Context from '../../context/Context';
import './CustomerProducts.css';

export default function CustomerProducts() {
  const [productsInfo, setProductsInfo] = useState();
  const [isLoading, setLoading] = useState(true);
  const { totalPrice } = useContext(Context);

  const navigate = useNavigate();

  const getProductsInfo = async () => {
    const products = await api.get('/products');
    setProductsInfo(products.data);
    setLoading(false);
  };

  useEffect(() => { getProductsInfo(); }, []);

  return (
    <div>
      <Navbar />
      <div className="products-div">
        {
          isLoading ? <div>Loading...</div>
            : productsInfo.map((productInfo) => (
              <Card
                key={ productInfo.id }
                info={ productInfo }
                image={ productInfo.url_image }
              />
            ))
        }
      </div>
      <button
        type="button"
        onClick={ () => navigate('/customer/checkout') }
        disabled={ !totalPrice }
        data-testid="customer_products__button-cart"
      >
        Ver Carrinho:
        {' '}
        <span data-testid="customer_products__checkout-bottom-value">
          {currencyFormatter(totalPrice)}
        </span>
      </button>
    </div>
  );
}
