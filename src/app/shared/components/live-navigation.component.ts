import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { GeolocationService } from '../services/geolocation.service';
import { RouteService } from '../services/route.service';
import { SupabaseService } from '../services/supabase.service';
import { generateMockRouteCoordinates } from '../utils/route-geometry.utils';

@Component({
  selector: 'app-live-navigation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative w-full h-screen bg-slate-900">
      <!-- Map Container -->
      <div #mapContainer class="w-full h-full z-0"></div>

      <!-- Overlay Controls -->
      <div class="absolute bottom-8 left-0 right-0 px-6 z-[1000] flex flex-col gap-4 pointer-events-none">
        <!-- Stats Card -->
        <div class="bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-xl p-4 shadow-xl pointer-events-auto">
          <div class="flex justify-between items-center">
            <div>
              <p class="text-slate-400 text-xs uppercase font-bold tracking-wider">Velocidad</p>
              <p class="text-2xl font-bold text-white">{{ speed() | number:'1.0-1' }} <span class="text-sm text-slate-400">km/h</span></p>
            </div>
            <div class="h-8 w-px bg-slate-700"></div>
            <div>
              <p class="text-slate-400 text-xs uppercase font-bold tracking-wider">Distancia</p>
              <p class="text-2xl font-bold text-white">{{ distanceTraveled() | number:'1.1-1' }} <span class="text-sm text-slate-400">km</span></p>
            </div>
            <div class="h-8 w-px bg-slate-700"></div>
            <div>
              <p class="text-slate-400 text-xs uppercase font-bold tracking-wider">Tiempo</p>
              <p class="text-2xl font-bold text-white">{{ timeElapsed() }}</p>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-4 pointer-events-auto">
          <button (click)="toggleTracking()" 
                  [class]="tracking() ? 'bg-orange-600 hover:bg-orange-500' : 'bg-green-600 hover:bg-green-500'"
                  class="flex-1 py-4 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2">
            @if (tracking()) {
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Pausar
            } @else {
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Iniciar
            }
          </button>
          
          <button (click)="finishRoute()" class="flex-1 bg-red-600 hover:bg-red-500 py-4 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Concluir
          </button>

          <button (click)="centerMap()" class="bg-slate-800 hover:bg-slate-700 p-4 rounded-xl text-white shadow-lg transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  `
})
export class LiveNavigationComponent implements OnInit, OnDestroy {
  @Input() routeId!: string;
  @Input() routeDistance: number = 0;

  @ViewChild('mapContainer') mapContainer!: ElementRef;

  private geolocation = inject(GeolocationService);
  private routeService = inject(RouteService);
  private supabase = inject(SupabaseService);
  private router = inject(Router);
  private map: L.Map | null = null;
  private userMarker: L.Marker | null = null;
  private routePolyline: L.Polyline | null = null;
  private trackingInterval: any;

  tracking = signal(false);
  speed = signal(0);
  distanceTraveled = signal(0);
  timeElapsed = signal('00:00:00');
  routeTitle = signal('');

  private startTime: number = 0;

  ngOnInit() {
    // Initialize map after view init
  }

  ngAfterViewInit() {
    this.initMap();
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
    this.stopTracking();
  }

