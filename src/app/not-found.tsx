import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl space-y-5 px-6 py-24 text-center">
      <p className="text-cyan-400">404</p>
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="text-slate-300">The page you requested doesn&apos;t exist.</p>
      <Link href="/" className="inline-block rounded-lg bg-cyan-500 px-5 py-3 font-semibold text-black">Back to home</Link>
    </div>
  );
}
