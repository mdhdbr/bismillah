
import { PageHeader } from "@/components/page-header";

export default function WeatherPage() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader 
        title="Live Weather Map"
        description="Real-time weather conditions and forecasts powered by Windy."
      />
      <div className="flex-1 rounded-lg overflow-hidden border -m-6">
        <iframe
          width="100%"
          height="100%"
          src="https://embed.windy.com/embed.html?type=map&location=points&metricWind=default&metricTemp=default&metricRain=default&metricWaves=default&zoom=5&lat=23.8859&lon=45.0792"
          frameBorder="0"
        ></iframe>
      </div>
    </div>
  );
}
