"use client";

import { useState } from "react";

type CounterProps = {
  initialCount?: number;
  title: string;
};

type CaseStatus = "draft" | "processing" | "completed" | "failed";

let caseStatus: CaseStatus = "draft";

function CalculateToal(a: number, b: number): number {
  return a + b;
}

function formateCaseStatus(status: CaseStatus): string {
  return status;
}

interface PaitentCase {
  id: number;
  name: string;
  status: CaseStatus;
}

const Cases: PaitentCase[] = [
  {
    id: 1,
    name: "John Doe",
    status: "draft",
  },
  {
    id: 2,
    name: "Jane Smith",
    status: "completed",
  },
];

export default function Counter({ initialCount = 0, title }: CounterProps) {}
