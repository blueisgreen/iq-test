"use client";

import { useState } from "react";

export default function ScheduleEvent() {
  const [taskType, setTaskType] = useState("A");
  const [interval, setInterval] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("http://localhost:8000/tasks/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: "u1",
          task_type: taskType,
          duration_ms: Number(interval),
        }),
      });
      if (res.ok) {
        setMessage("Event scheduled successfully!");
        setInterval("");
      } else {
        setMessage("Failed to schedule event.");
      }
    } catch {
      setMessage("Error connecting to backend.");
    }
    setLoading(false);
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-8 border rounded shadow bg-white dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-6">Schedule an Event</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          Task Type
          <select
            value={taskType}
            onChange={(e) => setTaskType(e.target.value)}
            className="border rounded px-2 py-1">
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </label>
        <label className="flex flex-col gap-1">
          Execution Interval (ms)
          <input
            type="number"
            min={1}
            required
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
            className="border rounded px-2 py-1"
            placeholder="e.g. 1000"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 disabled:opacity-50">
          {loading ? "Scheduling..." : "Schedule"}
        </button>
        {message && (
          <div className="mt-2 text-center text-sm text-gray-700 dark:text-gray-200">
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
