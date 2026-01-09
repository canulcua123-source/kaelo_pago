-- ==========================================
-- SISTEMA DE RELACIÓN RUTAS-NEGOCIOS (Simplificado)
-- ==========================================
-- IMPORTANTE: Ejecuta DESPUÉS de create_businesses_table.sql

-- 1. Crear tabla intermedia para relacionar rutas con negocios
CREATE TABLE IF NOT EXISTS route_businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  route_id UUID NOT NULL REFERENCES routes(id) ON DELETE CASCADE,
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  distance_from_start_km DECIMAL(10, 2),
  order_in_route INTEGER,
  is_recommended BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(route_id, business_id)
);

-- 2. Habilitar Row Level Security
ALTER TABLE route_businesses ENABLE ROW LEVEL SECURITY;

-- 3. Políticas RLS
DROP POLICY IF EXISTS "Anyone can view route businesses" ON route_businesses;
CREATE POLICY "Anyone can view route businesses" ON route_businesses
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow inserts for development" ON route_businesses;
CREATE POLICY "Allow inserts for development" ON route_businesses
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow updates for development" ON route_businesses;
CREATE POLICY "Allow updates for development" ON route_businesses
  FOR UPDATE USING (true);

-- 4. Crear índices
CREATE INDEX IF NOT EXISTS idx_route_businesses_route_id ON route_businesses(route_id);
CREATE INDEX IF NOT EXISTS idx_route_businesses_business_id ON route_businesses(business_id);

-- 5. Función para calcular distancia (Haversine)
CREATE OR REPLACE FUNCTION calculate_distance(
  lat1 DECIMAL, lon1 DECIMAL, 
  lat2 DECIMAL, lon2 DECIMAL
) RETURNS DECIMAL AS $$
DECLARE
  earth_radius CONSTANT DECIMAL := 6371;
  dlat DECIMAL;
  dlon DECIMAL;
  a DECIMAL;
  c DECIMAL;
BEGIN
  dlat := radians(lat2 - lat1);
  dlon := radians(lon2 - lon1);
  
  a := sin(dlat/2) * sin(dlat/2) + 
       cos(radians(lat1)) * cos(radians(lat2)) * 
       sin(dlon/2) * sin(dlon/2);
  
  c := 2 * atan2(sqrt(a), sqrt(1-a));
  
  RETURN earth_radius * c;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- 6. Función para asignar negocios a rutas
CREATE OR REPLACE FUNCTION assign_businesses_to_route(
  p_route_id UUID,
  max_distance_km DECIMAL DEFAULT 2.0
) RETURNS INTEGER AS $$
DECLARE
  route_coords JSONB;
  coord JSONB;
  business RECORD;
  min_distance DECIMAL;
  distance DECIMAL;
  assigned_count INTEGER := 0;
  route_order INTEGER := 1;
BEGIN
  SELECT coordinates INTO route_coords
  FROM routes
  WHERE id = p_route_id;
  
  FOR business IN 
    SELECT id, name, latitude, longitude, category
    FROM businesses
    WHERE latitude IS NOT NULL 
    AND longitude IS NOT NULL
    AND is_active = true
  LOOP
    min_distance := 999999;
    
    FOR coord IN SELECT * FROM jsonb_array_elements(route_coords)
    LOOP
      distance := calculate_distance(
        (coord->0)::DECIMAL,
        (coord->1)::DECIMAL,
        business.latitude,
        business.longitude
      );
      
      IF distance < min_distance THEN
        min_distance := distance;
      END IF;
    END LOOP;
    
    IF min_distance <= max_distance_km THEN
      INSERT INTO route_businesses (
        route_id, 
        business_id, 
        distance_from_start_km,
        order_in_route,
        is_recommended
      ) VALUES (
        p_route_id,
        business.id,
        min_distance,
        route_order,
        min_distance <= 0.5
      )
      ON CONFLICT (route_id, business_id) DO NOTHING;
      
      assigned_count := assigned_count + 1;
      route_order := route_order + 1;
    END IF;
  END LOOP;
  
  RETURN assigned_count;
END;
$$ LANGUAGE plpgsql;

-- 7. Vista para consultas optimizadas
DROP VIEW IF EXISTS route_businesses_detailed;
CREATE VIEW route_businesses_detailed AS
SELECT 
  rb.route_id,
  rb.business_id,
  rb.distance_from_start_km,
  rb.order_in_route,
  rb.is_recommended,
  b.name AS business_name,
  b.description AS business_description,
  b.image_url AS business_image,
  b.latitude,
  b.longitude,
  b.address,
  b.category,
  b.contact_info,
  r.name AS route_name
FROM route_businesses rb
JOIN businesses b ON rb.business_id = b.id
JOIN routes r ON rb.route_id = r.id
WHERE b.is_active = true
ORDER BY rb.route_id, rb.order_in_route;

-- 8. Asignar negocios a todas las rutas existentes
DO $$
DECLARE
  route_record RECORD;
  assigned_count INTEGER;
BEGIN
  FOR route_record IN SELECT id, name FROM routes LOOP
    assigned_count := assign_businesses_to_route(route_record.id, 2.0);
    RAISE NOTICE 'Ruta %: % negocios asignados', route_record.name, assigned_count;
  END LOOP;
END $$;

-- Notificar
NOTIFY pgrst, 'reload schema';
