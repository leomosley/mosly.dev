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
      className={`group data-[selected=true]:bg-accent/10 data-[selected=true]:text-foreground my-1 cursor-pointer gap-3 rounded-lg px-3 py-3 transition-all hover:scale-[1.02] data-[disabled=true]:opacity-50 ${className}`}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="text-muted-foreground group-data-[selected=true]:text-accent relative transition-colors group-data-[selected=true]:scale-110">
        {icon}
      </div>
      <span className="line-clamp-1 flex-1 font-sans text-sm tracking-tight">
        {label}
      </span>
      {kbd && (
        <kbd className="bg-muted/50 border-border/50 text-muted-foreground rounded border px-2 py-1 font-mono text-[10px] tracking-widest">
          {kbd}
        </kbd>
      )}
      {badge}
    </CommandItem>
  );
}
