import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Captions,
  Clock3,
  Dna,
  FileText,
  Gauge,
  Layers,
  Megaphone,
  Music,
  Scale,
  Search,
  SearchX,
  Sparkles,
  Timer,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  search: Search,
  "search-x": SearchX,
  clock: Clock3,
  layers: Layers,
  dna: Dna,
  scale: Scale,
  "file-text": FileText,
  gauge: Gauge,
  captions: Captions,
  sparkles: Sparkles,
  music: Music,
  timer: Timer,
  activity: Activity,
  megaphone: Megaphone,
};

export function iconFor(name: string): LucideIcon {
  return iconMap[name] ?? Search;
}

