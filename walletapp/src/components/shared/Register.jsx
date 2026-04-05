import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { insertUser } from "../../redux/slices/UserSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  
  function handleSubmit(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  async function onSubmit(e) {
    e.preventDefault();
    if (!user.username || !user.email || !user.password || !user.password2) {
      toast.error("Please fill all fields");
      return;
    }
    if (user.password !== user.password2) {
      toast.error("Passwords do not match");
      return;
    }
    if (user.password === user.password2) {
      const userData = {
        username: user.username,
        email: user.email,
        password: user.password, 
      };
      const resultAction = await dispatch(insertUser(userData));

      if (insertUser.fulfilled.match(resultAction)) {
        toast.success("User Registered Successfully");
        navigate(`/login`);
      } else {
        toast.error(resultAction.payload?.message || "Registration Failed");
      }
    }
  }
  return (
    <>
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your Account</p>
              <form onSubmit={onSubmit}>
                <div className="form-group m-2">
                  <input
                    type="text"
                    name="username"
                    value={user.username}
                    className="form-control form-control-lg"
                    placeholder="Name"
                    required
                    onChange={handleSubmit}
                  />
                </div>
                <div className="form-group m-2">
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    onChange={handleSubmit}
                    required
                  />
                </div>
                <div className="form-group m-2">
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    className="form-control form-control-lg"
                    placeholder="Password"
                    onChange={handleSubmit}
                  />
                </div>
                <div className="form-group m-2">
                  <input
                    type="password"
                    name="password2"
                    value={user.password2}
                    className="form-control form-control-lg"
                    placeholder="Confirm Password"
                    onChange={handleSubmit}
                  />
                </div>
                <input
                  type="submit"
                  value="Register"
                  className="btn btn-info btn-block mt-3 w-100"
                />
              </form>
              <p className="mt-2 px-3">
                If you already have an account{" "}
                <Link to={"/login"} style={{ textDecoration: "none" }}>
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
