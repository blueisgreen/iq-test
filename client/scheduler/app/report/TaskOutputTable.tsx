import React, { useEffect, useState } from "react";

type TaskOutput = {
  timestamp: string;
  task_id: string;
  output: string;
};

export default function TaskOutputTable() {
  const [data, setData] = useState<TaskOutput[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/tasks/output");
      const json = await res.json();
      setData(json);
    } catch (err) {
      setData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <button
        className="bg-gray-500 text-white rounded px-3 py-1 hover:bg-green-700 disabled:opacity-50"
        onClick={fetchData}
        disabled={loading}>
        {loading ? "Refreshing..." : "Refresh"}
      </button>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th
              style={{
                textTransform: "capitalize",
                borderBottom: "1px solid #ccc",
                textAlign: "left",
              }}>
              Timestamp
            </th>
            <th
              style={{
                textTransform: "capitalize",
                borderBottom: "1px solid #ccc",
                textAlign: "left",
              }}>
              Task_id
            </th>
            <th
              style={{
                textTransform: "capitalize",
                borderBottom: "1px solid #ccc",
                textAlign: "left",
              }}>
              Output
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={row.task_id + row.timestamp + idx}>
              <td style={{ padding: "4px 8px" }}>{row.timestamp}</td>
              <td style={{ padding: "4px 8px" }}>{row.task_id}</td>
              <td style={{ padding: "4px 8px", whiteSpace: "pre-wrap" }}>
                {row.output}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && !loading && <div>No output available.</div>}
    </div>
  );
}
