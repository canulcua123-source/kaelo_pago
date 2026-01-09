-- Add price_paid to purchased_routes if it doesn't exist
ALTER TABLE purchased_routes ADD COLUMN IF NOT EXISTS price_paid DECIMAL(10,2) DEFAULT 0;

-- Add items to orders if it doesn't exist
ALTER TABLE orders ADD COLUMN IF NOT EXISTS items JSONB;

-- Notify PostgREST to reload the schema cache
NOTIFY pgrst, 'reload config';
