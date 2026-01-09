-- Create purchased_routes table
CREATE TABLE IF NOT EXISTS purchased_routes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  route_id UUID REFERENCES routes(id) NOT NULL,
  price_paid DECIMAL(10,2) NOT NULL,
  purchased_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, route_id)
);

-- Enable RLS
ALTER TABLE purchased_routes ENABLE ROW LEVEL SECURITY;

-- Policies for purchased_routes
CREATE POLICY "Users can view their own purchased routes"
  ON purchased_routes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own purchased routes"
  ON purchased_routes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create orders table (optional but referenced)
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL,
  items JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policies for orders
CREATE POLICY "Users can view their own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own orders"
  ON orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);
