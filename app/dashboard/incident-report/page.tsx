
import { PageHeader } from "@/components/page-header";
import { IncidentReportClient } from "@/components/incident-report-client";

export default function IncidentReportPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="File an Incident Report"
        description="Document any incidents that occur on the road to ensure safety and compliance."
      />
      <IncidentReportClient />
    </div>
  );
}
