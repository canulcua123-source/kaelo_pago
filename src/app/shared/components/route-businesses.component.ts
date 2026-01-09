import { Component, input, signal, OnInit, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessService, RouteBusinessDetailed } from '../services/business.service';

@Component({
  selector: 'app-route-businesses',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative overflow-hidden bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 shadow-2xl">
      <!-- Gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/5 pointer-events-none"></div>
      
      <div class="relative z-10">
        <!-- Header -->
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center gap-4">
            <div class="bg-gradient-to-br from-primary-500 to-secondary-500 p-3 rounded-2xl shadow-lg">
              <span class="text-3xl">🗺️</span>
            </div>
            <div>
              <h3 class="text-3xl font-black bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Negocios en la Ruta
              </h3>
              <p class="text-sm text-slate-400 mt-1">Encuentra todo lo que necesitas en tu camino</p>
            </div>
          </div>
          
          @if (businesses().length > 0) {
            <div class="bg-primary-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-primary-500/30">
              <span class="text-primary-300 font-bold text-sm">{{ businesses().length }} lugares</span>
            </div>
          }
        </div>

        <!-- Filter Tabs -->
        <div class="flex gap-3 mb-8 overflow-x-auto pb-3">
          <button 
            (click)="filterCategory.set('all')"
            [class]="filterCategory() === 'all' 
              ? 'bg-gradient-to-r from-primary-600 to-secondary-600 border-primary-500/50 text-white shadow-xl shadow-primary-500/20 scale-105' 
              : 'bg-slate-800/50 border-slate-700/50 text-slate-300 hover:scale-105'"
            class="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 border-2 hover:shadow-lg">
            <span class="text-lg">🌟</span>
            <span class="font-bold">Todos</span>
            <span [class]="filterCategory() === 'all' ? 'bg-white/20 text-white' : 'bg-slate-700/70'" 
                  class="px-2 py-0.5 rounded-full text-xs font-bold min-w-[1.5rem] text-center">
              {{ businesses().length }}
            </span>
          </button>
          
          <button 
            (click)="filterCategory.set('food')"
            [class]="filterCategory() === 'food' 
              ? 'bg-gradient-to-r from-orange-600 to-red-600 border-orange-500/50 text-white shadow-xl shadow-orange-500/20 scale-105' 
              : 'bg-slate-800/50 border-slate-700/50 text-slate-300 hover:scale-105'"
            class="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 border-2 hover:shadow-lg">
            <span class="text-lg">🍽️</span>
            <span class="font-bold">Restaurantes</span>
            <span [class]="filterCategory() === 'food' ? 'bg-white/20 text-white' : 'bg-slate-700/70'" 
                  class="px-2 py-0.5 rounded-full text-xs font-bold min-w-[1.5rem] text-center">
              {{ getCategoryCount('food') }}
            </span>
          </button>
          
          <button 
            (click)="filterCategory.set('cafe')"
            [class]="filterCategory() === 'cafe' 
              ? 'bg-gradient-to-r from-amber-600 to-yellow-600 border-amber-500/50 text-white shadow-xl shadow-amber-500/20 scale-105' 
              : 'bg-slate-800/50 border-slate-700/50 text-slate-300 hover:scale-105'"
            class="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 border-2 hover:shadow-lg">
            <span class="text-lg">☕</span>
            <span class="font-bold">Cafés</span>
            <span [class]="filterCategory() === 'cafe' ? 'bg-white/20 text-white' : 'bg-slate-700/70'" 
                  class="px-2 py-0.5 rounded-full text-xs font-bold min-w-[1.5rem] text-center">
              {{ getCategoryCount('cafe') }}
            </span>
          </button>
          
          <button 
            (click)="filterCategory.set('store')"
            [class]="filterCategory() === 'store' 
              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 border-blue-500/50 text-white shadow-xl shadow-blue-500/20 scale-105' 
              : 'bg-slate-800/50 border-slate-700/50 text-slate-300 hover:scale-105'"
            class="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 border-2 hover:shadow-lg">
            <span class="text-lg">🏪</span>
            <span class="font-bold">Tiendas</span>
            <span [class]="filterCategory() === 'store' ? 'bg-white/20 text-white' : 'bg-slate-700/70'" 
                  class="px-2 py-0.5 rounded-full text-xs font-bold min-w-[1.5rem] text-center">
              {{ getCategoryCount('store') }}
            </span>
          </button>
          
          <button 
            (click)="filterCategory.set('repair')"
            [class]="filterCategory() === 'repair' 
              ? 'bg-gradient-to-r from-gray-600 to-slate-600 border-gray-500/50 text-white shadow-xl shadow-gray-500/20 scale-105' 
              : 'bg-slate-800/50 border-slate-700/50 text-slate-300 hover:scale-105'"
            class="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 border-2 hover:shadow-lg">
            <span class="text-lg">🔧</span>
            <span class="font-bold">Talleres</span>
            <span [class]="filterCategory() === 'repair' ? 'bg-white/20 text-white' : 'bg-slate-700/70'" 
                  class="px-2 py-0.5 rounded-full text-xs font-bold min-w-[1.5rem] text-center">
              {{ getCategoryCount('repair') }}
            </span>
          </button>
        </div>

        <!-- Loading State -->
        @if (loading()) {
          <div class="flex flex-col justify-center items-center py-20">
            <div class="relative">
              <div class="animate-spin rounded-full h-16 w-16 border-4 border-slate-700"></div>
              <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-500 absolute top-0"></div>
            </div>
            <p class="text-slate-400 mt-4 animate-pulse">Cargando negocios...</p>
          </div>
        }

        <!-- Empty State -->
        @else if (filteredBusinesses().length === 0) {
          <div class="text-center py-20 bg-slate-800/30 rounded-2xl border border-slate-700/50">
            <div class="text-8xl mb-6 animate-bounce">🏪</div>
            <p class="text-slate-300 text-xl font-semibold mb-2">
              No hay negocios {{ filterCategory() !== 'all' ? 'de esta categoría' : '' }}
            </p>
            <p class="text-slate-500">
              Intenta seleccionar otra categoría
            </p>
          </div>
        }

        <!-- Businesses Grid -->
        @else {
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            @for (business of filteredBusinesses(); track business.business_id) {
              <div class="relative bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-primary-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/10 hover:scale-[1.02] hover:-translate-y-1 overflow-hidden group animate-fadeInUp">
                <div class="flex gap-5">
                  <!-- Icon -->
                  <div class="flex-shrink-0">
                    <div [class]="'w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 bg-gradient-to-br ' + businessService.getCategoryColor(business.category)">
                      <span class="text-4xl">{{ businessService.getCategoryIcon(business.category) }}</span>
                    </div>
                  </div>

                  <!-- Content -->
                  <div class="flex-1 min-w-0">
                    <!-- Title and badge -->
                    <div class="flex items-start justify-between gap-3 mb-3">
                      <h4 class="text-xl font-black text-white group-hover:text-primary-300 transition-colors leading-tight">
                        {{ business.business_name }}
                      </h4>
                      @if (business.is_recommended) {
                        <span class="flex items-center gap-1 bg-gradient-to-r from-green-500 to-emerald-600 px-3 py-1.5 rounded-full shadow-lg shadow-green-500/30 text-white flex-shrink-0 animate-pulse">
                          <span class="text-xs">⭐</span>
                          <span class="font-bold text-xs">Top</span>
                        </span>
                      }
                    </div>

                    <!-- Description -->
                    <p class="text-sm text-slate-400 mb-4 line-clamp-2 leading-relaxed">
                      {{ business.business_description }}
                    </p>

                    <!-- Details -->
                    <div class="space-y-2 mb-4">
                      @if (business.address) {
                        <div class="flex items-start gap-2 text-xs text-slate-500">
                          <span class="text-primary-400 mt-0.5">📍</span>
                          <span class="flex-1">{{ business.address }}</span>
                        </div>
                      }
                      <div class="flex items-center gap-4 text-xs">
                        @if (business.distance_from_start_km !== null) {
                          <div class="flex items-center gap-1.5 text-slate-500">
                            <span class="text-secondary-400">📏</span>
                            <span class="font-semibold">{{ business.distance_from_start_km | number:'1.1-1' }} km</span>
                          </div>
                        }
                        @if (business.contact_info?.hours) {
                          <div class="flex items-center gap-1.5 text-slate-500">
                            <span class="text-green-400">🕐</span>
                            <span class="font-semibold">{{ business.contact_info.hours }}</span>
                          </div>
                        }
                      </div>
                    </div>

                    <!-- Call button -->
                    @if (business.contact_info?.phone) {
                      <a 
                        [href]="'tel:' + business.contact_info.phone"
                        class="inline-flex items-center gap-3 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 text-white px-5 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30 hover:scale-105 group/btn">
                        <span class="text-lg">📞</span>
                        <span class="font-bold">{{ business.contact_info.phone }}</span>
                        <svg class="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </a>
                    }
                  </div>
                </div>

                <!-- Hover effect line -->
                <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-b-2xl"></div>
              </div>
            }
          </div>
        }

        <!-- Summary Stats -->
        @if (!loading() && businesses().length > 0) {
          <div class="mt-10 pt-8 border-t border-slate-700/50">
            <h4 class="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 text-center">Resumen de Categorías</h4>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div class="relative bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 text-center border border-slate-700/50 hover:border-orange-500/30 transition-all duration-300 hover:scale-105 overflow-hidden group/stat">
                <div class="text-4xl font-black bg-gradient-to-br from-orange-400 to-red-500 bg-clip-text text-transparent">
                  {{ getCategoryCount('food') }}
                </div>
                <div class="text-sm font-semibold text-slate-400 mt-1">Restaurantes</div>
                <div class="absolute top-2 right-2 text-4xl opacity-10 group-hover/stat:opacity-20 group-hover/stat:scale-110 transition-all">🍽️</div>
              </div>
              <div class="relative bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 text-center border border-slate-700/50 hover:border-amber-500/30 transition-all duration-300 hover:scale-105 overflow-hidden group/stat">
                <div class="text-4xl font-black bg-gradient-to-br from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                  {{ getCategoryCount('cafe') }}
                </div>
                <div class="text-sm font-semibold text-slate-400 mt-1">Cafés</div>
                <div class="absolute top-2 right-2 text-4xl opacity-10 group-hover/stat:opacity-20 group-hover/stat:scale-110 transition-all">☕</div>
              </div>
              <div class="relative bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 text-center border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300 hover:scale-105 overflow-hidden group/stat">
                <div class="text-4xl font-black bg-gradient-to-br from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                  {{ getCategoryCount('store') }}
                </div>
                <div class="text-sm font-semibold text-slate-400 mt-1">Tiendas</div>
                <div class="absolute top-2 right-2 text-4xl opacity-10 group-hover/stat:opacity-20 group-hover/stat:scale-110 transition-all">🏪</div>
              </div>
              <div class="relative bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 text-center border border-slate-700/50 hover:border-gray-500/30 transition-all duration-300 hover:scale-105 overflow-hidden group/stat">
                <div class="text-4xl font-black bg-gradient-to-br from-gray-400 to-slate-500 bg-clip-text text-transparent">
                  {{ getCategoryCount('repair') }}
                </div>
                <div class="text-sm font-semibold text-slate-400 mt-1">Talleres</div>
                <div class="absolute top-2 right-2 text-4xl opacity-10 group-hover/stat:opacity-20 group-hover/stat:scale-110 transition-all">🔧</div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-fadeInUp {
      animation: fadeInUp 0.5s ease-out;
    }

    .animate-fadeInUp:nth-child(1) { animation-delay: 0.05s; }
    .animate-fadeInUp:nth-child(2) { animation-delay: 0.1s; }
    .animate-fadeInUp:nth-child(3) { animation-delay: 0.15s; }
    .animate-fadeInUp:nth-child(4) { animation-delay: 0.2s; }
  `
})
export class RouteBusinessesComponent implements OnInit {
  routeId = input.required<string>();

  businessService = inject(BusinessService);

  businesses = signal<RouteBusinessDetailed[]>([]);
  loading = signal(false);
  filterCategory = signal<'all' | 'food' | 'cafe' | 'store' | 'repair'>('all');

  filteredBusinesses = signal<RouteBusinessDetailed[]>([]);

  constructor() {
    effect(() => {
      const category = this.filterCategory();
      const allBusinesses = this.businesses();

      if (category === 'all') {
        this.filteredBusinesses.set(allBusinesses);
      } else {
        this.filteredBusinesses.set(
          allBusinesses.filter(b => b.category === category)
        );
      }
    });
  }

  async ngOnInit() {
    await this.loadBusinesses();
  }

  private async loadBusinesses() {
    try {
      this.loading.set(true);
      const data = await this.businessService.getBusinessesByRoute(this.routeId());
      this.businesses.set(data);
    } catch (error) {
      console.error('Error loading businesses:', error);
    } finally {
      this.loading.set(false);
    }
  }

  getCategoryCount(category: string): number {
    return this.businesses().filter(b => b.category === category).length;
  }
}
