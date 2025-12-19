
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Truck, AlertTriangle, Loader2 } from "lucide-react";
import Image from "next/image";
import { generateBlueprint } from "@/ai/flows/generate-blueprint";

export default async function BlueprintPage() {
  let imageUrl: string | null = null;
  let error: string | null = null;

  try {
    const result = await generateBlueprint({ prompt: 'Generate the master blueprint' });
    imageUrl = result.imageUrl;
  } catch (e) {
    console.error("Failed to generate blueprint:", e);
    error = "The AI model is currently unavailable. Please try again later.";
    // Fallback image
    imageUrl = "https://picsum.photos/seed/blueprint-error/1200/675";
  }
  
  const altText = "Architectural blueprint of a planet-scale transport platform";

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Truck className="h-7 w-7 text-primary" />
            <span>MHB Logistics</span>
          </Link>
          <nav className="flex items-center gap-4">
             <Button variant="outline" asChild>
                <Link href="/">Home</Link>
            </Button>
            <Button asChild>
                <Link href="/login">Login</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center justify-center">
        <div className="w-full max-w-5xl text-center mb-8">
            <h1 className="text-4xl font-extrabold tracking-tight">Platform Blueprint</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                An AI-generated visual representation of the MHB Logistics operational nervous system.
            </p>
        </div>
        
        <div className="w-full max-w-6xl">
            {error && (
                <div className="mb-4 bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-lg flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5" />
                    <p>{error}</p>
                </div>
            )}
            {imageUrl ? (
                <Image
                    src={imageUrl}
                    alt={altText}
                    width={1200}
                    height={675}
                    className="rounded-lg shadow-2xl border-4 border-primary/10"
                    data-ai-hint="architecture blueprint"
                    unoptimized={imageUrl.startsWith('data:image')}
                />
            ) : (
                <div className="w-full aspect-video bg-muted rounded-lg flex flex-col items-center justify-center">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mb-4"/>
                    <p className="text-muted-foreground">Generating architectural blueprint...</p>
                </div>
            )}
        </div>
      </main>

       <footer className="py-8 bg-background border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} MHB Logistics. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
