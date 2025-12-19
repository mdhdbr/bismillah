
'use client';

import TrackingTopBar from "@/components/tracking/top-bar";
import DriverCard from "@/components/tracking/driver-card";
import { useVehiclesStore } from "@/store/vehicles-store";
import dynamic from 'next/dynamic';
import { useMemo, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useTrackingStore } from "@/store/tracking-store";

// Dynamically import the LeafletTrackingMap with SSR disabled. This is critical.
const LeafletTrackingMap = dynamic(
  () => import('@/components/map/leaflet-tracking-map'),
  { 
    loading: () => <Skeleton className="h-full w-full" />,
    ssr: false 
  }
);


function TrackingPageContent() {
  const { selectedVehicle } = useTrackingStore();
  const { vehicles } = useVehiclesStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryLat = searchParams.get('lat');
  const queryLng = searchParams.get('lng');
  const queryJobId = searchParams.get('jobId');

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't navigate if the user is typing in an input, textarea, or contenteditable element
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      if (event.key === 'Backspace' || event.key === 'ArrowLeft') {
        // If there's a jobId, it means we are in assignment mode, so go back to dispatch
        if (queryJobId) {
            router.push('/dashboard/dispatch');
        } else {
            router.push('/dashboard');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [router, queryJobId]);

  // Memoize the center coordinates to prevent unnecessary re-renders of the map component.
  const center: [number, number] = useMemo(() => {
    if (queryLat && queryLng) {
      const lat = parseFloat(queryLat);
      const lng = parseFloat(queryLng);
      if (!isNaN(lat) && !isNaN(lng)) {
        return [lat, lng];
      }
    }
    return selectedVehicle
      ? [selectedVehicle.currentLocation.lat, selectedVehicle.currentLocation.lng]
      : [24.7136, 46.6753]; // Default to Riyadh if no vehicle is selected
  }, [selectedVehicle, queryLat, queryLng]);
  
  const zoom = selectedVehicle || (queryLat && queryLng) ? 14 : 6;

  return (
    <div className="flex h-screen w-screen">
      <div className="flex-1 relative">
        <TrackingTopBar />
        <LeafletTrackingMap vehicles={vehicles} center={center} zoom={zoom} />
      </div>

      <aside className="w-[360px] border-l bg-background hidden md:block">
        <DriverCard />
      </aside>
    </div>
  );
}


export default function TrackingPage() {
  return (
    <Suspense fallback={<Skeleton className="h-screen w-screen" />}>
      <TrackingPageContent />
    </Suspense>
  )
}
