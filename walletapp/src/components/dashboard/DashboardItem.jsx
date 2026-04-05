import { useDispatch } from "react-redux";
import { deleteWalletById } from "../../redux/slices/WalletSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAllTransaction } from "../../redux/slices/TransactionSlice";

const DashboardItem = ({ data }) => {
  // console.log(data);
  const dispatch = useDispatch();
  const deleteWallet = (id) => {
    // console.log("wallet Id for delete",id);
    let result = confirm("Are you sure!");
    if (result) {
      dispatch(deleteWalletById(id));
      toast.success("Wallet Deleted");
    }
  };

  const [totalBal, setTotalbal] = useState(0);
  useEffect(() => {
    if (data?.id && typeof data.id === "number" && !isNaN(data.id)) {
      const a = dispatch(fetchAllTransaction(data.id));
      a.then((data) => {
        let result = 0;
        let income = 0;
        let expense = 0;
        data.payload?.map((ele) => {
          // console.log(ele);
          if (ele.type == 1) {
            income += ele.ammount;
          } else {
            expense += ele.ammount;
          }
        });
        result = income - expense;
        // console.log(result);
        setTotalbal(result);
      });
    }
  }, [dispatch, data?.id]);

  return (
    <div className="container">
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-lg-4 col-md-3 col-6">
            <h3>{data.name}</h3>
            <p>Account Number: {data.accountNumber}</p>
            <p>Description: {data.description}</p>
          </div>
          <div className="col-lg-4 col-md-3 col-6 text-center">
            <h3>Net Balance</h3>
            {totalBal >= 0 ? (
              <h1 style={{ color: "green" }}>Rs. {totalBal}</h1>
            ) : (
              <h1 style={{ color: "red" }}>Rs. {totalBal}</h1>
            )}
          </div>
          <div className="col-md-4 col-12 d-lg-block">
            <ul className="list-group">
              <Link to={`/viewTransaction/${data.id}`}>
                <li className="list-group-item board text-success">
                  <i className="fa fa-flag-checkered pr-1">View Transactions</i>
                </li>
              </Link>
              <Link to={`/updateWallet/${data.id}`}>
                <li className="list-group-item update text-info">
                  <i className="fa fa-edit pr-1">Update Wallet Info</i>
                </li>
              </Link>

              <li className="list-group-item delete text-danger">
                <i
                  className="fa fa-minus-circle pr-1"
                  onClick={() => deleteWallet(data.id)}
                  style={{ cursor: "pointer" }}
                >
                  Delete Wallet
                </i>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardItem;
