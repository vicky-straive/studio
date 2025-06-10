"use client";

import Image from "next/image";
import { ChangeEvent, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PdfPanelProps = {
  title: string;
  imageUrl: string;
  isEditable?: boolean;
  imageHint?: string;
  onFileUpload: (fileContent: string | ArrayBuffer | null) => void;
  pdfData: string | ArrayBuffer | null;
};

export default function PdfPanel({ title, imageUrl, isEditable = false, imageHint = "document", onFileUpload, pdfData }: PdfPanelProps) {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPdfContent(e.target.result);
          onFileUpload(e.target.result); // Pass the file content to the parent
        }
      };
      reader.readAsDataURL(file); // Or readAsArrayBuffer if needed
    }

  };

  return (
    <Card className="flex flex-1 flex-col overflow-hidden shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b px-4 py-3">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        {isEditable && (
          <>
            <input id="file-upload" type="file" accept=".pdf" className="hidden" onChange={handleFileChange} />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Button asChild>Upload PDF</Button>
            </label>
          </>
        )}
      </CardHeader>
      <CardContent className="flex flex-1 items-start justify-center overflow-auto bg-muted/30 p-2">
        {/* Container to manage aspect ratio and scrolling if image is larger */}
        <div className="relative h-full w-full">
          <Image
            src={pdfData ? (typeof pdfData === 'string' ? pdfData : URL.createObjectURL(new Blob([pdfData], { type: 'application/pdf' }))) : imageUrl}
            alt={`${title} Placeholder`}
            width={800}
            height={1130} // Corrected height to maintain aspect ratio closer to 800
            className="object-contain w-auto h-auto max-w-full max-h-full shadow-md"
            data-ai-hint={imageHint}
            priority // Load placeholder quickly
          />
           {pdfData && typeof pdfData !== 'string' && (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              {/* This div could be used to display a PDF viewer component */}
              {/* For now, we're just displaying the image representation */}
              {/* In a real application, you'd use a library like react-pdf */}
              PDF content loaded. Displaying image representation.
            </div>
          )}
        </div>
      </CardContent>
      {/* Future: Add specific controls for editable PDF if needed */}
    </Card>
  );
}
function setPdfContent(result: string | ArrayBuffer) {
  throw new Error("Function not implemented.");
}

