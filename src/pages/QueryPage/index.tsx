import { useEffect, useState } from "react";

export default function QueryPage() {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams({ name: "Kamran", age: "20" });
        const res = await fetch(
          `http://localhost:3000/query?${params.toString()}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result = await res.text();
        setData(result);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Query Endpoint</h2>
      {error && <div style={{ color: "red" }}>Error: {error}</div>}
      {data ? <div>{data}</div> : <div>Loading...</div>}
    </div>
  );
}
