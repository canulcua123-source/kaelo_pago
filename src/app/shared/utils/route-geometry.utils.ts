// Helper function to extract coordinates from PostGIS geometry
export function extractCoordinatesFromGeometry(geometry: any): [number, number][] {
    if (!geometry) return [];

    // If it's already an array of coordinates
    if (Array.isArray(geometry)) {
        return geometry;
    }

    // If it's a GeoJSON LineString
    if (geometry.type === 'LineString' && geometry.coordinates) {
        return geometry.coordinates.map((coord: number[]) => [coord[1], coord[0]] as [number, number]);
    }

    // If it's a PostGIS WKT format (LINESTRING(...))
    if (typeof geometry === 'string' && geometry.startsWith('LINESTRING')) {
        const coordsString = geometry.replace('LINESTRING(', '').replace(')', '');
        const coords = coordsString.split(',').map(pair => {
            const [lng, lat] = pair.trim().split(' ').map(Number);
            return [lat, lng] as [number, number];
        });
        return coords;
    }

    return [];
}

// Generate mock route coordinates for demo purposes
export function generateMockRouteCoordinates(startLat: number, startLng: number, distance_km: number): [number, number][] {
    const coords: [number, number][] = [];
    const numPoints = Math.max(5, Math.floor(distance_km / 2));

    for (let i = 0; i < numPoints; i++) {
        const lat = startLat + (Math.random() - 0.5) * 0.01 * distance_km;
        const lng = startLng + (Math.random() - 0.5) * 0.01 * distance_km;
        coords.push([lat, lng]);
    }

    return coords;
}
