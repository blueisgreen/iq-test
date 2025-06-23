"use client";

import TaskOutputTable from "./TaskOutputTable";
import Link from "next/link";

export default function ReviewHistory() {
  return (
    <div className="max-w-md mx-auto mt-16 p-8 border rounded shadow bg-white dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-6">History of Tasks</h1>
      <div className="mt-8 text-center">
        <Link
          href="/schedule"
          className="text-blue-600 hover:underline font-medium">
          Back to Schedule
        </Link>
      </div>
      <TaskOutputTable />
    </div>
  );
}
