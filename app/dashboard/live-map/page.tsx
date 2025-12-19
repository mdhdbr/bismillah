
"use client";

import { LiveMapClient } from "@/components/live-map-client";
import { PageHeader } from "@/components/page-header";
import { vehicles } from "@/lib/data";

export default function LiveMapPage() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Live Fleet Map" description="Real-time tracking of all vehicles." />
      <div className="flex-1 md:-m-6">
        <LiveMapClient vehicles={vehicles} />
      </div>
    </div>
  );
}
