import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteTransaction } from '../../redux/slices/TransactionSlice';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const UserTransList = ({ walletId, data }) => {
  //Todo: data = each Transaction
  const dispatch = useDispatch();
  const handledeleteTransaction = (walId, trans_id) => {
    // console.log("Deleted");
    console.log(walId, trans_id);
    let result = confirm("Are you sure!");
    if (result) {
      dispatch(deleteTransaction({ walletId: walId, transId: trans_id }));
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
                className="text-info m-4"
                to={`/updateTransaction/${walletId}/${data.id}`}
              >
                <i className="fas fa-edit fa-2x"></i>
              </Link>
              <Link onClick={() => handledeleteTransaction(walletId, data.id)}>
                <span className="text-danger">
                  <i className="fas fa-trash fa-2x"></i>
                </span>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserTransList
