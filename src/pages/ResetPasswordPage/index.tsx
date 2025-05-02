import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
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
    const resetToken = await searchParams.get("token");
    if (!resetToken) {
      alert("No reset token provided.");
      return;
    }
    setLoading(true);
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`http://localhost:3000/auth/reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: newPassword, token: resetToken }),
      });
      if (res.ok) {
        alert("Password reset successfully. You can now log in.");
        navigate("/login");
      } else {
        const errorData = await res.json();
        alert(
          errorData.message || "Error resetting password. Please try again."
        );
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
      <h2>Reset Your Password</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="newPassword">New Password:</label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <label style={{ marginLeft: 15 }} htmlFor="confirmPassword">
          Confirm Password:
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Reset Password"}
        </button>
      </form>
    </>
  );
}
