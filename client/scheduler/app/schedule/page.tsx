"use client";

import ScheduleForm from "./ScheduleForm";
import TaskList from "./TaskList";
import Link from "next/link"; // Add this import

export default function ScheduleEvent() {
  return (
    <div className="max-w-md mx-auto mt-16 p-8 border rounded shadow bg-white dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-6">Schedule an Event</h1>

      <div className="mt-8 text-center">
        <Link
          href="/report"
          className="text-blue-600 hover:underline font-medium">
          View Task Output Report
        </Link>
      </div>

      <ScheduleForm />
      <TaskList />
    </div>
  );
}
