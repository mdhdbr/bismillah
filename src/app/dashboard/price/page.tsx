
'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from "@/components/page-header";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Car, Truck, Save, Shield, Wrench, Fuel } from "lucide-react";
import type { VehicleType } from "@/lib/types";
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { initialPassengerRates, initialShipperRates, initialEquipmentRates, type RateDetails, type RateState } from "@/lib/rates";


const VAT_RATE = 0.15;


export default function PricePage() {
  const { toast } = useToast();
  const [isAdminMode, setIsAdminMode] = useState(false);
  
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
        console.error("Failed to parse rates from localStorage", error);
        // Stick with initial rates if parsing fails
    }


    const checkAdminMode = () => {
      const adminStatus = localStorage.getItem('isAdminMode') === 'true';
      setIsAdminMode(adminStatus);
    };

    checkAdminMode();
    window.addEventListener('storage', checkAdminMode);
    return () => {
      window.removeEventListener('storage', checkAdminMode);
    };
  }, []);

  const handleRateChange = (
    segment: 'passenger' | 'shipper' | 'equipment',
    type: VehicleType,
    field: keyof RateDetails,
    value: string
  ) => {
    const numericValue = parseFloat(value) || 0;
    const setState = {
        passenger: setPassengerRates,
        shipper: setShipperRates,
        equipment: setEquipmentRates,
    }[segment];

    setState(prev => ({
        ...prev,
        [type]: {
            ...prev[type]!,
            [field]: numericValue
        }
    }));
  };
  
  const handleSaveChanges = () => {
    try {
        localStorage.setItem('passengerRates', JSON.stringify(passengerRates));
        localStorage.setItem('shipperRates', JSON.stringify(shipperRates));
        localStorage.setItem('equipmentRates', JSON.stringify(equipmentRates));

        toast({
            title: "Rates Saved",
            description: "Your new pricing has been saved and will persist on refresh.",
        });
    } catch (error) {
         toast({
            variant: "destructive",
            title: "Save Failed",
            description: "Could not save rates to local storage. Your browser might be in private mode or have storage disabled.",
        });
    }
  }
  
  const calculateTotal = (details: RateDetails) => {
    const { per, rate, damages, handling, waiting, halting } = details;
    const percentageAmount = rate * (per / 100);
    const subtotal = rate + percentageAmount + damages + handling + waiting + halting;
    const vat = subtotal * VAT_RATE;
    return subtotal + vat;
  }
  
  const getVatAmount = (details: RateDetails) => {
    const { per, rate, damages, handling, waiting, halting } = details;
    const percentageAmount = rate * (per / 100);
    const subtotal = rate + percentageAmount + damages + handling + waiting + halting;
    return subtotal * VAT_RATE;
  }


  return (
    <>
      <PageHeader
        title="Vehicle Rate Card"
        description="Official pricing for all vehicle segments. Editable in Admin Mode."
        action={isAdminMode ? (
            <Button onClick={handleSaveChanges}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
            </Button>
        ) : null}
      />

       {!isAdminMode && (
         <Alert className="mb-6">
            <Shield className="h-4 w-4" />
            <AlertTitle>Read-Only Mode</AlertTitle>
            <AlertDescription>
                To edit pricing, please enable Admin Mode in the settings page.
            </AlertDescription>
         </Alert>
       )}

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Car className="h-6 w-6 text-primary" />
              <div>
                <CardTitle>Passenger Vehicles</CardTitle>
                <CardDescription>Rates for all passenger transport types.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle Type</TableHead>
                  <TableHead>% Per</TableHead>
                  <TableHead className="text-right">Rate (SAR/KM)</TableHead>
                  <TableHead className="text-right">VAT ({VAT_RATE * 100}%)</TableHead>
                  <TableHead className="text-right">Damages</TableHead>
                  <TableHead className="text-right">Handling</TableHead>
                  <TableHead className="text-right">Waiting</TableHead>
                  <TableHead className="text-right">Halting</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(passengerRates).map(([type, details]) => {
                  if (!details) return null;
                  const total = calculateTotal(details);
                  const vatAmount = getVatAmount(details);
                  return (
                  <TableRow key={type}>
                    <TableCell className="font-medium">
                      {type.replace(/_/g, " ")}
                    </TableCell>
                    <TableCell>
                       <Input 
                         type="text" 
                         value={details.per}
                         onChange={(e) => handleRateChange('passenger', type as VehicleType, 'per', e.target.value)}
                         className="min-w-[80px] text-right" 
                         readOnly={!isAdminMode}
                       />
                    </TableCell>
                    <TableCell className="text-right">
                       <Input 
                         type="text" 
                         value={details.rate.toFixed(2)}
                         onChange={(e) => handleRateChange('passenger', type as VehicleType, 'rate', e.target.value)}
                         className="min-w-[100px] text-right" 
                         readOnly={!isAdminMode}
                       />
                    </TableCell>
                    <TableCell className="text-right">
                        <Input
                            type="text"
                            value={vatAmount.toFixed(2)}
                            readOnly
                            className="min-w-[80px] text-right bg-muted/50"
                        />
                    </TableCell>
                    <TableCell className="text-right">
                       <Input 
                         type="text"
                         value={details.damages}
                         onChange={(e) => handleRateChange('passenger', type as VehicleType, 'damages', e.target.value)}
                         className="min-w-[80px] text-right" 
                         readOnly={!isAdminMode}
                       />
                    </TableCell>
                    <TableCell className="text-right">
                       <Input 
                         type="text" 
                         value={details.handling}
                         onChange={(e) => handleRateChange('passenger', type as VehicleType, 'handling', e.target.value)}
                         className="min-w-[80px] text-right" 
                         readOnly={!isAdminMode}
                       />
                    </TableCell>
                    <TableCell className="text-right">
                       <Input 
                         type="text" 
                         value={details.waiting}
                         onChange={(e) => handleRateChange('passenger', type as VehicleType, 'waiting', e.target.value)}
                         className="min-w-[80px] text-right" 
                         readOnly={!isAdminMode}
                       />
                    </TableCell>
                    <TableCell className="text-right">
                       <Input 
                         type="text" 
                         value={details.halting}
                         onChange={(e) => handleRateChange('passenger', type as VehicleType, 'halting', e.target.value)}
                         className="min-w-[80px] text-right" 
                         readOnly={!isAdminMode}
                       />
                    </TableCell>
                    <TableCell className="text-right">
                       <Input 
                         type="text" 
                         value={total.toFixed(2)}
                         readOnly
                         className="min-w-[80px] text-right font-semibold bg-muted/50"
                       />
                    </TableCell>
                  </TableRow>
                )})}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
             <div className="flex items-center gap-3">
                <Truck className="h-6 w-6 text-primary" />
                <div>
                    <CardTitle>Shipper</CardTitle>
                    <CardDescription>Rates for all freight transport.</CardDescription>
                </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle Type</TableHead>
                  <TableHead>% Per</TableHead>
                  <TableHead className="text-right">Rate (SAR/KM)</TableHead>
                  <TableHead className="text-right">VAT ({VAT_RATE * 100}%)</TableHead>
                  <TableHead className="text-right">Damages</TableHead>
                  <TableHead className="text-right">Handling</TableHead>
                  <TableHead className="text-right">Waiting</TableHead>
                  <TableHead className="text-right">Halting</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(shipperRates).map(([type, details]) => {
                  if (!details) return null;
                  const total = calculateTotal(details);
                  const vatAmount = getVatAmount(details);
                  return (
                  <TableRow key={type}>
                    <TableCell className="font-medium">
                      {type.replace(/_/g, " ")}
                    </TableCell>
                     <TableCell>
                       <Input 
                         type="text" 
                         value={details.per}
                         onChange={(e) => handleRateChange('shipper', type as VehicleType, 'per', e.target.value)}
                         className="min-w-[80px] text-right" 
                         readOnly={!isAdminMode}
                       />
                    </TableCell>
                    <TableCell className="text-right">
                       <Input 
                         type="text" 
                         value={details.rate.toFixed(2)}
                         onChange={(e) => handleRateChange('shipper', type as VehicleType, 'rate', e.target.value)}
                         className="min-w-[100px] text-right" 
                         readOnly={!isAdminMode}
                       />
                    </TableCell>
                     <TableCell className="text-right">
                        <Input
                            type="text"
                            value={vatAmount.toFixed(2)}
                            readOnly
                            className="min-w-[80px] text-right bg-muted/50"
                        />
                    </TableCell>
                    <TableCell className="text-right">
                       <Input 
                         type="text"
                         value={details.damages}
                         onChange={(e) => handleRateChange('shipper', type as VehicleType, 'damages', e.target.value)}
                         className="min-w-[80px] text-right" 
                         readOnly={!isAdminMode}
                       />
                    </TableCell>
                    <TableCell className="text-right">
                       <Input 
                         type="text" 
                         value={details.handling}
                         onChange={(e) => handleRateChange('shipper', type as VehicleType, 'handling', e.target.value)}
                         className="min-w-[80px] text-right" 
                         readOnly={!isAdminMode}
                       />
                    </TableCell>
                     <TableCell className="text-right">
                       <Input 
                         type="text" 
                         value={details.waiting}
                         onChange={(e) => handleRateChange('shipper', type as VehicleType, 'waiting', e.target.value)}
                         className="min-w-[80px] text-right" 
                         readOnly={!isAdminMode}
                       />
                    </TableCell>
                    <TableCell className="text-right">
                       <Input 
                         type="text" 
                         value={details.halting}
                         onChange={(e) => handleRateChange('shipper', type as VehicleType, 'halting', e.target.value)}
                         className="min-w-[80px] text-right" 
                         readOnly={!isAdminMode}
                       />
                    </TableCell>
                    <TableCell className="text-right">
                       <Input 
                         type="text" 
                         value={total.toFixed(2)}
                         readOnly
                         className="min-w-[80px] text-right font-semibold bg-muted/50"
                       />
                    </TableCell>
                  </TableRow>
                )})}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
             <div className="flex items-center gap-3">
                <Wrench className="h-6 w-6 text-primary" />
                <div>
                    <CardTitle>Equipment</CardTitle>
                    <CardDescription>Rates for all heavy equipment.</CardDescription>
                </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Equipment Type</TableHead>
                  <TableHead>% Per</TableHead>
                  <TableHead className="text-right">Rate (SAR/HRS)</TableHead>
                  <TableHead className="text-right">VAT ({VAT_RATE * 100}%)</TableHead>
                  <TableHead className="text-right">Damages</TableHead>
                  <TableHead className="text-right">Handling</TableHead>
                  <TableHead className="text-right">Waiting</TableHead>
                  <TableHead className="text-right">Halting</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(equipmentRates).map(([type, details]) => {
                  if (!details) return null;
                  const total = calculateTotal(details);
                  const vatAmount = getVatAmount(details);
                  return (
                  <TableRow key={type}>
                    <TableCell className="font-medium">
                      {type.replace(/_/g, " ")}
                    </TableCell>
                     <TableCell>
                       <Input 
                         type="text" 
                         value={details.per}
                         onChange={(e) => handleRateChange('equipment', type as VehicleType, 'per', e.target.value)}
                         className="min-w-[80px] text-right" 
                         readOnly={!isAdminMode}
                       />
                    </TableCell>
                    <TableCell className="text-right">
                       <Input 
                         type="text" 
                         value={details.rate.toFixed(2)}
                         onChange={(e) => handleRateChange('equipment', type as VehicleType, 'rate', e.target.value)}
                         className="min-w-[100px] text-right" 
                         readOnly={!isAdminMode}
                       />
                    </TableCell>
                    <TableCell className="text-right">
                        <Input
                            type="text"
                            value={vatAmount.toFixed(2)}
                            readOnly
                            className="min-w-[80px] text-right bg-muted/50"
                        />
                    </TableCell>
                    <TableCell className="text-right">
                       <Input 
                         type="text" 
                         value={details.damages}
                         onChange={(e) => handleRateChange('equipment', type as VehicleType, 'damages', e.target.value)}
                         className="min-w-[80px] text-right" 
                         readOnly={!isAdminMode}
                       />
                    </TableCell>
                    <TableCell className="text-right">
                       <Input 
                         type="text" 
                         value={details.handling}
                         onChange={(e) => handleRateChange('equipment', type as VehicleType, 'handling', e.target.value)}
                         className="min-w-[80px] text-right" 
                         readOnly={!isAdminMode}
                       />
                    </TableCell>
                     <TableCell className="text-right">
                       <Input 
                         type="text" 
                         value={details.waiting}
                         onChange={(e) => handleRateChange('equipment', type as VehicleType, 'waiting', e.target.value)}
                         className="min-w-[80px] text-right" 
                         readOnly={!isAdminMode}
                       />
                    </TableCell>
                    <TableCell className="text-right">
                       <Input 
                         type="text" 
                         value={details.halting}
                         onChange={(e) => handleRateChange('equipment', type as VehicleType, 'halting', e.target.value)}
                         className="min-w-[80px] text-right" 
                         readOnly={!isAdminMode}
                       />
                    </TableCell>
                     <TableCell className="text-right">
                       <Input 
                         type="text" 
                         value={total.toFixed(2)}
                         readOnly
                         className="min-w-[80px] text-right font-semibold bg-muted/50"
                       />
                    </TableCell>
                  </TableRow>
                )})}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
