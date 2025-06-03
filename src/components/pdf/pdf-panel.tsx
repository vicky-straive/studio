"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PdfPanelProps = {
  title: string;
  imageUrl: string;
  isEditable?: boolean;
  imageHint?: string;
};

export default function PdfPanel({ title, imageUrl, isEditable = false, imageHint = "document" }: PdfPanelProps) {
  return (
    <Card className="flex-1 flex flex-col overflow-hidden shadow-lg">
      <CardHeader className="py-3 px-4 border-b">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-2 bg-muted/30 overflow-auto flex justify-center items-start">
        {/* Container to manage aspect ratio and scrolling if image is larger */}
        <div className="w-full h-full relative">
           <Image
            src={imageUrl}
            alt={`${title} Placeholder`}
            width={800}
            height={1131}
            className="object-contain w-auto h-auto max-w-full max-h-full shadow-md"
            data-ai-hint={imageHint}
            priority // Load placeholder quickly
          />
        </div>
      </CardContent>
      {/* Future: Add specific controls for editable PDF if needed */}
    </Card>
  );
}
