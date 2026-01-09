import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { RouteService } from '../../shared/services/route.service';
import { CartService } from '../../shared/services/cart.service';
import { RouteMapComponent } from '../../shared/components/route-map.component';
import { generateMockRouteCoordinates } from '../../shared/utils/route-geometry.utils';

@Component({
  selector: 'app-route-list',
  standalone: true,
  imports: [CommonModule, RouteMapComponent],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      @for (route of routes(); track route.id) {
        <div class="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-lg hover:shadow-secondary-500/10 hover:border-secondary-500/50 transition-all group">
          <!-- Map Preview -->
          <div class="h-48 bg-slate-800 relative overflow-hidden group-hover:shadow-inner">
            <app-route-map 
              [routeCoordinates]="route.coordinates"
              [interactive]="false"
              height="192px">
            </app-route-map>
            
            <!-- Difficulty Badge -->
            <div class="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-white z-10">
              {{ route.difficulty }}
            </div>

            <!-- Hover Details Overlay -->
            <div class="absolute inset-0 bg-slate-900/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4 text-center z-20">
              <h4 class="text-primary-400 font-bold mb-3 uppercase tracking-wider text-xs">Detalles de la Ruta</h4>
              <div class="grid grid-cols-2 gap-4 w-full mb-2 text-sm">
                <div class="bg-slate-800/50 p-2 rounded-lg">
                  <p class="text-slate-400 text-xs">Tiempo Est.</p>
                  <p class="text-white font-bold">{{ route.estimated_time_hours || '2.5' }}h</p>
                </div>
                <div class="bg-slate-800/50 p-2 rounded-lg">
                  <p class="text-slate-400 text-xs">Elevación</p>
                  <p class="text-white font-bold">{{ route.elevation_gain_m || '150' }}m</p>
                </div>
              </div>
              <p class="text-slate-300 text-xs line-clamp-2">{{ route.description }}</p>
            </div>
          </div>
          
          <div class="p-4">
            <div class="flex justify-between items-start mb-2">
              <div>
                <h3 class="text-lg font-bold text-white group-hover:text-secondary-400 transition-colors">{{ route.title }}</h3>
                <p class="text-sm text-slate-400">{{ route.distance_km }} km</p>
              </div>
              <span class="text-xl font-bold text-secondary-400">\${{ route.price }}</span>
            </div>
            
            <p class="text-slate-400 text-sm mb-4 line-clamp-2">{{ route.description }}</p>
            
            <button (click)="addToCart(route)" 
                    class="w-full py-2 bg-slate-800 hover:bg-secondary-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Comprar Ruta
            </button>
          </div>
        </div>
      } @empty {
        <div class="col-span-full text-center py-12">
          <p class="text-slate-500 text-lg">No hay rutas disponibles para compra.</p>
        </div>
      }
    </div>
  `
})
export class RouteListComponent {
  private routeService = inject(RouteService);
  private cartService = inject(CartService);

  // Transform routes to include stable coordinates
  routes = toSignal(
    from(this.routeService.getRoutes()).pipe(
      map((routes: any[]) => routes.map(route => ({
        ...route,
        // Generate coordinates once and store them
        coordinates: generateMockRouteCoordinates(19.4326, -99.1332, route.distance_km)
      })))
    ),
    { initialValue: [] }
  );

  addToCart(route: any) {
    this.cartService.addToCart(route, 'route');
  }
}
