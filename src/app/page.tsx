

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Zap, Users, Shield, Truck, Car, Fuel, FileText, BarChart } from "lucide-react";
import Link from "next/link";
import { JourneyDialog } from "@/components/journey-dialog";

const valuePropositions = [
    {
        icon: <TrendingUp className="h-8 w-8 text-accent" />,
        title: "100% Productivity",
        description: "Eliminate dead mileage through intelligent job allocation.",
    },
    {
        icon: <Zap className="h-8 w-8 text-accent" />,
        title: "Real-Time Operations",
        description: "Live tracking of 1,000+ vehicles with instant dispatch.",
    },
    {
        icon: <Users className="h-8 w-8 text-accent" />,
        title: "Unified Platform",
        description: "Single system for passengers, logistics & mobile services.",
    },
];

const keyFeatures = [
    {
        icon: <Car className="h-6 w-6 text-primary" />,
        title: "Passenger Transport",
        points: [
            "Luxury Sedan, MPV, SUV, VVIP vehicles",
            "Staff bus scheduling",
            "OTP-based pickup verification",
            "Passenger addons (wheelchair, baby seat, etc.)",
        ],
    },
    {
        icon: <Truck className="h-6 w-6 text-primary" />,
        title: "Road Logistics",
        points: [
            "Crane trailers & container carriers",
            "Low-bed trucks & mini-wagons",
            "Luggage transport services",
            "Real-time load tracking",
        ],
    },
    {
        icon: <Fuel className="h-6 w-6 text-primary" />,
        title: "Mobile Services",
        points: [
            "Mobile fuel delivery",
            "On-site tyre services",
            "Mobile mechanics",
            "Vendor marketplace with ratings",
        ],
    },
    {
        icon: <Shield className="h-6 w-6 text-primary" />,
        title: "Driver Safety",
        points: [
            "iAuditor-style pre-trip checks",
            "Fatigue monitoring & alerts",
            "Incident reporting system",
            "Digital vehicle inspections",
        ],
    },
    {
        icon: <FileText className="h-6 w-6 text-primary" />,
        title: "Compliance",
        points: [
            "Vehicle renewal tracking",
            "License & insurance management",
            "Driver training modules",
            "Document lifecycle automation",
        ],
    },
    {
        icon: <BarChart className="h-6 w-6 text-primary" />,
        title: "Business Intelligence",
        points: [
            "Real-time KPI dashboards",
            "Utilization analytics",
            "Empty-km reduction metrics",
            "PPT/PDF export ready",
        ],
    },
];


export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="#" className="flex items-center gap-2 font-bold text-xl">
            <Truck className="h-7 w-7 text-primary" />
            <span>MHB Logistics</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Button asChild>
                <Link href="/login">Login</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="mb-4 text-lg text-muted-foreground">Bismillah - In the name of Allah</p>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              The Future of Fleet Management is Here
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
             Build a unified digital road logistics network connecting vehicle owners, drivers, warehouses, ports, roadside service vendors, mobile fueling operators, and businesses requiring freight & passenger transport across Tamil Nadu and Saudi Arabia corridors.
            </p>
            <div className="mt-10">
              <JourneyDialog>
                <Button size="lg">Get Started</Button>
              </JourneyDialog>
            </div>
          </div>
        </section>
        
        <section className="py-16 sm:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {valuePropositions.map((prop) => (
                        <Card key={prop.title} className="text-center border-none shadow-none bg-transparent">
                        <CardHeader>
                            <div className="flex justify-center mb-4">{prop.icon}</div>
                            <CardTitle>{prop.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{prop.description}</p>
                        </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        <section className="bg-muted py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold tracking-tight">Key Features</h2>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {keyFeatures.map((feature) => (
                <Card key={feature.title}>
                  <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                    <div>{feature.icon}</div>
                    <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        {feature.points.map((point, index) => (
                            <li key={index}>{point}</li>
                        ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

         <section className="py-16 sm:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight">Capacity & Scale</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full max-w-4xl mx-auto text-center">
                        <thead>
                            <tr className="border-b">
                                <th className="p-4 text-2xl md:text-4xl font-bold text-primary">1,000+</th>
                                <th className="p-4 text-2xl md:text-4xl font-bold text-primary">500+</th>
                                <th className="p-4 text-2xl md:text-4xl font-bold text-primary">24/7</th>
                                <th className="p-4 text-2xl md:text-4xl font-bold text-primary">2</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-2 text-muted-foreground">Driver's</td>
                                <td className="p-2 text-muted-foreground">Vehicle Tracked</td>
                                <td className="p-2 text-muted-foreground">Operations Support</td>
                                <td className="p-2 text-muted-foreground">Major Corridors</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

      </main>

      <footer className="py-8 bg-background border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} MHB Logistics. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
