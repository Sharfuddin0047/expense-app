import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createTransaction } from "../../redux/slices/TransactionSlice";
import toast from "react-hot-toast";

const AddTransaction = () => {
    const { id } = useParams();
    //Todo: id= walletId
  const [form, setForm] = useState({
    ammount: "",
    description: "",
    type: "2",
    transactionDate: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createTransaction({ walletId: id, transaction: form }))
      .unwrap()
      .then(() => {
        toast.success("Transaction Added");
        navigate(`/userTransaction/${id}`);
      })
      .catch(() => {
        toast.error("Transaction Not Added Successfully");
      });
  };

  return (
    <div className="add-PBI">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to={`/userTransaction/${id}`} className="btn btn-light">
              Back to Wallet
            </Link>
            <h4 className="display-4 text-center">Add New Transaction</h4>
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
                  required
                />
              </div>
              <div className="m-2">
                <textarea
                  name="description"
                  value={form.description}
                  onChange={changeHandler}
                  className="form-control form-control-lg"
                  placeholder="Description"
                  required
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
                    checked={form.type === "1"}
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
                    checked={form.type === "2"}
                    onChange={changeHandler}
                  />
                  <label className="form-check-label ml-1" htmlFor="expense">
                    Cash Out (-)
                  </label>
                </div>
              </div>

              <br />
              <h6 className="ms-2 me-2">Transaction Date</h6>
              <div className="form-group m-2">
                <input
                  type="date"
                  name="transactionDate"
                  value={form.transactionDate}
                  onChange={changeHandler}
                  className="form-control form-control-lg"
                />
              </div>
              <div className="d-flex justify-content-center mt-3">
                <input type="submit" className="btn btn-primary w-100 fs-5" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;
