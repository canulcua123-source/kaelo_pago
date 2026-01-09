import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { SupabaseService } from './supabase.service';

@Injectable({
    providedIn: 'root'
})
export class PaymentService {
    private supabase = inject(SupabaseService);
    private paypalScriptLoaded = false;

    async initializePayPal(): Promise<any> {
        if (this.paypalScriptLoaded) {
            return (window as any).paypal;
        }

        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = `https://www.paypal.com/sdk/js?client-id=${environment.paypalClientId}&currency=MXN`;
            script.onload = () => {
                this.paypalScriptLoaded = true;
                resolve((window as any).paypal);
            };
            script.onerror = (error) => reject(error);
            document.body.appendChild(script);
        });
    }

    async saveOrderDirectly(userId: string, items: any[], total: number): Promise<void> {
        // 1. Insert into purchased_routes for each route item
        const routeItems = items.filter(item => item.type === 'route');

        for (const item of routeItems) {
            // Use upsert to handle potential duplicate purchases gracefully
            const { error } = await this.supabase.client
                .from('purchased_routes')
                .upsert({
                    user_id: userId,
                    route_id: item.id,
                    purchase_price: item.price, // Updated column name based on DB error
                    price_paid: item.price, // Keeping this just in case, doesn't hurt if column exists and is nullable
                    purchased_at: new Date().toISOString()
                }, { onConflict: 'user_id, route_id' });

            if (error) {
                console.error('Error saving purchased route:', error.message, error.details, error.hint);
                // Continue with other items even if one fails
            }
        }

        // 2. Insert into orders table for record keeping
        try {
            const { error } = await this.supabase.client
                .from('orders')
                .insert({
                    user_id: userId,
                    total_amount: total,
                    status: 'completed', // We will fix the enum in DB
                    items: items
                });

            if (error) {
                console.error('Error saving order record:', error.message);
            }
        } catch (e) {
            console.warn('Error inserting into orders table:', e);
        }
    }

    async getPurchasedRoutes(userId: string): Promise<any[]> {
        const { data, error } = await this.supabase.client
            .from('purchased_routes')
            .select(`
                *,
                route:routes(*)
            `)
            .eq('user_id', userId);

        if (error) {
            console.error('Error fetching purchased routes:', error);
            return [];
        }

        return data.map(item => ({
            ...item.route,
            purchased_at: item.purchased_at
        }));
    }

    async saveOrder(paymentIntentId: string, userId: string, items: any[], storeId: string): Promise<any> {
        // Legacy method calling edge function - keeping for reference or fallback
        try {
            const { data, error } = await this.supabase.client.functions.invoke('confirm-payment', {
                body: {
                    paymentIntentId,
                    userId,
                    items,
                    storeId
                }
            });

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error saving order:', error);
            throw error;
        }
    }

    async createPayPalOrder(items: any[]): Promise<{ orderId: string, approvalUrl: string }> {
        try {
            // Calculate total
            const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

            // Call Supabase edge function to create PayPal order
            const { data, error } = await this.supabase.client.functions.invoke('create-paypal-order', {
                body: {
                    items,
                    total
                }
            });

            if (error) throw error;

            return {
                orderId: data.orderId,
                approvalUrl: data.approvalUrl
            };
        } catch (error) {
            console.error('Error creating PayPal order:', error);
            throw error;
        }
    }

    async capturePayPalOrder(orderId: string, userId: string, items: any[]): Promise<any> {
        try {
            const { data, error } = await this.supabase.client.functions.invoke('capture-paypal-order', {
                body: {
                    orderId,
                    userId,
                    items
                }
            });

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error capturing PayPal order:', error);
            throw error;
        }
    }
}
