-- ==========================================
-- PRODUCTOS DE COMIDA Y SUMINISTROS PARA CICLISMO
-- ==========================================
-- Productos recomendados para llevar durante las rutas

INSERT INTO products (
  name,
  description,
  price,
  category,
  image_url
) VALUES

-- HIDRATACIÓN
(
  'Agua Embotellada 1L',
  'Agua purificada de 1 litro. Esencial para mantenerte hidratado durante toda la ruta. Se recomienda llevar al menos 2 botellas.',
  15.00,
  'comida',
  'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=500'
),
(
  'Bebida Isotónica Gatorade',
  'Bebida deportiva con electrolitos para recuperar sales minerales. Ideal para rutas largas de más de 2 horas.',
  25.00,
  'comida',
  'https://images.unsplash.com/photo-1624484354117-ee8bf8d047f7?w=500'
),
(
  'Agua de Coco Natural',
  'Hidratación natural rica en potasio. Perfecta para recuperación después de rutas intensas.',
  30.00,
  'comida',
  'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500'
),

-- FRUTAS Y SNACKS FRESCOS
(
  'Plátanos (3 unidades)',
  'Fuente natural de energía rápida y potasio. Perfectos para comer durante descansos. Recomendado para rutas de más de 30 km.',
  18.00,
  'comida',
  'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500'
),
(
  'Manzanas (3 unidades)',
  'Snack refrescante e hidratante. Aportan fibra y energía de liberación lenta. Fáciles de llevar.',
  22.00,
  'comida',
  'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500'
),
(
  'Naranjas (3 unidades)',
  'Alto contenido de vitamina C y líquidos. Perfectas para recuperación rápida de energía.',
  20.00,
  'comida',
  'https://images.unsplash.com/photo-1547514701-42782101795e?w=500'
),
(
  'Mix de Frutos Secos 200g',
  'Mezcla de almendras, nueces, pasas y arándanos. Energía concentrada y fácil de transportar.',
  45.00,
  'comida',
  'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=500'
),

-- BARRAS ENERGÉTICAS
(
  'Barra Energética Nature Valley',
  'Barra de granola con avena y miel. 190 calorías. Ideal para consumir cada hora durante rutas largas.',
  18.00,
  'comida',
  'https://images.unsplash.com/photo-1560769680-ba4b8f3c0e4d?w=500'
),
(
  'Barra Proteica Quest Bar',
  'Alta en proteína (20g). Perfecta para recuperación muscular post-ruta.',
  35.00,
  'comida',
  'https://images.unsplash.com/photo-1597306691223-c1c4c4f4d1d8?w=500'
),
(
  'Power Bar Energize',
  'Barra deportiva con carbohidratos complejos. Energía sostenida para rutas de resistencia.',
  28.00,
  'comida',
  'https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?w=500'
),

-- GELES ENERGÉTICOS
(
  'Gel Energético GU Energy',
  'Gel de rápida absorción con 100 calorías. Cafeína incluida. Para consumir durante esfuerzos intensos.',
  32.00,
  'comida',
  'https://images.unsplash.com/photo-1584515933487-779824d29309?w=500'
),
(
  'Gel Isotónico Science in Sport',
  'No requiere agua adicional. Fácil de digerir durante el ejercicio.',
  30.00,
  'comida',
  'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=500'
),

-- SNACKS SALADOS
(
  'Crackers Integrales',
  'Galletas saladas ricas en sodio. Ayudan a reponer sales perdidas por sudor.',
  20.00,
  'comida',
  'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500'
),
(
  'Pretzels Mini',
  'Snack salado de fácil digestión. Ideal para reponer sodio en rutas calurosas.',
  22.00,
  'comida',
  'https://images.unsplash.com/photo-1599490659213-e2d6b9e1f2a0?w=500'
),

-- SANDWICHES Y WRAPS
(
  'Sándwich de Mantequilla de Maní',
  'Pan integral con mantequilla de maní y mermelada. Alto en proteínas y carbohidratos.',
  35.00,
  'comida',
  'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500'
),
(
  'Wrap de Pollo y Aguacate',
  'Tortilla integral con pollo, aguacate y vegetales. Comida completa para rutas de día completo.',
  55.00,
  'comida',
  'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500'
),

-- SUPLEMENTOS
(
  'Gomitas Energéticas Clif Bloks',
  'Cubos masticables con electrolitos y carbohidratos. Fáciles de consumir mientras pedaleas.',
  38.00,
  'comida',
  'https://images.unsplash.com/photo-1587049352846-4a222e784720?w=500'
),
(
  'Pastillas de Sal Endurolytes',
  'Suplemento de electrolitos en cápsula. Para prevenir calambres en rutas largas.',
  45.00,
  'comida',
  'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500'
),

-- SNACKS DE RECUPERACIÓN
(
  'Batido de Proteína Ready-to-Drink',
  'Batido listo para beber con 20g de proteína. Ideal para consumir inmediatamente después de terminar la ruta.',
  42.00,
  'comida',
  'https://images.unsplash.com/photo-1622484211355-36b9ade327d1?w=500'
),
(
  'Bebida de Chocolate con Leche',
  'Proporción perfecta 4:1 de carbohidratos-proteína para recuperación muscular.',
  28.00,
  'comida',
  'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=500'
),

-- COMBOS RECOMENDADOS
(
  'Kit Hidratación Básico',
  'Incluye: 2 botellas de agua + 1 bebida isotónica + 1 plátano. Todo lo esencial para rutas de 30-50 km.',
  55.00,
  'comida',
  'https://images.unsplash.com/photo-1523294587484-bae6cc870010?w=500'
),
(
  'Pack Energía Completo',
  'Incluye: 2 barras energéticas + 1 gel + mix de frutos secos + agua. Para rutas de más de 80 km.',
  95.00,
  'comida',
  'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=500'
),
(
  'Bundle Recuperación Post-Ruta',
  'Batido proteico + chocolate con leche + plátanos. Recuperación óptima después de rutas intensas.',
  85.00,
  'comida',
  'https://images.unsplash.com/photo-1622484211355-36b9ade327d1?w=500'
);

-- Notificar que se insertaron los productos
DO $$
BEGIN
  RAISE NOTICE 'Se han agregado 24 productos de comida y suministros para ciclismo';
END $$;
