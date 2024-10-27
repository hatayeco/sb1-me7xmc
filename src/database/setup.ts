import Database from 'better-sqlite3';
import { join } from 'path';

const db = new Database('autoservice.db');

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Create tables
db.exec(`
  -- Customers table
  CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    phone TEXT,
    address TEXT,
    loyalty_points INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Vehicles table
  CREATE TABLE IF NOT EXISTS vehicles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER NOT NULL,
    vin TEXT UNIQUE,
    license_plate TEXT,
    make TEXT NOT NULL,
    model TEXT NOT NULL,
    year INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
  );

  -- Services table
  CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    vehicle_id INTEGER NOT NULL,
    service_type TEXT NOT NULL,
    description TEXT,
    status TEXT CHECK(status IN ('pending', 'in_progress', 'completed', 'cancelled')) DEFAULT 'pending',
    technician_notes TEXT,
    cost DECIMAL(10,2),
    scheduled_date DATETIME,
    completed_date DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE
  );

  -- Inventory table
  CREATE TABLE IF NOT EXISTS inventory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    part_number TEXT UNIQUE,
    quantity INTEGER DEFAULT 0,
    min_quantity INTEGER DEFAULT 5,
    price DECIMAL(10,2),
    supplier TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Service Parts table (junction table between services and inventory)
  CREATE TABLE IF NOT EXISTS service_parts (
    service_id INTEGER,
    part_id INTEGER,
    quantity INTEGER NOT NULL,
    price_at_time DECIMAL(10,2),
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
    FOREIGN KEY (part_id) REFERENCES inventory(id) ON DELETE CASCADE,
    PRIMARY KEY (service_id, part_id)
  );

  -- Invoices table
  CREATE TABLE IF NOT EXISTS invoices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    service_id INTEGER NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    tax_amount DECIMAL(10,2) NOT NULL,
    status TEXT CHECK(status IN ('draft', 'pending', 'paid', 'cancelled')) DEFAULT 'draft',
    due_date DATETIME,
    paid_date DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
  );

  -- Payments table
  CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    invoice_id INTEGER NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method TEXT NOT NULL,
    payment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    reference_number TEXT,
    FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE
  );
`);

// Create indexes for better performance
db.exec(`
  CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
  CREATE INDEX IF NOT EXISTS idx_vehicles_customer_id ON vehicles(customer_id);
  CREATE INDEX IF NOT EXISTS idx_services_vehicle_id ON services(vehicle_id);
  CREATE INDEX IF NOT EXISTS idx_service_parts_service_id ON service_parts(service_id);
  CREATE INDEX IF NOT EXISTS idx_invoices_service_id ON invoices(service_id);
  CREATE INDEX IF NOT EXISTS idx_payments_invoice_id ON payments(invoice_id);
`);

console.log('Database setup completed successfully!');