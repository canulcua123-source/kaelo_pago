# Sistema de Negocios en Rutas - Kaelo

## 🎯 Objetivo
Mostrar automáticamente restaurantes, tiendas, cafés y talleres de bicicletas que se encuentran en el camino de cada ruta, mejorando la experiencia del ciclista.

## 📋 Componentes Creados

### 1. **Base de Datos** (`scripts/create_route_businesses_system.sql`)
- ✅ Tabla `route_businesses` - Relaciona rutas con negocios
- ✅ Vista `route_businesses_detailed` - Consulta optimizada con toda la info
- ✅ Función `calculate_distance()` - Calcula distancia entre coordenadas (Haversine)
- ✅ Función `assign_businesses_to_route()` - Asigna negocios automáticamente
- ✅ Datos de ejemplo de 8 negocios en Yucatán
- ✅ Políticas RLS para seguridad

### 2. **Servicio Angular** (`src/app/shared/services/business.service.ts`)
Métodos disponibles:
- `getAllBusinesses()` - Obtener todos los negocios
- `getBusinessesByRoute(routeId)` - Negocios de una ruta específica
- `getRecommendedBusinesses(routeId)` - Solo los recomendados (< 500m)
- `getBusinessesByCategory(routeId, category)` - Filtrar por tipo
- `assignBusinessesToRoute(routeId)` - Asignar automáticamente (admin)

### 3. **Componente UI** (`src/app/shared/components/route-businesses.component.ts`)
Features:
- 📱 Diseño responsive
- 🔍 Filtros por categoría (Todos, Restaurantes, Cafés, Tiendas, Talleres)
- ⭐ Badge de "Recomendado" para negocios cercanos
- 📊 Resumen con contadores por categoría
- 📞 Click-to-call en números de teléfono
- 🎨 Colores distintos por categoría

## 🚀 Pasos para Implementar

### Paso 1: Ejecutar el Script SQL
1. Ve a tu proyecto en Supabase
2. Abre el **SQL Editor**
3. Copia y pega el contenido de `scripts/create_route_businesses_system.sql`
4. Haz clic en **Run**

### Paso 2: Agregar el Componente a My Routes
En `src/app/dashboard/pages/my-routes/my-routes.component.ts`, importa el componente:

\`\`\`typescript
import { RouteBusinessesComponent } from '../../../shared/components/route-businesses.component';

@Component({
  // ...
  imports: [CommonModule, RouterLink, RouteBusinessesComponent],
  // ...
})
\`\`\`

Luego en el template, agrega debajo del botón "Iniciar Ruta":

\`\`\`html
<!-- Dentro del @for de rutas -->
<app-route-businesses [routeId]="route.id" />
\`\`\`

### Paso 3: (Opcional) Agregar a Live Navigation
Para mostrar negocios cercanos durante la navegación en vivo, agrega el componente también en `live-navigation.component.ts`.

## 📊 Estructura de Datos

### Columnas de `businesses`
\`\`\`sql
- id: UUID
- name: TEXT
- description: TEXT
- image_url: TEXT
- latitude: DECIMAL(10, 8)
- longitude: DECIMAL(11, 8)
- address: TEXT
- category: TEXT ('food', 'store', 'cafe', 'repair')
- contact_info: JSONB { phone, hours, website }
- is_active: BOOLEAN
\`\`\`

### Tabla `route_businesses`
\`\`\`sql
- route_id: UUID (FK a routes)
- business_id: UUID (FK a businesses)
- distance_from_start_km: DECIMAL
- order_in_route: INTEGER
- is_recommended: BOOLEAN (si está a < 500m)
\`\`\`

## 🔧 Cómo Funciona

1. **Automático**: Al ejecutar el script, se asignan automáticamente negocios a todas las rutas existentes basándose en proximidad geográfica (radio de 2km)

2. **Manual**: Los admins pueden reasignar negocios ejecutando:
   \`\`\`typescript
   await businessService.assignBusinessesToRoute(routeId, 2.0);
   \`\`\`

3. **Visualización**: El componente `<app-route-businesses>` muestra los negocios con:
   - Filtros por categoría
   - Distancia desde el punto más cercano de la ruta
   - Información de contacto
   - Badge de "Recomendado"

## 🎨 Categorías y Colores

| Categoría | Icono | Color | Descripción |
|-----------|-------|-------|-------------|
| `food` | 🍽️ | Naranja-Rojo | Restaurantes |
| `cafe` | ☕ | Ámbar-Amarillo | Cafés |
| `store` | 🏪 | Azul-Cyan | Tiendas/Minimercados |
| `repair` | 🔧 | Gris-Slate | Talleres de Bicicletas |

## 📝 Agregar Más Negocios

Para agregar negocios manualmente:

\`\`\`sql
INSERT INTO businesses (
  name, description, image_url, 
  latitude, longitude, address, 
  category, contact_info, is_active
) VALUES (
  'Nombre del Negocio',
  'Descripción breve',
  'https://url-de-imagen.com',
  20.9674, -- Latitud
  -89.6243, -- Longitud
  'Dirección completa',
  'food', -- o 'cafe', 'store', 'repair'
  '{"phone": "999-123-4567", "hours": "9:00-20:00"}'::jsonb,
  true
);

-- Luego asignar a rutas automáticamente
SELECT assign_businesses_to_route(
  (SELECT id FROM routes WHERE name = 'Nombre de la Ruta'),
  2.0 -- radio en km
);
\`\`\`

## 🌟 Mejoras Futuras (Opcionales)

- [ ] Integrar con Google Places API para datos reales
- [ ] Mostrar negocios en el mapa de navegación
- [ ] Sistema de reviews/opiniones
- [ ] Ofertas especiales para ciclistas
- [ ] Programa de partners con descuentos
- [ ] Notificaciones cuando te acercas a un negocio

## 📱 Ejemplo de Uso

\`\`\`typescript
// En cualquier componente
import { BusinessService } from './shared/services/business.service';

const businessService = inject(BusinessService);

// Obtener negocios de una ruta
const businesses = await businessService.getBusinessesByRoute(routeId);

// Solo restaurantes
const restaurants = await businessService.getBusinessesByCategory(routeId, 'food');

// Solo recomendados
const recommended = await businessService.getRecommendedBusinesses(routeId);
\`\`\`

---

**Desarrollado para Kaelo - Tu compañero de ciclismo** 🚴‍♂️
