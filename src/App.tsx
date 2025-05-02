import { Routes, Route, Link, useNavigate } from "react-router-dom";

import RootPage from "./pages/RootPage";
import AskQuestionPage from "./pages/AskQuestionPage";
import QueryPage from "./pages/QueryPage";
import SumPage from "./pages/SumPage";
import AnswerPage from "./pages/AnswerPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SayNamePage from "./pages/SayNamePage";
import VerificationPage from "./pages/VerificationPage";

import { useAuth } from "./hooks/useAuth";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";

export default function App() {
  const { isLoggedIn, logout } = useAuth();
  console.log("App render - isLoggedIn:", isLoggedIn);

  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log("Logout clicked");
    await logout();
    console.log("Logout complete, navigating");
    navigate("/");
  };

  return (
    <div
      style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "sans-serif" }}
    >
      <nav style={{ marginBottom: 24 }}>
        <Link to="/">Root</Link> | <Link to="/askquestion">Ask Question</Link> |{" "}
        <Link to="/query">Query</Link> | <Link to="/sum">Sum</Link> |{" "}
        <Link to="/answer">Answer</Link>
        {!isLoggedIn && (
          <>
            {" | "}
            <Link to="/register">Register</Link> |{" "}
            <Link to="/login">Login</Link>
          </>
        )}
        {isLoggedIn && (
          <>
            {" | "}
            <Link to="/sayname">SayName</Link>
            {" | "}
            <button
              onClick={handleLogout}
              style={{
                background: "none",
                border: "none",
                color: "blue",
                cursor: "pointer",
                textDecoration: "underline",
                padding: 0,
              }}
            >
              Logout
            </button>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<RootPage />} />
        <Route path="/askquestion" element={<AskQuestionPage />} />
        <Route path="/query" element={<QueryPage />} />
        <Route path="/sum" element={<SumPage />} />
        <Route path="/answer" element={<AnswerPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<VerificationPage />} />
        <Route path="/sayname" element={<SayNamePage />} />
        <Route path="/reset" element={<ForgetPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>
    </div>
  );
}
