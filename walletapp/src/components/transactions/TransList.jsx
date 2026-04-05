import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteTransaction } from "../../redux/slices/TransactionSlice";
import toast from "react-hot-toast";

const TransList = ({ walletId, data }) => {
  // console.log("wallet ID from TrasnList", walletId);
  // console.log(data, data.id);
  const dispatch = useDispatch();
  const handledeleteTransaction = (walId, id) => {
    // console.log("Deleted");
    console.log(walId, id);
    let result = confirm("Are you sure!");
    if (result) {
      dispatch(deleteTransaction({ walletId: walId, transId: id }));
      toast.success("Transaction Deleted");
    }
  };
  const isIncome = data.type == "1";
  const rowClass = isIncome ? "table-success" : "table-danger";
  const amountClass = isIncome ? "text-success" : "text-danger";
  const sign = isIncome ? "+" : "-";

  return (
    <div>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Description</th>
            <th></th>
            <th></th>
            <th scope="col">Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr className={rowClass}>
            <td>{data.transactionDate}</td>
            {/* <td>{data.description}</td> */}
            <td
              style={{
                wordBreak: "break-word",
                textAlign: "justify",
                whiteSpace: "normal",
                maxWidth: "100px",
              }}
            >
              {data.description}
            </td>
            <td></td>
            <td></td>
            <td className={amountClass}>
              {sign}
              {data.ammount}
            </td>
            <td>
              <Link
                className="text-info m-2"
                to={`/updateTransaction/${walletId}/${data.id}`}
              >
                {/* <i className="fas fa-edit fa-2x"></i> */}
                <button disabled>
                  <i className="fas fa-edit fa-2x"> </i>
                </button>
              </Link>
              <Link onClick={() => handledeleteTransaction(walletId, data.id)}>
                <button className="text-danger" disabled>
                  <i className="fas fa-trash fa-2x"></i>
                </button>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TransList;
