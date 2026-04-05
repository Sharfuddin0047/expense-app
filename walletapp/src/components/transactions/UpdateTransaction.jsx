import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  fetchOneTransaction,
  updateTransactionById,
} from "../../redux/slices/TransactionSlice";
import toast from "react-hot-toast";

const UpdateTransaction = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { walletId, id } = useParams();
  //todo: id= transactionId
  const [form, setForm] = useState({
    ammount: "",
    description: "",
    type: "2",
    transactionDate: "",
  });

  useEffect(() => {
    const getTransaction = async (walletId, id) => {
      try {
        const trans = await dispatch(
          fetchOneTransaction({ walletId, id })
        ).unwrap();
        setForm(trans);
        // console.log(trans);
      } catch (err) {
        console.error("Failed to fetch transaction", err);
      }
    };
    getTransaction(walletId, id);
  }, [dispatch, walletId, id]);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(form);
    if (!form.description || !form.ammount || !form.transactionDate) {
      toast.error("Please fill all required fields");
      return;
    }
    dispatch(updateTransactionById({ walletId, id, transaction: form }))
      .unwrap()
      .then(() => {
        toast.success("Transaction Updated Successfully");
        navigate(`/userTransaction/${walletId}`);
      })
      .catch(() => {
        toast.error("Tranasaction Not Updated");
      });
  };
  return (
    <div className="add-PBI">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            {/* <Link to={`/viewTransaction/${id}`} className="btn btn-light">
              Back to Wallet
            </Link> */}
            <h4 className="display-4 text-center">Update Transaction</h4>
            <p className="lead text-center">{""}</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group m-2">
                <input
                  type="number"
                  min="1"
                  name="ammount"
                  value={form.ammount}
                  onChange={changeHandler}
                  className="form-control form-control-lg"
                  placeholder="Amount"
                />
              </div>
              <div className="ms-2 me-2">
                <textarea
                  name="description"
                  value={form.description}
                  onChange={changeHandler}
                  className="form-control form-control-lg"
                  placeholder="Description"
                />
              </div>
              <br />
              <div className="form-group ms-2">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="font-semibold text-lg mr-8 inline-block"
                >
                  Transaction Type:
                </label>
                <div className="form-check form-check-inline mr-4">
                  <input
                    type="radio"
                    name="type"
                    value="1"
                    checked={form.type == "1"}
                    onChange={changeHandler}
                  />
                  <label className="form-check-label ml-1" htmlFor="income">
                    Cash In (+)
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    name="type"
                    value="2"
                    checked={form.type == "2"}
                    onChange={changeHandler}
                  />
                  <label className="form-check-label ml-1" htmlFor="expense">
                    Cash Out (-)
                  </label>
                </div>
              </div>

              <br />
              <h6 className="ms-2">Transaction Date</h6>
              <div className="form-group ms-2">
                <input
                  type="date"
                  name="transactionDate"
                  //   value={form.transactionDate}
                  value={form.transactionDate?.slice(0, 10)}
                  onChange={changeHandler}
                  className="form-control form-control-lg"
                />
              </div>
              <div className="d-flex justify-content-center mt-3 ms-2">
                <input type="submit" className="btn btn-primary w-100 fs-5" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTransaction;
