import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function VerificationPage() {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setError("No verification token provided.");
      return;
    }
    fetch(`http://localhost:3000/auth/verify?token=${token}`)
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          setMessage(data.message || "Account verified successfully.");
          setTimeout(() => navigate("/login"), 2000);
        } else {
          setError(data.message || "Verification failed.");
        }
      })
      .catch(() => setError("Verification failed. Please try again later."));
  }, [searchParams, navigate]);

  return (
    <div>
      <h2>Email Verification</h2>
      {message && (
        <div style={{ color: "green" }}>{message} Redirecting to login...</div>
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}
