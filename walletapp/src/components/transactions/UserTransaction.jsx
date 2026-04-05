import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getUserByWalletId } from "../../redux/slices/UserSlice";
import {
  fetchAllTransaction,
  setTotalBallance,
} from "../../redux/slices/TransactionSlice";
import TransList from "./TransList";
import UserTransList from "../dashboard/UserTransList";

const UserTransaction = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  //TODO: id= walletId
  
  // console.log("Wallet ID from Transaction", id);
  // const selected=useSelector((state)=>state.transaction.transaction);
  // console.log(selected);//!OR
  useEffect(() => {
    dispatch(fetchAllTransaction(id));
  }, [dispatch, id]);
  const { transaction } = useSelector((state) => state.transaction);


  useEffect(() => {
    dispatch(getUserByWalletId(id));
  }, [dispatch, id]);
  const { userId } = useSelector((state) => state.user);

  const [totalBal, setTotalBal] = useState(0);
  const [cashIn, setCashIn] = useState(0);
  const [cashOut, setCashOut] = useState(0);
  useEffect(() => {
    if (transaction?.length > 0) {
      let totalIncome = 0;
      let totalExpense = 0;
      transaction.forEach((item) => {
        const amount = Number(item.ammount); // just in case it's a string
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

  return (
    <div className="container">
      <Link
        to={`/userDashboard/${userId}`}
        className="btn btn-default btn-lg mb-3"
      >
        Back
      </Link>
      <Link to={`/trns/add/${id}`} className="btn btn-info btn-lg mb-3">
        <i className="fas fa-plus-circle"> Add new Transaction</i>
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
          .map((ele) => <UserTransList key={ele.id} walletId={id} data={ele} />)
      ) : (
        <h1>No Any Transaction</h1>
      )}
    </div>
  );
};

export default UserTransaction;
