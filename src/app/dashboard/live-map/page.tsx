
import { vehicles } from "@/lib/data";
import { LiveMapClient } from "@/components/live-map-client";
import { PageHeader } from "@/components/page-header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export default function LiveMapPage() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey || apiKey === "YOUR_API_KEY_HERE") {
    return (
      <div className="flex flex-col h-full">
        <PageHeader title="Live Fleet Map" description="Real-time tracking of all vehicles." />
        <Alert variant="destructive" className="flex-1">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Configuration Error</AlertTitle>
          <AlertDescription>
            A valid Google Maps API key is required to display the map. Please obtain a key from the Google Cloud Console and add it to your `.env` file as `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Live Fleet Map" description="Real-time tracking of all vehicles." />
      <div className="flex-1 md:-m-6">
        <LiveMapClient apiKey={apiKey} vehicles={vehicles} />
      </div>
    </div>
  );
}
