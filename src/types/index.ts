export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  loyaltyPoints: number;
  vehicles: Vehicle[];
  createdAt: Date;
}

export interface Vehicle {
  id: string;
  vin: string;
  licensePlate: string;
  make: string;
  model: string;
  year: number;
  customerId: string;
  lastService?: Date;
}

export interface ServiceRecord {
  id: string;
  vehicleId: string;
  serviceDate: Date;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  cost: number;
}