import { PageHeader } from "@/components/page-header";
import { AutomatedDispatchForm } from "@/components/automated-dispatch-form";

export default function AutomatedDispatchPage() {
  return (
    <>
      <PageHeader
        title="AI-Powered Dispatch"
        description="Use generative AI to find the optimal vehicle and driver for a job based on your criteria."
      />
      <AutomatedDispatchForm />
    </>
  );
}
