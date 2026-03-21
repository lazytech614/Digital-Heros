"use client";

import { useState, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangleIcon } from "lucide-react"; // warning icon

interface ConfirmationDialogProps {
  title: string;
  description: string;
  onConfirm: () => void;
  children: ReactNode; // Trigger element
  color?: string; // optional color (Tailwind color suffix, e.g., "blue", "green", "red")
}

export default function ConfirmationDialog({
  title,
  description,
  onConfirm,
  children,
  color = "red", // default to red
}: ConfirmationDialogProps) {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  const borderClass = `border-2 border-${color}-500`;
  const iconClass = `text-${color}-600`;
  const buttonClass = `bg-${color}-600 hover:bg-${color}-700 text-white font-semibold`;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className={`sm:max-w-lg ${borderClass} rounded-xl shadow-xl animate-pulse`}>
        <DialogHeader className="flex flex-col items-center text-center">
          <AlertTriangleIcon className={`${iconClass} w-12 h-12 mb-2`} />
          <DialogTitle className={`text-lg font-bold ${iconClass}`}>
            {title}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-700 mt-1">
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex justify-center space-x-4 mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            className={buttonClass}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}