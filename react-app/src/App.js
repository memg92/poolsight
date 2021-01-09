import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/Nav/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { authenticate } from "./store/session";
import HomeManager from "./components/Home/HomeManager";
import ClientForm from "./components/Clients/ClientForm/ClientForm";
import ClientProfile from "./components/Clients/ClientProfile/ClientProfile";

function App() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setLoaded(true));
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/" exact={true}>
          {loaded && <HomeManager />}
        </Route>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/signup" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/client/:id(\d+)" exact={true}>
          <ClientProfile />
        </ProtectedRoute>
        <ProtectedRoute path="/client/create" exact={true}>
          <ClientForm />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
