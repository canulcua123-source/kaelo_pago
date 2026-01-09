import { Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../shared/services/cart.service';
import { PaymentService } from '../../shared/services/payment.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-2xl mx-auto">
      <h2 class="text-2xl font-bold text-white mb-6">Finalizar Compra</h2>
      
      <div class="bg-slate-900 p-6 rounded-xl border border-slate-800 mb-6">
        <h3 class="text-lg font-bold text-white mb-4">Resumen del Pedido</h3>
        @for (item of cartService.items(); track item.id) {
          <div class="flex justify-between text-slate-400 mb-2">
            <span>{{ item.quantity }}x {{ item.name }}</span>
            <span>\${{ item.price * item.quantity }}</span>
          </div>
        }
        <div class="border-t border-slate-800 mt-4 pt-4 flex justify-between text-white font-bold text-lg">
          <span>Total</span>
          <span>\${{ cartService.total() }}</span>
        </div>
      </div>

      <div class="bg-slate-900 p-6 rounded-xl border border-slate-800">
        <h3 class="text-lg font-bold text-white mb-6">Método de Pago</h3>
        
        <!-- PayPal Button Container -->
        <div #paypalElement class="mb-6"></div>
        
        @if (error()) {
          <div class="text-red-400 text-sm mb-4">
            {{ error() }}
          </div>
        }
      </div>
    </div>
  `
})
export class CheckoutComponent {
  @ViewChild('paypalElement') paypalElementRef!: ElementRef;

  cartService = inject(CartService);
  paymentService = inject(PaymentService);
  router = inject(Router);

  loading = signal(false);
  error = signal<string | null>(null);

  async ngAfterViewInit() {
    try {
      const paypal = await this.paymentService.initializePayPal();

      if (!paypal) {
        this.error.set('No se pudo cargar PayPal');
        return;
      }

      await paypal.Buttons({
        style: {
          layout: 'vertical',
          color: 'blue',
          shape: 'rect',
          label: 'paypal'
        },
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: this.cartService.total().toString(),
                currency_code: 'MXN'
              },
              description: `Compra en Kaelo - ${this.cartService.items().length} items`
            }]
          });
        },
        onApprove: async (data: any, actions: any) => {
          try {
            const details = await actions.order.capture();
            console.log('Transaction completed by ' + details.payer.name.given_name);

            // Get current user
            const { data: { user } } = await this.paymentService['supabase'].client.auth.getUser();

            if (!user) {
              console.error('User not logged in');
              alert('Pago procesado, pero no se pudo guardar la compra porque no has iniciado sesión. Por favor contacta a soporte.');
              return;
            }

            // Save order
            await this.paymentService.saveOrderDirectly(
              user.id,
              this.cartService.items(),
              this.cartService.total()
            );

            // Success
            this.cartService.clearCart();
            alert(`¡Pago exitoso! Gracias por tu compra, ${details.payer.name.given_name}.`);
            this.router.navigate(['/dashboard/my-routes']);
          } catch (err) {
            console.error('Capture error:', err);
            this.error.set('Error al procesar el cobro');
          }
        },
        onError: (err: any) => {
          console.error('PayPal error:', err);
          this.error.set('Ocurrió un error con PayPal');
        }
      }).render(this.paypalElementRef.nativeElement);

    } catch (e: any) {
      console.error('PayPal init error:', e);
      this.error.set('Error al inicializar PayPal');
    }
  }
}
