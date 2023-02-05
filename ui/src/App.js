import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from "./containers/register";
import { Login } from "./containers/login";
import Service from "./service/Service";
import store from "./store";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./store/actions/auth";
import { Dashboard } from "./containers/dashboard";
import { Layout } from "./containers/layout";
import { Bookings } from "./containers/bookings";
import { routes } from "./routes";
if (localStorage.jwtToken) {
  // Set auth token header auth
  Service.setAuthToken(localStorage.jwtToken);
  // Decode token and get user info an exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
  }
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      {routes.map((route) => (
        <Route
          key={route.name}
          path={route.path}
          element={
            <Layout>
              <route.component />
            </Layout>
          }
        />
      ))}
    </Routes>
  );
}

export default App;
