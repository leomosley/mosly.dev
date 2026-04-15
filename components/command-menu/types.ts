export interface MenuItem {
  name: string;
  icon: React.ReactNode;
  kbd?: string;
}

export interface NavigationItem extends MenuItem {
  path: string;
}

export interface ExternalLinkItem extends MenuItem {
  href: string;
}

export interface CommandGroup {
  heading: string;
  animationDelay?: string;
}
