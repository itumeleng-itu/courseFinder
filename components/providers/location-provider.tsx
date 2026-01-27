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

    try {
      const result = await navigator.permissions.query({ name: 'geolocation' });
      setPermissionStatus(result.state);
      
      if (result.state === 'granted') {
        getCurrentLocation();
      } else if (result.state === 'prompt') {
        // We wait for user action to request
        setIsLoading(false);
      } else {
        // Denied
        setIsLoading(false);
      }

      result.onchange = () => {
        setPermissionStatus(result.state);
        if (result.state === 'granted') {
          getCurrentLocation();
        }
      };
    } catch (e) {
      console.error('Error checking permissions:', e);
      // Fallback for browsers that don't support permissions API fully
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
