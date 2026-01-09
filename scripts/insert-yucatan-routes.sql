-- Script para insertar rutas turísticas de Yucatán
-- Usando el usuario: Jonathan Aaron Perez Mendez (perezjon946@gmail.com)

-- Insertamos las rutas turísticas de Yucatán
INSERT INTO routes (
  id,
  creator_id,
  title,
  description,
  distance_km,
  difficulty,
  price,
  status,
  route_geometry,
  estimated_time_hours,
  elevation_gain_m,
  created_at,
  published_at
) VALUES

-- 1. Ruta de los Cenotes
(
  gen_random_uuid(),
  'ee9c5ff7-7d33-4806-b2f1-290f50a11a6e',
  'Ruta de los Cenotes Sagrados',
  'Descubre los cenotes más hermosos de Yucatán. Esta ruta te lleva por cenotes cristalinos perfectos para nadar y explorar. Incluye Cenote Ik Kil, Cenote Samulá y Cenote X''Kekén.',
  45.5,
  'moderado',
  299.00,
  'aprobada',
  ST_GeomFromText('LINESTRING(-89.0842 20.6597, -88.9756 20.7089, -88.8234 20.7456, -88.7123 20.6891)', 4326),
  4.5,
  50,
  NOW(),
  NOW()
),

-- 2. Ruta Puuc - Sitios Arqueológicos
(
  gen_random_uuid(),
  'ee9c5ff7-7d33-4806-b2f1-290f50a11a6e',
  'Ruta Puuc: Tesoros Mayas',
  'Recorre los sitios arqueológicos más impresionantes de la Ruta Puuc: Uxmal, Kabah, Sayil y Labná. Arquitectura maya en su máxima expresión.',
  85.3,
  'dificil',
  499.00,
  'aprobada',
  ST_GeomFromText('LINESTRING(-89.7717 20.3597, -89.6523 20.3789, -89.6234 20.2956, -89.5891 20.2123)', 4326),
  8.0,
  120,
  NOW(),
  NOW()
),

-- 3. Mérida - Progreso (Playa)
(
  gen_random_uuid(),
  'ee9c5ff7-7d33-4806-b2f1-290f50a11a6e',
  'Mérida a Progreso: Ruta Costera',
  'Ruta escénica desde el centro de Mérida hasta las hermosas playas de Progreso. Perfecta para un día de playa y mariscos frescos.',
  38.2,
  'facil',
  149.00,
  'aprobada',
  ST_GeomFromText('LINESTRING(-89.6240 20.9674, -89.6123 21.1234, -89.6656 21.2789)', 4326),
  2.5,
  15,
  NOW(),
  NOW()
),

-- 4. Chichén Itzá y Valladolid
(
  gen_random_uuid(),
  'ee9c5ff7-7d33-4806-b2f1-290f50a11a6e',
  'Chichén Itzá y Pueblo Mágico',
  'Visita una de las 7 Maravillas del Mundo Moderno y el encantador Pueblo Mágico de Valladolid. Incluye paradas en cenotes cercanos.',
  120.5,
  'moderado',
  599.00,
  'aprobada',
  ST_GeomFromText('LINESTRING(-89.6240 20.9674, -88.8234 20.7456, -88.5678 20.6891)', 4326),
  10.0,
  80,
  NOW(),
  NOW()
),

-- 5. Ruta de los Conventos
(
  gen_random_uuid(),
  'ee9c5ff7-7d33-4806-b2f1-290f50a11a6e',
  'Ruta de los Conventos Franciscanos',
  'Recorre los históricos conventos franciscanos del siglo XVI: Maní, Tekit, Mama y Chumayel. Historia y arquitectura colonial.',
  95.7,
  'moderado',
  399.00,
  'aprobada',
  ST_GeomFromText('LINESTRING(-89.6240 20.9674, -89.4567 20.7234, -89.3891 20.5678, -89.2345 20.4123)', 4326),
  7.5,
  60,
  NOW(),
  NOW()
),

-- 6. Celestún: Flamencos Rosados
(
  gen_random_uuid(),
  'ee9c5ff7-7d33-4806-b2f1-290f50a11a6e',
  'Celestún: Santuario de Flamencos',
  'Ruta hacia la Reserva de la Biósfera de Celestún. Observa miles de flamencos rosados en su hábitat natural. Incluye paseo en lancha.',
  92.4,
  'facil',
  449.00,
  'aprobada',
  ST_GeomFromText('LINESTRING(-89.6240 20.9674, -90.1234 20.8567, -90.3891 20.8591)', 4326),
  6.0,
  25,
  NOW(),
  NOW()
),

