import { useEffect, useState } from "react";

export default function AnswerPage() {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/answer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: "Kamran Shahzad" }),
        });
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
      <h2>Answer Endpoint</h2>
      {error && <div style={{ color: "red" }}>Error: {error}</div>}
      {data ? <div>{data}</div> : <div>Loading...</div>}
    </div>
  );
}
