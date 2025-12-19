
'use client';
import { useState, useEffect } from 'react';
import { Sun, Cloudy, Wind, CloudRain, Thermometer, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type WeatherCondition = 'Sunny' | 'Cloudy' | 'Windy' | 'Rain' | 'Hot' | 'Humid' | 'Clear' | 'Mainly Clear' | 'Partly Cloudy' | 'Overcast' | 'Fog' | 'Rime Fog' | 'Light Drizzle' | 'Drizzle' | 'Dense Drizzle' | 'Slight Rain' | 'Heavy Rain' | 'Slight Showers' | 'Rain Showers' | 'Violent Showers' | 'Thunderstorm';

interface WeatherData {
    city: string;
    temp: string;
    condition: WeatherCondition;
    icon: React.ComponentType<{ className?: string }>;
}

const cityList = [
    { name: 'Riyadh', lat: 24.7136, lon: 46.6753 },
    { name: 'Jeddah', lat: 21.4858, lon: 39.1925 },
    { name: 'Dammam', lat: 26.4207, lon: 50.0888 },
    { name: 'Abha', lat: 18.2167, lon: 42.5053 },
    { name: 'Mecca', lat: 21.4225, lon: 39.8262 },
    { name: 'Medina', lat: 24.4686, lon: 39.6142 },
    { name: 'Tabuk', lat: 28.3835, lon: 36.5661 },
    { name: 'Al Khobar', lat: 26.2889, lon: 50.2083 },
    { name: 'Jizan', lat: 16.8897, lon: 42.5511 },
];

// WMO Weather interpretation codes
const codeToCondition: Record<number, { condition: WeatherCondition, icon: React.ComponentType<{ className?: string }>}> = {
    0: { condition: 'Clear', icon: Sun },
    1: { condition: 'Mainly Clear', icon: Sun },
    2: { condition: 'Partly Cloudy', icon: Cloudy },
    3: { condition: 'Overcast', icon: Cloudy },
    45: { condition: 'Fog', icon: Cloudy },
    48: { condition: 'Rime Fog', icon: Cloudy },
    51: { condition: 'Light Drizzle', icon: CloudRain },
    53: { condition: 'Drizzle', icon: CloudRain },
    55: { condition: 'Dense Drizzle', icon: CloudRain },
    61: { condition: 'Slight Rain', icon: CloudRain },
    63: { condition: 'Rain', icon: CloudRain },
    65: { condition: 'Heavy Rain', icon: CloudRain },
    80: { condition: 'Slight Showers', icon: CloudRain },
    81: { condition: 'Rain Showers', icon: CloudRain },
    82: { condition: 'Violent Showers', icon: CloudRain },
    95: { condition: 'Thunderstorm', icon: CloudRain },
};


export function WeatherMarquee() {
    const [weatherData, setWeatherData] = useState<WeatherData[] | null>(null);
    const [isPaused, setIsPaused] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const weatherPromises = cityList.map(city => 
                    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,weather_code`)
                        .then(res => res.json())
                );
                
                const results = await Promise.all(weatherPromises);
                
                const formattedData = results.map((data, index) => {
                    if (data.error) {
                        console.error(`Failed to fetch weather for ${cityList[index].name}:`, data.reason);
                        return null;
                    }
                    const weatherCode = data.current.weather_code;
                    const { condition, icon } = codeToCondition[weatherCode] || { condition: 'Clear', icon: Sun };
                    
                    return {
                        city: cityList[index].name,
                        temp: `${Math.round(data.current.temperature_2m)}°C`,
                        condition: condition,
                        icon: icon,
                    };
                }).filter((item): item is WeatherData => item !== null);
                
                if (formattedData.length === 0 && results.length > 0) {
                     setError("Could not load weather data.");
                } else {
                    setWeatherData(formattedData);
                }

            } catch (err) {
                console.error("Failed to fetch weather data:", err);
                setError("Network error fetching weather data.");
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                <span>Loading Live Weather...</span>
            </div>
        );
    }
    
    if (error || !weatherData || weatherData.length === 0) {
        return (
            <div className="flex items-center justify-center h-full text-destructive-foreground bg-destructive/80">
                 <span>{error || "Could not load weather."}</span>
            </div>
        )
    }

    return (
        <div 
            className="marquee"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className={cn("marquee-content", isPaused && 'paused')}>
                {[...weatherData, ...weatherData].map((weather, index) => (
                    <div key={index} className="flex items-center space-x-4 mx-6 text-sm">
                        <weather.icon className="h-5 w-5 text-primary" />
                        <div className="font-semibold">{weather.city}</div>
                        <div className="flex items-center text-muted-foreground">
                            <Thermometer className="h-4 w-4 mr-1" />
                            <span>{weather.temp}</span>
                        </div>
                        <div className="text-muted-foreground">{weather.condition}</div>
                    </div>
                ))}
            </div>
             <div className="absolute inset-0 bg-gradient-to-r from-card via-transparent to-card pointer-events-none"></div>
        </div>
    );
}
