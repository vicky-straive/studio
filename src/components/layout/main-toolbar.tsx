"use client";

import PageNavigationControls from "@/components/tools/page-navigation-controls";
import ZoomControls from "@/components/tools/zoom-controls";
import AnnotationToolbarGroup from "@/components/tools/annotation-toolbar-group";
import MarkupToolbarGroup from "@/components/tools/markup-toolbar-group";
import { Separator } from "@/components/ui/separator";

type MainToolbarProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onPanToolSelect: () => void;
  isPanToolActive: boolean;
  selectedAnnotationTool: string | null;
  onAnnotationToolSelect: (tool: string) => void;
  selectedMarkupTool: string | null;
  onMarkupToolSelect: (tool: string) => void;
};

export default function MainToolbar({
  currentPage,
  totalPages,
  onPageChange,
  onZoomIn,
  onZoomOut,
  onPanToolSelect,
  isPanToolActive,
  selectedAnnotationTool,
  onAnnotationToolSelect,
  selectedMarkupTool,
  onMarkupToolSelect
}: MainToolbarProps) {
  return (
    <div className="flex items-center space-x-2 p-2 border-b bg-card shadow-sm overflow-x-auto">
      <PageNavigationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
      <Separator orientation="vertical" className="h-8" />
      <ZoomControls
        onZoomIn={onZoomIn}
        onZoomOut={onZoomOut}
        onPanToolSelect={onPanToolSelect}
        isPanToolActive={isPanToolActive}
      />
      <Separator orientation="vertical" className="h-8" />
      <AnnotationToolbarGroup
        selectedTool={selectedAnnotationTool}
        onToolSelect={onAnnotationToolSelect}
      />
      <Separator orientation="vertical" className="h-8" />
      <MarkupToolbarGroup
        selectedTool={selectedMarkupTool}
        onToolSelect={onMarkupToolSelect}
      />
    </div>
  );
}
