import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata = {
  title: "Account",
};

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: "Account" }]} />
      <PageHeader
        title="My Account"
        description="Sign in to track orders, manage pre-orders, and save favorites. (Demo UI)"
      />
      <form className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-ink"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-ink"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
          />
        </div>
        <button
          type="button"
          className="w-full rounded-md bg-brand py-2.5 text-sm font-bold text-ink hover:bg-brand-dark"
        >
          Sign In (Demo)
        </button>
        <p className="text-center text-xs text-muted">
          No backend auth in this demo.{" "}
          <Link href="/help" className="text-accent hover:underline">
            Need help?
          </Link>
        </p>
      </form>
    </div>
  );
}
