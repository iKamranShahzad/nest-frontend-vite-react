import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  interface ResponseData {
    message: string;
  }
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ResponseData>(null);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const { checkAuth, isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      console.log("Already logged in, redirecting to root");
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const fetchData = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setData(null);
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const result = await res.json();
      setData(result);
      if (res.ok) {
        console.log("Login successful, checking auth and navigating");
        const authResult = await checkAuth();
        console.log("Auth check after login:", authResult);
        navigate("/");
      }
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
      <p style={{ marginBottom: 10 }}>Enter your Credentials to Login</p>
      <form onSubmit={fetchData}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label style={{ marginLeft: 15 }} htmlFor="password">
          Password:
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
      {error && <div style={{ color: "red" }}>Error: {error}</div>}
      {data && <div>Result: {data.message}</div>}
    </div>
  );
}
