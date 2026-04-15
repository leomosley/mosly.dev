import { BackButton } from "@/components/back-button";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grow space-y-2">
      <BackButton />
      {children}
    </div>
  );
}
