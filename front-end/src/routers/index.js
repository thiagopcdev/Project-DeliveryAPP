import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import {
  CustomerOrders,
  SellerOrders,
  NotFound,
  Login,
  Register,
  CustomerProducts,
  ClientCheckout,
  Admin,
  MyOrderDetails,
  SellerOrderDetails,
} from '../pages';

export default function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={ <Navigate to="/login" /> } />
        <Route exact path="/login" element={ <Login /> } />
        <Route exact path="/register" element={ <Register /> } />
        <Route exact path="/customer/products" element={ <CustomerProducts /> } />
        <Route exact path="/customer/checkout" element={ <ClientCheckout /> } />
        <Route exact path="/" element={ <ClientCheckout /> } />
        <Route exact path="/customer/orders/:id" element={ <MyOrderDetails /> } />
        <Route exact path="/customer/orders/" element={ <CustomerOrders /> } />
        <Route exact path="/seller/orders/:id" element={ <SellerOrderDetails /> } />
        <Route exact path="/seller/orders" element={ <SellerOrders /> } />
        <Route exact path="/admin/manage" element={ <Admin /> } />
        <Route path="*" element={ <NotFound /> } />
      </Routes>
    </BrowserRouter>
  );
}
