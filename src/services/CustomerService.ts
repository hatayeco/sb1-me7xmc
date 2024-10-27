import db from '../database';
import { Customer } from '../types';

export const CustomerService = {
  getAllCustomers: () => {
    return db.prepare('SELECT * FROM customers ORDER BY created_at DESC').all();
  },

  getCustomerById: (id: number) => {
    return db.prepare('SELECT * FROM customers WHERE id = ?').get(id);
  },

  createCustomer: (customer: Omit<Customer, 'id' | 'created_at'>) => {
    const stmt = db.prepare(`
      INSERT INTO customers (name, email, phone, address)
      VALUES (@name, @email, @phone, @address)
    `);
    return stmt.run(customer);
  },

  updateCustomer: (id: number, customer: Partial<Customer>) => {
    const updates = Object.keys(customer)
      .map(key => `${key} = @${key}`)
      .join(', ');
    
    const stmt = db.prepare(`
      UPDATE customers
      SET ${updates}
      WHERE id = @id
    `);
    
    return stmt.run({ ...customer, id });
  },

  deleteCustomer: (id: number) => {
    return db.prepare('DELETE FROM customers WHERE id = ?').run(id);
  },

  getCustomerVehicles: (customerId: number) => {
    return db.prepare('SELECT * FROM vehicles WHERE customer_id = ?').all(customerId);
  }
};