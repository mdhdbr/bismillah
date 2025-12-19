
import { PageHeader } from "@/components/page-header";
import { DriverAppClient } from "@/components/driver-app-client";
import { drivers, trips } from "@/lib/data";
import { Suspense } from "react";
import { DriverAppPageContent } from "@/components/driver-app-page-content";

export default function DriverAppPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DriverAppPageContent />
    </Suspense>
  );
}
