import { useState } from "react";

export default function SumPage() {
  const [a, setA] = useState<string>("9");
  const [b, setB] = useState<string>("10");
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const params = new URLSearchParams({ a, b });
      const url = `http://localhost:3000/sum?${params.toString()}`;
      const res = await fetch(url);
      const result = await res.json();
      setData(result.sum);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Sum Endpoint</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
        <label>
          a:{" "}
          <input
            type="number"
            value={a}
            onChange={(e) => setA(e.target.value)}
            required
            style={{ marginRight: 8 }}
          />
        </label>
        <label>
          b:{" "}
          <input
            type="number"
            value={b}
            onChange={(e) => setB(e.target.value)}
            required
            style={{ marginRight: 8 }}
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Calculating..." : "Sum"}
        </button>
      </form>
      {error && <div style={{ color: "red" }}>Error: {error}</div>}
      {data && <div>Result: {data}</div>}
    </div>
  );
}
