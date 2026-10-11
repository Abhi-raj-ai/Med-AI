"use client";

import { useState } from "react";

type Complaint = {
  id: string;
  description: string;
  duration: string;
  causation: string;
  location: string;
  modeOfOnset: string;
  progress: string;
  treatmentResult: string;
};

type ComplaintField = Exclude<keyof Complaint, "id">;

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const textareaClass =
  "min-h-24 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

function createEmptyComplaint(id: string): Complaint {
  return {
    id,
    description: "",
    duration: "",
    causation: "",
    location: "",
    modeOfOnset: "",
    progress: "",
    treatmentResult: "",
  };
}

export default function NewCasePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [complaints, setComplaints] = useState<Complaint[]>(() => [
    createEmptyComplaint("initial-complaint"),
  ]);

  function addComplaint() {
    setComplaints((prevComplaints) => [
      ...prevComplaints,
      createEmptyComplaint(crypto.randomUUID()),
    ]);
  }

  function removeComplaint(id: string) {
    setComplaints((prevComplaints) =>
      prevComplaints.filter((complaint) => complaint.id !== id),
    );
  }

  function updateComplaint(id: string, field: ComplaintField, value: string) {
    setComplaints((prevComplaints) =>
      prevComplaints.map((complaint) =>
        complaint.id === id ? { ...complaint, [field]: value } : complaint,
      ),
    );
  }

  console.log("Current Step:", currentStep);
  return (
    <main className="min-h-screen px-6 py-8 md:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="text-sm font-medium text-blue-600">
            Patient Management
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            New Patient Case
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Create a new patient case by filling out the form below.
          </p>
        </div>
        {currentStep === 1 ? (
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-6 border-b border-slate-100 pb-5">
              <h2 className="text-xl font-semibold text-slate-900">
                Patient Information
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Enter the patient's registration and personal details.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="patient-ref"
                  className="text-sm font-medium text-slate-700"
                >
                  Registration Number
                </label>
                <input
                  type="text"
                  id="patient-ref"
                  name="patient-ref"
                  placeholder="Enter registration number"
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="patient-name"
                  className="text-sm font-medium text-slate-700"
                >
                  Patient Name
                </label>
                <input
                  type="text"
                  id="patient-name"
                  name="patient-name"
                  placeholder="Enter patient name"
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="patient-age"
                  className="text-sm font-medium text-slate-700"
                >
                  Age
                </label>
                <input
                  type="number"
                  id="patient-age"
                  name="patient-age"
                  min="0"
                  placeholder="Enter age"
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="patient-religion"
                  className="text-sm font-medium text-slate-700"
                >
                  Religion
                </label>
                <input
                  type="text"
                  id="patient-religion"
                  name="patient-religion"
                  placeholder="Enter religion (optional)"
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="patient-nationality"
                  className="text-sm font-medium text-slate-700"
                >
                  Nationality
                </label>
                <input
                  type="text"
                  id="patient-nationality"
                  name="patient-nationality"
                  placeholder="Enter nationality"
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="patient-sex"
                  className="text-sm font-medium text-slate-700"
                >
                  Sex
                </label>
                <select
                  id="patient-sex"
                  name="patient-sex"
                  defaultValue=""
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select sex
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="not-specified">Prefer not to say</option>
                </select>
              </div>

              <div className="flex flex-col gap-2 sm:col-span-2">
                <label
                  htmlFor="patient-address"
                  className="text-sm font-medium text-slate-700"
                >
                  Address
                </label>
                <textarea
                  id="patient-address"
                  name="patient-address"
                  rows={3}
                  placeholder="Enter patient address"
                  className={textareaClass}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="date-of-admission"
                  className="text-sm font-medium text-slate-700"
                >
                  Date of Admission
                </label>
                <input
                  type="date"
                  id="date-of-admission"
                  name="date-of-admission"
                  className={inputClass}
                />
              </div>
            </div>
          </section>
        ) : currentStep === 2 ? (
          <div className="space-y-6">
            {complaints.map((complaint, index) => (
              <section
                key={complaint.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
              >
                <div className="mb-6 flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">
                      Complaint {index + 1}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Record this complaint and its individual history.
                    </p>
                  </div>

                  {complaints.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeComplaint(complaint.id)}
                      className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <label
                      htmlFor={`${complaint.id}-description`}
                      className="text-sm font-medium text-slate-700"
                    >
                      Present Complaint
                    </label>
                    <textarea
                      id={`${complaint.id}-description`}
                      name={`${complaint.id}-description`}
                      rows={3}
                      value={complaint.description}
                      onChange={(event) =>
                        updateComplaint(
                          complaint.id,
                          "description",
                          event.target.value,
                        )
                      }
                      placeholder="Describe the patient's complaint..."
                      className={textareaClass}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor={`${complaint.id}-duration`}
                      className="text-sm font-medium text-slate-700"
                    >
                      Duration
                    </label>
                    <input
                      type="text"
                      id={`${complaint.id}-duration`}
                      name={`${complaint.id}-duration`}
                      value={complaint.duration}
                      onChange={(event) =>
                        updateComplaint(
                          complaint.id,
                          "duration",
                          event.target.value,
                        )
                      }
                      placeholder="e.g. 3 days, 2 months"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="mb-6 mt-8 border-b border-slate-100 pb-5">
                  <h3 className="text-lg font-semibold text-slate-900">
                    History of Complaint {index + 1}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Describe how this particular complaint started and
                    progressed.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor={`${complaint.id}-causation`}
                      className="text-sm font-medium text-slate-700"
                    >
                      Causation
                    </label>
                    <textarea
                      id={`${complaint.id}-causation`}
                      name={`${complaint.id}-causation`}
                      value={complaint.causation}
                      onChange={(event) =>
                        updateComplaint(
                          complaint.id,
                          "causation",
                          event.target.value,
                        )
                      }
                      placeholder="Suspected cause or triggering event..."
                      className={textareaClass}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor={`${complaint.id}-location`}
                      className="text-sm font-medium text-slate-700"
                    >
                      Location
                    </label>
                    <textarea
                      id={`${complaint.id}-location`}
                      name={`${complaint.id}-location`}
                      value={complaint.location}
                      onChange={(event) =>
                        updateComplaint(
                          complaint.id,
                          "location",
                          event.target.value,
                        )
                      }
                      placeholder="Where is the complaint felt?"
                      className={textareaClass}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor={`${complaint.id}-onset`}
                      className="text-sm font-medium text-slate-700"
                    >
                      Mode of Onset
                    </label>
                    <textarea
                      id={`${complaint.id}-onset`}
                      name={`${complaint.id}-onset`}
                      value={complaint.modeOfOnset}
                      onChange={(event) =>
                        updateComplaint(
                          complaint.id,
                          "modeOfOnset",
                          event.target.value,
                        )
                      }
                      placeholder="Sudden or gradual onset..."
                      className={textareaClass}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor={`${complaint.id}-progress`}
                      className="text-sm font-medium text-slate-700"
                    >
                      Progress
                    </label>
                    <textarea
                      id={`${complaint.id}-progress`}
                      name={`${complaint.id}-progress`}
                      value={complaint.progress}
                      onChange={(event) =>
                        updateComplaint(
                          complaint.id,
                          "progress",
                          event.target.value,
                        )
                      }
                      placeholder="How has it changed over time?"
                      className={textareaClass}
                    />
                  </div>

                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <label
                      htmlFor={`${complaint.id}-treatment`}
                      className="text-sm font-medium text-slate-700"
                    >
                      Treatment Taken and Result
                    </label>
                    <textarea
                      id={`${complaint.id}-treatment`}
                      name={`${complaint.id}-treatment`}
                      value={complaint.treatmentResult}
                      onChange={(event) =>
                        updateComplaint(
                          complaint.id,
                          "treatmentResult",
                          event.target.value,
                        )
                      }
                      placeholder="Previous treatment and its result..."
                      className={textareaClass}
                    />
                  </div>
                </div>
              </section>
            ))}

            <button
              type="button"
              onClick={addComplaint}
              className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
            >
              + Add Complaint
            </button>
          </div>
        ) : currentStep === 3 ? (
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="mb-6 border-b border-slate-100 pb-5">
                <h2 className="text-xl font-semibold text-slate-900">
                  General Past History
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Record previous illnesses and events in chronological order,
                  including treatment and after-effects.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  "Whooping cough",
                  "Measles",
                  "Chickenpox",
                  "Mumps",
                  "Diphtheria",
                  "Tonsillitis",
                  "Pneumonia",
                  "Koch's bronchitis / TB history",
                  "Malaria",
                  "Rheumatic fever",
                  "Sexually transmitted infection",
                  "Typhoid",
                  "Jaundice",
                  "Eczema",
                  "Scabies",
                  "Pyoderma",
                  "Ringworm",
                  "Other skin disease",
                  "Operations / surgery",
                  "Anaesthesia",
                  "Injury",
                  "Insect or animal bite",
                  "Chemical exposure",
                  "Drug or substance exposure",
                  "Other past illness or event",
                ].map((condition) => (
                  <label
                    key={condition}
                    className="flex items-start gap-3 rounded-lg border border-slate-100 p-3 text-sm text-slate-700 transition hover:bg-slate-50"
                  >
                    <input
                      type="checkbox"
                      name="general-past-conditions"
                      value={condition}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>{condition}</span>
                  </label>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-2">
                <label
                  htmlFor="general-past-history-details"
                  className="text-sm font-medium text-slate-700"
                >
                  Additional Details
                </label>
                <textarea
                  id="general-past-history-details"
                  name="general-past-history-details"
                  rows={4}
                  placeholder="For each relevant illness or event, record approximate date/age, treatment received, outcome and any after-effects..."
                  className="min-h-32 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="mb-6 border-b border-slate-100 pb-5">
                <h2 className="text-xl font-semibold text-slate-900">
                  Vaccination History
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Record vaccines received, available dates and any reported
                  adverse events following vaccination.
                </p>
              </div>

              <div className="mb-6">
                <p className="mb-3 text-sm font-medium text-slate-700">
                  Vaccination Status
                </p>
                <div className="flex flex-wrap gap-4">
                  {["Complete as reported", "Incomplete", "Unknown"].map(
                    (status) => (
                      <label
                        key={status}
                        className="flex items-center gap-2 text-sm text-slate-700"
                      >
                        <input
                          type="radio"
                          name="vaccination-status"
                          value={status}
                          className="h-4 w-4 border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        {status}
                      </label>
                    ),
                  )}
                </div>
              </div>

              <h3 className="mb-4 text-lg font-semibold text-slate-800">
                Vaccines Received
              </h3>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  "BCG",
                  "Polio (OPV / IPV)",
                  "Hepatitis B",
                  "DPT / Pentavalent",
                  "Rotavirus",
                  "Pneumococcal (PCV)",
                  "Measles-Rubella (MR)",
                  "Japanese Encephalitis (where applicable)",
                  "Td / Tetanus",
                  "HPV",
                  "Influenza",
                  "COVID-19",
                  "Other vaccine",
                ].map((vaccine) => (
                  <label
                    key={vaccine}
                    className="flex items-start gap-3 rounded-lg border border-slate-100 p-3 text-sm text-slate-700 transition hover:bg-slate-50"
                  >
                    <input
                      type="checkbox"
                      name="vaccines-received"
                      value={vaccine}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>{vaccine}</span>
                  </label>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-2">
                <label
                  htmlFor="vaccination-adverse-effects"
                  className="text-sm font-medium text-slate-700"
                >
                  Reported Adverse Effects
                </label>
                <textarea
                  id="vaccination-adverse-effects"
                  name="vaccination-adverse-effects"
                  rows={3}
                  placeholder="An event occurring after vaccination does not by itself establish that the vaccine caused it."
                  className="min-h-24 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="mt-5 flex flex-col gap-2">
                <label
                  htmlFor="vaccination-notes"
                  className="text-sm font-medium text-slate-700"
                >
                  Additional Notes
                </label>
                <textarea
                  id="vaccination-notes"
                  name="vaccination-notes"
                  rows={3}
                  placeholder="Add other vaccine details, dates, dose information or missing records..."
                  className="min-h-24 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="mb-6 border-b border-slate-100 pb-5">
                <h2 className="text-xl font-semibold text-slate-900">
                  Family History
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Select relevant conditions for each side of the family and add
                  any additional details.
                </p>
              </div>

              {[
                {
                  title: "Paternal Family History",
                  name: "paternal",
                },
                {
                  title: "Maternal Family History",
                  name: "maternal",
                },
                {
                  title: "Own Family History",
                  name: "own",
                },
              ].map((family) => (
                <div
                  key={family.name}
                  className="mb-8 rounded-xl border border-slate-200 p-5 last:mb-0"
                >
                  <h3 className="mb-4 text-lg font-semibold text-slate-800">
                    {family.title}
                  </h3>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                      "Bronchial asthma",
                      "Neurofibroma",
                      "Tuberculosis (TB)",
                      "Cancer",
                      "Gout",
                      "Rheumatism",
                      "Tumour",
                      "Warts",
                      "Cardiac disease",
                      "Diabetes",
                      "Hypertension",
                      "Venereal disease (V.D.)",
                      "Cirrhosis of liver",
                      "Piles",
                      "Fistula",
                      "Suicidal tendencies",
                      "Susceptibility to cold",
                      "Allergic tendencies",
                      "Psychiatric problems",
                      "Skin diseases",
                      "Other conditions",
                    ].map((condition) => (
                      <label
                        key={condition}
                        className="flex items-start gap-3 rounded-lg border border-slate-100 p-3 text-sm text-slate-700 transition hover:bg-slate-50"
                      >
                        <input
                          type="checkbox"
                          name={`${family.name}-conditions`}
                          value={condition}
                          className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span>{condition}</span>
                      </label>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-col gap-2">
                    <label
                      htmlFor={`${family.name}-family-details`}
                      className="text-sm font-medium text-slate-700"
                    >
                      Additional Details
                    </label>
                    <textarea
                      id={`${family.name}-family-details`}
                      name={`${family.name}-family-details`}
                      rows={3}
                      placeholder="Mention the affected family member and any relevant details..."
                      className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : currentStep === 4 ? (
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                PERSONAL HISTORY
              </h2>
            </div>
            {/* Addictions Section */}
            <div className="mt-6 flex flex-col gap-2">
              <label
                htmlFor="addictions"
                className="text-sm font-semibold text-slate-700"
              >
                Addictions
              </label>
              <textarea
                id="addictions"
                name="addictions"
                rows={4}
                placeholder="List any known addictions, including substance abuse or behavioral dependencies."
                className="min-h-32 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Accommodation Section */}
            <div className="mt-6 flex flex-col gap-2">
              <span className="text-sm font-semibold text-slate-700">
                Accommodation type
              </span>

              <div className="flex flex-wrap gap-4">
                <label
                  htmlFor="urban-house"
                  className="flex cursor-pointer items-center gap-2 text-sm text-slate-700"
                >
                  <input
                    type="checkbox"
                    id="urban-house"
                    name="accommodationType"
                    value="urban"
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                  Urban house
                </label>

                <label
                  htmlFor="rural-house"
                  className="flex cursor-pointer items-center gap-2 text-sm text-slate-700"
                >
                  <input
                    type="checkbox"
                    id="rural-house"
                    name="accommodationType"
                    value="rural"
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                  Rural house
                </label>
              </div>
            </div>

            {/*Diet and Nutrition Section */}
            <div className="mt-6 flex flex-col gap-2">
              <span className="text-sm font-semibold text-slate-700">
                Diet and Nutrition
              </span>

              <div className="flex flex-wrap gap-4">
                <label
                  htmlFor="vegetarian"
                  className="flex cursor-pointer items-center gap-2 text-sm text-slate-700"
                >
                  <input
                    type="checkbox"
                    id="vegetarian"
                    name="dietaryPreference"
                    value="vegetarian"
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                  Vegetarian
                </label>

                <label
                  htmlFor="non-vegetarian"
                  className="flex cursor-pointer items-center gap-2 text-sm text-slate-700"
                >
                  <input
                    type="checkbox"
                    id="non-vegetarian"
                    name="dietaryPreference"
                    value="non-vegetarian"
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                  Non-Vegetarian
                </label>

                <label
                  htmlFor="mixed-diet"
                  className="flex cursor-pointer items-center gap-2 text-sm text-slate-700"
                >
                  <input
                    type="checkbox"
                    id="mixed-diet"
                    name="dietaryPreference"
                    value="mixed-diet"
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                  Mixed Diet
                </label>
              </div>

              {/* Occupation */}
              <div className="mt-6 flex flex-col gap-2">
                <label
                  htmlFor="occupation"
                  className="text-sm font-semibold text-slate-700"
                >
                  Occupation
                </label>
                <input
                  type="text"
                  id="occupation"
                  name="occupation"
                  placeholder="Enter your occupation"
                  className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
            {/* Marriage Status */}
            <div className="mt-6 flex flex-col gap-2">
              <span className="text-sm font-semibold text-slate-700">
                Marriage status
              </span>

              <div className="flex flex-wrap gap-4">
                <label
                  htmlFor="married"
                  className="flex cursor-pointer items-center gap-2 text-sm text-slate-700"
                >
                  <input
                    type="radio"
                    id="married"
                    name="maritalStatus"
                    value="married"
                    className="h-4 w-4 border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                  Married
                </label>

                <label
                  htmlFor="unmarried"
                  className="flex cursor-pointer items-center gap-2 text-sm text-slate-700"
                >
                  <input
                    type="radio"
                    id="unmarried"
                    name="maritalStatus"
                    value="unmarried"
                    className="h-4 w-4 border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                  Unmarried
                </label>
              </div>
            </div>

            {/* Socio-economic Status */}
            <div className="mt-6 flex flex-col gap-2">
              <span className="text-sm font-semibold text-slate-700">
                Socio-economic status
              </span>

              <div className="flex flex-wrap gap-4">
                <label
                  htmlFor="economic-good"
                  className="flex cursor-pointer items-center gap-2 text-sm text-slate-700"
                >
                  <input
                    type="radio"
                    id="economic-good"
                    name="economicStatus"
                    value="good"
                    className="h-4 w-4 border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                  Good
                </label>

                <label
                  htmlFor="occupation-relation-bad"
                  className="flex cursor-pointer items-center gap-2 text-sm text-slate-700"
                >
                  <input
                    type="radio"
                    id="occupation-relation-bad"
                    name="occupationRelation"
                    value="bad"
                    className="h-4 w-4 border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                  Bad
                </label>
              </div>
            </div>

            {/* Socio-economic Status */}
            <div className="mt-6 flex flex-col gap-2">
              <span className="text-sm font-semibold text-slate-700">
                Socio-economic status
              </span>

              <div className="flex flex-wrap gap-4">
                <label
                  htmlFor="economic-good"
                  className="flex cursor-pointer items-center gap-2 text-sm text-slate-700"
                >
                  <input
                    type="radio"
                    id="economic-good"
                    name="economicStatus"
                    value="good"
                    className="h-4 w-4 border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                  Good
                </label>

                <label
                  htmlFor="economic-bad"
                  className="flex cursor-pointer items-center gap-2 text-sm text-slate-700"
                >
                  <input
                    type="radio"
                    id="economic-bad"
                    name="economicStatus"
                    value="bad"
                    className="h-4 w-4 border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                  Bad
                </label>
              </div>
            </div>

            {/* Relation with Family Members */}
            <div className="mt-6 flex flex-col gap-2">
              <span className="text-sm font-semibold text-slate-700">
                Relation with family members
              </span>

              <div className="flex flex-wrap gap-4">
                <label
                  htmlFor="family-good"
                  className="flex cursor-pointer items-center gap-2 text-sm text-slate-700"
                >
                  <input
                    type="radio"
                    id="family-good"
                    name="familyRelation"
                    value="good"
                    className="h-4 w-4 border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                  Good
                </label>

                <label
                  htmlFor="family-bad"
                  className="flex cursor-pointer items-center gap-2 text-sm text-slate-700"
                >
                  <input
                    type="radio"
                    id="family-bad"
                    name="familyRelation"
                    value="bad"
                    className="h-4 w-4 border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                  Bad
                </label>
              </div>
            </div>

            {/* Sexual History */}
            <div className="mt-6 flex flex-col gap-2">
              <label
                htmlFor="sexual-history"
                className="text-sm font-semibold text-slate-700"
              >
                Sexual history
              </label>
              <textarea
                id="sexual-history"
                name="sexualHistory"
                rows={4}
                placeholder="Describe any relevant sexual history."
                className="min-h-32 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Sterilisation / Contraception */}
            <div className="mt-6 flex flex-col gap-2">
              <label
                htmlFor="contraception"
                className="text-sm font-semibold text-slate-700"
              >
                Sterilisation / Contraception
              </label>
              <textarea
                id="contraception"
                name="contraception"
                rows={4}
                placeholder="Mention any sterilisation or contraception methods used."
                className="min-h-32 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Obstetrical History */}
            <div className="mt-6 flex flex-col gap-2">
              <label
                htmlFor="obstetrical-history"
                className="text-sm font-semibold text-slate-700"
              >
                Obstetrical history
              </label>
              <textarea
                id="obstetrical-history"
                name="obstetricalHistory"
                rows={4}
                placeholder="Describe pregnancies, deliveries, and any complications."
                className="min-h-32 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Regular Medicines */}
            <div className="mt-6 flex flex-col gap-2">
              <label
                htmlFor="regular-medicines"
                className="text-sm font-semibold text-slate-700"
              >
                Medicine(s) taken regularly
              </label>
              <textarea
                id="regular-medicines"
                name="regularMedicines"
                rows={4}
                placeholder="List each medicine and how long it has been taken."
                className="min-h-32 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </section>
        ) : currentStep === 5 ? (
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                PHYSICAL GENERALS
              </h2>
            </div>
            {/* Appearance */}
            <div className="mt-6 flex flex-col gap-2">
              <label
                htmlFor="appearance"
                className="text-sm font-semibold text-slate-700"
              >
                Appearance
              </label>
              <textarea
                id="appearance"
                name="appearance"
                rows={2}
                placeholder="Describe the patient's general appearance and any notable physical characteristics."
                className="min-h-16 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Appetite */}
            <div className="mt-6 flex flex-col gap-2">
              <label
                htmlFor="appetite"
                className="text-sm font-semibold text-slate-700"
              >
                Appetite
              </label>
              <textarea
                id="appetite"
                name="appetite"
                rows={2}
                placeholder="Describe the patient's appetite and any changes in eating patterns."
                className="min-h-16 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Thirst */}
            <div className="mt-6 flex flex-col gap-2">
              <label
                htmlFor="thirst"
                className="text-sm font-semibold text-slate-700"
              >
                Thirst
              </label>
              <textarea
                id="thirst"
                name="thirst"
                rows={2}
                placeholder="Describe the patient's thirst and any changes in fluid intake."
                className="min-h-16 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Desire */}
            <div className="mt-6 flex flex-col gap-2">
              <label
                htmlFor="desire"
                className="text-sm font-semibold text-slate-700"
              >
                Desire
              </label>
              <textarea
                id="desire"
                name="desire"
                rows={2}
                placeholder="Describe the patient's desire."
                className="min-h-16 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Aversion */}
            <div className="mt-6 flex flex-col gap-2">
              <label
                htmlFor="aversion"
                className="text-sm font-semibold text-slate-700"
              >
                Aversion
              </label>
              <textarea
                id="aversion"
                name="aversion"
                rows={2}
                placeholder="Describe the patient's aversion."
                className="min-h-16 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Intolerance */}
            <div className="mt-6 flex flex-col gap-2">
              <label
                htmlFor="intolerance"
                className="text-sm font-semibold text-slate-700"
              >
                Intolerance
              </label>
              <textarea
                id="intolerance"
                name="intolerance"
                rows={2}
                placeholder="Describe the patient's intolerance."
                className="min-h-16 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Taste of Mouth */}
            <div className="mt-6 flex flex-col gap-2">
              <label
                htmlFor="taste"
                className="text-sm font-semibold text-slate-700"
              >
                Taste of Mouth
              </label>
              <textarea
                id="taste"
                name="taste"
                rows={2}
                placeholder="Describe the patient's taste preferences."
                className="min-h-16 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Tongue */}
            <div className="mt-6 flex flex-col gap-2">
              <label
                htmlFor="tongue"
                className="text-sm font-semibold text-slate-700"
              >
                Tongue
              </label>
              <textarea
                id="tongue"
                name="tongue"
                rows={2}
                placeholder="Describe the patient's tongue condition."
                className="min-h-16 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Stool */}
            <div className="mt-6 flex flex-col gap-2">
              <label
                htmlFor="stool"
                className="text-sm font-semibold text-slate-700"
              >
                Stool
              </label>
              <textarea
                id="stool"
                name="stool"
                rows={2}
                placeholder="Describe the patient's stool condition."
                className="min-h-16 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Urine */}
            <div className="mt-6 flex flex-col gap-2">
              <label
                htmlFor="urine"
                className="text-sm font-semibold text-slate-700"
              >
                Urine
              </label>
              <textarea
                id="urine"
                name="urine"
                rows={2}
                placeholder="Describe the patient's urine condition."
                className="min-h-16 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Pespiration */}
            <div className="mt-6 flex flex-col gap-2">
              <label
                htmlFor="pespiration"
                className="text-sm font-semibold text-slate-700"
              >
                Pespiration
              </label>
              <textarea
                id="pespiration"
                name="pespiration"
                rows={2}
                placeholder="Describe the patient's pespiration."
                className="min-h-16 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Sleep and Dreams */}
            <div className="mt-6 flex flex-col gap-2">
              <label
                htmlFor="sleep and dreams"
                className="text-sm font-semibold text-slate-700"
              >
                Sleep and Dreams
              </label>
              <textarea
                id="sleep and dreams"
                name="sleep and dreams"
                rows={2}
                placeholder="Describe the patient's sleep and dreams."
                className="min-h-16 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Thermal Reaction */}
            <div className="mt-6 flex flex-col gap-2">
              <label
                htmlFor="thermal rx"
                className="text-sm font-semibold text-slate-700"
              >
                Thermal Reaction
              </label>
              <textarea
                id="thermal rx"
                name="thermal rx"
                rows={2}
                placeholder="Describe the patient's thermal reaction."
                className="min-h-16 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Other's */}
            <div className="mt-6 flex flex-col gap-2">
              <label
                htmlFor="other's "
                className="text-sm font-semibold text-slate-700"
              >
                Others
              </label>
              <textarea
                id="other's"
                name="other's"
                rows={2}
                placeholder="Describe the patient's thermal reaction."
                className="min-h-16 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </section>
        ) : currentStep === 6 ? (
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                MENTAL GENERALS
              </h2>
            </div>

            {/* ANXIETY */}
            <div className="mt-6 flex flex-col gap-2">
              <label
                htmlFor="anxiety"
                className="text-sm font-semibold text-slate-700"
              >
                Anxiety
              </label>
              <textarea
                id="anxiety"
                name="anxiety"
                rows={2}
                placeholder="Describe the patient's anxiety."
                className="min-h-16 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* FEAR */}
            <div className="mt-6 flex flex-col gap-2">
              <label
                htmlFor="fear"
                className="text-sm font-semibold text-slate-700"
              >
                FEAR
              </label>
              <textarea
                id="fear"
                name="fear"
                rows={2}
                placeholder="Describe about the patient's fear."
                className="min-h-16 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* ANGER */}
            <div className="mt-6 flex flex-col gap-2">
              <label
                htmlFor="anger"
                className="text-sm font-semibold text-slate-700"
              >
                Anger
              </label>
              <textarea
                id="anger"
                name="anger"
                rows={2}
                placeholder="Describe about the patient's anger."
                className="min-h-16 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* MEMORY */}
            <div className="mt-6 flex flex-col gap-2">
              <label
                htmlFor="memory"
                className="text-sm font-semibold text-slate-700"
              >
                Memory
              </label>
              <textarea
                id="memory"
                name="memory"
                rows={2}
                placeholder="Describe about the patient's memory."
                className="min-h-16 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* COMPANY */}
            <div className="mt-6 flex flex-col gap-2">
              <label
                htmlFor="company"
                className="text-sm font-semibold text-slate-700"
              >
                company
              </label>
              <textarea
                id="company"
                name="company"
                rows={2}
                placeholder="Describe is patient's wants company of people or not."
                className="min-h-16 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* OTHER */}
            <div className="mt-6 flex flex-col gap-2">
              <label
                htmlFor="other"
                className="text-sm font-semibold text-slate-700"
              >
                Other
              </label>
              <textarea
                id="other"
                name="other"
                rows={2}
                placeholder="Describe is patient's other mental symptoms here."
                className="min-h-16 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </section>
        ) : null}

        <div className="mt-8 flex justify-between border-t border-slate-100 pt-6">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              ← Back
            </button>
          ) : (
            <div />
          )}

          {currentStep < 6 && (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep + 1)}
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
