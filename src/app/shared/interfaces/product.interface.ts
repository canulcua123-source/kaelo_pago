export interface Product {
    id: string;
    store_id: string;
    name: string;
    description?: string | null;
    price: number;
    image_url?: string | null;
    category?: string | null;
    is_available: boolean;
    stock_quantity?: number | null;
    created_at?: string;
    updated_at?: string;
    store?: {
        name: string;
    };
}
