-- Script listo para copiar y pegar - Rutas turísticas de Yucatán

INSERT INTO routes (
  creator_id,
  title,
  description,
  distance_km,
  difficulty,
  price,
  status,
  estimated_time_hours,
  elevation_gain_m
) VALUES
-- Ruta 1
('ee9c5ff7-7433-4806-b57f-290f507cfda', 'Ruta de los Cenotes Sagrados', 'Descubre los cenotes más hermosos de Yucatán. Esta ruta te lleva por cenotes cristalinos perfectos para nadar y explorar. Incluye Cenote Ik Kil, Cenote Samulá y Cenote X''Kekén.', 45.5, 'moderado', 299.00, 'aprobada', 4.5, 50),

-- Ruta 2
('ee9c5ff7-7433-4806-b57f-290f507cfda', 'Ruta Puuc: Tesoros Mayas', 'Recorre los sitios arqueológicos más impresionantes de la Ruta Puuc: Uxmal, Kabah, Sayil y Labná. Arquitectura maya en su máxima expresión.', 85.3, 'dificil', 499.00, 'aprobada', 8.0, 120),

-- Ruta 3
('ee9c5ff7-7433-4806-b57f-290f507cfda', 'Mérida a Progreso: Ruta Costera', 'Ruta escénica desde el centro de Mérida hasta las hermosas playas de Progreso. Perfecta para un día de playa y mariscos frescos.', 38.2, 'facil', 149.00, 'aprobada', 2.5, 15),

-- Ruta 4
('ee9c5ff7-7433-4806-b57f-290f507cfda', 'Chichén Itzá y Pueblo Mágico', 'Visita una de las 7 Maravillas del Mundo Moderno y el encantador Pueblo Mágico de Valladolid. Incluye paradas en cenotes cercanos.', 120.5, 'moderado', 599.00, 'aprobada', 10.0, 80),

-- Ruta 5
('ee9c5ff7-7433-4806-b57f-290f507cfda', 'Ruta de los Conventos Franciscanos', 'Recorre los históricos conventos franciscanos del siglo XVI: Maní, Tekit, Mama y Chumayel. Historia y arquitectura colonial.', 95.7, 'moderado', 399.00, 'aprobada', 7.5, 60),

-- Ruta 6
('ee9c5ff7-7433-4806-b57f-290f507cfda', 'Celestún: Santuario de Flamencos', 'Ruta hacia la Reserva de la Biósfera de Celestún. Observa miles de flamencos rosados en su hábitat natural. Incluye paseo en lancha.', 92.4, 'facil', 449.00, 'aprobada', 6.0, 25),

-- Ruta 7
('ee9c5ff7-7433-4806-b57f-290f507cfda', 'Izamal: La Ciudad de las Tres Culturas', 'Visita el Pueblo Mágico de Izamal, conocido como la Ciudad Amarilla. Pirámides mayas, convento franciscano y artesanías únicas.', 72.3, 'facil', 279.00, 'aprobada', 5.0, 30),

-- Ruta 8
('ee9c5ff7-7433-4806-b57f-290f507cfda', 'Río Lagartos: Reserva Natural', 'Explora la Reserva de la Biósfera Ría Lagartos. Flamencos, cocodrilos, manglares y playas vírgenes. Incluye baño de barro maya.', 145.8, 'moderado', 549.00, 'aprobada', 9.0, 40),

-- Ruta 9
('ee9c5ff7-7433-4806-b57f-290f507cfda', 'Ek Balam: La Ciudad del Jaguar Negro', 'Descubre la zona arqueológica de Ek Balam y refréscate en el hermoso cenote X''Canche. Incluye tirolesa y rappel opcional.', 165.2, 'moderado', 479.00, 'aprobada', 8.5, 70),

-- Ruta 10
('ee9c5ff7-7433-4806-b57f-290f507cfda', 'Ruta de las Haciendas Henequeneras', 'Tour por las antiguas haciendas henequeneras: Sotuta de Peón, Yaxcopoil y San Pedro Ochil. Historia del oro verde de Yucatán.', 68.5, 'facil', 349.00, 'aprobada', 5.5, 35),

-- Ruta 11
('ee9c5ff7-7433-4806-b57f-290f507cfda', 'Sisal: Puerto Histórico y Playas', 'Ruta al pintoresco puerto de Sisal. Playas tranquilas, mariscos frescos y el histórico faro. Ideal para un día relajante.', 52.7, 'facil', 199.00, 'aprobada', 3.5, 10),

-- Ruta 12
('ee9c5ff7-7433-4806-b57f-290f507cfda', 'Sabores de Yucatán: Ruta Gastronómica', 'Tour culinario por los mejores restaurantes y mercados de Mérida y pueblos cercanos. Prueba cochinita pibil, papadzules, salbutes y más.', 45.0, 'facil', 399.00, 'aprobada', 6.0, 20);

-- Verificar que se insertaron correctamente
SELECT title, distance_km, difficulty, price FROM routes ORDER BY created_at DESC LIMIT 12;
