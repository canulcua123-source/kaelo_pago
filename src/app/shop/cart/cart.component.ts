import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../shared/services/cart.service';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="max-w-4xl mx-auto">
      <h2 class="text-2xl font-bold text-white mb-6">Tu Carrito</h2>
      
      @if (cartService.items().length > 0) {
        <div class="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden mb-6">
          @for (item of cartService.items(); track item.id + item.type) {
            <div class="p-4 border-b border-slate-800 flex items-center gap-4 last:border-0">
              <img [src]="item.image_url || (item.type === 'product' ? 'assets/placeholder-food.jpg' : 'assets/placeholder-route.jpg')" 
                   class="w-20 h-20 object-cover rounded-lg bg-slate-800">
              
              <div class="flex-1">
                <div class="flex justify-between mb-1">
                  <h3 class="font-bold text-white">{{ item.name }}</h3>
                  <span class="font-bold text-white">\${{ item.price * item.quantity }}</span>
                </div>
                <p class="text-sm text-slate-400 capitalize">{{ item.type === 'product' ? 'Comida' : 'Ruta' }}</p>
                
                <div class="flex items-center gap-4 mt-2">
                  <div class="flex items-center bg-slate-800 rounded-lg">
                    <button (click)="updateQuantity(item.id, item.quantity - 1)" 
                            class="px-3 py-1 text-slate-400 hover:text-white transition-colors">-</button>
                    <span class="text-white font-medium w-8 text-center">{{ item.quantity }}</span>
                    <button (click)="updateQuantity(item.id, item.quantity + 1)" 
                            class="px-3 py-1 text-slate-400 hover:text-white transition-colors">+</button>
                  </div>
                  
                  <button (click)="removeItem(item.id)" class="text-red-400 hover:text-red-300 text-sm transition-colors">
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          }
        </div>
        
        <div class="flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-900 p-6 rounded-xl border border-slate-800">
          <div>
            <p class="text-slate-400">Total a Pagar</p>
            <p class="text-3xl font-bold text-white">\${{ cartService.total() }}</p>
          </div>
          
          <a routerLink="../checkout" 
             class="px-8 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 text-white font-bold rounded-lg shadow-lg shadow-primary-500/20 transition-all transform hover:scale-105">
            Proceder al Pago
          </a>
        </div>
      } @else {
        <div class="text-center py-16 bg-slate-900 rounded-xl border border-slate-800">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p class="text-xl text-slate-400 mb-6">Tu carrito está vacío</p>
          <a routerLink="../products" class="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors">
            Explorar Productos
          </a>
        </div>
      }
    </div>
  `
})
export class CartComponent {
    cartService = inject(CartService);

    updateQuantity(id: string, quantity: number) {
        this.cartService.updateQuantity(id, quantity);
    }

    removeItem(id: string) {
        this.cartService.removeFromCart(id);
    }
}
