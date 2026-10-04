import { Pool } from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

// Default connection string or environment config
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/rawfitgym';

export const pool = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  connectionTimeoutMillis: 3000,
});

let isConnected = false;

// In-memory fallback storage in case PostgreSQL is not yet configured locally
export const memoryStore = {
  franchiseInquiries: [] as any[],
  tourBookings: [] as any[],
  calculatorLeads: [] as any[],
  trialBookings: [] as any[],
};

export async function initDB() {
  try {
    const client = await pool.connect();
    isConnected = true;
    console.log('✅ Connected to PostgreSQL successfully!');
    
    // Auto-run schema
    const schemaPath = path.join(__dirname, 'schema.sql');
    if (fs.existsSync(schemaPath)) {
      const sql = fs.readFileSync(schemaPath, 'utf8');
      await client.query(sql);
      console.log('✅ Database schema verified / initialized.');
    }
    client.release();
  } catch (error: any) {
    isConnected = false;
    console.warn('⚠️  PostgreSQL connection failed:', error.message);
    console.log('ℹ️  Running with high-performance In-Memory repository fallback.');
    console.log('ℹ️  To connect real Postgres, set DATABASE_URL in your .env file.');
  }
}

export async function query(text: string, params?: any[]) {
  if (isConnected) {
    try {
      return await pool.query(text, params);
    } catch (err) {
      console.error('Database query error:', err);
      throw err;
    }
  }
  return null;
}

export function getDBStatus() {
  return {
    connected: isConnected,
    type: isConnected ? 'PostgreSQL' : 'In-Memory Mock Store',
    counts: {
      franchiseInquiries: memoryStore.franchiseInquiries.length,
      tourBookings: memoryStore.tourBookings.length,
      calculatorLeads: memoryStore.calculatorLeads.length,
      trialBookings: memoryStore.trialBookings.length,
    }
  };
}
