import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Nav from "./components/shared/Nav";
import Welcome from "./components/Welcome";
import "bootstrap/dist/css/bootstrap.min.css";
import NotFound from "./components/shared/NotFound";
import { Provider } from "react-redux";
import myStore from "./redux/Store";
import { Toaster } from "react-hot-toast";
import UpdateWallet from "./components/dashboard/dashboardOperation/UpdateWallet";
import Transaction from "./components/transactions/Transaction";
import AddTransaction from "./components/transactions/AddTransaction";
import UpdateTransaction from "./components/transactions/UpdateTransaction";
import Register from "./components/shared/Register";
import Login from "./components/shared/Login";
import UserDashboard from "./components/dashboard/UserDashboard";
import UserCreateWallet from "./components/dashboard/UserCreateWallet";
import PrivateRoute from "./privateRoutes/PrivateRoute";
import UserTransaction from "./components/transactions/UserTransaction";
import UserUpdateWallet from "./components/dashboard/UserUpdateWallet";

function App() {
  return (
    <Provider store={myStore}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Welcome />}></Route>
          <Route
            path={`/dashboard/:email`}
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          ></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/userDashboard/:id"
            element={
              <PrivateRoute>
                <UserDashboard />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/updateWallet/:id"
            element={
              <PrivateRoute>
                <UpdateWallet />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path={`/userUpdateWallet/:id`}
            element={
              <PrivateRoute>
                <UserUpdateWallet />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="createWalletUser/:id"
            element={
              <PrivateRoute>
                <UserCreateWallet />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/viewTransaction/:id"
            element={
              <PrivateRoute>
                <Transaction />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/userTransaction/:id"
            element={
              <PrivateRoute>
                <UserTransaction />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/trns/add/:id"
            element={
              <PrivateRoute>
                <AddTransaction />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/updateTransaction/:walletId/:id"
            element={
              <PrivateRoute>
                <UpdateTransaction />
              </PrivateRoute>
            }
          ></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
