import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white px-5 py-6 md:flex">
      {/* Logo */}
      <div className="mb-10 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
          M
        </div>

        <div>
          <h1 className="text-lg font-bold">Med AI</h1>
          <p className="text-xs text-slate-400">Clinical Workspace</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-2">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700"
        >
          <span>▦</span>
          Dashboard
        </Link>

        <Link
          href="/dashboard/cases"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-600 transition hover:bg-slate-100"
        >
          <span>◉</span>
          My Cases
        </Link>

        <Link
          href="/dashboard/repertories"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-600 transition hover:bg-slate-100"
        >
          <span>▤</span>
          Repertories
        </Link>

        <Link
          href="/dashboard/materia-medica"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-600 transition hover:bg-slate-100"
        >
          <span>▥</span>
          Materia Medica
        </Link>

        <Link
          href="/dashboard/analysis"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-600 transition hover:bg-slate-100"
        >
          <span>✦</span>
          AI Analysis
        </Link>
      </nav>

      {/* Bottom navigation */}
      <div className="border-t border-slate-100 pt-4">
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-600 transition hover:bg-slate-100"
        >
          <span>⚙</span>
          Settings
        </Link>

        <div className="mt-4 rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-semibold text-slate-700">
            Private Workspace
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-400">
            Your cases and uploaded materials remain isolated to your workspace.
          </p>
        </div>
      </div>
    </aside>
  );
}
