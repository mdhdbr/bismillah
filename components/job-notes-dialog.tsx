
"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Trip, TripStatus } from "@/lib/types";

interface JobNotesDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  trip: Trip | null;
  onSubmit: (updatedTrip: Trip) => void;
}

const tripStatuses: TripStatus[] = ["PENDING", "ACCEPTED", "ON_ROUTE", "COMPLETED", "CANCELLED"];

export function JobNotesDialog({ isOpen, onOpenChange, trip, onSubmit }: JobNotesDialogProps) {
  const [status, setStatus] = useState<TripStatus>("PENDING");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (trip) {
      setStatus(trip.status);
      setNotes(trip.notes || "");
    }
  }, [trip]);

  const handleSubmit = () => {
    if (!trip) return;
    const updatedTrip = {
      ...trip,
      status: status,
      notes: notes,
    };
    onSubmit(updatedTrip);
  };

  if (!trip) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Job: {trip.jobId}</DialogTitle>
          <DialogDescription>
            Update the status or add notes for this job.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="status">Job Status</Label>
            <Select value={status} onValueChange={(value: TripStatus) => setStatus(value)}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                {tripStatuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="notes">Notes (e.g., Rejection Reason)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Driver rejected due to vehicle issue..."
              className="min-h-[100px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
