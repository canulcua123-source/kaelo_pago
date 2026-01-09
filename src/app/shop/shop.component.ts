import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CartService } from '../shared/services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <div class="min-h-screen bg-slate-950 text-white pb-20">
      <!-- Header -->
      <header class="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div class="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 class="text-2xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
            Kaelo Market
          </h1>
          
          <a routerLink="cart" class="relative p-2 hover:bg-slate-800 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            @if (cartService.count() > 0) {
              <span class="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                {{ cartService.count() }}
              </span>
            }
          </a>
        </div>

        <!-- Navigation Tabs -->
        <nav class="flex border-b border-slate-800">
          <a routerLink="products" 
             routerLinkActive="text-primary-400 border-b-2 border-primary-400" 
             class="flex-1 py-3 text-center text-slate-400 hover:text-white transition-colors font-medium">
            Comida
          </a>
          <a routerLink="routes" 
             routerLinkActive="text-primary-400 border-b-2 border-primary-400" 
             class="flex-1 py-3 text-center text-slate-400 hover:text-white transition-colors font-medium">
            Rutas
          </a>
          <a routerLink="stores" 
             routerLinkActive="text-primary-400 border-b-2 border-primary-400" 
             class="flex-1 py-3 text-center text-slate-400 hover:text-white transition-colors font-medium">
            🏪 Tiendas
          </a>
        </nav>
      </header>

      <!-- Main Content -->
      <main class="container mx-auto px-4 py-6">
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class ShopComponent {
  cartService = inject(CartService);
}
