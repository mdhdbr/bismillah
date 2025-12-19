"use client";

import { Button } from "@/components/ui/button";
import { useTrackingStore } from "@/store/tracking-store";
import { RefreshCw, Tag, Search, TrafficCone } from "lucide-react";

export default function TrackingTopBar() {
  const {
    autoRefresh,
    toggleAutoRefresh,
    showCallsigns,
    toggleCallsigns,
  } = useTrackingStore();

  return (
    <div className="absolute top-4 left-4 right-4 z-[1001] flex items-center justify-end gap-2">
      <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm p-2 rounded-lg shadow-md border">
        <Button onClick={toggleAutoRefresh} variant="outline" size="sm" className="flex-shrink-0">
          <RefreshCw className={`mr-2 h-4 w-4 ${autoRefresh ? 'animate-spin' : ''}`} />
          <span>{autoRefresh ? "Auto Refresh ON" : "Auto Refresh OFF"}</span>
        </Button>
        <Button onClick={toggleCallsigns} variant="outline" size="sm" className="flex-shrink-0">
          <Tag className="mr-2 h-4 w-4" />
          <span>{showCallsigns ? "Hide Callsigns" : "Show Callsigns"}</span>
        </Button>
        <Button variant="outline" size="sm" className="flex-shrink-0">
          <Search className="mr-2 h-4 w-4" />
          <span>Find Nearest</span>
        </Button>
        <Button variant="outline" size="sm" className="flex-shrink-0">
          <TrafficCone className="mr-2 h-4 w-4" />
          <span>Traffic</span>
        </Button>
      </div>
    </div>
  );
}
