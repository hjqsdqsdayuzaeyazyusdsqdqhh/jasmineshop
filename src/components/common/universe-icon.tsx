import {
  CookingPot,
  Gift,
  Lamp,
  Sofa,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const universeIcons: Record<string, LucideIcon> = {
  cuisine: CookingPot,
  decoration: Lamp,
  maison: Sofa,
  cadeaux: Gift,
};

export function UniverseIcon({
  id,
  className,
  size = 20,
}: {
  id: string;
  className?: string;
  size?: number;
}) {
  const Icon = universeIcons[id] ?? Sparkles;

  return (
    <Icon
      size={size}
      strokeWidth={1.45}
      className={cn(className)}
      aria-hidden="true"
    />
  );
}
