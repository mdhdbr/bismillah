
import { PageHeader } from "@/components/page-header";
import { PassengerAppClient } from "@/components/passenger-app-client";

export default function PassengerAppPage() {
  return (
    <>
      <PageHeader
        title="Passenger Booking Simulation"
        description="This screen simulates the passenger experience of booking a ride."
      />
      <div className="max-w-4xl mx-auto">
        <PassengerAppClient />
      </div>
    </>
  );
}