-- 7. Izamal: Ciudad Amarilla
(
  gen_random_uuid(),
  'ee9c5ff7-7d33-4806-b2f1-290f50a11a6e',
  'Izamal: La Ciudad de las Tres Culturas',
  'Visita el Pueblo Mágico de Izamal, conocido como la Ciudad Amarilla. Pirámides mayas, convento franciscano y artesanías únicas.',
  72.3,
  'facil',
  279.00,
  'aprobada',
  ST_GeomFromText('LINESTRING(-89.6240 20.9674, -89.1234 20.9234, -89.0234 20.9291)', 4326),
  5.0,
  30,
  NOW(),
  NOW()
),

-- 8. Ruta Río Lagartos
(
  gen_random_uuid(),
  'ee9c5ff7-7d33-4806-b2f1-290f50a11a6e',
  'Río Lagartos: Reserva Natural',
  'Explora la Reserva de la Biósfera Ría Lagartos. Flamencos, cocodrilos, manglares y playas vírgenes. Incluye baño de barro maya.',
  145.8,
  'moderado',
  549.00,
  'aprobada',
  ST_GeomFromText('LINESTRING(-89.6240 20.9674, -88.5678 21.3456, -88.1234 21.5891)', 4326),
  9.0,
  40,
  NOW(),
  NOW()
),

-- 9. Ek Balam y Cenote X'Canche
(
  gen_random_uuid(),
  'ee9c5ff7-7d33-4806-b2f1-290f50a11a6e',
  'Ek Balam: La Ciudad del Jaguar Negro',
  'Descubre la zona arqueológica de Ek Balam y refréscate en el hermoso cenote X''Canche. Incluye tirolesa y rappel opcional.',
  165.2,
  'moderado',
  479.00,
  'aprobada',
  ST_GeomFromText('LINESTRING(-89.6240 20.9674, -88.5678 20.6891, -88.0934 20.8234)', 4326),
  8.5,
  70,
  NOW(),
  NOW()
),

-- 10. Ruta Haciendas Henequeneras
(
  gen_random_uuid(),
  'ee9c5ff7-7d33-4806-b2f1-290f50a11a6e',
  'Ruta de las Haciendas Henequeneras',
  'Tour por las antiguas haciendas henequeneras: Sotuta de Peón, Yaxcopoil y San Pedro Ochil. Historia del oro verde de Yucatán.',
  68.5,
  'facil',
  349.00,
  'aprobada',
  ST_GeomFromText('LINESTRING(-89.6240 20.9674, -89.7234 20.8567, -89.8123 20.7891, -89.9012 20.7234)', 4326),
  5.5,
  35,
  NOW(),
  NOW()
),

-- 11. Sisal: Pueblo Costero
(
  gen_random_uuid(),
  'ee9c5ff7-7d33-4806-b2f1-290f50a11a6e',
  'Sisal: Puerto Histórico y Playas',
  'Ruta al pintoresco puerto de Sisal. Playas tranquilas, mariscos frescos y el histórico faro. Ideal para un día relajante.',
  52.7,
  'facil',
  199.00,
  'aprobada',
  ST_GeomFromText('LINESTRING(-89.6240 20.9674, -90.0234 21.0567, -90.0456 21.1634)', 4326),
  3.5,
  10,
  NOW(),
  NOW()
),

-- 12. Ruta Gastronómica Yucateca
(
  gen_random_uuid(),
  'ee9c5ff7-7d33-4806-b2f1-290f50a11a6e',
  'Sabores de Yucatán: Ruta Gastronómica',
  'Tour culinario por los mejores restaurantes y mercados de Mérida y pueblos cercanos. Prueba cochinita pibil, papadzules, salbutes y más.',
  45.0,
  'facil',
  399.00,
  'aprobada',
  ST_GeomFromText('LINESTRING(-89.6240 20.9674, -89.5234 20.9234, -89.4567 20.8891, -89.6240 20.9674)', 4326),
  6.0,
  20,
  NOW(),
  NOW()
);

-- Mensaje de confirmación
SELECT 'Se han insertado 12 rutas turísticas de Yucatán exitosamente!' as mensaje;

-- Consulta para verificar las rutas insertadas
SELECT 
  title,
  distance_km,
  difficulty,
  price,
  status
FROM routes
WHERE creator_id = 'ee9c5ff7-7d33-4806-b2f1-290f50a11a6e'
ORDER BY created_at DESC;
