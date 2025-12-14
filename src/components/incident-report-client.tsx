
"use client";

import type { User } from "@/lib/types";
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { LogIn } from "lucide-react";
import { IncidentReportForm } from "./incident-report-form";
import { drivers } from "@/lib/data"; // Using drivers as a proxy for agents

export function IncidentReportClient() {
  const { toast } = useToast();
  const [loggedInAgent, setLoggedInAgent] = useState<User | null>(null);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [otp, setOtp] = useState("");

  const availableAgents = useMemo(() => {
    // In a real app, you'd fetch users with an "AGENT" or "DISPATCHER" role.
    // For this simulation, we'll use all users associated with drivers.
    return drivers.map(d => d.user);
  }, []);

  const handleLogin = () => {
    if (!selectedAgentId) {
      toast({ variant: "destructive", title: "Please select your Agent ID." });
      return;
    }
    if (otp !== "1234") {
      toast({ variant: "destructive", title: "Invalid OTP", description: "Please enter the correct OTP (hint: 1234)." });
      return;
    }
    const selectedAgent = availableAgents.find(a => a.id === selectedAgentId);
    if (selectedAgent) {
      setLoggedInAgent(selectedAgent);
      toast({ title: "Login Successful", description: `Welcome, ${selectedAgent.name}` });
    } else {
      toast({ variant: "destructive", title: "Agent not found" });
    }
  };
  
  const handleLogout = () => {
    setLoggedInAgent(null);
    setOtp("");
    setSelectedAgentId(null);
  }

  if (!loggedInAgent) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Agent Authentication</CardTitle>
          <CardDescription>Please sign in to file a report.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="agent-id">Agent ID</Label>
            <Select onValueChange={setSelectedAgentId}>
              <SelectTrigger id="agent-id">
                <SelectValue placeholder="Select your agent ID" />
              </SelectTrigger>
              <SelectContent>
                {availableAgents.map(agent => (
                  <SelectItem key={agent.id} value={agent.id}>{agent.name} ({agent.id})</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="otp">One-Time Password (OTP)</Label>
            <Input id="otp" type="password" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter your OTP" />
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-4">
          <Button className="w-full" onClick={handleLogin}>
            <LogIn className="mr-2 h-4 w-4" /> Sign In
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  return (
    <div>
        <div className="flex justify-end mb-4">
            <Button variant="ghost" size="sm" onClick={handleLogout}>Logout</Button>
        </div>
        <IncidentReportForm agent={loggedInAgent} />
    </div>
  );
}
