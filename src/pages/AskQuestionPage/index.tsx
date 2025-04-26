import { useEffect, useState } from "react";

export default function AskQuestionPage() {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/askquestion");
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
      <h2>Ask Question Endpoint</h2>
      {error && <div style={{ color: "red" }}>Error: {error}</div>}
      {data ? <div>{data}</div> : <div>Loading...</div>}
    </div>
  );
}
