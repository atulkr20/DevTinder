
const Login = () => {
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
              className="input input-bordered w-full"
              placeholder="Enter your email"
            />
          </fieldset>

          {/* Password Field */}
          <fieldset className="fieldset my-2">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="Enter your password"
            />
          </fieldset>

          {/* Login Button */}
          <div className="card-actions justify-center my-2">
            <button className="btn btn-primary">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
