import React from 'react';
import {
  Users,
  Car,
  Wrench,
  Package,
  FileText,
  DollarSign,
  Home,
  LogOut,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Customers', path: '/customers' },
  { icon: Car, label: 'Vehicles', path: '/vehicles' },
  { icon: Wrench, label: 'Services', path: '/services' },
  { icon: Package, label: 'Inventory', path: '/inventory' },
  { icon: FileText, label: 'Invoices', path: '/invoices' },
  { icon: DollarSign, label: 'Finance', path: '/finance' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-5">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Wrench className="h-6 w-6" />
          AutoService Pro
        </h1>
      </div>
      
      <nav className="flex-1 px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button className="flex items-center gap-2 text-gray-400 hover:text-white w-full px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}