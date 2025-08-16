import { useState } from "react";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
 

const Login = () => {
  const [emailId, setEmailId] = useState("steve@gmail.com");
  const [password, setPassword] = useState("Steve@123");
  const [error, setError] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const handleLogin = async () => {
    try {
      const res = await axios.post(
       BASE_URL + "/login", 
       {
        emailId,
        password,
      }, {withCredentials: true});

    dispatch(addUser(res.data));
    navigate("/");

  } catch (err) {
    setError(err.message)
      console.error(err?.response?.message || "Something Went Wrong");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>

          {/* Email Field */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email ID</legend>
            <input
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Enter your email"
            />
          </fieldset>

          {/* Password Field */}
          <fieldset className="fieldset my-2">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Enter your password"
            />
          </fieldset>

          {/* Login Button */}
          <p className = "text-red-500"> {error}</p>

          <div className="card-actions justify-center my-2">
            <button
              onClick={handleLogin}
              className="btn btn-primary w-full"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
