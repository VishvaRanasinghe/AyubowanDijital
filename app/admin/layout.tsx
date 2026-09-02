import Link from "next/link";
import SignOutButton from "./sign-out-button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-ink">
      <header className="flex items-center justify-between border-b border-line px-6 py-4">
        <nav className="flex gap-6 text-sm">
          <Link href="/admin" className="font-semibold text-signalBright">
            Dashboard
          </Link>
          <Link href="/admin/projects" className="text-mist hover:text-white">
            Projects
          </Link>
          <Link href="/admin/reviews" className="text-mist hover:text-white">
            Reviews
          </Link>
          <Link href="/" className="text-mist hover:text-white">
            View site
          </Link>
        </nav>
        <SignOutButton />
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}
