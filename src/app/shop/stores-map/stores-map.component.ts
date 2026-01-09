import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../shared/services/store.service';
import { Store, GeoPoint } from '../../shared/interfaces/store.interface';
import * as L from 'leaflet';

@Component({
    selector: 'app-stores-map',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="min-h-screen bg-slate-950 text-white p-6">
      <div class="container mx-auto">
        <h1 class="text-3xl font-bold mb-6">🏪 Tiendas Cercanas</h1>
        
        <!-- Map Container -->
        <div class="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 mb-6">
          <div #mapContainer id="storesMap" class="h-[600px]"></div>
        </div>

        <!-- Stores List -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          @for (store of stores(); track store.id) {
            <div class="bg-slate-900 rounded-xl p-4 border border-slate-800 hover:border-primary-500 transition-all cursor-pointer"
                 (click)="focusStore(store)">
              <h3 class="text-lg font-bold text-white mb-2">{{ store.name }}</h3>
              @if (store.description) {
                <p class="text-slate-400 text-sm mb-2">{{ store.description }}</p>
              }
              @if (store.address) {
                <p class="text-slate-500 text-xs flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {{ store.address }}
                </p>
              }
            </div>
          }
        </div>
      </div>
    </div>
  `,
    styles: [`
    #storesMap {
      width: 100%;
      height: 100%;
    }
  `]
})
export class StoresMapComponent implements OnInit {
    private storeService = inject(StoreService);
    private map?: L.Map;
    private storeMarkers: Map<string, L.Marker> = new Map();

    stores = signal<Store[]>([]);

    async ngOnInit() {
        await this.loadStores();
        setTimeout(() => this.initMap(), 100);
    }

    async loadStores() {
        try {
            const storesData = await this.storeService.getStoresWithLocation();
            this.stores.set(storesData);
        } catch (error) {
            console.error('Error loading stores:', error);
        }
    }

    private getCoordinates(location: GeoPoint | string): [number, number] | null {
        if (typeof location === 'string') {
            try {
                const parsed = JSON.parse(location) as GeoPoint;
                return [parsed.coordinates[1], parsed.coordinates[0]]; // [lat, lng]
            } catch {
                return null;
            }
        }
        return [location.coordinates[1], location.coordinates[0]]; // [lat, lng]
    }

    private initMap() {
        const defaultCenter: [number, number] = [19.4326, -99.1332];

        this.map = L.map('storesMap').setView(defaultCenter, 12);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(this.map);

        this.addStoreMarkers();
    }

    private addStoreMarkers() {
        if (!this.map) return;

        const bounds: L.LatLng[] = [];

        this.stores().forEach(store => {
            const coords = this.getCoordinates(store.location);
            if (coords) {
                const icon = L.divIcon({
                    className: 'custom-store-marker',
                    html: `
            <div style="
              background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
              width: 40px;
              height: 40px;
              border-radius: 50% 50% 50% 0;
              transform: rotate(-45deg);
              border: 3px solid white;
              box-shadow: 0 4px 12px rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              justify-center;
            ">
              <span style="transform: rotate(45deg); font-size: 20px;">🏪</span>
            </div>
          `,
                    iconSize: [40, 40],
                    iconAnchor: [20, 40]
                });

                const marker = L.marker(coords, { icon })
                    .bindPopup(`
            <div style="min-width: 200px;">
              <h3 style="font-weight: bold; margin-bottom: 8px; color: #1e293b;">${store.name}</h3>
              ${store.description ? `<p style="color: #64748b; font-size: 14px; margin-bottom: 8px;">${store.description}</p>` : ''}
              ${store.address ? `<p style="color: #94a3b8; font-size: 12px; margin-bottom: 4px;">📍 ${store.address}</p>` : ''}
              ${store.phone ? `<p style="color: #94a3b8; font-size: 12px; margin-bottom: 4px;">📞 ${store.phone}</p>` : ''}
              <button onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${coords[0]},${coords[1]}', '_blank')" 
                      style="margin-top: 8px; padding: 6px 12px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">
                Cómo llegar
              </button>
            </div>
          `)
                    .addTo(this.map!);

                this.storeMarkers.set(store.id, marker);
                bounds.push(L.latLng(coords));
            }
        });

        if (bounds.length > 0) {
            this.map.fitBounds(L.latLngBounds(bounds), { padding: [50, 50] });
        }
    }

    focusStore(store: Store) {
        if (!this.map) return;

        const coords = this.getCoordinates(store.location);
        if (coords) {
            const marker = this.storeMarkers.get(store.id);
            if (marker) {
                this.map.setView(coords, 16);
                marker.openPopup();
            }
        }
    }
}
