-- ==========================================
-- CREAR TABLA BUSINESSES
-- ==========================================
-- Esta tabla almacena información de negocios (restaurantes, tiendas, etc.)

CREATE TABLE IF NOT EXISTS businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  address TEXT,
  category TEXT DEFAULT 'food' CHECK (category IN ('food', 'store', 'cafe', 'repair')),
  contact_info JSONB DEFAULT '{}'::jsonb,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para mejorar performance
CREATE INDEX IF NOT EXISTS idx_businesses_location ON businesses(latitude, longitude) WHERE latitude IS NOT NULL AND longitude IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_businesses_category ON businesses(category);
CREATE INDEX IF NOT EXISTS idx_businesses_active ON businesses(is_active) WHERE is_active = true;

-- Habilitar Row Level Security
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;

-- Políticas RLS - Todos pueden ver negocios activos
CREATE POLICY "Anyone can view active businesses" ON businesses
  FOR SELECT USING (is_active = true);

-- Política temporal: permitir inserciones para desarrollo
-- TODO: En producción, restringir solo a admins
CREATE POLICY "Allow inserts for development" ON businesses
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow updates for development" ON businesses
  FOR UPDATE USING (true);


-- Insertar datos de ejemplo de negocios en Yucatán
INSERT INTO businesses (name, description, image_url, latitude, longitude, address, category, contact_info, is_active)
VALUES
  -- Negocios en Mérida
  ('Café La Habana', 'Café tradicional con comida yucateca y ambiente acogedor', 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400', 20.9674, -89.6243, 'Calle 59 #511-A x 62 y 64, Centro, Mérida', 'cafe', '{"phone": "999-123-4567", "hours": "7:00-22:00", "website": "cafelajabana.mx"}', true),
  
  ('Tienda Deportiva Ciclón', 'Accesorios, refacciones y reparación de bicicletas', 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=400', 20.9701, -89.6140, 'Paseo de Montejo #469, Mérida', 'repair', '{"phone": "999-234-5678", "hours": "9:00-19:00", "services": ["Reparación", "Venta de accesorios", "Ajustes"]}', true),
  
  ('La Chaya Maya', 'Restaurante de comida regional yucateca', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400', 20.9697, -89.6234, 'Calle 62 #481 x 57, Centro, Mérida', 'food', '{"phone": "999-928-4780", "hours": "8:00-23:00", "specialties": ["Cochinita pibil", "Papadzules", "Poc chuc"]}', true),
  
  -- Negocios en ruta a Celestún
  ('Restaurante El Muelle', 'Mariscos frescos y comida regional frente al mar', 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400', 20.8597, -90.4014, 'Calle 12 s/n, Frente al mar, Celestún', 'food', '{"phone": "999-345-6789", "hours": "10:00-20:00", "specialties": ["Camarones", "Pescado frito", "Ceviche"]}', true),
  
  ('Super Celestún', 'Minisuper con bebidas frías, snacks y básicos', 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400', 20.8580, -90.3990, 'Calle 11 #105, Centro, Celestún', 'store', '{"phone": "999-456-7890", "hours": "6:00-23:00", "products": ["Bebidas", "Snacks", "Frutas"]}', true),
  
  ('Café Flamenco', 'Café y desayunos con vista a la reserva', 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400', 20.8585, -90.3995, 'Calle 10 #120, Celestún', 'cafe', '{"phone": "999-333-4444", "hours": "7:00-15:00"}', true),
  
  -- Negocios en ruta a Progreso
  ('Malecón Food Trucks', 'Variedad de comida rápida y antojitos mexicanos', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400', 21.2817, -89.6650, 'Malecón Tradicional, Progreso', 'food', '{"phone": "999-567-8901", "hours": "11:00-23:00", "options": ["Tacos", "Hamburguesas", "Elotes"]}', true),
  
  ('Oxxo Progreso Centro', 'Tienda de conveniencia 24 horas', 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400', 21.2801, -89.6690, 'Calle 80 #134, Centro, Progreso', 'store', '{"phone": "999-678-9012", "hours": "24 horas", "services": ["ATM", "Pago de servicios"]}', true),
  
  ('Bike Service Progreso', 'Taller de bicicletas y renta', 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400', 21.2795, -89.6670, 'Calle 78 #150, Progreso', 'repair', '{"phone": "999-111-2222", "hours": "8:00-20:00", "services": ["Reparación express", "Renta de bicis", "Inflado gratis"]}', true),
  
  -- Negocios en ruta a Uxmal
  ('Hacienda Ochil', 'Restaurante buffet en hacienda henequenera restaurada', 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400', 20.7839, -89.7667, 'Carretera Mérida-Uxmal Km 175, Abala', 'food', '{"phone": "999-789-0123", "hours": "8:00-18:00", "type": "Buffet", "price": "$$$"}', true),
  
  ('Mercadito Santa Elena', 'Artesanías locales, frutas y comida típica', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400', 20.8485, -89.6962, 'Calle 20 s/n, Centro, Santa Elena', 'store', '{"phone": "999-890-1234", "hours": "7:00-20:00", "products": ["Artesanías", "Frutas", "Tortillas"]}', true),
  
  ('Café Uxmal Express', 'Café y snacks cerca de la zona arqueológica', 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400', 20.3596, -89.7714, 'Carretera Uxmal, Km 78', 'cafe', '{"phone": "997-555-6666", "hours": "7:00-19:00"}', true),
  
  -- Negocios adicionales en rutas populares
  ('Bici Shop Mérida Norte', 'Venta de bicicletas y accesorios', 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=400', 21.0045, -89.6180, 'Av. García Lavín, Altabrisa, Mérida', 'repair', '{"phone": "999-444-5555", "hours": "10:00-20:00", "brands": ["Trek", "Specialized", "Giant"]}', true),
  
  ('Frutería El Ciclista', 'Frutas frescas y jugos naturales', 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400', 20.9850, -89.6250, 'Calle 60 #350, Mérida', 'store', '{"phone": "999-777-8888", "hours": "6:00-21:00", "specialty": "Jugos verdes y smoothies"}', true),
  
  ('Lonchería Doña Mary', 'Comida casera yucateca a buen precio', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400', 20.9720, -89.6190, 'Calle 58 #480, Mérida', 'food', '{"phone": "999-666-7777", "hours": "7:00-17:00", "menu": "Comida corrida $60"}', true)
ON CONFLICT (id) DO NOTHING;

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar updated_at
DROP TRIGGER IF EXISTS update_businesses_updated_at ON businesses;
CREATE TRIGGER update_businesses_updated_at
    BEFORE UPDATE ON businesses
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Notificar a PostgREST
NOTIFY pgrst, 'reload schema';
