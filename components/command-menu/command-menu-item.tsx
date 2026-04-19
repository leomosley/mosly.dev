import { CommandItem } from "@/components/ui/command";

export function CommandMenuItem({
  icon,
  label,
  onSelect,
  kbd,
  badge,
  animationDelay = 0,
  disabled = false,
  className = "",
}: {
  icon: React.ReactNode;
  label: string;
  onSelect: () => void;
  kbd?: string;
  badge?: React.ReactNode;
  animationDelay?: number;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <CommandItem
      onSelect={onSelect}
      disabled={disabled}
      className={`group cursor-pointer gap-3 rounded-lg px-3 py-2.5 transition-colors data-[disabled=true]:opacity-50 ${className}`}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="text-muted-foreground group-data-[selected=true]:text-foreground transition-colors">
        {icon}
      </div>
      <span className="line-clamp-1 flex-1 text-sm">
        {label}
      </span>
      {kbd && (
        <kbd className="bg-muted border-border/60 text-muted-foreground rounded-md border px-1.5 py-0.5 font-mono text-[11px]">
          {kbd}
        </kbd>
      )}
      {badge}
    </CommandItem>
  );
}
