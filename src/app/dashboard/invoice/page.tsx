
'use client';

import { useState, useRef, useEffect } from "react";
import { PageHeader } from "@/components/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Truck, Printer, Download, Mail, Search, AlertCircle, FileDown, FileText, Archive } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTripsStore } from "@/store/trips-store";
import type { Trip, VehicleType } from "@/lib/types";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { StatusBadge } from "@/components/status-badge";
import { initialPassengerRates, initialShipperRates, initialEquipmentRates, RateDetails, RateState } from "@/lib/rates";
import { format } from "date-fns";


const VAT_RATE = 0.15; // 15%

interface InvoiceDetails {
  id: string;
  date: string;
  dueDate: string;
  from: { name: string; address: string; email: string; };
  to: { name: string; address: string; email: string; };
  items: { id: number; description: string; quantity: number; rate: number; amount: number; }[];
  subtotal: number;
  vat: number;
  total: number;
}

const calculateTotalPerUnit = (details: RateDetails) => {
    const { per, rate, damages, handling, waiting, halting } = details;
    const percentageAmount = rate * (per / 100);
    const subtotal = rate + percentageAmount + damages + handling + waiting + halting;
    const vat = subtotal * VAT_RATE;
    return subtotal + vat;
}

export default function InvoicePage() {
  const { toast } = useToast();
  const { trips, removeTrips } = useTripsStore();
  const [jobId, setJobId] = useState("");
  const [invoice, setInvoice] = useState<InvoiceDetails | null>(null);
  const invoiceRef = useRef(null);

  const [passengerRates, setPassengerRates] = useState<RateState>(initialPassengerRates);
  const [shipperRates, setShipperRates] = useState<RateState>(initialShipperRates);
  const [equipmentRates, setEquipmentRates] = useState<RateState>(initialEquipmentRates);


  useEffect(() => {
    // Load rates from localStorage on mount
    try {
        const savedPassenger = localStorage.getItem('passengerRates');
        if (savedPassenger) setPassengerRates(JSON.parse(savedPassenger));
        
        const savedShipper = localStorage.getItem('shipperRates');
        if (savedShipper) setShipperRates(JSON.parse(savedShipper));

        const savedEquipment = localStorage.getItem('equipmentRates');
        if (savedEquipment) setEquipmentRates(JSON.parse(savedEquipment));
    } catch (error) {
        console.error("Failed to parse rates from localStorage for invoice page", error);
    }
  }, []);

  const getFareForTrip = (trip: Trip): number => {
    if (!trip.vehicle?.type || !trip.distance) return 0;

    const vehicleType = trip.vehicle.type;
    let rateDetails: RateDetails | undefined;

    if (trip.type === 'PASSENGER' && passengerRates[vehicleType]) {
        rateDetails = passengerRates[vehicleType]!;
    } else if (trip.type === 'SHIPMENT' && shipperRates[vehicleType]) {
        rateDetails = shipperRates[vehicleType]!;
    } else if (trip.type === 'EQUIPMENT' && equipmentRates[vehicleType]) {
        rateDetails = equipmentRates[vehicleType]!;
    }

    if (rateDetails) {
        const totalPerUnit = calculateTotalPerUnit(rateDetails);
        return totalPerUnit * trip.distance;
    }
    return 0;
  };

  const handleGenerateInvoice = () => {
    if (!jobId) {
      toast({ variant: "destructive", title: "Job ID Required", description: "Please select a completed Job ID to generate an invoice." });
      return;
    }

    const trip = trips.find(t => t.jobId.toLowerCase() === jobId.toLowerCase());

    if (!trip || !trip.vehicle?.type || !trip.distance) {
      toast({ variant: "destructive", title: "Job Not Found or Incomplete", description: `Job with ID ${jobId} is missing required data (vehicle, distance).` });
      setInvoice(null);
      return;
    }
    
    if (trip.status !== 'COMPLETED') {
        toast({ variant: "destructive", title: "Job Not Completed", description: `Job ${jobId} is still in '${trip.status}' status.` });
        setInvoice(null);
        return;
    }

    // --- Calculation Logic ---
    let rateDetails: RateDetails | undefined;
    const vehicleType = trip.vehicle.type;
    if (trip.type === 'PASSENGER' && passengerRates[vehicleType]) {
        rateDetails = passengerRates[vehicleType]!;
    } else if (trip.type === 'SHIPMENT' && shipperRates[vehicleType]) {
        rateDetails = shipperRates[vehicleType]!;
    } else if (trip.type === 'EQUIPMENT' && equipmentRates[vehicleType]) {
        rateDetails = equipmentRates[vehicleType]!;
    }

    if (!rateDetails) {
        toast({ variant: "destructive", title: "Pricing Not Found", description: `No pricing details found for vehicle type: ${vehicleType}` });
        return;
    }

    const tripDescription = `${trip.type.charAt(0) + trip.type.slice(1).toLowerCase()} Transport - ${trip.vehicle?.type.replace(/_/g, ' ')}`;
    const distance = trip.distance || 0;
    
    // 1. Calculate base amount
    const baseRate = rateDetails.rate + rateDetails.damages + rateDetails.handling + rateDetails.waiting + rateDetails.halting;
    const baseAmount = distance * baseRate;

    // 2. Calculate Fuel Surcharge
    const surchargePercentage = rateDetails.per / 100;
    // The surcharge is a percentage of the base rate, not the base amount.
    const fuelSurchargeAmount = distance * (rateDetails.rate * surchargePercentage);
    
    // 3. Calculate Subtotal
    const subtotal = baseAmount + fuelSurchargeAmount;

    // 4. Calculate VAT
    const vatAmount = subtotal * VAT_RATE;

    // 5. Calculate Total
    const totalAmount = subtotal + vatAmount;

    const generatedInvoice: InvoiceDetails = {
      id: `INV-${trip.jobId}`,
      date: new Date().toLocaleDateString('en-CA'),
      dueDate: new Date(new Date().setDate(new Date().getDate() + 30)).toLocaleDateString('en-CA'),
      from: {
        name: "MHB Logistics",
        address: "123 Logistics Way, Riyadh, 11564, KSA",
        email: "billing@mhb-logistics.com",
      },
      to: { // Dummy data, replace with actual customer info later
        name: "Global Petro Services",
        address: "789 Industrial Ave, Dammam, 31442, KSA",
        email: "accounts@globalpetro.com",
      },
      items: [
        { id: 1, description: tripDescription, quantity: distance, rate: baseRate, amount: baseAmount },
        { id: 2, description: `Fuel Surcharge (${rateDetails.per}%)`, quantity: 1, rate: fuelSurchargeAmount, amount: fuelSurchargeAmount },
      ],
      subtotal: subtotal,
      vat: vatAmount,
      total: totalAmount,
    };

    setInvoice(generatedInvoice);
    toast({ title: "Invoice Generated", description: `Invoice for Job ID ${trip.jobId} is ready.` });
  };
  
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadCsv = () => {
    if (!invoice) return;

    const headers = ["Description", "KMS", "Rate", "Amount"];
    const rows = invoice.items.map(item => [
      `"${item.description.replace(/"/g, '""')}"`,
      item.id === 1 ? item.quantity.toFixed(2) : "", // Only show KMS for the main item
      item.rate.toFixed(2),
      item.amount.toFixed(2)
    ]);
    
    rows.push([]);
    rows.push(["Subtotal", "", "", invoice.subtotal.toFixed(2)]);
    rows.push([`VAT (${(VAT_RATE * 100).toFixed(0)}%)`, "", "", invoice.vat.toFixed(2)]);
    rows.push(["Total", "", "", invoice.total.toFixed(2)]);
    
    const csvContent = "data:text/csv;charset=utf-8," 
        + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${invoice.id}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const completedTrips = trips.filter(t => t.status === 'COMPLETED');

  const handleDailyArchive = () => {
    if (completedTrips.length === 0) {
      toast({
        variant: "destructive",
        title: "No Jobs to Archive",
        description: "There are no completed jobs to archive.",
      });
      return;
    }

    const headers = ["JobID", "Type", "VehicleType", "Distance", "Fare", "CompletedAt"];
    const rows = completedTrips.map(trip => [
      trip.jobId,
      trip.type,
      trip.vehicle?.type.replace(/_/g, ' ') || 'N/A',
      trip.distance?.toFixed(1) || '0',
      getFareForTrip(trip).toFixed(2),
      trip.completedAt ? format(new Date(trip.completedAt), 'yyyy-MM-dd HH:mm') : 'N/A'
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
        + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    const today = format(new Date(), 'yyyy-MM-dd');
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${today}-invoices.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // After download, "obsolete" the data by removing it from the store
    const tripIdsToRemove = completedTrips.map(t => t.id);
    removeTrips(tripIdsToRemove);

    toast({
      title: "Jobs Archived",
      description: `${completedTrips.length} completed jobs have been archived and cleared from the view.`,
    });
  };

  const emailSubject = invoice ? `Invoice ${invoice.id} from MHB Logistics` : "Invoice from MHB Logistics";
  const emailBody = invoice ? 
    `Dear ${invoice.to.name},%0D%0A%0D%0APlease find attached your invoice ${invoice.id} for a total of ${invoice.total.toFixed(2)} SAR.%0D%0A%0D%0AThank you for your business.%0D%0A%0D%0ARegards,%0D%0AMHB Logistics Billing Team` 
    : "Please find your invoice attached.";

  return (
    <>
      <PageHeader
        title="Invoice Generator"
        description="Select a completed Job ID to generate a detailed invoice."
        action={
            <div className="flex items-center gap-2">
                <div className="relative w-full max-w-sm">
                    <Label htmlFor="job-id-select" className="sr-only">Job ID</Label>
                    <Select onValueChange={setJobId} value={jobId}>
                        <SelectTrigger id="job-id-select">
                            <SelectValue placeholder="Select a completed Job ID" />
                        </SelectTrigger>
                        <SelectContent>
                            {completedTrips.length > 0 ? (
                                completedTrips.map(trip => (
                                    <SelectItem key={trip.id} value={trip.jobId}>
                                        {trip.jobId}
                                    </SelectItem>
                                ))
                            ) : (
                                <SelectItem value="no-jobs" disabled>No completed jobs found</SelectItem>
                            )}
                        </SelectContent>
                    </Select>
                </div>
                <Button onClick={handleGenerateInvoice}>
                    <Search className="mr-2 h-4 w-4" /> Generate
                </Button>
            </div>
        }
      />
      
      {invoice ? (
        <Card className="max-w-4xl mx-auto animate-in fade-in-50 duration-500 print:shadow-none print:border-none" ref={invoiceRef}>
            <CardHeader className="print:pb-2">
            <div className="flex justify-between items-start">
                <div>
                <div className="flex items-center gap-2 font-bold text-2xl">
                    <Truck className="h-8 w-8 text-primary" />
                    <span>MHB Logistics</span>
                </div>
                </div>
                <div className="text-right">
                <h1 className="text-3xl font-bold text-primary">INVOICE</h1>
                <p className="text-muted-foreground">{invoice.id}</p>
                <div className="mt-4 flex items-center justify-end gap-2 print:hidden">
                    <Button variant="outline" size="sm" asChild>
                      <a href={`mailto:?subject=${emailSubject}&body=${emailBody}`}>
                        <Mail className="mr-2 h-4 w-4" /> Send
                      </a>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                         <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" /> Download</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onSelect={handlePrint}>
                            <FileDown className="mr-2 h-4 w-4" />
                            Download as PDF
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={handleDownloadCsv}>
                            <FileText className="mr-2 h-4 w-4" />
                            Download as CSV
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button size="sm" onClick={handlePrint}><Printer className="mr-2 h-4 w-4" /> Print</Button>
                </div>
                </div>
            </div>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <h3 className="font-semibold mb-2">Billed To:</h3>
                        <address className="not-italic text-muted-foreground text-sm space-y-1">
                            <p className="font-bold text-foreground">{invoice.to.name}</p>
                            <p>{invoice.to.address}</p>
                            <p>{invoice.to.email}</p>
                        </address>
                    </div>
                    <div className="sm:text-right">
                        <h3 className="font-semibold mb-2">From:</h3>
                        <address className="not-italic text-muted-foreground text-sm space-y-1">
                            <p className="font-bold text-foreground">{invoice.from.name}</p>
                            <p>{invoice.from.address}</p>
                            <p>{invoice.from.email}</p>
                        </address>
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <h3 className="font-semibold mb-1">Invoice Date:</h3>
                        <p className="text-sm text-muted-foreground">{invoice.date}</p>
                    </div>
                    <div className="sm:text-right">
                        <h3 className="font-semibold mb-1">Due Date:</h3>
                        <p className="text-sm text-muted-foreground">{invoice.dueDate}</p>
                    </div>
                </div>

                <div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="w-[50%]">Description</TableHead>
                            <TableHead className="text-center">KMS</TableHead>
                            <TableHead className="text-right">Rate</TableHead>
                            <TableHead className="text-right">Amount (SAR)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoice.items.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.description}</TableCell>
                                <TableCell className="text-center">{item.id === 1 ? item.quantity.toFixed(1) : ''}</TableCell>
                                <TableCell className="text-right">{item.id === 1 ? item.rate.toFixed(2) : ''}</TableCell>
                                <TableCell className="text-right font-semibold">{item.amount.toFixed(2)}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                
                <div className="flex justify-end">
                    <div className="w-full max-w-xs space-y-2">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span>{invoice.subtotal.toFixed(2)} SAR</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">VAT ({ (VAT_RATE * 100).toFixed(0) }%)</span>
                            <span>{invoice.vat.toFixed(2)} SAR</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>{invoice.total.toFixed(2)} SAR</span>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-xs text-muted-foreground">
                <h3 className="font-semibold text-sm text-foreground">Notes</h3>
                <p>Please make all payments to the account details provided separately.</p>
                <p>Thank you for your business!</p>
            </CardFooter>
        </Card>
      ) : (
        <div className="flex items-center justify-center h-[50vh] print:hidden">
            <Alert className="max-w-md text-center">
                <AlertCircle className="h-4 w-4"/>
                <AlertTitle>Awaiting Job ID</AlertTitle>
                <AlertDescription>
                    Select a completed Job ID from the dropdown and click "Generate" to create an invoice.
                </AlertDescription>
            </Alert>
        </div>
      )}

      <Card className="mt-8">
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Completed Jobs Ready for Invoicing</CardTitle>
                <CardDescription>This is a list of all completed jobs that can be invoiced.</CardDescription>
            </div>
            <Button variant="outline" onClick={handleDailyArchive}>
                <Archive className="mr-2 h-4 w-4" />
                Daily Close & Archive
            </Button>
        </CardHeader>
        <CardContent>
            <div className="overflow-x-auto">
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Job ID</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Vehicle Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Distance (KM)</TableHead>
                            <TableHead className="text-right">Fare Amount (SAR)</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {completedTrips.length > 0 ? (
                            completedTrips.map(trip => (
                                <TableRow key={trip.id}>
                                    <TableCell className="font-medium text-primary">{trip.jobId}</TableCell>
                                    <TableCell>{trip.type}</TableCell>
                                    <TableCell>{trip.vehicle?.type.replace(/_/g, ' ')}</TableCell>
                                    <TableCell><StatusBadge status={trip.status} /></TableCell>
                                    <TableCell className="text-right">{trip.distance?.toFixed(1)}</TableCell>
                                    <TableCell className="text-right font-semibold">{getFareForTrip(trip).toFixed(2)}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">
                                    No completed jobs found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </CardContent>
      </Card>
    </>
  );
}
