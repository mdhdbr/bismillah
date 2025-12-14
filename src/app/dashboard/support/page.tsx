
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, MessageSquare, Phone } from 'lucide-react';

export default function SupportPage() {
  return (
    <>
      <PageHeader
        title="Support Center"
        description="Get help with the MHB Logistics platform."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
            <CardDescription>
              Our team is ready to assist you with any questions or issues.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start gap-3" asChild>
              <a href="mailto:support@mhb-logistics.com">
                <Mail className="h-5 w-5" />
                Email Us
              </a>
            </Button>
            <Button className="w-full justify-start gap-3" asChild>
               <a href="tel:+966110000000">
                <Phone className="h-5 w-5" />
                Call Us
               </a>
            </Button>
          </CardContent>
           <CardFooter>
            <p className="text-xs text-muted-foreground">
                Support hours: Sunday - Thursday, 9:00 AM to 6:00 PM (AST).
            </p>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Chat & SMS Module</CardTitle>
            <CardDescription>
              Communicate directly with drivers and customers.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
                <MessageSquare className="h-8 w-8 text-primary flex-shrink-0" />
                <div>
                    <h4 className="font-semibold">Live Chat</h4>
                    <p className="text-muted-foreground text-sm">
                        Initiate a real-time chat with drivers or support agents directly from the dispatch or map view.
                    </p>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <Phone className="h-8 w-8 text-primary flex-shrink-0" />
                <div>
                    <h4 className="font-semibold">SMS Module</h4>
                    <p className="text-muted-foreground text-sm">
                        Send automated SMS notifications to customers for booking confirmations, driver ETAs, and payment links.
                    </p>
                </div>
            </div>
          </CardContent>
          <CardFooter>
             <Button variant="secondary" className="w-full">
                Go to Communications Hub
             </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
