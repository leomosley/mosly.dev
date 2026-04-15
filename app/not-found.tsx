import Link from "next/link";

export default function PageNotFound() {
  return (
    <div className="mx-auto flex h-[70vh] flex-col justify-center gap-2 text-center">
      <span className="text-3xl font-bold">404 | page not found</span>
      <Link
        className="mx-auto mt-2 underline decoration-neutral-500 underline-offset-4 transition hover:decoration-inherit"
        href="/"
      >
        Home →
      </Link>
    </div>
  );
}
