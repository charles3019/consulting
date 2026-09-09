"use client";

export default function ErrorPage({ retry }: { retry: () => void }) {
  return (
    <div role="alert" className="mx-auto max-w-xl space-y-5 px-6 py-24 text-center">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="text-slate-300">We couldn&apos;t complete this request. Please try again.</p>
      <button onClick={retry} className="rounded-lg bg-cyan-500 px-5 py-3 font-semibold text-black">Try again</button>
    </div>
  );
}
