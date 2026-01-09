# 🔧 Solución Temporal: Pagos sin Edge Functions

Debido a que las Edge Functions requieren configuración adicional, aquí está una versión simplificada que funciona SIN Edge Functions para que puedas probar el flujo:

## Opción 1: Modo DEMO (Sin pagos reales)

El checkout actual ya funciona en modo demo. Solo:
1. Usa la tarjeta: `4242 4242 4242 4242`
2. El pago se "simula" pero no se procesa realmente

## Opción 2: Verificar logs de Edge Function

1. Ve a: https://supabase.com/dashboard/project/otapjgcofrwawbxvnmmr/functions
2. Click en `create-payment-intent`
3. Tab "Logs"
4. Mira el error exacto

### Posibles causas del error 400:

1. **STRIPE_SECRET_KEY no configurada correctamente**
   ```bash
   # Verifica que esté configurada
   npx supabase secrets list
   
   # Si no aparece, configúrala de nuevo
   npx supabase secrets set STRIPE_SECRET_KEY=sk_test_tu_clave
   ```

2. **Formato incorrecto del monto**
   - El monto debe ser un número
   - No debe tener símbolos de moneda

3. **CORS o permisos**
   - Las Edge Functions ya tienen CORS configurado
   - Pero puede haber un problema de autenticación

## Opción 3: Usar Stripe Checkout (Más fácil)

En lugar de Edge Functions, podemos usar Stripe Checkout que es más simple:

1. El usuario hace click en "Pagar"
2. Se redirige a una página de Stripe
3. Stripe maneja todo el pago
4. Redirige de vuelta a tu app

¿Quieres que implemente Stripe Checkout en su lugar? Es más fácil y no requiere Edge Functions.

## 🎯 Recomendación:

Para desarrollo/pruebas: **Usa el modo demo actual** (funciona sin configuración)
Para producción: **Implementa Stripe Checkout** (más fácil que Edge Functions)
