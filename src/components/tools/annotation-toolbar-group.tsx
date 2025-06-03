"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { PenTool, Signature, ImageUp, Baseline, Slash, RectangleHorizontal } from "lucide-react";
import StickyNoteButton from "./sticky-note-button"; // Import the dedicated sticky note button

type AnnotationToolbarGroupProps = {
  selectedTool: string | null;
  onToolSelect: (tool: string) => void;
};

const tools = [
  { name: "pen", label: "Pen Tool", icon: PenTool },
  { name: "signature", label: "Signature", icon: Signature },
  { name: "image", label: "Insert Image", icon: ImageUp },
  // Sticky Note is handled by its own component
  { name: "text", label: "Text Tool", icon: Baseline },
  { name: "line", label: "Line Tool", icon: Slash },
  { name: "shape", label: "Shape Tool", icon: RectangleHorizontal },
];

export default function AnnotationToolbarGroup({ selectedTool, onToolSelect }: AnnotationToolbarGroupProps) {
  return (
    <TooltipProvider>
      <div className="flex items-center space-x-1 rounded-md border bg-card p-1 shadow-sm">
        {tools.map((tool) => (
          <Tooltip key={tool.name}>
            <TooltipTrigger asChild>
              <Button
                variant={selectedTool === tool.name ? "secondary" : "ghost"}
                size="icon"
                onClick={() => onToolSelect(tool.name)}
                aria-label={tool.label}
              >
                <tool.icon className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{tool.label}</TooltipContent>
          </Tooltip>
        ))}
        {/* Add StickyNoteButton here */}
        <StickyNoteButton 
          onToolSelect={onToolSelect} 
          isSelected={selectedTool === "sticky-note"} 
        />
      </div>
    </TooltipProvider>
  );
}
