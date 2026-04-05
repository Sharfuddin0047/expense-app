import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createWalletForUser } from "../../redux/slices/WalletSlice";

const UserCreateWallet = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();

  const [wallet, setWallet] = useState({
    name: "",
    accountNumber: "",
    description: "",
    priority: "",
  });

  const changeHandler = (e) => {
    setWallet({ ...wallet, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    try {
      const response = dispatch(
        createWalletForUser({ userId: id, walletData: wallet })
      );
      toast.success("Wallet Created Successfully");
      navigate(`/userDashboard/${id}`);
      // setFormErrors({});
    } catch (error) {
      toast.error("Wallet Not Created");
      console.error("Error creating wallet:", error);
    }
  };

  return (
    <div className="project">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h5 className="display-4 text-center">Create Wallet</h5>
            <hr />
            <form onSubmit={onSubmit} className="m-4">
              <div className="form-group m-2">
                <input
                  type="text"
                  name="name"
                  value={wallet.name}
                  onChange={changeHandler}
                  className="form-control form-control-lg"
                  placeholder="Enter Wallet Name"
                  required
                />
                {/* {formErrors.name && (
                  <small className="text-danger">{formErrors.name}</small>
                )} */}
              </div>

              <div className="form-group m-2">
                <input
                  type="text"
                  name="accountNumber"
                  value={wallet.accountNumber}
                  onChange={changeHandler}
                  className="form-control form-control-lg"
                  placeholder="Account No"
                  required
                />
              </div>

              <div className="form-group m-2">
                <textarea
                  name="description"
                  value={wallet.description}
                  onChange={changeHandler}
                  className="form-control form-control-lg"
                  placeholder="Description"
                  required
                ></textarea>
              </div>

              <div className="form-group mt-2 ms-2 me-2">
                <select
                  value={wallet.priority}
                  name="priority"
                  onChange={changeHandler}
                  className="form-control form-control-lg"
                >
                  <option value="">Select Priority</option>
                  <option value={1}>High</option>
                  <option value={2}>Medium</option>
                  <option value={3}>Low</option>
                </select>
              </div>

              <input
                type="submit"
                className="btn btn-primary btn-block mt-3 w-100 fs-5"
                value="Create"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCreateWallet;
