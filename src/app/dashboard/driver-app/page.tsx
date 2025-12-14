
import { PageHeader } from "@/components/page-header";
import { DriverAppClient } from "@/components/driver-app-client";
import { drivers, trips } from "@/lib/data";

export default function DriverAppPage() {
  const allDrivers = drivers; // Pass all drivers for login selection
  const pendingTrips = trips.filter(t => t.status === 'PENDING');

  return (
    <>
      <PageHeader
        title="Driver App"
        description="This is your personal dashboard to manage your jobs and vehicle."
      />
      <DriverAppClient allDrivers={allDrivers} pendingTrips={pendingTrips} appType="standard"/>
    </>
  );
}
