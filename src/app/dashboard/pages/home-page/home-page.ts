import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouteService } from '../../../shared/services/route.service';
import { SupabaseService } from '../../../shared/services/supabase.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home-page.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {
  private routeService = inject(RouteService);
  private supabase = inject(SupabaseService);

  stats = signal({
    routesCount: 0,
    totalDistance: 0,
    ordersCount: 0,
    totalSpent: 0
  });

  async ngOnInit() {
    try {
      const { data: { user } } = await this.supabase.client.auth.getUser();
      if (user) {
        const data = await this.routeService.getUserStats(user.id);
        this.stats.set(data);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  }
}
