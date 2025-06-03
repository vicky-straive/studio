"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function AppHeader() {
  return (
    <header className="flex items-center justify-between p-4 border-b bg-card shadow-sm">
      <h1 className="text-2xl font-headline font-semibold text-primary">Twilight</h1>
      <Button variant="outline">
        <Download className="mr-2 h-4 w-4" />
        Export PDF
      </Button>
    </header>
  );
}
