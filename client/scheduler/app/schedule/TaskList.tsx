"use client";

import { useEffect, useState } from "react";

type Task = {
  id: string;
  task_type: string;
  duration_ms: number;
  status: string;
};

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [cancelStatus, setCancelStatus] = useState<string>("");

  async function fetchTasks() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:8000/tasks/active");
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      setError("Could not load tasks.");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  async function handleCancel() {
    if (!selectedTaskId) return;
    setCancelStatus("Cancelling...");
    try {
      const res = await fetch(`http://localhost:8000/tasks/${selectedTaskId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setTasks(tasks.filter((t) => t.id !== selectedTaskId));
        setCancelStatus("Task cancelled.");
        setSelectedTaskId(null);
      } else {
        setCancelStatus("Failed to cancel task.");
      }
    } catch {
      setCancelStatus("Error connecting to backend.");
    }
    setTimeout(() => setCancelStatus(""), 2000);
  }

  if (loading)
    return (
      <div className="my-12 p-4 border border-yellow-300">Loading tasks...</div>
    );
  if (error)
    return (
      <div className="my-12">
        <div className="text-red-600">{error}</div>
        <button
          className="bg-gray-500 text-white rounded my-2 px-3 py-1 hover:bg-green-700 disabled:opacity-50"
          onClick={fetchTasks}
          disabled={loading}>
          Refresh
        </button>
      </div>
    );
  if (tasks.length === 0)
    return (
      <div className="my-12">
        <div className="p-4 border border-blue-300">No active tasks.</div>
        <button
          className="bg-gray-500 text-white rounded my-2 px-3 py-1 hover:bg-green-700 disabled:opacity-50"
          onClick={fetchTasks}
          disabled={loading}>
          Refresh
        </button>
      </div>
    );

  return (
    <div className="my-12 p-2 border border-green-300">
      <div className="flex gap-2 mb-2">
        <button
          className="bg-gray-500 text-white rounded px-3 py-1 hover:bg-green-700 disabled:opacity-50"
          onClick={fetchTasks}
          disabled={loading}>
          Refresh
        </button>
        <button
          className="bg-red-600 text-white rounded px-3 py-1 hover:bg-red-700 disabled:opacity-50"
          disabled={!selectedTaskId}
          onClick={handleCancel}>
          Cancel
        </button>
      </div>
      <table className="min-w-full border mt-8">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            <th className="px-4 py-2 border">Task ID</th>
            <th className="px-4 py-2 border">Type</th>
            <th className="px-4 py-2 border">Interval (ms)</th>
            <th className="px-4 py-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr
              key={task.id}
              className={`text-center cursor-pointer ${
                selectedTaskId === task.id ? "bg-red-100 dark:bg-red-900" : ""
              }`}
              onClick={() => setSelectedTaskId(task.id)}>
              <td className="px-4 py-2 border">{task.id}</td>
              <td className="px-4 py-2 border">{task.task_type}</td>
              <td className="px-4 py-2 border">{task.duration_ms}</td>
              <td className="px-4 py-2 border">{task.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {cancelStatus && (
        <div className="mt-2 text-center text-sm text-gray-700 dark:text-gray-200">
          {cancelStatus}
        </div>
      )}
    </div>
  );
}
