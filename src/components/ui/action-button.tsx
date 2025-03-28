
import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActionButtonProps extends ButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  className?: string;
  showLabel?: boolean;
}

export const ActionButton = ({
  icon: Icon,
  label,
  onClick,
  className,
  showLabel = true,
  ...props
}: ActionButtonProps) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className={cn("gap-1.5", className)}
      {...props}
    >
      <Icon className="h-4 w-4" />
      {showLabel && <span>{label}</span>}
    </Button>
  );
};
