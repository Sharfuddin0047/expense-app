import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  fetchAllTransaction,
  setTotalBallance,
} from "../../redux/slices/TransactionSlice";
import TransList from "./TransList";
import { getUserByWalletId } from "../../redux/slices/UserSlice";

const Transaction = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { transaction } = useSelector((state) => state.transaction);

  useEffect(() => {
    dispatch(getUserByWalletId(id));
  }, [dispatch, id]);
  // const { userId } = useSelector((state) => state.user);
  // console.log("userId: ",userId,"walletId: ",id);

  const [totalBal, setTotalBal] = useState(0);
  const [cashIn, setCashIn] = useState(0);
  const [cashOut, setCashOut] = useState(0);
  useEffect(() => {
    if (transaction?.length > 0) {
      let totalIncome = 0;
      let totalExpense = 0;
      transaction.forEach((item) => {
        const amount = Number(item.ammount);
        if (item.type == "1") {
          totalIncome += amount;
        } else if (item.type == "2") {
          totalExpense += amount;
        }
        setCashIn(totalIncome);
        setCashOut(totalExpense);
      });

      const netBalance = totalIncome - totalExpense;
      setTotalBal(netBalance);
      dispatch(setTotalBallance({ walletId: id, balance: netBalance }));
    } else {
      setTotalBal(0); // reset if wallets empty
    }
  }, [dispatch, transaction, id]);
  useEffect(() => {
    dispatch(fetchAllTransaction(id));
  }, [dispatch, id]);

  return (
    <div className="container">
      <Link
        to={`/dashboard/${"admin@gmail.com"}`}
        className="btn btn-default btn-lg mb-3"
      >
        Back
      </Link>
      <Link to={`/trns/add/${id}`} className="btn btn-info mb-3">
        <i className="fas fa-plus-circle">
          <button disabled>Add new Transaction</button>
        </i>
        {/* <button className="" disabled>Add new Transaction</button> */}
      </Link>
      <br />
      <div className="card text-center">
        <div className="card-header bg-success text-white">
          <h4>Net Balance</h4>
          <h1>Rs. {totalBal}</h1>
          <div className="d-flex justify-content-around">
            <h4>Total In (+): {cashIn}</h4>
            <h4>Total Out (-): {cashOut}</h4>
          </div>
        </div>
        <div></div>
      </div>
      <hr />

      {Array.isArray(transaction) && transaction.length > 0 ? (
        transaction
          .slice() // make a shallow copy to avoid mutating the original array
          .reverse() // reverse the copy to show latest first
          .filter((ele) => ele && ele.id !== undefined)
          .map((ele) => <TransList key={ele.id} walletId={id} data={ele} />)
      ) : (
        <h1>No Any Transaction</h1>
      )}

      {/* <!-- End of Project Item Component --> */}
    </div>
  );
};

export default Transaction;
