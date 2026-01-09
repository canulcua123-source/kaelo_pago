export interface PointOfInterest {
    id: string;
    name: string;
    description?: string;
    coordinates: [number, number];
    type: 'rest' | 'food' | 'viewpoint' | 'danger' | 'water' | 'custom';
    icon?: string;
    visited?: boolean;
}

export interface RouteWithPOIs {
    id: string;
    title: string;
    coordinates: [number, number][];
    pointsOfInterest: PointOfInterest[];
    distance_km: number;
    difficulty: string;
}

// Service to fetch route directions from OSRM (free routing service)
export class RoutingService {
    private osrmBaseUrl = 'https://router.project-osrm.org/route/v1/driving';

    async getRouteDirections(coordinates: [number, number][]): Promise<any> {
        if (coordinates.length < 2) {
            throw new Error('At least 2 coordinates are required');
        }

        // Format: lng,lat;lng,lat;...
        const coordString = coordinates
            .map(coord => `${coord[1]},${coord[0]}`)
            .join(';');

        const url = `${this.osrmBaseUrl}/${coordString}?overview=full&geometries=geojson&steps=true`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.code !== 'Ok') {
                throw new Error('Failed to get route directions');
            }

            return {
                distance: data.routes[0].distance / 1000, // Convert to km
                duration: data.routes[0].duration / 60, // Convert to minutes
                geometry: data.routes[0].geometry.coordinates.map((coord: number[]) =>
                    [coord[1], coord[0]] as [number, number]
                ),
                steps: data.routes[0].legs[0].steps.map((step: any) => ({
                    instruction: step.maneuver.instruction || this.getInstructionText(step.maneuver),
                    distance: step.distance,
                    duration: step.duration
                }))
            };
        } catch (error) {
            console.error('Routing error:', error);
            throw error;
        }
    }

    private getInstructionText(maneuver: any): string {
        const type = maneuver.type;
        const modifier = maneuver.modifier;

        const instructions: Record<string, string> = {
            'turn-right': 'Gira a la derecha',
            'turn-left': 'Gira a la izquierda',
            'turn-slight-right': 'Gira ligeramente a la derecha',
            'turn-slight-left': 'Gira ligeramente a la izquierda',
            'turn-sharp-right': 'Gira bruscamente a la derecha',
            'turn-sharp-left': 'Gira bruscamente a la izquierda',
            'continue': 'Continúa recto',
            'depart': 'Inicia la ruta',
            'arrive': 'Has llegado a tu destino'
        };

        return instructions[`${type}-${modifier}`] || instructions[type] || 'Continúa';
    }
}
