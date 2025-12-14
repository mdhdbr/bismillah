
'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Send, KeyRound, ShieldCheck, ShieldOff } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function SettingsPage() {
  const { toast } = useToast();
  const phoneNumber = '+919941492528';
  const [isSending, setIsSending] = useState(false);
  const [otp, setOtp] = useState('');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdminMode');
    if (adminStatus === 'true') {
      setIsAdminMode(true);
    }
  }, []);

  const handleSendOtp = () => {
    setIsSending(true);
    // Simulate sending an OTP
    setTimeout(() => {
      const generatedOtp = '1234'; // Hardcoded for simulation
      toast({
        title: 'OTP Sent',
        description: `An OTP (${generatedOtp}) has been sent to ${phoneNumber}.`,
      });
      setIsSending(false);
    }, 1000);
  };

  const handleVerifyOtp = () => {
    setIsVerifying(true);
    setTimeout(() => {
      if (otp === '1234') {
        localStorage.setItem('isAdminMode', 'true');
        setIsAdminMode(true);
        toast({
          title: 'Admin Mode Enabled',
          description: 'You now have full edit access across the application.',
          className: 'bg-green-100 text-green-800 border-green-300',
        });
        window.dispatchEvent(new Event('storage')); // Notify other components of the change
      } else {
        toast({
          variant: 'destructive',
          title: 'Verification Failed',
          description: 'The OTP you entered is incorrect.',
        });
      }
      setIsVerifying(false);
      setOtp('');
    }, 1000);
  };
  
  const handleDisableAdminMode = () => {
    localStorage.removeItem('isAdminMode');
    setIsAdminMode(false);
    toast({
        title: 'Admin Mode Disabled',
        description: 'Edit permissions have been reset to default.',
    });
    window.dispatchEvent(new Event('storage'));
  }

  return (
    <>
      <PageHeader
        title="Admin Settings"
        description="Manage high-level administrative tasks and security settings."
      />
      <div className="space-y-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>
              Manage security features like One-Time Passwords (OTPs) for sensitive actions.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">OTP Target Phone Number</Label>
              <Input id="phone" value={phoneNumber} readOnly disabled />
              <p className="text-xs text-muted-foreground">
                This is the configured number for receiving administrative OTPs.
              </p>
            </div>
            <Button onClick={handleSendOtp} disabled={isSending}>
              {isSending ? 'Sending...' : <><Send className="mr-2 h-4 w-4" /> Send Test OTP</>}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Admin Mode</CardTitle>
            <CardDescription>
              Enable admin mode to get full edit access to all data fields across the platform.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isAdminMode ? (
              <Alert variant="default" className="bg-green-50 border-green-200">
                <ShieldCheck className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">Admin Mode is Active</AlertTitle>
                <AlertDescription className="text-green-700">
                  Full edit access is enabled. You can now modify fields that are normally read-only.
                </AlertDescription>
                <Button variant="destructive" size="sm" className="mt-4" onClick={handleDisableAdminMode}>
                  <ShieldOff className="mr-2 h-4 w-4" />
                  Disable Admin Mode
                </Button>
              </Alert>
            ) : (
              <div className="space-y-4 p-4 border rounded-lg">
                  <div className="space-y-2">
                    <Label htmlFor="otp">Enter OTP</Label>
                    <Input 
                      id="otp" 
                      placeholder="Enter the 4-digit code" 
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={4}
                    />
                  </div>
                  <Button onClick={handleVerifyOtp} disabled={isVerifying || otp.length < 4} className="w-full">
                    {isVerifying ? 'Verifying...' : <><KeyRound className="mr-2 h-4 w-4" /> Verify & Enable Admin Mode</>}
                  </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
