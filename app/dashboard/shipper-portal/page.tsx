
import { PageHeader } from "@/components/page-header";
import { ShipperPortalClient } from "@/components/shipper-portal-client";
import { users } from "@/lib/data";

export default function ShipperPortalPage() {
  const allUsers = users;
  return (
    <>
      <PageHeader
        title="Shipper Portal Simulation"
        description="This screen simulates the customer experience for booking freight and equipment."
      />
       <div className="max-w-md mx-auto">
        <ShipperPortalClient allUsers={allUsers} />
      </div>
    </>
  );
}
