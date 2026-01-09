-- ==========================================
-- 50 TIENDAS DE CICLISMO EN YUCATÁN
-- ==========================================
-- Distribuidas en diferentes municipios y pueblos

-- Primero, eliminamos duplicados si existen
DELETE FROM businesses WHERE category IN ('store', 'repair') AND name LIKE '%Yucatán%';

INSERT INTO businesses (
  name,
  description,
  latitude,
  longitude,
  address,
  category,
  contact_info,
  image_url,
  is_active
) VALUES

-- MÉRIDA (10 tiendas)
('Bicicletas Mérida Centro', 'Tienda especializada en bicicletas de ruta y montaña. Venta de accesorios y refacciones.', 20.9674, -89.6243, 'Calle 60 #501, Centro, Mérida', 'store', '{"phone": "999-123-4501", "hours": "9:00-20:00", "email": "merida@bicis.com"}', 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500', true),
('Ciclo Sport Mérida Norte', 'Venta de bicicletas Trek y Specialized. Taller de reparación profesional.', 21.0102, -89.6243, 'Av. Colón #502, Col. García Ginerés, Mérida', 'store', '{"phone": "999-123-4502", "hours": "8:00-19:00", "email": "norte@ciclosport.mx"}', 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=500', true),
('Bike Shop Altabrisa', 'Tienda premium en plaza Altabrisa. BMX, MTB y road bikes.', 21.0135, -89.6354, 'Altabrisa Mall, Mérida', 'store', '{"phone": "999-123-4503", "hours": "10:00-21:00", "email": "altabrisa@bikeshop.mx"}', 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=500', true),
('Taller Ciclo Rápido', 'Reparación express y mantenimiento. Abierto 7 días.', 20.9845, -89.6187, 'Calle 42 #310, Centro, Mérida', 'repair', '{"phone": "999-123-4504", "hours": "7:00-22:00", "email": "rapido@taller.mx"}', 'https://images.unsplash.com/photo-1486629482915-3e8a4d4ba6c7?w=500', true),
('Deportes Xtreme Mérida', 'Equipo de protección, cascos, luces y GPS para ciclistas.', 20.9723, -89.6156, 'Calle 59 #490, Centro, Mérida', 'store', '{"phone": "999-123-4505", "hours": "9:00-20:00", "email": "xtreme@deportes.mx"}', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500', true),
('Bici Shop Montejo', 'Tienda con amplio surtido de llantas y cámaras.', 21.0234, -89.6298, 'Paseo de Montejo #450, Mérida', 'store', '{"phone": "999-123-4506", "hours": "9:00-19:00", "email": "montejo@bicishop.mx"}', 'https://images.unsplash.com/photo-1571333250630-f0230c320b6d?w=500', true),
('Taller Bici Pro', 'Especialistas en suspensiones y frenos hidráulicos.', 20.9567, -89.6423, 'Calle 50 #280, Col. Centro, Mérida', 'repair', '{"phone": "999-123-4507", "hours": "8:00-18:00", "email": "pro@taller.mx"}', 'https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=500', true),
('Ciclo Accesorios Express', 'Todo en accesorios: botellas, portabidones, bombas y más.', 20.9912, -89.6534, 'Av. Itzaes #501, Mérida', 'store', '{"phone": "999-123-4508", "hours": "9:00-20:00", "email": "express@accesorios.mx"}', 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=500', true),
('Bike Center Fraccionamiento', 'Bicicletas para toda la familia. Financiamiento disponible.', 21.0045, -89.6712, 'Calle 20 #150, Fracc. Las Américas, Mérida', 'store', '{"phone": "999-123-4509", "hours": "10:00-20:00", "email": "center@bike.mx"}', 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=500', true),
('Servicio Técnico MTB', 'Especialistas en mantenimiento de mountain bikes.', 20.9734, -89.5987, 'Calle 65 #520, Col. Centro, Mérida', 'repair', '{"phone": "999-123-4510", "hours": "8:00-19:00", "email": "mtb@servicio.mx"}', 'https://images.unsplash.com/photo-1434873740857-1bc5653afda8?w=500', true),

-- PROGRESO (5 tiendas)
('Bici Playa Progreso', 'Renta y venta de bicicletas playeras. Ideal para paseos costeros.', 21.2828, -89.6653, 'Calle 80 #150, Progreso', 'store', '{"phone": "969-123-4511", "hours": "8:00-20:00", "email": "playa@progreso.mx"}', 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500', true),
('Taller El Malecón', 'Reparación rápida cerca del malecón. Servicio a domicilio.', 21.2819, -89.6642, 'Malecón s/n, Progreso', 'repair', '{"phone": "969-123-4512", "hours": "7:00-21:00", "email": "malecon@taller.mx"}', 'https://images.unsplash.com/photo-1616401002711-2c0381adb1e0?w=500', true),
('Deportes Costeros', 'Accesorios deportivos y bicicletas. Vista al mar.', 21.2845, -89.6678, 'Calle 78 #200, Progreso', 'store', '{"phone": "969-123-4513", "hours": "9:00-19:00", "email": "costeros@deportes.mx"}', 'https://images.unsplash.com/photo-1541480601022-2308c0f02487?w=500', true),
('Bike Service Progreso', 'Taller mecánico especializado. Atención personalizada.', 21.2803, -89.6624, 'Calle 82 #89, Progreso', 'repair', '{"phone": "969-123-4514", "hours": "8:00-18:00", "email": "service@progreso.mx"}', 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500', true),
('Ciclo Puerto', 'Bicicletas y accesorios náuticos. Equipamiento completo.', 21.2856, -89.6698, 'Av. Principal #45, Progreso', 'store', '{"phone": "969-123-4515", "hours": "9:00-20:00", "email": "puerto@ciclo.mx"}', 'https://images.unsplash.com/photo-1515266591878-f93e32bc5937?w=500', true),

-- VALLADOLID (5 tiendas)
('Bicicletas Valladolid Centro', 'Tienda histórica desde 1985. Amplio surtido.', 20.6906, -88.2025, 'Calle 41 #200, Centro, Valladolid', 'store', '{"phone": "985-123-4516", "hours": "8:00-20:00", "email": "centro@valladolid.mx"}', 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=500', true),
('Taller Colonial', 'Reparación tradicional y moderna. Experiencia de 30 años.', 20.6889, -88.2012, 'Calle 39 #190, Valladolid', 'repair', '{"phone": "985-123-4517", "hours": "7:00-19:00", "email": "colonial@taller.mx"}', 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500', true),
('Deportes Maya', 'Equipamiento deportivo completo. Tradición y calidad.', 20.6923, -88.2043, 'Calle 40 #215, Valladolid', 'store', '{"phone": "985-123-4518", "hours": "9:00-20:00", "email": "maya@deportes.mx"}', 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=500', true),
('Bici Express Valladolid', 'Servicio rápido y eficiente. Refacciones originales.', 20.6934, -88.2067, 'Calle 42 #180, Valladolid', 'repair', '{"phone": "985-123-4519", "hours": "8:00-18:00", "email": "express@valladolid.mx"}', 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=500', true),
('Ciclo Tienda Maya', 'Bicicletas y accesorios. Atención familiar.', 20.6878, -88.1998, 'Calle 38 #175, Valladolid', 'store', '{"phone": "985-123-4520", "hours": "9:00-19:00", "email": "maya@ciclotienda.mx"}', 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=500', true),

-- TIZIMÍN (4 tiendas)
('Bici Shop Tizimín', 'Venta de bicicletas de trabajo y recreación.', 21.1442, -88.1669, 'Calle 50 #400, Tizimín', 'store', '{"phone": "986-123-4521", "hours": "8:00-20:00", "email": "tizimin@bicishop.mx"}', 'https://images.unsplash.com/photo-1571333250630-f0230c320b6d?w=500', true),
('Taller del Norte', 'Servicio mecánico especializado en el oriente de Yucatán.', 21.1423, -88.1653, 'Calle 52 #380, Tizimín', 'repair', '{"phone": "986-123-4522", "hours": "7:00-19:00", "email": "norte@taller.mx"}', 'https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=500', true),
('Deportes Oriente', 'Equipamiento deportivo y ciclista. Precios accesibles.', 21.1456, -88.1685, 'Calle 48 #420, Tizimín', 'store', '{"phone": "986-123-4523", "hours": "9:00-19:00", "email": "oriente@deportes.mx"}', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500', true),
('Bicicletas Económicas', 'Gran variedad de bicicletas a buen precio. Garantía.', 21.1467, -88.1701, 'Calle 46 #440, Tizimín', 'store', '{"phone": "986-123-4524", "hours": "8:00-20:00", "email": "economicas@bicis.mx"}', 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=500', true),

-- TICUL (3 tiendas)
('Bici Ticul', 'Tienda tradicional. Bicicletas de ciudad y montaña.', 20.4006, -89.5375, 'Calle 23 #200, Ticul', 'store', '{"phone": "997-123-4525", "hours": "8:00-19:00", "email": "ticul@bici.mx"}', 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=500', true),
('Taller Puuc', 'Reparación y mantenimiento. Cerca de la ruta Puuc.', 20.4023, -89.5392, 'Calle 26 #185, Ticul', 'repair', '{"phone": "997-123-4526", "hours": "7:00-18:00", "email": "puuc@taller.mx"}', 'https://images.unsplash.com/photo-1486629482915-3e8a4d4ba6c7?w=500', true),
('Deportes Ticul', 'Accesorios y refacciones. Servicio a la comunidad.', 20.3989, -89.5358, 'Calle 25 #210, Ticul', 'store', '{"phone": "997-123-4527", "hours": "9:00-19:00", "email": "deportes@ticul.mx"}', 'https://images.unsplash.com/photo-1434873740857-1bc5653afda8?w=500', true),

-- MOTUL (3 tiendas)
('Bicicletas Motul', 'Venta y reparación. Atención personalizada.', 21.0936, -89.2897, 'Calle 27 #150, Motul', 'store', '{"phone": "991-123-4528", "hours": "8:00-20:00", "email": "motul@bicis.mx"}', 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500', true),
('Taller Ciclista', 'Especialistas en bicicletas de trabajo. Precio justo.', 21.0923, -89.2881, 'Calle 29 #140, Motul', 'repair', '{"phone": "991-123-4529", "hours": "7:00-19:00", "email": "ciclista@taller.mx"}', 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500', true),
('Ciclo Motul', 'Accesorios y piezas. Stock permanente.', 21.0949, -89.2913, 'Calle 31 #160, Motul', 'store', '{"phone": "991-123-4530", "hours": "9:00-19:00", "email": "ciclo@motul.mx"}', 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=500', true),

-- IZAMAL (3 tiendas)
('Bici Amarilla Izamal', 'Tienda temática en la ciudad amarilla. Renta y venta.', 20.9303, -89.0192, 'Calle 31 #300, Izamal', 'store', '{"phone": "988-123-4531", "hours": "8:00-20:00", "email": "amarilla@izamal.mx"}', 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=500', true),
('Taller Convento', 'Reparación cerca del convento. Turismo ciclista.', 20.9289, -89.0178, 'Calle 28 #285, Izamal', 'repair', '{"phone": "988-123-4532", "hours": "7:00-19:00", "email": "convento@taller.mx"}', 'https://images.unsplash.com/photo-1616401002711-2c0381adb1e0?w=500', true),
('Deportes Mágicos', 'Equipamiento para recorrer el pueblo mágico.', 20.9317, -89.0206, 'Calle 33 #315, Izamal', 'store', '{"phone": "988-123-4533", "hours": "9:00-19:00", "email": "magicos@deportes.mx"}', 'https://images.unsplash.com/photo-1571333250630-f0230c320b6d?w=500', true),

-- KANASÍN (2 tiendas)
('Bici Shop Kanasín', 'Tienda moderna con amplio estacionamiento.', 20.9234, -89.5523, 'Carretera Mérida-Cancún Km 12, Kanasín', 'store', '{"phone": "999-123-4534", "hours": "8:00-20:00", "email": "kanasin@bicishop.mx"}', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500', true),
('Taller Rápido Kanasín', 'Servicio express en la carretera. Abierto todos los días.', 20.9245, -89.5534, 'Carretera Mérida-Cancún Km 13, Kanasín', 'repair', '{"phone": "999-123-4535", "hours": "6:00-22:00", "email": "rapido@kanasin.mx"}', 'https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=500', true),

-- UMÁN (2 tiendas)
('Bicicletas Umán', 'Venta de bicicletas familiares y de trabajo.', 20.8867, -89.7503, 'Calle 20 #180, Umán', 'store', '{"phone": "999-123-4536", "hours": "8:00-19:00", "email": "uman@bicis.mx"}', 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=500', true),
('Taller Mecánico Umán', 'Reparación y soldadura. Servicio garantizado.', 20.8878, -89.7514, 'Calle 22 #170, Umán', 'repair', '{"phone": "999-123-4537", "hours": "7:00-18:00", "email": "mecanico@uman.mx"}', 'https://images.unsplash.com/photo-1486629482915-3e8a4d4ba6c7?w=500', true),

-- TECOH (2 tiendas)
('Bici Tecoh', 'Tienda local con tradición. Precio justo.', 20.7456, -89.4789, 'Calle 15 #120, Tecoh', 'store', '{"phone": "999-123-4538", "hours": "8:00-19:00", "email": "tecoh@bici.mx"}', 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=500', true),
('Taller del Pueblo', 'Servicio comunitario de reparación.', 20.7467, -89.4801, 'Calle 17 #110, Tecoh', 'repair', '{"phone": "999-123-4539", "hours": "7:00-18:00", "email": "pueblo@taller.mx"}', 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500', true),

-- CELESTÚN (2 tiendas)
('Bici Flamingo', 'Renta y venta de bicicletas cerca de la reserva.', 20.8586, -90.4006, 'Calle 10 #88, Celestún', 'store', '{"phone": "988-123-4540", "hours": "7:00-20:00", "email": "flamingo@celestun.mx"}', 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500', true),
('Taller Costero Celestún', 'Reparación rápida. Especialistas en bicicletas de playa.', 20.8597, -90.4017, 'Calle 12 #95, Celestún', 'repair', '{"phone": "988-123-4541", "hours": "7:00-19:00", "email": "costero@celestun.mx"}', 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=500', true),

-- HUNUCMÁ (2 tiendas)
('Bicicletas del Poniente', 'Amplio surtido. Crédito disponible.', 21.0178, -89.8756, 'Calle 25 #145, Hunucmá', 'store', '{"phone": "999-123-4542", "hours": "8:00-20:00", "email": "poniente@bicis.mx"}', 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=500', true),
('Taller Express Hunucmá', 'Servicio rápido y eficiente. Garantía total.', 21.0189, -89.8767, 'Calle 27 #155, Hunucmá', 'repair', '{"phone": "999-123-4543", "hours": "7:00-19:00", "email": "express@hunucma.mx"}', 'https://images.unsplash.com/photo-1571333250630-f0230c320b6d?w=500', true),

-- TEKIT (2 tiendas)
('Bici Tekit', 'Tienda familiar. Bicicletas para todos.', 20.5678, -89.3234, 'Calle 18 #90, Tekit', 'store', '{"phone": "997-123-4544", "hours": "8:00-19:00", "email": "tekit@bici.mx"}', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500', true),
('Taller Tekit', 'Reparación tradicional. Buen servicio.', 20.5689, -89.3245, 'Calle 20 #85, Tekit', 'repair', '{"phone": "997-123-4545", "hours": "7:00-18:00", "email": "taller@tekit.mx"}', 'https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=500', true),

-- MAXCANÚ (2 tiendas)
('Bicicletas Maxcanú', 'Venta y reparación en un solo lugar.', 20.5789, -90.1654, 'Calle 21 #125, Maxcanú', 'store', '{"phone": "997-123-4546", "hours": "8:00-20:00", "email": "maxcanu@bicis.mx"}', 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=500', true),
('Taller Sur', 'Especialistas en mantenimiento preventivo.', 20.5801, -90.1665, 'Calle 23 #115, Maxcanú', 'repair', '{"phone": "997-123-4547", "hours": "7:00-19:00", "email": "sur@taller.mx"}', 'https://images.unsplash.com/photo-1486629482915-3e8a4d4ba6c7?w=500', true),

-- OXKUTZCAB (2 tiendas)
('Bici Oxkutzcab', 'Tienda en la capital de la huerta. Bicicletas de carga.', 20.3023, -89.4167, 'Calle 50 #200, Oxkutzcab', 'store', '{"phone": "997-123-4548", "hours": "7:00-20:00", "email": "oxkutzcab@bici.mx"}', 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=500', true),
('Taller Frutas', 'Reparación de bicicletas de reparto y trabajo.', 20.3034, -89.4178, 'Calle 52 #190, Oxkutzcab', 'repair', '{"phone": "997-123-4549", "hours": "6:00-19:00", "email": "frutas@taller.mx"}', 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500', true),

-- CONKAL (1 tienda)
('Mega Bici Conkal', 'Tienda grande con estacionamiento. Todas las marcas.', 21.0678, -89.5234, 'Carretera Mérida-Progreso Km 8, Conkal', 'store', '{"phone": "999-123-4550", "hours": "9:00-21:00", "email": "mega@conkal.mx"}', 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500', true);

-- Notificar
DO $$
BEGIN
  RAISE NOTICE '✅ Se han agregado 50 tiendas de ciclismo distribuidas en Yucatán';
  RAISE NOTICE '📍 Municipios incluidos: Mérida, Progreso, Valladolid, Tizimín, Ticul, Motul, Izamal, Kanasín, Umán, Tecoh, Celestún, Hunucmá, Tekit, Maxcanú, Oxkutzcab, Conkal';
END $$;
