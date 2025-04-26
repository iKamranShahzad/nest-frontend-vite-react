import { useEffect, useState } from "react";

export default function RootPage() {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/");
        const result = await res.json();
        setData(result.message);
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
      <h2>Root Endpoint</h2>
      {error && <div style={{ color: "red" }}>Error: {error}</div>}
      {data ? <div>{data}</div> : <div>Loading...</div>}
    </div>
  );
}
