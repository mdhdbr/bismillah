
"use client";

import { PageHeader } from "@/components/page-header";
import { DriverAppClient } from "@/components/driver-app-client";
import { drivers, trips } from "@/lib/data";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export function DriverAppPageContent() {
  const searchParams = useSearchParams();
  const allDrivers = drivers;
  
  const initialDriverId = searchParams.get('driverId');
  const initialJobId = searchParams.get('jobId');

  const pendingTrips = useMemo(() => {
    // If a jobId is passed, make sure that job is at the top of the list for the driver.
    if (initialJobId) {
        const targetTrip = trips.find(t => t.jobId === initialJobId);
        const otherPending = trips.filter(t => t.status === 'PENDING' && t.jobId !== initialJobId);
        return targetTrip ? [targetTrip, ...otherPending] : otherPending;
    }
    return trips.filter(t => t.status === 'PENDING');
  }, [initialJobId]);


  return (
    <>
      <PageHeader
        title="Driver App"
        description="This is your personal dashboard to manage your jobs and vehicle."
      />
      <DriverAppClient 
        allDrivers={allDrivers} 
        pendingTrips={pendingTrips} 
        appType="standard"
        initialDriverId={initialDriverId}
        initialJobId={initialJobId}
      />
    </>
  );
}
