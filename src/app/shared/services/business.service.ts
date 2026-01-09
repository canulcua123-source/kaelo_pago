import { Injectable, inject } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';

export interface Business {
    id: string;
    name: string;
    description: string;
    image_url: string;
    latitude: number;
    longitude: number;
    address: string;
    category: 'food' | 'store' | 'cafe' | 'repair';
    contact_info: {
        phone?: string;
        hours?: string;
        website?: string;
    };
    is_active: boolean;
}

export interface RouteBusinessDetailed {
    route_id: string;
    business_id: string;
    distance_from_start_km: number;
    order_in_route: number;
    is_recommended: boolean;
    business_name: string;
    business_description: string;
    business_image: string;
    latitude: number;
    longitude: number;
    address: string;
    category: string;
    contact_info: any;
    route_name: string;
}

@Injectable({
    providedIn: 'root'
})
export class BusinessService {
    private supabase: SupabaseClient;

    constructor() {
        const supabaseService = inject(SupabaseService);
        this.supabase = supabaseService.client;
    }

    /**
     * Obtener todos los negocios activos
     */
    async getAllBusinesses(): Promise<Business[]> {
        const { data, error } = await this.supabase
            .from('businesses')
            .select('*')
            .eq('is_active', true)
            .order('name');

        if (error) {
            console.error('Error fetching businesses:', error);
            throw error;
        }

        return data || [];
    }

    /**
     * Obtener negocios asociados a una ruta específica
     */
    async getBusinessesByRoute(routeId: string): Promise<RouteBusinessDetailed[]> {
        const { data, error } = await this.supabase
            .from('route_businesses_detailed')
            .select('*')
            .eq('route_id', routeId)
            .order('order_in_route');

        if (error) {
            console.error('Error fetching route businesses:', error);
            throw error;
        }

        return data || [];
    }

    /**
     * Obtener negocios recomendados de una ruta (los más cercanos)
     */
    async getRecommendedBusinesses(routeId: string): Promise<RouteBusinessDetailed[]> {
        const { data, error } = await this.supabase
            .from('route_businesses_detailed')
            .select('*')
            .eq('route_id', routeId)
            .eq('is_recommended', true)
            .order('order_in_route');

        if (error) {
            console.error('Error fetching recommended businesses:', error);
            throw error;
        }

        return data || [];
    }

    /**
     * Obtener negocios por categoría en una ruta
     */
    async getBusinessesByCategory(
        routeId: string,
        category: 'food' | 'store' | 'cafe' | 'repair'
    ): Promise<RouteBusinessDetailed[]> {
        const { data, error } = await this.supabase
            .from('route_businesses_detailed')
            .select('*')
            .eq('route_id', routeId)
            .eq('category', category)
            .order('order_in_route');

        if (error) {
            console.error('Error fetching businesses by category:', error);
            throw error;
        }

        return data || [];
    }

    /**
     * Asignar negocios a una ruta automáticamente
     * (Solo para admins, ejecuta la función de SQL)
     */
    async assignBusinessesToRoute(routeId: string, maxDistanceKm: number = 2.0): Promise<number> {
        const { data, error } = await this.supabase
            .rpc('assign_businesses_to_route', {
                p_route_id: routeId,
                max_distance_km: maxDistanceKm
            });

        if (error) {
            console.error('Error assigning businesses to route:', error);
            throw error;
        }

        return data || 0;
    }

    /**
     * Obtener categorías de iconos para mostrar en UI
     */
    getCategoryIcon(category: string): string {
        const icons: Record<string, string> = {
            food: '🍽️',
            store: '🏪',
            cafe: '☕',
            repair: '🔧'
        };
        return icons[category] || '📍';
    }

    getCategoryLabel(category: string): string {
        const labels: Record<string, string> = {
            food: 'Restaurante',
            store: 'Tienda',
            cafe: 'Café',
            repair: 'Taller'
        };
        return labels[category] || 'Negocio';
    }

    getCategoryColor(category: string): string {
        const colors: Record<string, string> = {
            food: 'from-orange-500 to-red-500',
            store: 'from-blue-500 to-cyan-500',
            cafe: 'from-amber-500 to-yellow-500',
            repair: 'from-gray-500 to-slate-500'
        };
        return colors[category] || 'from-primary-500 to-secondary-500';
    }
}
