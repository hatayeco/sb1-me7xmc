import Database from 'better-sqlite3';
import { join } from 'path';

const db = new Database('autoservice.db');

// Enable foreign keys
db.pragma('foreign_keys = ON');

export default db;