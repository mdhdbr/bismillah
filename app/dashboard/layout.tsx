
'use client';

import Link from "next/link";
import {
  Bell,
  Truck,
  CircleUser,
  Menu,
  Settings,
  LifeBuoy
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DashboardNav } from "@/components/dashboard-nav";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { WeatherMarquee } from "@/components/weather-marquee";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const authStatus = localStorage.getItem('authenticated');
    if (authStatus !== 'true') {
      router.replace('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('authenticated');
    setIsAuthenticated(false);
    router.replace('/');
  };

  const isFullHeightPage = ['/dashboard/live-map', '/dashboard/weather', '/fleet/tracking'].includes(pathname);
  
  if (!isAuthenticated) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-center">
          <p>Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] print:hidden">
        <div className="hidden border-r bg-card md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                <Truck className="h-6 w-6 text-primary" />
                <span className="">MHB Logistics</span>
              </Link>
            </div>
            <div className="flex-1 overflow-y-auto">
              <DashboardNav />
            </div>
          </div>
        </div>
        <div className="flex flex-col max-h-screen overflow-hidden">
          <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6 z-10 shrink-0">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <SheetHeader>
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                </SheetHeader>
                <nav className="grid gap-2 text-lg font-medium">
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <Truck className="h-6 w-6 text-primary" />
                    <span className="">MHB Logistics</span>
                  </Link>
                  <DashboardNav onLinkClick={() => setIsSheetOpen(false)} />
                </nav>
              </SheetContent>
            </Sheet>

            <div className="w-full flex-1" />

             <div className="ml-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="icon" className="rounded-full">
                    <CircleUser className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>mdhdbr@hotmail.com</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/dashboard/settings" passHref>
                    <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/dashboard/support" passHref>
                    <DropdownMenuItem>
                        <LifeBuoy className="mr-2 h-4 w-4" />
                        Support
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          
          <main className={cn("flex flex-1 flex-col overflow-auto", isFullHeightPage ? "" : "gap-4 p-4 md:gap-6 md:p-6")}>
            <div className={cn("w-full", isFullHeightPage ? "h-full" : "mx-auto max-w-7xl")}>
              {children}
            </div>
          </main>
          
          <footer className="h-14 flex items-center border-t bg-card text-card-foreground shrink-0 overflow-hidden">
             <WeatherMarquee />
          </footer>
        </div>
      </div>
  );
}

    