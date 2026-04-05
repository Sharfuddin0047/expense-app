import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <>
      <div className="landing">
        <div className="light-overlay landing-inner text-dark">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Personal Expense Manager</h1>
                <p className="lead">
                  Create your account to manage your daily expense and hisab
                  kitab
                </p>
                <hr />
                <Link
                  to="/register"
                  className="btn btn-lg mx-3 btn-primary mr-2"
                >
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-secondary mr-2">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <h1>adfa</h1> */}
      {/* <DotLottieReact src="path/to/animation.lottie" loop autoplay /> */}
    </>
  );
};

export default Welcome;
