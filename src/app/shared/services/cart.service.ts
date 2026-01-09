import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { RouteSummary } from '../interfaces/route.interface';

export interface CartItem {
    id: string;
    type: 'product' | 'route';
    name: string;
    price: number;
    quantity: number;
    image_url?: string | null;
    originalItem: Product | RouteSummary;
}

@Injectable({
    providedIn: 'root'
})
export class CartService {
    readonly items = signal<CartItem[]>([]);

    readonly total = computed(() =>
        this.items().reduce((acc, item) => acc + (item.price * item.quantity), 0)
    );

    readonly count = computed(() =>
        this.items().reduce((acc, item) => acc + item.quantity, 0)
    );

    addToCart(item: Product | RouteSummary, type: 'product' | 'route') {
        this.items.update(current => {
            const existing = current.find(i => i.id === item.id && i.type === type);
            if (existing) {
                return current.map(i =>
                    i.id === item.id && i.type === type
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            }

            const newItem: CartItem = {
                id: item.id,
                type,
                name: (item as any).name || (item as any).title, // Product has name, Route has title
                price: item.price,
                quantity: 1,
                image_url: (item as any).image_url || (item as any).cover_image_url, // Adjust based on Route interface
                originalItem: item
            };
            return [...current, newItem];
        });
    }

    removeFromCart(itemId: string) {
        this.items.update(current => current.filter(i => i.id !== itemId));
    }

    updateQuantity(itemId: string, quantity: number) {
        if (quantity <= 0) {
            this.removeFromCart(itemId);
            return;
        }

        this.items.update(current =>
            current.map(i => i.id === itemId ? { ...i, quantity } : i)
        );
    }

    clearCart() {
        this.items.set([]);
    }
}
