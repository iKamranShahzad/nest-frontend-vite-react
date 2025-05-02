import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function ForgetPasswordPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      console.log("Already logged in, redirecting to root");
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        "http://localhost:3000/auth/reset-password-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      if (res.ok) {
        console.log("Reset password link sent to email:", email);
        alert("Reset password link sent to your email.");
        navigate("/login");
      } else {
        const errorData = await res.json();
        console.error("Error sending reset link:", errorData.message);
        alert("Error sending reset link. Please try again.");
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2>Forgot your password?</h2>
      <p style={{ marginBottom: 10 }}>Enter your Email</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
        />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <button type="submit">Send Reset Link</button>
        )}
      </form>
    </>
  );
}
