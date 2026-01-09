# 🔐 Configuración de Pagos Seguros con Supabase Edge Functions

## 📋 **Requisitos Previos**

1. Cuenta de Supabase
2. Cuenta de Stripe
3. Supabase CLI instalado

## 🚀 **Paso 1: Instalar Supabase CLI**

```bash
# Windows (con Scoop)
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase

# O descarga desde: https://github.com/supabase/cli/releases
```

## 🔑 **Paso 2: Obtener tus claves de Stripe**

1. Ve a https://dashboard.stripe.com/test/apikeys
2. Copia:
   - **Publishable key** (pk_test_...)
   - **Secret key** (sk_test_...)
3. Ve a https://dashboard.stripe.com/test/webhooks
4. Crea un webhook endpoint y copia el **Webhook signing secret** (whsec_...)

## ⚙️ **Paso 3: Configurar variables de entorno en Supabase**

1. Ve a tu proyecto en Supabase Dashboard
2. Settings → Edge Functions → Secrets
3. Agrega estas variables:

```
STRIPE_SECRET_KEY=sk_test_tu_clave_secreta_aqui
STRIPE_WEBHOOK_SECRET=whsec_tu_webhook_secret_aqui
```

## 📤 **Paso 4: Desplegar las Edge Functions**

```bash
# 1. Iniciar sesión en Supabase
supabase login

# 2. Vincular tu proyecto
supabase link --project-ref tu-project-ref

# 3. Desplegar las funciones
supabase functions deploy create-payment-intent
supabase functions deploy confirm-payment
supabase functions deploy stripe-webhook
```

## 🌐 **Paso 5: Configurar el Webhook en Stripe**

1. Ve a https://dashboard.stripe.com/test/webhooks
2. Click en "Add endpoint"
3. URL del endpoint:
   ```
   https://tu-project-ref.supabase.co/functions/v1/stripe-webhook
   ```
4. Selecciona estos eventos:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.refunded`
5. Guarda y copia el **Signing secret**

## 🔧 **Paso 6: Actualizar environment.development.ts**

```typescript
export const environment = {
  production: false,
  supabaseUrl: 'https://tu-project.supabase.co',
  supabaseKey: 'tu-anon-key',
  stripePublicKey: 'pk_test_tu_clave_publica_aqui'
};
```

## ✅ **Paso 7: Probar el flujo de pago**

1. Inicia tu app: `ng serve`
2. Ve a `/shop` y agrega productos al carrito
3. Ve a `/shop/checkout`
4. Usa tarjeta de prueba:
   - **Número:** 4242 4242 4242 4242
   - **Fecha:** 12/25
   - **CVC:** 123
5. Completa el pago

## 🔍 **Verificar que funciona:**

1. **En Stripe Dashboard:**
   - Ve a Payments → Deberías ver el pago
   
2. **En Supabase:**
   - Tabla `orders` → Nueva orden creada
   - Tabla `order_items` → Items de la orden
   - Tabla `transactions` → Transacción registrada

## 🛡️ **Seguridad**

✅ **Lo que está seguro:**
- Stripe Secret Key está en el servidor (Edge Function)
- No se expone en el frontend
- Validación de pagos en el backend
- Webhooks firmados por Stripe

❌ **NUNCA hagas esto:**
- Poner `STRIPE_SECRET_KEY` en el frontend
- Confiar en datos del cliente sin validar
- Procesar pagos solo desde el frontend

## 📊 **Flujo completo:**

```
1. Usuario → Checkout
2. Frontend → Edge Function (create-payment-intent)
3. Edge Function → Stripe API → PaymentIntent
4. Frontend → Stripe Elements → Confirma pago
5. Frontend → Edge Function (confirm-payment)
6. Edge Function → Verifica pago → Guarda orden en Supabase
7. Stripe → Webhook → Edge Function → Actualiza estado
```

## 🐛 **Troubleshooting**

### Error: "Function not found"
```bash
# Verifica que las funciones estén desplegadas
supabase functions list
```

### Error: "Invalid API key"
```bash
# Verifica las variables de entorno
supabase secrets list
```

### Error: "CORS"
- Las Edge Functions ya tienen CORS configurado
- Verifica que estés usando la URL correcta

## 🎉 **¡Listo!**

Ahora tienes un sistema de pagos **100% seguro** con:
- ✅ Stripe para procesar pagos
- ✅ Supabase Edge Functions como backend
- ✅ Base de datos para órdenes
- ✅ Webhooks para eventos

---

## 📞 **Soporte**

- Supabase Docs: https://supabase.com/docs/guides/functions
- Stripe Docs: https://stripe.com/docs
- Edge Functions Examples: https://github.com/supabase/supabase/tree/master/examples/edge-functions
