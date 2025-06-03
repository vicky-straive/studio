"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ZoomIn, ZoomOut, Hand } from "lucide-react";

type ZoomControlsProps = {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onPanToolSelect: () => void;
  isPanToolActive: boolean;
};

export default function ZoomControls({
  onZoomIn,
  onZoomOut,
  onPanToolSelect,
  isPanToolActive,
}: ZoomControlsProps) {
  return (
    <TooltipProvider>
      <div className="flex items-center space-x-1 rounded-md border bg-card p-1 shadow-sm">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={onZoomIn} aria-label="Zoom In">
              <ZoomIn className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Zoom In</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={onZoomOut} aria-label="Zoom Out">
              <ZoomOut className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Zoom Out</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={isPanToolActive ? "secondary" : "ghost"}
              size="icon"
              onClick={onPanToolSelect}
              aria-label="Pan Tool"
            >
              <Hand className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Pan Tool</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
