import { Routes } from '@angular/router';
import { ShopComponent } from './shop.component';

export const SHOP_ROUTES: Routes = [
    {
        path: '',
        component: ShopComponent,
        children: [
            { path: '', redirectTo: 'products', pathMatch: 'full' },
            {
                path: 'products',
                loadComponent: () => import('./product-list/product-list.component').then(m => m.ProductListComponent)
            },
            {
                path: 'routes',
                loadComponent: () => import('./route-list/route-list.component').then(m => m.RouteListComponent)
            },
            {
                path: 'stores',
                loadComponent: () => import('./stores-map/stores-map.component').then(m => m.StoresMapComponent)
            },
            {
                path: 'cart',
                loadComponent: () => import('./cart/cart.component').then(m => m.CartComponent)
            },
            {
                path: 'checkout',
                loadComponent: () => import('./checkout/checkout.component').then(m => m.CheckoutComponent)
            }

        ]
    }
];