  private async initMap() {
    this.map = L.map(this.mapContainer.nativeElement).setView([19.4326, -99.1332], 13);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(this.map);

    try {
      // 1. Request location permission and start tracking
      await this.geolocation.startTracking();

      // 2. Get initial position (User Location)
      const currentLoc = this.geolocation.getCurrentLocation();
      let startLat = 19.4326;
      let startLng = -99.1332;

      if (currentLoc) {
        startLat = currentLoc.latitude;
        startLng = currentLoc.longitude;
        this.updateUserPosition(startLat, startLng);
      }

      // 3. Fetch route details
      const route = await this.routeService.getRouteById(this.routeId);
      if (route) {
        this.routeTitle.set(route.title);
      }

      // 4. Generate path FROM User TO Destination using OSRM for real streets
      // Calculate a destination point based on distance
      const dist = this.routeDistance || 5; // km
      // Simple estimation: move roughly 'dist' km away.
      // We'll pick a fixed direction (e.g., North-East) to ensure we hit streets,
      // or we could randomize. Let's go North-East for consistency.
      const endLat = startLat + (dist * 0.006); // approx 0.009 deg per km, let's do 0.006 for a diagonal
      const endLng = startLng + (dist * 0.006);

      let coordinates: [number, number][] = [];

      try {
        // Call OSRM API for cycling directions
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/cycling/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson`
        );
        const data = await response.json();

        if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
          // OSRM returns [lng, lat], Leaflet needs [lat, lng]
          coordinates = data.routes[0].geometry.coordinates.map((coord: number[]) => [coord[1], coord[0]] as [number, number]);
        } else {
          throw new Error('No route found');
        }
      } catch (error) {
        console.warn('Could not fetch real street route, falling back to mock:', error);
        coordinates = generateMockRouteCoordinates(startLat, startLng, dist);
      }

      // 5. Draw the route
      this.routePolyline = L.polyline(coordinates, {
        color: '#3b82f6',
        weight: 6,
        opacity: 0.9,
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(this.map);

      // 6. Add Start and End Markers
      if (coordinates.length > 0) {
        const startPoint = coordinates[0];
        const endPoint = coordinates[coordinates.length - 1];

        // Start Marker (Green) - At User Location
        const startIcon = L.divIcon({
          className: 'bg-transparent',
          html: `<div class="w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center animate-pulse">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                 </div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });

        // End Marker (Red) - At Destination
        const endIcon = L.divIcon({
          className: 'bg-transparent',
          html: `<div class="w-8 h-8 bg-red-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M20 12H4" />
                  </svg>
                 </div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });

        L.marker(startPoint as L.LatLngExpression, { icon: startIcon }).addTo(this.map).bindPopup('<b>Inicio</b><br>Tu ubicación actual');
        L.marker(endPoint as L.LatLngExpression, { icon: endIcon }).addTo(this.map).bindPopup(`<b>Meta</b><br>${this.routeTitle() || 'Destino Final'}`);
      }

      // 7. Fit bounds to show route
      this.map.fitBounds(this.routePolyline.getBounds(), {
        padding: [50, 50],
        animate: true
      });

    } catch (error) {
      console.error('Error initializing map:', error);
    }

    // Subscribe to location updates for live tracking
    this.geolocation.location$.subscribe(pos => {
      if (pos) {
        this.updateUserPosition(pos.latitude, pos.longitude);
      }
    });
  }

  toggleTracking() {
    if (this.tracking()) {
      this.stopTracking();
    } else {
      this.startTracking();
    }
  }

  async finishRoute() {
    this.stopTracking();
    if (confirm('¿Estás seguro que deseas concluir la ruta?')) {
      try {
        const { data: { user } } = await this.supabase.client.auth.getUser();
        if (user) {
          // Calculate duration in seconds
          const durationStr = this.timeElapsed();
          const [hours, minutes, seconds] = durationStr.split(':').map(Number);
          const durationSeconds = (hours * 3600) + (minutes * 60) + seconds;

          await this.routeService.saveUserActivity(
            user.id,
            this.routeId,
            this.distanceTraveled(),
            durationSeconds
          );
        }
      } catch (error) {
        console.error('Error saving activity:', error);
      }
      this.router.navigate(['/dashboard/my-routes']);
    }
  }

  private lastPosition: { lat: number; lng: number; timestamp: number } | null = null;

  private startTracking() {
    this.tracking.set(true);
    this.startTime = Date.now();
    this.lastPosition = null; // Reset last position on start

    this.trackingInterval = setInterval(() => {
      // Update time only
      const diff = Date.now() - this.startTime;
      const hours = Math.floor(diff / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      this.timeElapsed.set(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    }, 1000);
  }

  private stopTracking() {
    this.tracking.set(false);
    if (this.trackingInterval) {
      clearInterval(this.trackingInterval);
    }
    this.speed.set(0);
  }

  private updateUserPosition(lat: number, lng: number) {
    if (!this.map) return;

    const icon = L.divIcon({
      className: 'bg-primary-500 w-4 h-4 rounded-full border-2 border-white shadow-lg',
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });

    if (this.userMarker) {
      this.userMarker.setLatLng([lat, lng]);
    } else {
      this.userMarker = L.marker([lat, lng], { icon }).addTo(this.map);
    }

    if (this.tracking()) {
      this.map.panTo([lat, lng]);

      // Calculate real distance and speed
      const now = Date.now();
      if (this.lastPosition) {
        const prevLat = this.lastPosition.lat;
        const prevLng = this.lastPosition.lng;

        // Calculate distance in km using Leaflet's distanceTo (returns meters)
        const distMeters = this.map.distance([prevLat, prevLng], [lat, lng]);
        const distKm = distMeters / 1000;

        // Update total distance
        this.distanceTraveled.update(d => d + distKm);

        // Calculate speed (km/h)
        const timeDiffHours = (now - this.lastPosition.timestamp) / 3600000; // ms to hours
        if (timeDiffHours > 0) {
          const currentSpeed = distKm / timeDiffHours;
          // Smooth speed or just set it. For simplicity, set it, but maybe cap it or average it if needed.
          // Real GPS can be jumpy, but let's trust it for now or default to 0 if very small.
          this.speed.set(currentSpeed < 1 ? 0 : currentSpeed);
        }
      }

      this.lastPosition = { lat, lng, timestamp: now };
    }
  }

  centerMap() {
    if (this.userMarker && this.map) {
      this.map.setView(this.userMarker.getLatLng(), 16);
    }
  }
}
