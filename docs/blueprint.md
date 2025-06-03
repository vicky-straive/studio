# **App Name**: Twilight

## Core Features:

- PDF Display: Display two PDFs side by side: an original and an editable version, with synchronized scrolling.
- Page Navigation: Enable page navigation with first, previous, current, next, and last page controls.
- Zoom & Pan: Implement zoom in/out functionality and a pan/hand tool for detailed PDF inspection.
- Annotation Tools: Offer annotation tools including pen/freehand drawing, signature insertion, image insertion, comments/sticky notes, text tool, and line/shape drawing on the editable PDF.
- Markup Tools: Add highlight/ink/markup tools for the PDF, each available from the toolbar.
- Export PDF: Enable download of the annotated PDF with all edits and annotations embedded.
- AI-Suggested Sticky Notes: When a sticky note annotation is created, suggest text to enter into the note based on the surrounding text. The LLM tool must analyze the surrounding area to determine the best possible text.

## Style Guidelines:

- Primary color: Deep blue (#3F51B5) for a professional and reliable feel.
- Background color: Light gray (#F0F2F5) to provide a clean and unobtrusive backdrop.
- Accent color: Orange (#FF9800) for interactive elements and highlights to draw attention.
- Font pairing: 'Inter' (sans-serif) for body text and headlines for a clean and modern look.
- Use a set of consistent and clear icons from a library like 'Lucide React' for toolbar actions and annotations.
- Employ a resizable split pane layout using 'react-split-pane' or a custom solution for side-by-side PDF comparison.
- Incorporate subtle transition animations for tool selections and panel resizing to enhance user experience.