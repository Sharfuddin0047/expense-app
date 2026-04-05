import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardItem from "./DashboardItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllWallets } from "../../redux/slices/WalletSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllWallets());
  }, [dispatch]);
  const { wallets } = useSelector((state) => state.wallet);
  // console.log(wallets);

  return (
    <div className="projects">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {/* <h1 className="display-4 text-center">My Wallets</h1> */}
            <h1 className="display-4 text-center">Admin Pannel</h1>
            <br />
            {/* <div className="btn-group">
              <button
                type="button"
                className="btn btn-info btn-lg dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Create new
              </button>
              <div className="dropdown-menu">
                <Link className="dropdown-item" to="/createwallet">
                  Wallet
                </Link>
                <button disabled className="dropdown-item">
                  Transaction
                </button>
              </div>
            </div> */}
            <br />
            <hr />
            {/* <!-- Project Item Component --> */}

            {Array.isArray(wallets) && wallets.length > 0 ? (
              [...wallets]
                .filter((wallet) => wallet && wallet.id !== undefined)
                .reverse()
                .map((wallet) => (
                  <DashboardItem key={wallet.id} data={wallet} />
                ))
            ) : (
              <h1>No Wallet Details</h1>
            )}

            {/* <!-- End of Project Item Component --> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
