import React from 'react';
import OrderTables from '../DeliveryTables/OrdersTables';

const Orders = () => {
  //meta title
  document.title = "Orders | Awakaza Delivery"

  return (
    <div>
      <OrderTables />
    </div>
  );
};

export default Orders;

