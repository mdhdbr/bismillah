
'use client';

import { memo, useEffect, useMemo, useRef, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import L, { Map as LeafletMap } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTrackingStore } from '@/store/tracking-store';
import type { Vehicle } from '@/lib/types';
import { useDispatchStore } from '@/store/dispatch-store';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

// Fix for default marker icons not appearing in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});


/* ================================
   Imperative View Controller
================================ */
function ChangeView({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom, { animate: true });
  }, [center, zoom, map]);

  return null;
}

/* ================================
   Click-to-Pin Location Selector
================================ */
function LocationSelector() {
    const { toast } = useToast();
    const router = useRouter();
    const { pickup, setPickup, setDropoff } = useDispatchStore();
    const [pinPosition, setPinPosition] = useState<L.LatLng | null>(null);

    const pinIcon = useMemo(() => new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }), []);
    
    useMapEvents({
        click(e) {
            const newPos = e.latlng;
            setPinPosition(newPos);
            const address = `${newPos.lat.toFixed(5)}, ${newPos.lng.toFixed(5)}`;
            
            // Smartly decide whether to set pickup or dropoff
            let fieldToSet: 'Pickup' | 'Dropoff' = 'Pickup';
            if (pickup) {
                fieldToSet = 'Dropoff';
                setDropoff(address);
            } else {
                setPickup(address);
            }

            toast({
                title: `${fieldToSet} location set`,
                description: `Coordinates: ${address}`,
                action: (
                    <Button variant="link" size="sm" onClick={() => router.push('/dashboard/dispatch')} className="text-white">
                        Go to Dispatch
                    </Button>
                )
            });
        },
    });

    // Clear pin when pickup location is cleared from elsewhere
    useEffect(() => {
        if (!pickup) {
            setPinPosition(null);
        }
    }, [pickup]);

    return pinPosition ? <Marker position={pinPosition} icon={pinIcon} /> : null;
}


/* ================================
   Stable Icon Factory
================================ */
const useVehicleIcons = () =>
  useMemo(() => {
    const base = {
      iconSize: [28, 41] as L.PointExpression,
      iconAnchor: [14, 41] as L.PointExpression,
      popupAnchor: [0, -41] as L.PointExpression,
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      shadowSize: [41, 41] as L.PointExpression,
    };

    return {
      ON_TRIP: new L.Icon({ ...base, iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png' }),
      AVAILABLE: new L.Icon({ ...base, iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png' }),
      MAINTENANCE: new L.Icon({ ...base, iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png' }),
      ASSIGNED: new L.Icon({ ...base, iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png' }),
      OUT_OF_SERVICE: new L.Icon({ ...base, iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png' }),
      SELECTED: new L.Icon({ ...base, iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-black.png' }),
    };
  }, []);


/* ================================
   Main Map Component (Fast Refresh Safe)
================================ */
function LeafletTrackingMap({
  vehicles,
  center,
  zoom = 13,
}: {
  vehicles: Vehicle[];
  center: [number, number];
  zoom?: number;
}) {
  const mapRef = useRef<LeafletMap | null>(null);
  const { selectedVehicle, selectVehicle } = useTrackingStore();
  const icons = useVehicleIcons();

  /* 🔥 CRITICAL FIX: destroy map on unmount */
  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove(); // ← THIS prevents re-init error forever
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom
      preferCanvas
      whenCreated={(map) => {
        mapRef.current = map;
        // Position zoom control to the bottom left
        map.zoomControl.setPosition('bottomleft');
      }}
      zoomControl={true}
    >
      {/* IMPORTANT: Change view without rerendering MapContainer */}
      <ChangeView center={center} zoom={zoom} />

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      <LocationSelector />

      {vehicles.map((v) => {
        const isSelected = selectedVehicle?.id === v.id;
        const statusKey = v.status as keyof ReturnType<typeof useVehicleIcons>;
        const icon = isSelected ? icons.SELECTED : (icons[statusKey] || icons.AVAILABLE);
        
        return (
          <Marker
            key={v.id}
            position={[v.currentLocation.lat, v.currentLocation.lng]}
            icon={icon}
            eventHandlers={{
              click: () => {
                selectVehicle(v);
              },
            }}
          >
            <Popup>
              <div>
                <strong>{v.plateNumber}</strong>
                <br />
                Status: {v.status}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

export default memo(LeafletTrackingMap);
