import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PaymentService } from '../../../shared/services/payment.service';
import { RouteBusinessesComponent } from '../../../shared/components/route-businesses.component';

interface PurchasedRoute {
  id: string;
  title: string;
  description: string;
  distance_km: number;
  difficulty: string;
  price: number;
  purchased_at: string;
}

@Component({
  selector: 'app-my-routes',
  standalone: true,
  imports: [CommonModule, RouterLink, RouteBusinessesComponent],
  template: `
    <div class="min-h-screen bg-slate-950 text-white p-6">
      <div class="container mx-auto">
        <h1 class="text-3xl font-bold mb-8">Mis Rutas Compradas</h1>
        
        @if (purchasedRoutes().length > 0) {
          <div class="space-y-8">
            @for (route of purchasedRoutes(); track route.id) {
              <div class="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-primary-500 transition-all">
                <div class="grid grid-cols-1 xl:grid-cols-12 gap-6 p-6">
                  <!-- Route Info - Left Column -->
                  <div class="xl:col-span-4 space-y-6">
                    <div>
                      <div class="flex justify-between items-start mb-4">
                        <div>
                          <h3 class="text-2xl font-bold text-white mb-1">{{ route.title }}</h3>
                          <p class="text-sm text-slate-400">Comprada el {{ formatDate(route.purchased_at) }}</p>
                        </div>
                        <span class="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm font-medium">
                          {{ route.difficulty }}
                        </span>
                      </div>

                      <p class="text-slate-400 mb-6">{{ route.description }}</p>

                      <div class="flex items-center gap-6 mb-6 text-slate-300">
                        <div class="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                          <span class="font-semibold">{{ route.distance_km }} km</span>
                        </div>
                        <div class="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span class="font-semibold">\${{ route.price }}</span>
                        </div>
                      </div>

                      <button [routerLink]="['/dashboard/live-navigation', route.id]" 
                              class="w-full py-4 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 text-white rounded-xl font-bold shadow-lg shadow-primary-500/20 transition-all flex items-center justify-center gap-3 hover:scale-105">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span class="text-lg">Iniciar Ruta</span>
                      </button>
                    </div>
                  </div>

                  <!-- Businesses - Right Column (Takes more space) -->
                  <div class="xl:col-span-8">
                    <app-route-businesses [routeId]="route.id" />
                  </div>
                </div>
              </div>
            }
          </div>
        } @else {
          <div class="text-center py-16 bg-slate-900 rounded-xl border border-slate-800">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <p class="text-xl text-slate-400 mb-6">Aún no has comprado ninguna ruta</p>
            <a routerLink="/shop/routes" class="inline-block px-6 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition-colors">
              Explorar Rutas
            </a>
          </div>
        }
      </div>
    </div>
  `
})
export class MyRoutesComponent {
  private paymentService = inject(PaymentService);
  purchasedRoutes = signal<PurchasedRoute[]>([]);

  async ngOnInit() {
    // Get current user (mock or real)
    const { data: { user } } = await this.paymentService['supabase'].client.auth.getUser();
    const userId = user?.id || 'ee9c5ff7-7433-4806-b57f-290f507cfda';

    const routes = await this.paymentService.getPurchasedRoutes(userId);
    this.purchasedRoutes.set(routes);
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
