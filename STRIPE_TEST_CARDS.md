# 💳 Tarjetas de Prueba de Stripe

Usa estas tarjetas para probar tu sistema de pagos en modo desarrollo. **No se realizará ningún cargo real.**

## ✅ Pago Exitoso (La que debes usar ahora)

| Marca | Número de Tarjeta | Fecha | CVC |
| :--- | :--- | :--- | :--- |
| **Visa** | `4242 4242 4242 4242` | `12/25` | `123` |
| **Mastercard** | `5555 5555 5555 4444` | `12/25` | `123` |
| **Amex** | `3782 822463 10005` | `12/25` | `1234` |

---

## ❌ Errores Intencionales (Para probar validaciones)

Usa estas para verificar que tu app muestre los mensajes de error correctos.

| Escenario | Número de Tarjeta | Resultado Esperado |
| :--- | :--- | :--- |
| **Genérico** | `4000 0000 0000 0002` | "Su tarjeta fue rechazada." |
| **Sin Fondos** | `4000 0000 0000 0003` | "Su tarjeta tiene fondos insuficientes." |
| **Perdida** | `4000 0000 0000 0004` | "Su tarjeta fue reportada como perdida." |
| **Robada** | `4000 0000 0000 0005` | "Su tarjeta fue reportada como robada." |
| **Expirada** | `4000 0000 0000 0008` | "Su tarjeta ha expirado." |
| **CVC Mal** | `4000 0000 0000 0012` | "El código de seguridad es incorrecto." |

---

## 📝 Datos Adicionales

- **Fecha de Expiración:** Cualquier fecha en el futuro funciona (ej: 12/30).
- **CVC:** Cualquier número de 3 dígitos (4 para Amex).
- **Código Postal:** Cualquier código postal válido (ej: 97000).
