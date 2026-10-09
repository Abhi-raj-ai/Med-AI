type CaseStatus = "draft" | "processing" | "completed" | "failed";

interface CaseCardProps {
  patientName: string;
  status: CaseStatus;
}

export default function CaseCard({ patientName, status }: CaseCardProps) {
  const statusStyles = {
    draft: "bg-amber-50 text-amber-700",
    processing: "bg-blue-50 text-blue-700",
    completed: "bg-emerald-50 text-emerald-700",
    failed: "bg-red-50 text-red-700",
  };

  const statusLabels = {
    draft: "Draft",
    processing: "Processing",
    completed: "Completed",
    failed: "Failed",
  };

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-lg font-bold text-blue-600">
            {patientName.charAt(0)}
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">{patientName}</h3>

            <p className="mt-1 text-xs text-slate-400">Patient case</p>
          </div>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
        >
          {statusLabels[status]}
        </span>
      </div>

      <div className="my-5 border-t border-slate-100" />

      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-400">Case status</p>

          <p className="mt-1 text-sm font-medium text-slate-700">
            {statusLabels[status]}
          </p>
        </div>

        <button className="rounded-lg px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50">
          Open Case →
        </button>
      </div>
    </div>
  );
}
