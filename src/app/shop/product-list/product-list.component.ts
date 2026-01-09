import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../shared/services/product.service';
import { SupabaseService } from '../../shared/services/supabase.service';
import { Product } from '../../shared/interfaces/product.interface';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      @for (product of products(); track product.id) {
        <div class="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-lg hover:shadow-primary-500/10 hover:border-primary-500/50 transition-all group cursor-pointer"
             (click)="openStoreInfo(product)">
          <div class="relative h-48 overflow-hidden">
            <img [src]="product.image_url || 'assets/placeholder-food.jpg'" 
                 [alt]="product.name"
                 class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
            <div class="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-white">
              {{ getCategoryLabel(product.category) }}
            </div>
            @if (product.category === 'comida') {
              <div class="absolute top-2 left-2 bg-green-500/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-white flex items-center gap-1">
                <span>📍</span> Disponible en tienda
              </div>
            }
          </div>
          
          <div class="p-4">
            <div class="flex justify-between items-start mb-2">
              <div class="flex-1">
                <h3 class="text-lg font-bold text-white group-hover:text-primary-400 transition-colors mb-1">{{ product.name }}</h3>
                @if (product.store?.name) {
                  <p class="text-sm text-primary-400 font-semibold">🏪 {{ product.store?.name }}</p>
                }
              </div>
              <span class="text-xl font-bold text-green-400">\${{ product.price }}</span>
            </div>
            
            <p class="text-slate-400 text-sm mb-4 line-clamp-2">{{ product.description }}</p>
            
            <div class="flex items-center gap-2 text-sm text-slate-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Click para ver opciones de compra</span>
            </div>
          </div>
        </div>
      } @empty {
        <div class="col-span-full text-center py-12">
          <p class="text-slate-500 text-lg">No hay productos disponibles en este momento.</p>
        </div>
      }
    </div>

    <!-- Modal de Información de Tienda -->
    @if (selectedProduct()) {
      <div class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" (click)="closeModal()">
        <div class="bg-slate-900 rounded-2xl max-w-3xl w-full border border-slate-700 shadow-2xl" (click)="$event.stopPropagation()">
          <div class="relative">
            <!-- Header con imagen del producto -->
            <div class="relative h-64 overflow-hidden rounded-t-2xl">
              <img [src]="selectedProduct()!.image_url || 'assets/placeholder-food.jpg'" 
                   [alt]="selectedProduct()!.name"
                   class="w-full h-full object-cover">
              <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
              
              <button (click)="closeModal()" 
                      class="absolute top-4 right-4 bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white p-2 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div class="absolute bottom-4 left-4 right-4">
                <h2 class="text-3xl font-black text-white mb-2">{{ selectedProduct()!.name }}</h2>
                <div class="flex items-center gap-4">
                  <span class="text-4xl font-black text-green-400">\${{ selectedProduct()!.price }}</span>
                  <span class="px-3 py-1 bg-primary-500/20 backdrop-blur-sm text-primary-300 rounded-full text-sm font-bold border border-primary-500/30">
                    {{ getCategoryLabel(selectedProduct()!.category) }}
                  </span>
                </div>
              </div>
            </div>

            <div class="p-6">
              <!-- Descripción del producto -->
              <div class="mb-6">
                <h3 class="text-lg font-bold text-white mb-2">📝 Descripción</h3>
                <p class="text-slate-300">{{ selectedProduct()!.description }}</p>
              </div>

              <!-- Información de la tienda -->
              @if (storeInfo()) {
                <div class="bg-slate-800/50 rounded-xl p-6 border border-slate-700 mb-6">
                  <div class="flex items-start gap-4 mb-4">
                    <div class="bg-primary-500/20 p-3 rounded-xl">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div class="flex-1">
                      <h3 class="text-xl font-bold text-white mb-1">{{ storeInfo()!.name }}</h3>
                      <p class="text-slate-400 text-sm">{{ storeInfo()!.description }}</p>
                    </div>
                  </div>

                  <!-- Datos de contacto -->
                  <div class="grid md:grid-cols-2 gap-4 mb-4">
                    @if (storeInfo()!.contact_info?.phone) {
                      <div class="flex items-center gap-3 text-slate-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span class="font-semibold">{{ storeInfo()!.contact_info.phone }}</span>
                      </div>
                    }
                    @if (storeInfo()!.contact_info?.hours) {
                      <div class="flex items-center gap-3 text-slate-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{{ storeInfo()!.contact_info.hours }}</span>
                      </div>
                    }
                  </div>

                  @if (storeInfo()!.address) {
                    <div class="flex items-start gap-3 text-slate-300 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{{ storeInfo()!.address }}</span>
                    </div>
                  }
                </div>

                <!-- Botones de acción -->
                <div class="grid grid-cols-2 gap-4">
                  @if (storeInfo()!.contact_info?.phone) {
                    <a [href]="'tel:' + storeInfo()!.contact_info.phone"
                       class="flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-green-500/30 hover:scale-105">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Llamar
                    </a>

                    <a [href]="getWhatsAppLink()"
                       target="_blank"
                       class="flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-emerald-500/30 hover:scale-105">
                      <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      WhatsApp
                    </a>
                  }

                  @if (storeInfo()!.latitude && storeInfo()!.longitude) {
                    <a [href]="'https://www.google.com/maps/dir/?api=1&destination=' + storeInfo()!.latitude + ',' + storeInfo()!.longitude"
                       target="_blank"
                       class="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-500/30 hover:scale-105">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      Cómo llegar
                    </a>
                  }

                  @if (storeInfo()!.contact_info?.email) {
                    <a [href]="'mailto:' + storeInfo()!.contact_info.email + '?subject=Consulta sobre ' + selectedProduct()!.name"
                       class="flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-purple-500/30 hover:scale-105">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email
                    </a>
                  }
                </div>

                <div class="mt-6 p-4 bg-primary-500/10 border border-primary-500/30 rounded-lg">
                  <p class="text-sm text-slate-300 text-center">
                    💡 <strong>Tip:</strong> Contacta directamente con la tienda para realizar tu pedido o consultar disponibilidad.
                  </p>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    }
  `
})
export class ProductListComponent {
  private productService = inject(ProductService);
  private supabase = inject(SupabaseService);

  products = toSignal(this.productService.getProducts(), { initialValue: [] });
  selectedProduct = signal<Product | null>(null);
  storeInfo = signal<any>(null);

  getCategoryLabel(category: string | null | undefined): string {
    const labels: Record<string, string> = {
      'comida': '🍎 Comida',
      'accesorios': '🛠️ Accesorios',
      'ropa': '👕 Ropa',
      'bicicletas': '🚴 Bicicletas'
    };
    return labels[category || ''] || category || 'General';
  }

  getWhatsAppLink(): string {
    const store = this.storeInfo();
    const product = this.selectedProduct();

    if (!store?.contact_info?.phone || !product) {
      return '#';
    }

    const phoneNumber = store.contact_info.phone.replace(/[^0-9]/g, '');
    const message = `Hola, me interesa ${product.name}`;
    return `https://wa.me/52${phoneNumber}?text=${encodeURIComponent(message)}`;
  }

  async openStoreInfo(product: Product) {
    this.selectedProduct.set(product);

    // Obtener información completa de la tienda asociada al producto
    if (product.store_id) {
      try {
        const { data, error } = await this.supabase.client
          .from('businesses')
          .select('*')
          .eq('id', product.store_id)
          .single();

        if (!error && data) {
          this.storeInfo.set(data);
        }
      } catch (error) {
        console.error('Error loading store info:', error);
      }
    }
  }

  closeModal() {
    this.selectedProduct.set(null);
    this.storeInfo.set(null);
  }
}
