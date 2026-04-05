import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteUserById, loginStatus } from "../../redux/slices/UserSlice";
import { fetchWalletsByUser } from "../../redux/slices/WalletSlice";
import DashboardItem from "./DashboardItem";
import UserDashboardItem from "./UserDashboardItem";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchWalletsByUser(id));
    }
  }, [dispatch, id]);
  const { wallets } = useSelector((state) => state.wallet);

  function deleteAccount(userId) {
    const userCnfrm = confirm("Do you really want to delete your account!!");
    if (userCnfrm) {
      // console.log("adfad");
      dispatch(loginStatus(false));
      dispatch(deleteUserById(userId));
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("role");
      setTimeout(() => {
        navigate("/register");
      }, 0);
    }
  }
  return (
    <div className="projects">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4 text-center">My Wallets</h1>
            <br />
            <div className="btn-group d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-info btn-lg rounded  dropdown-toggle"
                // dropdown-toggle
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Create new
              </button>

              <div className="dropdown-menu">
                <Link className="dropdown-item" to={`/createWalletUser/${id}`}>
                  Wallet
                </Link>
                {/* <button disabled className="dropdown-item">
                  Transaction
                </button> */}
              </div>
              <button
                type="button"
                className="btn btn-danger btn-lg ms-5 rounded text-white border-danger"
                onClick={() => deleteAccount(id)}
              >
                Delete Account
              </button>
            </div>
            <br />
            <hr />
            {Array.isArray(wallets) && wallets.length > 0 ? (
              [...wallets] // copy array first
                .reverse()
                .filter((wallet) => wallet && wallet.id !== undefined)
                .map((wallet) => (
                  <UserDashboardItem key={wallet.id} data={wallet} />
                ))
            ) : (
              <h1>No Wallet Details</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
