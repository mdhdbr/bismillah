
"use client";

import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps";
import { useState } from "react";
import type { Vehicle } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StatusBadge } from "./status-badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { User, Fuel, Calendar, Wrench, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

type LiveMapClientProps = {
  apiKey: string;
  vehicles: Vehicle[];
};

export function LiveMapClient({ apiKey, vehicles }: LiveMapClientProps) {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const position = { lat: 23.8859, lng: 45.0792 }; // Saudi Arabia center
  const isMobile = useIsMobile();

  const handleMarkerClick = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
  };
  
  const handleInfoWindowClose = () => {
    setSelectedVehicle(null);
  };

  const selectedVehicleCard = selectedVehicle && (
      <Card className="shadow-2xl animate-in fade-in-50 duration-300 w-full">
       <CardHeader>
         <div className="flex justify-between items-center">
            <CardTitle>Vehicle Details</CardTitle>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleInfoWindowClose}>
                <X className="h-4 w-4"/>
            </Button>
         </div>
       </CardHeader>
       <CardContent className="text-sm">
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
     </Card>
  );

  return (
    <APIProvider apiKey={apiKey}>
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
          <Map
            defaultCenter={position}
            defaultZoom={6}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
            mapId="mhb-logistics-map"
            mapTypeId="satellite"
          >
            {vehicles.map((vehicle) => (
              <AdvancedMarker
                key={vehicle.id}
                position={vehicle.currentLocation}
                onClick={() => handleMarkerClick(vehicle)}
              >
                <Pin
                  background={
                    vehicle.status === "ON_TRIP"
                      ? "var(--primary)"
                      : vehicle.status === "AVAILABLE"
                      ? "#10b981"
                      : vehicle.status === "MAINTENANCE"
                      ? "#f59e0b"
                      : "#6b7280"
                  }
                  borderColor={"#fff"}
                  glyphColor={"#fff"}
                />
              </AdvancedMarker>
            ))}

            {selectedVehicle && !isMobile && (
              <InfoWindow
                position={selectedVehicle.currentLocation}
                onCloseClick={handleInfoWindowClose}
              >
                <div className="p-2 w-64">
                  <h3 className="font-bold text-lg">{selectedVehicle.plateNumber}</h3>
                  <p className="text-muted-foreground">{selectedVehicle.type}</p>
                  <Separator className="my-2" />
                  {selectedVehicle.driver ? (
                    <>
                      <p className="font-semibold">{selectedVehicle.driver.user.name}</p>
                      <div className="flex items-center justify-between text-sm mt-1">
                        <StatusBadge status={selectedVehicle.driver.currentStatus} size="sm" />
                        <StatusBadge status={selectedVehicle.driver.fatigueLevel} size="sm" />
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">No driver assigned</p>
                  )}
                </div>
              </InfoWindow>
            )}
          </Map>
          
          {selectedVehicle && !isMobile && (
             <div className="absolute top-4 right-4 w-80 lg:w-96">
                {selectedVehicleCard}
             </div>
          )}

           {selectedVehicle && isMobile && (
             <div className="absolute bottom-4 left-4 right-4">
                {selectedVehicleCard}
             </div>
          )}
        </div>
      </div>
    </APIProvider>
  );
}
