"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Highlighter, Paintbrush, Strikethrough } from "lucide-react";

type MarkupToolbarGroupProps = {
  selectedTool: string | null;
  onToolSelect: (tool: string) => void;
};

const tools = [
  { name: "highlight", label: "Highlighter", icon: Highlighter },
  { name: "ink", label: "Ink Tool", icon: Paintbrush },
  { name: "strikethrough", label: "Strikethrough", icon: Strikethrough },
];

export default function MarkupToolbarGroup({ selectedTool, onToolSelect }: MarkupToolbarGroupProps) {
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
      </div>
    </TooltipProvider>
  );
}
