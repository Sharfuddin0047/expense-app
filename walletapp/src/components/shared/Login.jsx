import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserByEmail, loginStatus } from "../../redux/slices/UserSlice";
import { toast } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  function handleData(e) {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();

    try {
      const response = await dispatch(getUserByEmail(userLogin.email)).unwrap();

      // if (!response) {
      //   toast.error("Email not found!");
      //   return;
      // }

      // if (response.password !== userLogin.password) {
      //   toast.error("Password is incorrect!");
      //   return;
      // }
      if (response && response.password === userLogin.password) {
        dispatch(loginStatus(true));
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", "user");
        toast.success("Login Successfull");
        navigate(`/userDashboard/${response.id}`);
      } else if (
        userLogin &&
        userLogin.email === "admin@gmail.com" &&
        userLogin.password === "admin@123"
      ) {
        dispatch(loginStatus(true));
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", "admin");
        toast.success("Admin Login Successfully");
        //! fetch all user and send to admin
        navigate(`/dashboard/${userLogin.email}`);
      } else {
        toast.error("Check Email or Password");
      }
    } catch (error) {
      console.log("User not found or some error:", error);
      toast.error("User not found!");
      alert("User not found!");
    }
  }

  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <form onSubmit={onSubmit} className="m-4">
              <div className="form-group m-2">
                <input
                  type="email"
                  name="email"
                  className="form-control form-control-lg"
                  placeholder="Email Address"
                  value={userLogin.email}
                  onChange={handleData}
                  required
                />
              </div>
              <div className="form-group m-2">
                <input
                  type="password"
                  name="password"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  value={userLogin.password}
                  onChange={handleData}
                  required
                />
              </div>
              <input type="submit" className="btn btn-info btn-block w-100" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
