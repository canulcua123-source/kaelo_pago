-- Make store_id nullable in orders table
ALTER TABLE orders ALTER COLUMN store_id DROP NOT NULL;

-- Notify PostgREST to reload the schema cache
NOTIFY pgrst, 'reload config';
