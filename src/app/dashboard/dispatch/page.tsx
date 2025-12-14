
import { PageHeader } from "@/components/page-header";
import { AutomatedDispatchForm } from "@/components/automated-dispatch-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ManualDispatchForm } from "@/components/manual-dispatch-form";

export default function DispatchPage() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  
  return (
    <>
      <PageHeader
        title="Dispatch"
        description="Assign jobs to drivers and vehicles, either automatically with AI or manually."
      />
      <Tabs defaultValue="auto">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="auto">Auto Dispatch</TabsTrigger>
          <TabsTrigger value="manual">Manual Dispatch</TabsTrigger>
        </TabsList>
        <TabsContent value="auto" className="mt-4">
          <AutomatedDispatchForm />
        </TabsContent>
        <TabsContent value="manual" className="mt-4">
          <ManualDispatchForm apiKey={apiKey} />
        </TabsContent>
      </Tabs>
    </>
  );
}
