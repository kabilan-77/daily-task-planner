import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import authAPI from "../api/authApi";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
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
      await authAPI.post("/register", user);

      toast.success("🎉 Registration Successful!");

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (err) {
      toast.error(err.response?.data?.message || "❌ Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="auth-container">

      <form className="auth-form" onSubmit={handleSubmit}>

        <h2>Create Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={user.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={user.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={user.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating Account..." : "Register"}
        </button>


        <p>
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>

      </form>

    </div>

  );
}

export default Register;
