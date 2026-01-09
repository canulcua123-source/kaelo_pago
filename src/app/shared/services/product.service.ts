import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Product } from '../interfaces/product.interface';
import { from, map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private supabase = inject(SupabaseService).client;

    getProducts(): Observable<Product[]> {
        return from(
            this.supabase
                .from('products')
                .select('*, store:stores(name)')
                .eq('is_available', true)
        ).pipe(
            map(({ data, error }) => {
                if (error) throw error;
                return data as Product[];
            })
        );
    }

    getProductById(id: string): Observable<Product> {
        return from(
            this.supabase
                .from('products')
                .select('*, store:stores(name)')
                .eq('id', id)
                .single()
        ).pipe(
            map(({ data, error }) => {
                if (error) throw error;
                return data as Product;
            })
        );
    }
}
