import Counter from "./Counter";
import { getCases } from "../lib/data";
import CaseCard from "./CaseCard";

export default async function Dashboard() {
  const cases = await getCases();

  return (
    <main className="flex flex-col gap-4 max-w-4xl">
      <div className="flex gap-4">
        {cases.map((patientCase) => (
          <CaseCard
            patientName={patientCase.patientName}
            status={patientCase.status}
            key={patientCase.id}
          />
        ))}
      </div>
    </main>
  );
}
