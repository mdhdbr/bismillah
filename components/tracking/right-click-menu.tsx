
'use client';

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { LogOut, Phone, MessageSquare, PauseCircle, Clock, History, User } from "lucide-react";

export function RightClickMenu({ children }: { children: React.ReactNode }) {
    return (
        <ContextMenu>
            <ContextMenuTrigger>
                {children}
            </ContextMenuTrigger>
            <ContextMenuContent className="w-64">
                <ContextMenuItem inset>
                    <Phone className="mr-2 h-4 w-4" />
                    Call Driver
                </ContextMenuItem>
                <ContextMenuItem inset>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Send Message
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem inset>
                    <PauseCircle className="mr-2 h-4 w-4" />
                    Suspend Auto Allocation
                </ContextMenuItem>
                 <ContextMenuItem inset>
                    <Clock className="mr-2 h-4 w-4" />
                    Change Shift End
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem inset>
                    <History className="mr-2 h-4 w-4" />
                    View Activity Log
                </ContextMenuItem>
                <ContextMenuItem inset>
                    <User className="mr-2 h-4 w-4" />
                    Open Profile
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem inset className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Force Logout
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}
