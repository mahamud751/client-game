import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata = {
  title: "Account",
};

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-lg px-3 py-6 sm:px-5">
      <Breadcrumbs items={[{ label: "Sign In" }]} />
      <PageHeader
        title="Sign In / My Account"
        description="Sign in to track orders, manage pre-orders, and save favorites."
      />
      <form className="space-y-4 border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-ink">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-ink">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <button type="button" className="w-full rounded-sm bg-[#075aaa] py-2.5 text-sm font-black uppercase text-white hover:bg-[#064b8e]">
          Sign In
        </button>
        <button type="button" className="w-full rounded-sm border border-slate-300 py-2.5 text-sm font-bold text-[#183a5d] hover:bg-slate-50">
          Create Account
        </button>
        <p className="text-center text-xs text-muted">
          Demo account only.{" "}
          <Link href="/help" className="text-accent hover:underline">
            Need help?
          </Link>
        </p>
      </form>
    </div>
  );
}
