import React, { useContext, useEffect } from 'react';
import TableCheckProducts from '../components/TableCheckProducts';
import FormAddress from '../components/FormAddress';
import Context from '../context/Context';
import api from '../helper/api';

const ClientCheckout = () => {
  const { setIdOrder, idOrder } = useContext(Context);

  useEffect(() => {
    const addOrderId = async () => {
      const { data: dataOrder } = await api.get('/orders');
      let newId = 0;
      if (dataOrder.length > 0) {
        newId = dataOrder[dataOrder.length - 1].id;
      }
      setIdOrder(newId + 1);
    };
    addOrderId();
  }, [idOrder, setIdOrder]);

  return (
    <section>
      <div
        style={ {
          width: '100vw',
          height: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center' } }
      >
        <p>
          Finalizar Pedido
        </p>
        <TableCheckProducts />
        <p>
          Detalhes e Endereço para Entrega
        </p>
        <FormAddress />
      </div>
    </section>
  );
};
export default ClientCheckout;
