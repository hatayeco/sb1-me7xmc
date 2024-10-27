import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Customers from '../pages/Customers';
import Vehicles from '../pages/Vehicles';
import Services from '../pages/Services';
import Inventory from '../pages/Inventory';
import Invoices from '../pages/Invoices';
import Finance from '../pages/Finance';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/vehicles" element={<Vehicles />} />
      <Route path="/services" element={<Services />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/invoices" element={<Invoices />} />
      <Route path="/finance" element={<Finance />} />
    </Routes>
  );
}