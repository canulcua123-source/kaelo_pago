-- ==========================================
-- SCRIPT COMPLETO: TIENDAS Y PRODUCTOS
-- ==========================================
-- Ejecutar en Supabase SQL Editor

-- ==========================================
-- PASO 1: INSERTAR 20 TIENDAS EN YUCATÁN
-- ==========================================

-- Primero, obtener un usuario owner_id (necesitamos uno existente)
DO $$
DECLARE
  default_owner_id UUID;
BEGIN
  -- Obtener cualquier usuario existente
  SELECT id INTO default_owner_id FROM users LIMIT 1;
  
  -- Si no hay usuarios, las tiendas se crearán sin owner
  IF default_owner_id IS NULL THEN
    RAISE NOTICE '⚠️  No se encontraron usuarios. Las tiendas se crearán sin owner_id';
  ELSE
    RAISE NOTICE '✅ Usando owner_id: %', default_owner_id;
  END IF;
  
  -- Insertar tiendas
  INSERT INTO stores (
    owner_id,
    name,
    description,
    phone,
    address,
    status,
    location
  ) VALUES
  -- MÉRIDA (10 tiendas)
  (default_owner_id, 'Bicicletas Mérida Centro', 'Tienda especializada en bicicletas de ruta y montaña. Venta de accesorios y refacciones.', '9991234501', 'Calle 60 #501, Centro, Mérida', 'aprobado', ST_GeomFromText('POINT(-89.6243 20.9674)', 4326)),
  (default_owner_id, 'Ciclo Sport Mérida Norte', 'Venta de bicicletas Trek y Specialized. Taller de reparación profesional.', '9991234502', 'Av. Colón #502, Col. García Ginerés, Mérida', 'aprobado', ST_GeomFromText('POINT(-89.6243 21.0102)', 4326)),
  (default_owner_id, 'Bike Shop Altabrisa', 'Tienda premium en plaza Altabrisa. BMX, MTB y road bikes.', '9991234503', 'Altabrisa Mall, Mérida', 'aprobado', ST_GeomFromText('POINT(-89.6354 21.0135)', 4326)),
  (default_owner_id, 'Taller Ciclo Rápido', 'Reparación express y mantenimiento. Abierto 7 días.', '9991234504', 'Calle 42 #310, Centro, Mérida', 'aprobado', ST_GeomFromText('POINT(-89.6187 20.9845)', 4326)),
  (default_owner_id, 'Deportes Xtreme Mérida', 'Equipo de protección, cascos, luces y GPS para ciclistas.', '9991234505', 'Calle 59 #490, Centro, Mérida', 'aprobado', ST_GeomFromText('POINT(-89.6156 20.9723)', 4326)),
  (default_owner_id, 'Bici Shop Montejo', 'Tienda con amplio surtido de llantas y cámaras.', '9991234506', 'Paseo de Montejo #450, Mérida', 'aprobado', ST_GeomFromText('POINT(-89.6298 21.0234)', 4326)),
  (default_owner_id, 'Taller Bici Pro', 'Especialistas en suspensiones y frenos hidráulicos.', '9991234507', 'Calle 50 #280, Col. Centro, Mérida', 'aprobado', ST_GeomFromText('POINT(-89.6423 20.9567)', 4326)),
  (default_owner_id, 'Ciclo Accesorios Express', 'Todo en accesorios: botellas, portabidones, bombas y más.', '9991234508', 'Av. Itzaes #501, Mérida', 'aprobado', ST_GeomFromText('POINT(-89.6534 20.9912)', 4326)),
  (default_owner_id, 'Bike Center Fraccionamiento', 'Bicicletas para toda la familia. Financiamiento disponible.', '9991234509', 'Calle 20 #150, Fracc. Las Américas, Mérida', 'aprobado', ST_GeomFromText('POINT(-89.6712 21.0045)', 4326)),
  (default_owner_id, 'Servicio Técnico MTB', 'Especialistas en mantenimiento de mountain bikes.', '9991234510', 'Calle 65 #520, Col. Centro, Mérida', 'aprobado', ST_GeomFromText('POINT(-89.5987 20.9734)', 4326)),
  
  -- PROGRESO (5 tiendas)
  (default_owner_id, 'Bici Playa Progreso', 'Renta y venta de bicicletas playeras. Ideal para paseos costeros.', '9691234511', 'Calle 80 #150, Progreso', 'aprobado', ST_GeomFromText('POINT(-89.6653 21.2828)', 4326)),
  (default_owner_id, 'Taller El Malecón', 'Reparación rápida cerca del malecón. Servicio a domicilio.', '9691234512', 'Malecón s/n, Progreso', 'aprobado', ST_GeomFromText('POINT(-89.6642 21.2819)', 4326)),
  (default_owner_id, 'Deportes Costeros', 'Accesorios deportivos y bicicletas. Vista al mar.', '9691234513', 'Calle 78 #200, Progreso', 'aprobado', ST_GeomFromText('POINT(-89.6678 21.2845)', 4326)),
  (default_owner_id, 'Bike Service Progreso', 'Taller mecánico especializado. Atención personalizada.', '9691234514', 'Calle 82 #89, Progreso', 'aprobado', ST_GeomFromText('POINT(-89.6624 21.2803)', 4326)),
  (default_owner_id, 'Ciclo Puerto', 'Bicicletas y accesorios náuticos. Equipamiento completo.', '9691234515', 'Av. Principal #45, Progreso', 'aprobado', ST_GeomFromText('POINT(-89.6698 21.2856)', 4326)),
  
  -- VALLADOLID (5 tiendas)
  (default_owner_id, 'Bicicletas Valladolid Centro', 'Tienda histórica desde 1985. Amplio surtido.', '9851234516', 'Calle 41 #200, Centro, Valladolid', 'aprobado', ST_GeomFromText('POINT(-88.2025 20.6906)', 4326)),
  (default_owner_id, 'Taller Colonial', 'Reparación tradicional y moderna. Experiencia de 30 años.', '9851234517', 'Calle 39 #190, Valladolid', 'aprobado', ST_GeomFromText('POINT(-88.2012 20.6889)', 4326)),
  (default_owner_id, 'Deportes Maya', 'Equipamiento deportivo completo. Tradición y calidad.', '9851234518', 'Calle 40 #215, Valladolid', 'aprobado', ST_GeomFromText('POINT(-88.2043 20.6923)', 4326)),
  (default_owner_id, 'Bici Express Valladolid', 'Servicio rápido y eficiente. Refacciones originales.', '9851234519', 'Calle 42 #180, Valladolid', 'aprobado', ST_GeomFromText('POINT(-88.2067 20.6934)', 4326)),
  (default_owner_id, 'Ciclo Tienda Maya', 'Bicicletas y accesorios. Atención familiar.', '9851234520', 'Calle 38 #175, Valladolid', 'aprobado', ST_GeomFromText('POINT(-88.1998 20.6878)', 4326));
  
  RAISE NOTICE '✅ Se insertaron 20 tiendas en Yucatán';
