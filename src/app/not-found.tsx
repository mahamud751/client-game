import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <p className="text-sm font-bold uppercase tracking-widest text-brand">
        404
      </p>
      <h1 className="mt-2 text-3xl font-black text-ink">Page not found</h1>
      <p className="mt-2 text-muted">
        That collectible may have sold out of our URL shelf.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-md bg-brand px-6 py-3 text-sm font-bold text-ink hover:bg-brand-dark"
      >
        Back to Home
      </Link>
    </div>
  );
}
