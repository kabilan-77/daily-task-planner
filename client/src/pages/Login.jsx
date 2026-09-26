import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import authAPI from "../api/authApi";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await authAPI.post("/login", user);

      // Save JWT Token
      localStorage.setItem("token", res.data.token);

      // Save User Details
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("🎉 Login Successful!");

      // Wait 1 second before redirecting
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (err) {
      toast.error(
        err.response?.data?.message || "❌ Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-header">
          <div className="auth-badge">DTP</div>
          <div>
            <h2>Welcome Back</h2>
            <p>Login to manage your daily tasks, deadlines, and priorities.</p>
          </div>
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={user.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
