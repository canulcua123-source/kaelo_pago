import { Component, ElementRef, ViewChild, AfterViewInit, Input, OnDestroy } from '@angular/core';
import * as L from 'leaflet';

@Component({
    selector: 'app-route-map',
    standalone: true,
    template: `
    <div #mapContainer class="w-full h-full rounded-lg overflow-hidden"></div>
  `,
    styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
  `]
})
export class RouteMapComponent implements AfterViewInit, OnDestroy {
    @ViewChild('mapContainer') mapContainer!: ElementRef;
    @Input() routeCoordinates: [number, number][] = [];
    @Input() height: string = '400px';
    @Input() interactive: boolean = true;

    private map?: L.Map;
    private routeLayer?: L.Polyline;

    ngAfterViewInit() {
        this.initMap();
    }

    ngOnDestroy() {
        if (this.map) {
            this.map.remove();
        }
    }

    private initMap() {
        // Default center (Mexico City area)
        const defaultCenter: [number, number] = [19.4326, -99.1332];
        const center = this.routeCoordinates.length > 0
            ? this.routeCoordinates[0]
            : defaultCenter;

        // Initialize map
        this.map = L.map(this.mapContainer.nativeElement, {
            center,
            zoom: 13,
            zoomControl: this.interactive,
            dragging: this.interactive,
            scrollWheelZoom: this.interactive,
            doubleClickZoom: this.interactive,
            touchZoom: this.interactive
        });

        // Add tile layer (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(this.map);

        // Draw route if coordinates provided
        if (this.routeCoordinates.length > 0) {
            this.drawRoute();
        }
    }

    private drawRoute() {
        if (!this.map) return;

        // Remove existing route
        if (this.routeLayer) {
            this.map.removeLayer(this.routeLayer);
        }

        // Draw new route
        this.routeLayer = L.polyline(this.routeCoordinates, {
            color: '#3b82f6',
            weight: 4,
            opacity: 0.8
        }).addTo(this.map);

        // Add markers for start and end
        if (this.routeCoordinates.length > 0) {
            const startIcon = L.divIcon({
                className: 'custom-marker',
                html: '<div style="background: #10b981; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>',
                iconSize: [12, 12]
            });

            const endIcon = L.divIcon({
                className: 'custom-marker',
                html: '<div style="background: #ef4444; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>',
                iconSize: [12, 12]
            });

            L.marker(this.routeCoordinates[0], { icon: startIcon }).addTo(this.map);
            L.marker(this.routeCoordinates[this.routeCoordinates.length - 1], { icon: endIcon }).addTo(this.map);
        }

        // Fit map to route bounds
        const bounds = this.routeLayer.getBounds();
        this.map.fitBounds(bounds, { padding: [50, 50] });
    }

    // Public method to update route
    updateRoute(coordinates: [number, number][]) {
        this.routeCoordinates = coordinates;
        if (this.map) {
            this.drawRoute();
        }
    }
}
