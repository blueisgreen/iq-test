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

  useEffect(() => {
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
    fetchTasks();
  }, []);

  if (loading)
    return (
      <div className="my-12 p-4 border border-yellow-300">Loading tasks...</div>
    );
  if (error) return <div className="text-red-600">{error}</div>;
  if (tasks.length === 0)
    return (
      <div className="my-12 p-4 border border-blue-300">No active tasks.</div>
    );

  return (
    <div className="my-12 p-2 border border-green-300">
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
            <tr key={task.id} className="text-center">
              <td className="px-4 py-2 border">{task.id}</td>
              <td className="px-4 py-2 border">{task.task_type}</td>
              <td className="px-4 py-2 border">{task.duration_ms}</td>
              <td className="px-4 py-2 border">{task.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
