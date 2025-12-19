
'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Lock, Calendar, Truck, User, ShieldCheck, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

function PaymentForm() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  
  const jobId = searchParams.get('jobId');
  const amount = searchParams.get('amount');
  const productName = searchParams.get('productName');
  const isEscrow = searchParams.get('escrow') === 'true';

  const [paymentState, setPaymentState] = useState<'pending' | 'paid' | 'released'>('pending');

  const handlePayment = () => {
    toast({
      title: 'Payment Successful!',
      description: isEscrow 
        ? `Your payment of ${amount || '0.00'} SAR for ${productName} is now held securely in escrow.`
        : `Payment of ${amount || '0.00'} SAR for Job ID ${jobId} has been processed.`,
      className: 'bg-green-100 text-green-800 border-green-300',
    });
    setPaymentState('paid');
  };
  
  const handleReleasePayment = () => {
    toast({
      title: 'Payment Released!',
      description: `Your payment has been released to the seller. Thank you!`,
    });
    setPaymentState('released');
  }

  const title = isEscrow ? "Secure Escrow Payment" : "Secure Payment";
  const description = isEscrow 
    ? `Pay for: ${productName || 'Product'}`
    : `Complete the payment for Job ID: ${jobId || 'N/A'}`;

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
       <Link href="/dashboard" className="absolute top-4 left-4 flex items-center gap-2 font-semibold">
            <Truck className="h-6 w-6 text-primary" />
            <span className="">MHB Logistics</span>
        </Link>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            {description}
          </CardDescription>
        </CardHeader>

        {paymentState === 'pending' ? (
          <>
            <CardContent className="space-y-6">
              <div className="text-center bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Amount to Pay</p>
                <p className="text-4xl font-bold">{amount ? `${parseFloat(amount).toFixed(2)} SAR` : 'N/A'}</p>
              </div>
              
              <Separator />

              {isEscrow && (
                <Alert>
                    <ShieldCheck className="h-4 w-4" />
                    <AlertTitle>Buyer Protection</AlertTitle>
                    <AlertDescription>
                        Your payment is held securely and will only be released to the seller after you confirm satisfaction.
                    </AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="card-name">Cardholder Name</Label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input id="card-name" placeholder="Name as it appears on card" className="pl-10" />
                    </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input id="card-number" placeholder="0000 0000 0000 0000" className="pl-10" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <div className="relative">
                       <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                       <Input id="expiry" placeholder="MM / YY" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                     <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input id="cvc" placeholder="CVC" className="pl-10" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button className="w-full" onClick={handlePayment} disabled={!amount}>
                Pay {amount ? `${parseFloat(amount).toFixed(2)} SAR` : ''}
              </Button>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Lock className="h-3 w-3" /> Secure payment powered by MHB Pay
              </p>
            </CardFooter>
          </>
        ) : (
            <CardContent className="text-center space-y-4">
                 <Alert variant={paymentState === 'paid' ? "default" : "default"} className={paymentState === 'released' ? 'bg-green-50 border-green-200' : ''}>
                    {paymentState === 'paid' ? <ShieldCheck className="h-4 w-4"/> : <CheckCircle className="h-4 w-4 text-green-600" />}
                    <AlertTitle>
                        {paymentState === 'paid' ? "Payment Held in Escrow" : "Payment Released"}
                    </AlertTitle>
                    <AlertDescription>
                        {paymentState === 'paid'
                            ? "Your payment is secure. Once you receive your item and are satisfied, click below to release the funds to the seller."
                            : "The funds have been transferred to the seller. Your transaction is complete."
                        }
                    </AlertDescription>
                </Alert>

                <p className="font-bold text-2xl">{amount ? `${parseFloat(amount).toFixed(2)} SAR` : 'N/A'}</p>
                <p className="text-muted-foreground">{productName}</p>

                {paymentState === 'paid' && (
                    <Button className="w-full" onClick={handleReleasePayment}>
                        I'm Satisfied, Release Payment
                    </Button>
                )}
            </CardContent>
        )}

      </Card>
    </div>
  );
}

export default function PaymentPage() {
    return (
        <Suspense fallback={<div>Loading payment details...</div>}>
            <PaymentForm />
        </Suspense>
    )
}
