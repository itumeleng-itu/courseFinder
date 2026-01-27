'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useLocation } from "@/components/providers/location-provider";

export function LocationRequestDialog() {
  const { permissionStatus, requestLocation, error } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [hasDeclined, setHasDeclined] = useState(false);

  useEffect(() => {
    // Check if user has previously declined in this session (or load from localstorage if needed persistence across sessions)
    const declined = localStorage.getItem('locationp_declined');
    if (declined) setHasDeclined(true);

    if (permissionStatus === 'prompt' && !declined) {
      // Delay slightly for better UX on load
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    } else if (permissionStatus === 'granted') {
      setIsOpen(false);
    }
  }, [permissionStatus]);

  const handleAllow = async () => {
    try {
      await requestLocation();
      setIsOpen(false);
    } catch (e) {
      console.error(e);
      // Keep dialog open if error? or close it. 
      // Usually if they deny in the browser prompt, permissionStatus becomes 'denied' which closes this.
    }
  };

  const handleDecline = () => {
    setHasDeclined(true);
    localStorage.setItem('locationp_declined', 'true');
    setIsOpen(false);
  };

  if (permissionStatus === 'granted' || permissionStatus === 'denied') return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="mx-auto bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full w-fit mb-4">
            <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <DialogTitle className="text-center">Enable Location Services</DialogTitle>
          <DialogDescription className="text-center">
            CourseFinder improves your experience by finding universities and colleges near you. We need your permission to access your location.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col sm:flex-row gap-2 mt-4">
          <Button variant="outline" onClick={handleDecline} className="w-full sm:w-auto">
            Not Now
          </Button>
          <Button onClick={handleAllow} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
            Allow Location
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
