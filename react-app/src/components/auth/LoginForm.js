import React, { useState } from "react";
import { Redirect, useHistory, NavLink } from "react-router-dom";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";

const LoginForm = () => {
  const [errors, setErrors] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  if (user) {
    return <Redirect to="/" />;
  }
  const onLogin = async (e) => {
    e.preventDefault();
    return dispatch(login(email, password)).then((res) => {
      console.log(res);
      if (!res.ok && res.errors) {
        return setErrors(res.errors);
      }
      return history.push("/");
    });
  };

  const logInDemo = async (e) => {
    e.preventDefault();
    const emailField = document.querySelector(".email");
    const passwordField = document.querySelector(".password");
    if (email || password) {
      setEmail("");
      setPassword("");
    }
    emailField.value = "demo@email.com";
    passwordField.value = "password";

    return dispatch(login(emailField.value, passwordField.value)).catch(
      (res) => {
        if (!res.ok && res.errors) {
          return setErrors(res.errors);
        }
        return history.push("/");
      }
    );
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="flex flex-col bg-ghost items-center h-screen mx-auto  w-full px-4">
      <div className="mt-20 mb-5 max-w-md w-full">
        {errors && (
          <ul className="mx-auto p-4 bg-red-100 text-red-900 border-2 border-red-900 rounded">
            <div className="font-semibold">
              Please correct the following errors:
            </div>
            {errors.map((error, i) => (
              <li className="list-disc list-inside" key={i}>
                {error}
              </li>
            ))}
          </ul>
        )}
      </div>
      <form
        onSubmit={onLogin}
        className="flex flex-col max-w-md w-full mb-auto shadow-lg justify-center bg-white"
      >
        <div className="flex justify-center w-full p-2 mx-0 mb-2 bg-ghost border-2 border-opacity-90">
          <span className="pr-2">Don't have an account? </span>
          <NavLink to="/signup" exact className="text-blue-600">
            Sign Up!
          </NavLink>
        </div>
        <div className="p-4 text-xl">Log In</div>
        <input
          name="email"
          type="text"
          placeholder="Email"
          className="form-input email mx-4 border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
          value={email}
          onChange={updateEmail}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="form-input password mx-4 mt-4 border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
          value={password}
          onChange={updatePassword}
        />
        <button
          className="mt-3 bg-pnavy text-ghost mx-4 py-1.5 rounded hover:opacity-90"
          type="submit"
        >
          Log in
        </button>
        <button
          className="my-2 mb-3 bg-pnavy text-ghost mx-4 py-1.5 rounded hover:opacity-90"
          onClick={logInDemo}
        >
          Log in as Demo User
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
