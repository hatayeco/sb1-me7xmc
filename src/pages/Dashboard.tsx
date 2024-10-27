import React from 'react';
import { Users, Car, Wrench, DollarSign } from 'lucide-react';
import DashboardCard from '../components/DashboardCard';

export default function Dashboard() {
  const stats = [
    {
      title: 'Total Customers',
      value: '2,543',
      icon: Users,
      trend: { value: 12, isPositive: true }
    },
    {
      title: 'Active Services',
      value: '48',
      icon: Wrench,
      trend: { value: 8, isPositive: true }
    },
    {
      title: 'Vehicles Serviced',
      value: '186',
      icon: Car,
      trend: { value: 3, isPositive: false }
    },
    {
      title: 'Monthly Revenue',
      value: '$45,678',
      icon: DollarSign,
      trend: { value: 15, isPositive: true }
    }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back, here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <DashboardCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Services</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Oil Change + Tire Rotation</p>
                  <p className="text-sm text-gray-600">Toyota Camry • John Smith</p>
                </div>
                <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800">
                  In Progress
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Upcoming Appointments</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Brake Service</p>
                  <p className="text-sm text-gray-600">Honda Civic • Sarah Johnson</p>
                </div>
                <span className="text-sm text-gray-600">
                  Today, 2:00 PM
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}