-- Add 'completed' to order_status enum
ALTER TYPE order_status ADD VALUE IF NOT EXISTS 'completed';

-- Notify PostgREST to reload the schema cache
NOTIFY pgrst, 'reload config';
