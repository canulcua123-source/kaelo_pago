import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'
import Stripe from 'https://esm.sh/stripe@13.10.0?target=deno'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
    apiVersion: '2023-10-16',
    httpClient: Stripe.createFetchHttpClient(),
})

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { paymentIntentId, userId, items, storeId } = await req.json()

        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

        if (paymentIntent.status !== 'succeeded') {
            throw new Error('Payment not completed')
        }

        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_ANON_KEY') ?? '',
            {
                global: {
                    headers: { Authorization: req.headers.get('Authorization')! },
                },
            }
        )

        const totalAmount = paymentIntent.amount / 100

        const { data: order, error: orderError } = await supabaseClient
            .from('orders')
            .insert({
                user_id: userId,
                store_id: storeId,
                total_amount: totalAmount,
                status: 'confirmada',
            })
            .select()
            .single()

        if (orderError) throw orderError

        const orderItems = items.map((item: any) => ({
            order_id: order.id,
            product_id: item.productId,
            product_name: item.name,
            quantity: item.quantity,
            unit_price: item.price,
            subtotal: item.price * item.quantity,
        }))

        const { error: itemsError } = await supabaseClient
            .from('order_items')
            .insert(orderItems)

        if (itemsError) throw itemsError

        const { error: transactionError } = await supabaseClient
            .from('transactions')
            .insert({
                user_id: userId,
                order_id: order.id,
                amount: totalAmount,
                payment_method: 'stripe',
                status: 'completada',
                stripe_payment_intent_id: paymentIntentId,
            })

        if (transactionError) throw transactionError

        return new Response(
            JSON.stringify({
                success: true,
                orderId: order.id,
            }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            }
        )
    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400,
            }
        )
    }
})
