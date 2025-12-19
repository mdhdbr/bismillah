"use client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { ArrowLeft, ArrowRight, Copy, Scissors, ClipboardPaste, RotateCw } from "lucide-react";
import React from "react";

export function GlobalContextMenu({ children }: { children: React.ReactNode }) {

  const handleBack = () => window.history.back();
  const handleForward = () => window.history.forward();
  const handleReload = () => window.location.reload();
  
  // Note: These actions depend on browser support and context.
  // They will trigger the native browser action if possible.
  const handleCopy = () => document.execCommand('copy');
  const handlePaste = () => document.execCommand('paste');
  const handleCut = () => document.execCommand('cut');

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset onClick={handleForward}>
           <ArrowRight className="mr-2 h-4 w-4" />
          Forward
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset onClick={handleReload}>
          <RotateCw className="mr-2 h-4 w-4" />
          Reload
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem inset onClick={handleCut}>
            <Scissors className="mr-2 h-4 w-4" />
            Cut
            <ContextMenuShortcut>⌘X</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset onClick={handleCopy}>
            <Copy className="mr-2 h-4 w-4" />
            Copy
            <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset onClick={handlePaste}>
            <ClipboardPaste className="mr-2 h-4 w-4" />
            Paste
            <ContextMenuShortcut>⌘V</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
