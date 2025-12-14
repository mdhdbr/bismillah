
import { PageHeader } from "@/components/page-header";
import { DriverAppClient } from "@/components/driver-app-client";
import { drivers, trips } from "@/lib/data";

export default function HeavyDriverAppPage() {
  const allDrivers = drivers; // Pass all drivers for login selection
  const pendingTrips = trips.filter(t => t.status === 'PENDING');

  return (
    <>
      <PageHeader
        title="Heavy Driver App"
        description="Dashboard for heavy vehicle and equipment operators."
      />
      <DriverAppClient allDrivers={allDrivers} pendingTrips={pendingTrips} appType="heavy" />
    </>
  );
}
