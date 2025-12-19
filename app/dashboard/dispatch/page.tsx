
import { PageHeader } from "@/components/page-header";
import { ManualDispatchForm } from "@/components/manual-dispatch-form";

export default function DispatchPage() {
  return (
    <>
      <PageHeader
        title="Manual Dispatch"
        description="Create and assign a new job using the interactive map and driver list."
      />
      <ManualDispatchForm />
    </>
  );
}
