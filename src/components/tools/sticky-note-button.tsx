"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StickyNote, Lightbulb, Loader2 } from "lucide-react";
import { suggestStickyNoteText, type SuggestStickyNoteTextInput } from "@/ai/flows/suggest-sticky-note-text";
import { useToast } from "@/hooks/use-toast";

type StickyNoteButtonProps = {
  onToolSelect: (tool: string) => void;
  isSelected: boolean;
};

export default function StickyNoteButton({ onToolSelect, isSelected }: StickyNoteButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [surroundingText, setSurroundingText] = useState(
    "The financial report indicates a 15% increase in Q3 revenue, primarily driven by new product launches. However, operational costs also saw a 10% rise."
  ); // Mock surrounding text
  const [suggestedText, setSuggestedText] = useState("");
  const [isLoadingSuggestion, setIsLoadingSuggestion] = useState(false);
  const { toast } = useToast();

  const handleSuggestText = async () => {
    if (!surroundingText.trim()) {
      toast({
        title: "Surrounding Text Required",
        description: "Please provide some surrounding text to generate a suggestion.",
        variant: "destructive",
      });
      return;
    }
    setIsLoadingSuggestion(true);
    setSuggestedText("");
    try {
      const input: SuggestStickyNoteTextInput = { surroundingText };
      const result = await suggestStickyNoteText(input);
      setSuggestedText(result.suggestedText);
      toast({
        title: "Suggestion Ready!",
        description: "AI has suggested text for your note.",
      });
    } catch (error) {
      console.error("Error suggesting text:", error);
      toast({
        title: "Suggestion Failed",
        description: "Could not generate a suggestion at this time.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingSuggestion(false);
    }
  };

  const handleToolClick = () => {
    onToolSelect("sticky-note");
    setIsDialogOpen(true);
  };
  
  // Effect to open dialog if tool is selected externally (e.g. via keyboard shortcut or general tool state)
  // For now, clicking the button directly opens the dialog
  // useEffect(() => {
  //   if (isSelected) {
  //     setIsDialogOpen(true);
  //   }
  // }, [isSelected]);


  return (
    <TooltipProvider>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={isSelected ? "secondary" : "ghost"}
              size="icon"
              onClick={handleToolClick}
              aria-label="Add Sticky Note"
            >
              <StickyNote className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Sticky Note</TooltipContent>
        </Tooltip>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Add Sticky Note</DialogTitle>
            <DialogDescription>
              Write your note below. You can also get an AI-powered suggestion based on the surrounding text.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="surrounding-text">Surrounding Text (for AI)</Label>
              <Textarea
                id="surrounding-text"
                value={surroundingText}
                onChange={(e) => setSurroundingText(e.target.value)}
                placeholder="Enter text from the PDF near where you're adding the note."
                rows={3}
              />
            </div>
            <Button onClick={handleSuggestText} disabled={isLoadingSuggestion} variant="outline">
              {isLoadingSuggestion ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Lightbulb className="mr-2 h-4 w-4" />
              )}
              Suggest Text
            </Button>
            {suggestedText && (
              <div className="grid gap-2 p-3 bg-accent/10 rounded-md border border-accent">
                <Label htmlFor="suggested-text" className="text-accent-foreground">AI Suggestion:</Label>
                <p id="suggested-text" className="text-sm text-accent-foreground/80">{suggestedText}</p>
                <Button variant="link" className="p-0 h-auto justify-start text-accent" onClick={() => setNoteText(suggestedText)}>Use this suggestion</Button>
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="note-text">Note</Label>
              <Textarea
                id="note-text"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Type your note here..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" onClick={() => {
              // Logic to save the note would go here
              toast({ title: "Note Saved (Mock)", description: "Your sticky note has been saved."});
              setIsDialogOpen(false);
              setNoteText(""); // Reset for next note
            }}>Save Note</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
