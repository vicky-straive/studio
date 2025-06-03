"use client";

import { useState } from "react";
import AppHeader from "@/components/layout/app-header";
import MainToolbar from "@/components/layout/main-toolbar";
import PdfPanel from "@/components/pdf/pdf-panel";
import { useToast } from "@/hooks/use-toast";


export default function TwilightPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // Mock total pages
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const { toast } = useToast();

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleZoomIn = () => {
    toast({ title: "Zoom In", description: "Zoom in functionality (mock)." });
  };

  const handleZoomOut = () => {
    toast({ title: "Zoom Out", description: "Zoom out functionality (mock)." });
  };

  const handleToolSelect = (tool: string) => {
    setSelectedTool(prevTool => {
      const newTool = prevTool === tool ? null : tool;
      if (newTool) {
        // Capitalize first letter for toast
        const toolName = newTool.charAt(0).toUpperCase() + newTool.slice(1).replace('-', ' ');
         toast({ title: `${toolName} Selected`, description: `${toolName} tool is now active (mock).` });
      }
      return newTool;
    });
  };
  
  const isPanActive = selectedTool === "pan";
  const handlePanToolSelect = () => handleToolSelect("pan");


  return (
    <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden">
      <AppHeader />
      <MainToolbar
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onPanToolSelect={handlePanToolSelect}
        isPanToolActive={isPanActive}
        selectedAnnotationTool={selectedTool}
        onAnnotationToolSelect={handleToolSelect}
        selectedMarkupTool={selectedTool}
        onMarkupToolSelect={handleToolSelect}
      />
      <main className="flex-1 flex flex-row overflow-hidden p-4 gap-4">
        <PdfPanel 
          title="Original PDF" 
          imageUrl="https://placehold.co/800x1131.png" 
          imageHint="document paper" 
        />
        <PdfPanel 
          title="Editable PDF" 
          imageUrl="https://placehold.co/800x1131.png" 
          imageHint="document form" 
          isEditable={true} 
        />
      </main>
    </div>
  );
}
