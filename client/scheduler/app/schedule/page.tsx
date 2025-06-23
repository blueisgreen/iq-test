"use client";

import ScheduleForm from "./ScheduleForm";
import TaskList from "./TaskList";

export default function ScheduleEvent() {
  return (
    <div className="max-w-md mx-auto mt-16 p-8 border rounded shadow bg-white dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-6">Schedule an Event</h1>
      <ScheduleForm />
      <TaskList />
    </div>
  );
}
