import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface UserLocation {
    latitude: number;
    longitude: number;
    accuracy: number;
    heading?: number;
    speed?: number;
    timestamp: number;
}

export interface NavigationState {
    isNavigating: boolean;
    currentLocation?: UserLocation;
    distanceToNextPoint?: number;
    distanceRemaining?: number;
    estimatedTimeRemaining?: number;
    currentInstruction?: string;
}

@Injectable({
    providedIn: 'root'
})
export class GeolocationService {
    private watchId?: number;
    private locationSubject = new BehaviorSubject<UserLocation | null>(null);
    private navigationStateSubject = new BehaviorSubject<NavigationState>({
        isNavigating: false
    });

    location$: Observable<UserLocation | null> = this.locationSubject.asObservable();
    navigationState$: Observable<NavigationState> = this.navigationStateSubject.asObservable();

    startTracking(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation is not supported by this browser'));
                return;
            }

            // Get initial position
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.updateLocation(position);

                    // Start watching position
                    this.watchId = navigator.geolocation.watchPosition(
                        (pos) => this.updateLocation(pos),
                        (error) => console.error('Geolocation error:', error),
                        {
                            enableHighAccuracy: true,
                            maximumAge: 0,
                            timeout: 5000
                        }
                    );

                    resolve();
                },
                (error) => reject(error),
                { enableHighAccuracy: true }
            );
        });
    }

    stopTracking(): void {
        if (this.watchId !== undefined) {
            navigator.geolocation.clearWatch(this.watchId);
            this.watchId = undefined;
        }
        this.locationSubject.next(null);
    }

    private updateLocation(position: GeolocationPosition): void {
        const location: UserLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            heading: position.coords.heading ?? undefined,
            speed: position.coords.speed ?? undefined,
            timestamp: position.timestamp
        };

        this.locationSubject.next(location);
    }

    updateNavigationState(state: Partial<NavigationState>): void {
        const current = this.navigationStateSubject.value;
        this.navigationStateSubject.next({ ...current, ...state });
    }

    getCurrentLocation(): UserLocation | null {
        return this.locationSubject.value;
    }

    // Calculate distance between two points (Haversine formula)
    calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371; // Earth's radius in km
        const dLat = this.toRad(lat2 - lat1);
        const dLon = this.toRad(lon2 - lon1);

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    private toRad(degrees: number): number {
        return degrees * (Math.PI / 180);
    }
}
