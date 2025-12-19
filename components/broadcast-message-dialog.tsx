
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface BroadcastMessageDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedVehiclesCount: number;
  onSubmit: (data: { subject: string; message: string }) => void;
}

export function BroadcastMessageDialog({
  isOpen,
  onOpenChange,
  selectedVehiclesCount,
  onSubmit,
}: BroadcastMessageDialogProps) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      setSubject("");
      setMessage("");
    }
  }, [isOpen]);

  const handleSubmit = () => {
    // Basic validation
    if (!subject.trim() || !message.trim()) {
      alert("Subject and message cannot be empty.");
      return;
    }
    onSubmit({ subject, message });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Broadcast Message</DialogTitle>
          <DialogDescription>
            Send a message to the drivers of the {selectedVehiclesCount} selected vehicle(s).
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g., Urgent: Weather Alert"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here."
              className="min-h-[100px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            <Send className="mr-2 h-4 w-4" />
            Send Broadcast
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
