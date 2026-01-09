import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'
import Stripe from 'https://esm.sh/stripe@13.10.0?target=deno'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
    apiVersion: '2023-10-16',
    httpClient: Stripe.createFetchHttpClient(),
})

const cryptoProvider = Stripe.createSubtleCryptoProvider()

serve(async (req) => {
    const signature = req.headers.get('Stripe-Signature')
    const body = await req.text()

    let event: Stripe.Event

    try {
        event = await stripe.webhooks.constructEventAsync(
            body,
            signature!,
            Deno.env.get('STRIPE_WEBHOOK_SECRET')!,
            undefined,
            cryptoProvider
        )
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 400 })
    }

    const supabaseClient = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    switch (event.type) {
        case 'payment_intent.succeeded': {
            const paymentIntent = event.data.object as Stripe.PaymentIntent
            await supabaseClient
                .from('transactions')
                .update({ status: 'completada' })
                .eq('stripe_payment_intent_id', paymentIntent.id)
            break
        }
        case 'payment_intent.payment_failed': {
            const paymentIntent = event.data.object as Stripe.PaymentIntent
            await supabaseClient
                .from('transactions')
                .update({ status: 'fallida' })
                .eq('stripe_payment_intent_id', paymentIntent.id)
            break
        }
        case 'charge.refunded': {
            const charge = event.data.object as Stripe.Charge
            await supabaseClient
                .from('transactions')
                .update({ status: 'reembolsada' })
                .eq('stripe_payment_intent_id', charge.payment_intent)
            break
        }
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 })
})
