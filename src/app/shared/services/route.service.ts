import { Injectable, inject } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { RoutePayload, RouteSummary } from '../interfaces/route.interface';
import { SupabaseService } from './supabase.service';

const ROUTE_SELECT_FIELDS =
  'id, title, description, distance_km, difficulty, price, status, creator_id, estimated_time_hours, elevation_gain_m, created_at, updated_at, creator:users!routes_creator_id_fkey(full_name, email)';

@Injectable({ providedIn: 'root' })
export class RouteService {
  private supabase: SupabaseClient;

  constructor() {
    const supabaseService = inject(SupabaseService);
    this.supabase = supabaseService.client;
  }

  async getRoutes(): Promise<RouteSummary[]> {
    const { data, error } = await this.supabase
      .from('routes')
      .select(ROUTE_SELECT_FIELDS)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching routes:', error);
      throw error;
    }

    return (data ?? []) as RouteSummary[];
  }

  async getRouteById(id: string): Promise<RouteSummary | null> {
    const { data, error } = await this.supabase
      .from('routes')
      .select(ROUTE_SELECT_FIELDS)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching route:', error);
      return null;
    }

    return data as RouteSummary;
  }

  async createRoute(routeData: RoutePayload): Promise<RouteSummary> {
    const { data, error } = await this.supabase
      .from('routes')
      .insert(routeData)
      .select(ROUTE_SELECT_FIELDS)
      .single();

    if (error) {
      console.error('Error creating route:', error);
      throw error;
    }

    return data as RouteSummary;
  }

  async updateRoute(routeId: string, routeData: Partial<RoutePayload>): Promise<RouteSummary> {
    const { data, error } = await this.supabase
      .from('routes')
      .update(routeData)
      .eq('id', routeId)
      .select(ROUTE_SELECT_FIELDS)
      .single();

    if (error) {
      console.error('Error updating route:', error);
      throw error;
    }

    return data as RouteSummary;
  }

  async deleteRoute(id: string): Promise<void> {
    const { error } = await this.supabase
      .from('routes')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  async saveUserActivity(userId: string, routeId: string, distanceKm: number, durationSeconds: number) {
    const { error } = await this.supabase
      .from('user_activities')
      .insert({
        user_id: userId,
        route_id: routeId,
        distance_km: distanceKm,
        duration_seconds: durationSeconds
      });

    if (error) {
      console.error('Error saving activity:', error);
      throw error;
    }
  }

  async getUserStats(userId: string) {
    // 1. Get total distance and count from activities
    const { data: activities, error: actError } = await this.supabase
      .from('user_activities')
      .select('distance_km')
      .eq('user_id', userId);

    if (actError) throw actError;

    const totalDistance = activities?.reduce((sum, act) => sum + Number(act.distance_km), 0) || 0;

    // 2. Get purchased routes count
    const { count: routesCount, error: routesError } = await this.supabase
      .from('purchased_routes')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    if (routesError) throw routesError;

    // 3. Get orders count and total spent
    const { data: orders, error: ordersError } = await this.supabase
      .from('orders')
      .select('total_amount')
      .eq('user_id', userId);

    if (ordersError) throw ordersError;

    const totalSpent = orders?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;
    const ordersCount = orders?.length || 0;

    return {
      totalDistance,
      routesCount: routesCount || 0,
      ordersCount,
      totalSpent
    };
  }
}
