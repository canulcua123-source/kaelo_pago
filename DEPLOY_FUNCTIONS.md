# 🚀 Guía Rápida: Desplegar Edge Functions

## Opción 1: Instalación Manual de Supabase CLI (Recomendado)

### Windows:

1. **Descarga el CLI:**
   - Ve a: https://github.com/supabase/cli/releases
   - Descarga: `supabase_windows_amd64.zip`
   - Extrae el archivo en una carpeta (ej: `C:\supabase`)

2. **Agrega al PATH:**
   - Busca "Variables de entorno" en Windows
   - Edita la variable `Path`
   - Agrega la ruta donde extrajiste el archivo (ej: `C:\supabase`)
   - Abre una nueva terminal

3. **Verifica la instalación:**
   ```bash
   supabase --version
   ```

## Opción 2: Usar npm/npx (Más fácil)

```bash
npx supabase login
npx supabase link --project-ref TU_PROJECT_REF
npx supabase functions deploy create-payment-intent
npx supabase functions deploy confirm-payment
npx supabase functions deploy stripe-webhook
```

## 📋 Pasos Detallados:

### 1. Obtener tu Project Reference:

1. Ve a tu proyecto en Supabase Dashboard
2. Settings → General
3. Copia el **Reference ID** (algo como: `abcdefghijklmnop`)

### 2. Login en Supabase:

```bash
npx supabase login
```

Esto abrirá tu navegador para autenticarte.

### 3. Vincular tu proyecto:

```bash
npx supabase link --project-ref TU_PROJECT_REF
```

Reemplaza `TU_PROJECT_REF` con el ID que copiaste.

### 4. Configurar secrets (variables de entorno):

```bash
npx supabase secrets set STRIPE_SECRET_KEY=sk_test_tu_clave_aqui
npx supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_tu_webhook_secret
```

### 5. Desplegar las funciones:

```bash
npx supabase functions deploy create-payment-intent
npx supabase functions deploy confirm-payment  
npx supabase functions deploy stripe-webhook
```

## ✅ Verificar que funcionan:

Después de desplegar, las URLs serán:

```
https://TU_PROJECT_REF.supabase.co/functions/v1/create-payment-intent
https://TU_PROJECT_REF.supabase.co/functions/v1/confirm-payment
https://TU_PROJECT_REF.supabase.co/functions/v1/stripe-webhook
```

## 🔑 Obtener claves de Stripe:

1. **Publishable Key:**
   - https://dashboard.stripe.com/test/apikeys
   - Copia `pk_test_...`

2. **Secret Key:**
   - https://dashboard.stripe.com/test/apikeys
   - Copia `sk_test_...`

3. **Webhook Secret:**
   - https://dashboard.stripe.com/test/webhooks
   - Crea un endpoint con la URL de tu función
   - Copia `whsec_...`

## 🐛 Troubleshooting:

### "supabase: command not found"
```bash
# Usa npx en su lugar
npx supabase --version
```

### "Project not linked"
```bash
npx supabase link --project-ref TU_PROJECT_REF
```

### "Function deployment failed"
```bash
# Verifica que estás en la carpeta correcta
cd c:\Users\PC\Desktop\env\kaelo

# Verifica que existen las funciones
dir supabase\functions
```

## 📞 ¿Necesitas ayuda?

Si tienes problemas, puedes:
1. Usar npx en lugar de instalar el CLI
2. Desplegar desde el Dashboard de Supabase (más manual pero funciona)
3. Pedirme ayuda con el error específico que te salga