END $$;

-- ==========================================
-- PASO 2: INSERTAR PRODUCTOS DE COMIDA
-- ==========================================

WITH first_store AS (
  SELECT id FROM stores WHERE name = 'Bicicletas Mérida Centro' LIMIT 1
)
INSERT INTO products (
  store_id,
  name,
  description,
  price,
  category,
  image_url,
  is_available
)
SELECT 
  first_store.id,
  product.name,
  product.description,
  product.price,
  product.category,
  product.image_url,
  true
FROM first_store, (VALUES
  -- HIDRATACIÓN  
  ('Agua Embotellada 1L', 'Agua purificada de 1 litro. Esencial para mantenerte hidratado durante toda la ruta.', 15.00, 'comida', 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=500'),
  ('Bebida Isotónica Gatorade', 'Bebida deportiva con electrolitos para recuperar sales minerales.', 25.00, 'comida', 'https://images.unsplash.com/photo-1624484354117-ee8bf8d047f7?w=500'),
  ('Agua de Coco Natural', 'Hidratación natural rica en potasio. Perfecta para recuperación.', 30.00, 'comida', 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500'),
  
  -- FRUTAS Y SNACKS
  ('Plátanos (3 unidades)', 'Fuente natural de energía rápida y potasio. Perfectos para rutas largas.', 18.00, 'comida', 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500'),
  ('Manzanas (3 unidades)', 'Snack refrescante e hidratante. Energía de liberación lenta.', 22.00, 'comida', 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500'),
  ('Naranjas (3 unidades)', 'Alto contenido de vitamina C. Recuperación rápida.', 20.00, 'comida', 'https://images.unsplash.com/photo-1547514701-42782101795e?w=500'),
  ('Mix de Frutos Secos 200g', 'Mezcla de almendras, nueces, pasas y arándanos.', 45.00, 'comida', 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=500'),
  
  -- BARRAS ENERGÉTICAS
  ('Barra Energética Nature Valley', 'Barra de granola con avena y miel. 190 calorías.', 18.00, 'comida', 'https://images.unsplash.com/photo-1560769680-ba4b8f3c0e4d?w=500'),
  ('Barra Proteica Quest Bar', 'Alta en proteína (20g). Recuperación muscular.', 35.00, 'comida', 'https://images.unsplash.com/photo-1597306691223-c1c4c4f4d1d8?w=500'),
  ('Power Bar Energize', 'Barra deportiva con carbohidratos complejos.', 28.00, 'comida', 'https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?w=500'),
  
  -- GELES ENERGÉTICOS
  ('Gel Energético GU Energy', 'Gel de rápida absorción con 100 calorías. Con cafeína.', 32.00, 'comida', 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=500'),
  ('Gel Isotónico SiS', 'No requiere agua adicional. Fácil de digerir.', 30.00, 'comida', 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=500'),
  
  -- SNACKS SALADOS
  ('Crackers Integrales', 'Galletas saladas ricas en sodio. Reponen sales perdidas.', 20.00, 'comida', 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500'),
  ('Pretzels Mini', 'Snack salado de fácil digestión. Ideal para rutas calurosas.', 22.00, 'comida', 'https://images.unsplash.com/photo-1599490659213-e2d6b9e1f2a0?w=500'),
  
  -- COMIDAS
  ('Sándwich de Mantequilla de Maní', 'Pan integral con mantequilla de maní y mermelada.', 35.00, 'comida', 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500'),
  ('Wrap de Pollo y Aguacate', 'Tortilla integral con pollo, aguacate y vegetales.', 55.00, 'comida', 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500'),
  
  -- SUPLEMENTOS
  ('Gomitas Energéticas Clif Bloks', 'Cubos masticables con electrolitos y carbohidratos.', 38.00, 'comida', 'https://images.unsplash.com/photo-1587049352846-4a222e784720?w=500'),
  ('Pastillas de Sal Endurolytes', 'Suplemento de electrolitos. Previene calambres.', 45.00, 'comida', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500'),
  
  -- RECUPERACIÓN
  ('Batido de Proteína RTD', 'Batido listo con 20g de proteína. Para después de la ruta.', 42.00, 'comida', 'https://images.unsplash.com/photo-1622484211355-36b9ade327d1?w=500'),
  ('Bebida de Chocolate con Leche', 'Proporción 4:1 carbohidratos-proteína. Recuperación muscular.', 28.00, 'comida', 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=500'),
  
  -- COMBOS
  ('Kit Hidratación Básico', 'Incluye: 2 aguas + 1 isotónico + 1 plátano. Para rutas 30-50 km.', 55.00, 'comida', 'https://images.unsplash.com/photo-1523294587484-bae6cc870010?w=500'),
  ('Pack Energía Completo', 'Incluye: 2 barras + 1 gel + frutos secos + agua. Para +80 km.', 95.00, 'comida', 'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=500'),
  ('Bundle Recuperación', 'Batido proteico + chocolate + plátanos. Recuperación óptima.', 85.00, 'comida', 'https://images.unsplash.com/photo-1622484211355-36b9ade327d1?w=500')
) AS product(name, description, price, category, image_url);

-- Mensaje de confirmación
DO $$
DECLARE
  store_count INT;
  product_count INT;
BEGIN
  SELECT COUNT(*) INTO store_count FROM stores;
  SELECT COUNT(*) INTO product_count FROM products WHERE category = 'comida';
  
  RAISE NOTICE '====================================';
  RAISE NOTICE '✅ Total de tiendas: %', store_count;
  RAISE NOTICE '✅ Productos de comida: %', product_count;
  RAISE NOTICE '🎉 Script completado exitosamente!';
  RAISE NOTICE '====================================';
END $$;
