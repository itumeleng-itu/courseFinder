'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface LocationContextType {
  location: GeolocationCoordinates | null;
  error: string | null;
  isLoading: boolean;
  permissionStatus: PermissionState | 'unknown';
  requestLocation: () => Promise<void>;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [permissionStatus, setPermissionStatus] = useState<PermissionState | 'unknown'>('unknown');

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    if (!('geolocation' in navigator)) {
      setError('Geolocation is not supported by your browser');
      setIsLoading(false);
      return;
    }

    // Detect iOS - iOS Safari doesn't properly support the Permissions API for geolocation
    // and querying it can sometimes trigger prompts or behave unexpectedly
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    if (isIOS) {
      // On iOS, we don't query permissions - just set to 'prompt' state
      // The user will need to explicitly trigger location request
      setPermissionStatus('prompt');
      setIsLoading(false);
      return;
    }

    try {
      // Check if permissions API is available (not available on all browsers)
      if (!navigator.permissions || typeof navigator.permissions.query !== 'function') {
        setPermissionStatus('prompt');
        setIsLoading(false);
        return;
      }

      const result = await navigator.permissions.query({ name: 'geolocation' });
      setPermissionStatus(result.state);
      
      if (result.state === 'granted') {
        getCurrentLocation();
      } else {
        // For 'prompt' or 'denied', just set loading to false
        // Don't automatically request location - wait for user action
        setIsLoading(false);
      }

      result.onchange = () => {
        setPermissionStatus(result.state);
        if (result.state === 'granted') {
          getCurrentLocation();
        }
      };
    } catch (e) {
      // Fallback for browsers that don't support permissions API fully
      setPermissionStatus('prompt');
      setIsLoading(false);
    }
  };

  const getCurrentLocation = () => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(position.coords);
        setError(null);
        setIsLoading(false);
      },
      (error) => {
        let errorMessage = 'Failed to get location';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location permission denied';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable';
            break;
          case error.TIMEOUT:
            errorMessage = 'The request to get user location timed out';
            break;
        }
        setError(errorMessage);
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const requestLocation = async () => {
    return new Promise<void>((resolve, reject) => {
      if (!('geolocation' in navigator)) {
        const err = 'Geolocation is not supported by your browser';
        setError(err);
        toast.error(err);
        reject(err);
        return;
      }

      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(position.coords);
          setError(null);
          setIsLoading(false);
          setPermissionStatus('granted');
          toast.success('Location updated successfully');
          resolve();
        },
        (error) => {
          let errorMessage = 'Failed to get location';
          if (error.code === error.PERMISSION_DENIED) {
            errorMessage = 'Location permission denied';
            setPermissionStatus('denied');
          }
          setError(errorMessage);
          setIsLoading(false);
          toast.error(errorMessage);
          reject(errorMessage);
        },
        { enableHighAccuracy: true }
      );
    });
  };

  return (
    <LocationContext.Provider value={{ location, error, isLoading, permissionStatus, requestLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}
