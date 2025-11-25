export interface GeolocationPosition {
    lat: number;
    lng: number;
}

export interface GeolocationError {
    code: number;
    message: string;
}

/**
 * Get current GPS position using browser's Geolocation API
 */
export function getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject({
                code: 0,
                message: 'Geolocation is not supported by your browser',
            });
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            (error) => {
                reject({
                    code: error.code,
                    message: error.message,
                });
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    });
}

/**
 * Watch position changes in real-time
 */
export function watchPosition(
    onSuccess: (position: GeolocationPosition) => void,
    onError?: (error: GeolocationError) => void
): number | null {
    if (!navigator.geolocation) {
        if (onError) {
            onError({
                code: 0,
                message: 'Geolocation is not supported by your browser',
            });
        }
        return null;
    }

    return navigator.geolocation.watchPosition(
        (position) => {
            onSuccess({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
        },
        (error) => {
            if (onError) {
                onError({
                    code: error.code,
                    message: error.message,
                });
            }
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
        }
    );
}

/**
 * Stop watching position
 */
export function clearWatch(watchId: number): void {
    if (navigator.geolocation) {
        navigator.geolocation.clearWatch(watchId);
    }
}
