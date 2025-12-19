
"use client";

import { useState, useEffect, useRef } from "react";
import type { Vehicle } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StatusBadge } from "./status-badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { User, Fuel, Calendar, Wrench, X, Phone, MessageSquare } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";

// Fix for default marker icons in Leaflet as recommended
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});


type LiveMapClientProps = {
  vehicles: Vehicle[];
};

const vehicleIcon = (status: Vehicle["status"]) => {
    const color =
        status === "ON_TRIP"
          ? "#2563eb" // blue-600
          : status === "AVAILABLE"
          ? "#10b981" // emerald-500
          : status === "MAINTENANCE"
          ? "#f59e0b" // amber-500
          : "#6b7280"; // gray-500
    
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="${color}" stroke="#fff" stroke-width="1">
            <path d="M12 2C7.9 2 4.5 5.4 4.5 9.5c0 4.9 6.2 11.1 6.9 11.8.4.3.9.3 1.2 0 .7-.7 6.9-6.9 6.9-11.8C19.5 5.4 16.1 2 12 2z"/>
        </svg>`;

    return L.divIcon({
        html: svg,
        className: 'bg-transparent border-0',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });
};

export function LiveMapClient({ vehicles }: LiveMapClientProps) {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showPhone, setShowPhone] = useState(false);
  const isMobile = useIsMobile();
  const defaultPosition: [number, number] = [23.8859, 45.0792]; // Saudi Arabia center

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (mapContainerRef.current && !mapInstanceRef.current) {
      // Create map instance
      mapInstanceRef.current = L.map(mapContainerRef.current).setView(defaultPosition, 6);

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstanceRef.current);
    }

    // Cleanup function to remove map on component unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current) {
        // Clear existing markers
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];

        // Add new markers
        vehicles.forEach(vehicle => {
            const marker = L.marker([vehicle.currentLocation.lat, vehicle.currentLocation.lng], {
                icon: vehicleIcon(vehicle.status),
            })
            .addTo(mapInstanceRef.current!)
            .on('click', () => handleMarkerClick(vehicle));

            markersRef.current.push(marker);
        });
    }
  }, [vehicles]);

  useEffect(() => {
    if (selectedVehicle) {
      setShowPhone(false); // Reset phone visibility when a new vehicle is selected
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setView([selectedVehicle.currentLocation.lat, selectedVehicle.currentLocation.lng], 13);
      }
    }
  }, [selectedVehicle]);


  const handleMarkerClick = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
  };
  
  const handleInfoWindowClose = () => {
    setSelectedVehicle(null);
  };
  
  const handleCallClick = () => {
    if (!selectedVehicle?.driver?.user.phone) return;
    setShowPhone(true);
    window.location.href = `tel:${selectedVehicle.driver.user.phone}`;
  };

  const selectedVehicleCard = selectedVehicle && (
      <Card className="shadow-2xl animate-in fade-in-50 duration-300 w-full flex flex-col">
       <CardHeader>
         <div className="flex justify-between items-center">
            <CardTitle>Vehicle Details</CardTitle>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleInfoWindowClose}>
                <X className="h-4 w-4"/>
            </Button>
         </div>
       </CardHeader>
       <CardContent className="text-sm flex-grow">
          <div className="grid gap-1">
            <div className="font-semibold text-xl">{selectedVehicle.plateNumber}</div>
            <div className="text-muted-foreground">{selectedVehicle.vin}</div>
            <div className="mt-1"><StatusBadge status={selectedVehicle.status} /></div>
          </div>
          <Separator className="my-4" />
          <div className="grid gap-3">
            {selectedVehicle.driver && (
                <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                        <div className="font-medium">{selectedVehicle.driver.user.name}</div>
                        <div className="text-muted-foreground">{selectedVehicle.driver.licenseNumber}</div>
                        {showPhone && selectedVehicle.driver.user.phone && (
                          <div className="text-muted-foreground font-mono text-xs mt-1">{selectedVehicle.driver.user.phone}</div>
                        )}
                    </div>
                </div>
            )}
             <div className="flex items-center gap-3">
                <Fuel className="h-5 w-5 text-muted-foreground" />
                <div>
                    <div className="font-medium">Fuel Level</div>
                    <div className="text-muted-foreground">{selectedVehicle.currentFuel}%</div>
                </div>
            </div>
             <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                    <div className="font-medium">Next Maintenance</div>
                    <div className="text-muted-foreground">{selectedVehicle.nextMaintenance ? new Date(selectedVehicle.nextMaintenance).toLocaleDateString() : 'N/A'}</div>
                </div>
            </div>
             <div className="flex items-center gap-3">
                <Wrench className="h-5 w-5 text-muted-foreground" />
                <div>
                    <div className="font-medium">Capacity</div>
                    <div className="text-muted-foreground">{selectedVehicle.capacity} {selectedVehicle.category === 'PASSENGER' ? 'seats' : 'kg'}</div>
                </div>
            </div>
          </div>
       </CardContent>
       {selectedVehicle.driver && (
        <CardFooter className="mt-auto pt-4 border-t">
          <div className="grid grid-cols-2 gap-2 w-full">
            <Button variant="outline" onClick={handleCallClick} disabled={!selectedVehicle.driver?.user.phone}>
                <Phone className="mr-2 h-4 w-4"/> Call
            </Button>
            <Button variant="outline" asChild>
              <Link href={`/dashboard/sms?driverId=${selectedVehicle.driver.id}`}>
                <MessageSquare className="mr-2 h-4 w-4"/> SMS
              </Link>
            </Button>
          </div>
        </CardFooter>
       )}
     </Card>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 h-full p-4 md:p-6">
      <Card className="hidden md:flex md:flex-col md:col-span-1 lg:col-span-1">
        <CardHeader>
          <CardTitle>Active Vehicles ({vehicles.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0 flex-1">
          <ScrollArea className="h-full">
            <div className="p-2 md:p-4 space-y-3">
              {vehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  onClick={() => handleMarkerClick(vehicle)}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedVehicle?.id === vehicle.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-accent"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-primary">{vehicle.plateNumber}</h4>
                      <p className="text-sm text-muted-foreground">{vehicle.type}</p>
                    </div>
                    <StatusBadge status={vehicle.status} size="sm" />
                  </div>
                  {vehicle.driver && (
                    <div className="mt-2 flex items-center text-sm text-muted-foreground">
                        <Avatar className="h-6 w-6 mr-2">
                        <AvatarFallback>{vehicle.driver.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      <span>{vehicle.driver.user.name}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      
      <div className="col-span-1 md:col-span-2 lg:col-span-3 h-[50vh] md:h-full rounded-lg overflow-hidden relative border">
        <div ref={mapContainerRef} className="h-full w-full" />
        
        {selectedVehicle && !isMobile && (
            <div className="absolute top-4 right-4 w-80 lg:w-96 z-[1000]">
              {selectedVehicleCard}
            </div>
        )}

          {selectedVehicle && isMobile && (
            <div className="absolute bottom-4 left-4 right-4 z-[1000]">
              {selectedVehicleCard}
            </div>
        )}
      </div>
    </div>
  );
}
