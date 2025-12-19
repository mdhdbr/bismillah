
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';

export function JourneyDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>About the Creator</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <p>
            This application was created by a visionary developer. You can view their portfolio by clicking the button below.
          </p>
        </div>
        <DialogFooter>
          <Button asChild>
            <Link href="https://portfolio-ten-pearl-35.vercel.app/" target="_blank">
              View Creator's Portfolio
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
