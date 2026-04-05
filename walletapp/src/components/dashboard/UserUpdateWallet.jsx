import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchOneWallet, updateWallet } from '../../redux/slices/WalletSlice';
import { getUserByWalletId } from '../../redux/slices/UserSlice';
import toast from 'react-hot-toast';

const UserUpdateWallet = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    const [walletData, setWalletData] = useState({
      id: "",
      name: "",
      accountNumber: "",
      description: "",
      priority: "",
      user: "",
    });
    const [userId, setUserId] = useState(0);

    useEffect(() => {
      const getWalletAndUserId = async (walletId) => {
        try {
          const wallet = await dispatch(fetchOneWallet(walletId)).unwrap();
          // console.log("Line 31:", wallet);

          const user_id = await dispatch(getUserByWalletId(walletId)).unwrap();

          setWalletData({ ...wallet, user: user_id });
          setUserId(user_id);
        } catch (error) {
          console.error("Failed to fetch wallet", error);
        }
      };
      getWalletAndUserId(id);
    }, [dispatch, id]);

    const changeHandler = (e) => {
      setWalletData({ ...walletData, [e.target.name]: e.target.value });
    };
    const onSubmit = (e) => {
      e.preventDefault();

      dispatch(updateWallet(walletData))
        .unwrap()
        .then(() => {
          toast.success("Wallet Updated Successfully");
          navigate(`/userDashboard/${userId}`);
        })
        .catch(() => {
          toast.error("Wallet Not Updated");
        });
    };
  return (
    <div className="project">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h5 className="display-4 text-center">Update Wallet</h5>
            <hr />
            <form onSubmit={onSubmit}>
              <div className="form-group m-2">
                <input
                  type="text"
                  name="name"
                  value={walletData.name}
                  onChange={changeHandler}
                  className="form-control form-control-lg"
                  placeholder="Payment Mode Name"
                />
              </div>

              <div className="form-group m-2">
                <input
                  type="text"
                  name="accountNumber"
                  // readOnly
                  value={walletData.accountNumber}
                  onChange={changeHandler}
                  className="form-control form-control-lg"
                  placeholder="Account No"
                />
              </div>

              <div className="form-group m-2">
                <textarea
                  name="description"
                  value={walletData.description}
                  onChange={changeHandler}
                  className="form-control form-control-lg"
                  placeholder="Description"
                ></textarea>
              </div>

              <div className="form-group ms-2 me-2 mt-2">
                <select
                  value={walletData.priority}
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

              <button
                type="submit"
                className="btn btn-primary btn-block mt-3 fs-5 w-100"
                value="Update"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserUpdateWallet
