import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { signUp } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("tech");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  if (user) {
    return <Redirect to="/" />;
  }

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      return dispatch(signUp(username, email, role, password)).catch((res) => {
        if (res.user && res.user.errors) {
          console.log(res.user.errors);
          return setErrors(res.user.errors);
        }
        return history.push("/");
      });
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };
  const updateRole = (e) => {
    setRole(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  return (
    <div className="container mx-auto max-w-sm h-px px-4">
      <form
        onSubmit={onSignUp}
        className="flex flex-col mx-auto justify-between p-2"
      >
        <input
          className="max-w-sm p-2"
          type="text"
          name="username"
          placeholder="Username"
          onChange={updateUsername}
          value={username}
        ></input>
        <input
          className="max-w-sm p-2"
          type="email"
          name="email"
          placeholder="Email"
          onChange={updateEmail}
          value={email}
        ></input>
        <select className="max-w-sm p-2" value={role} onChange={updateRole}>
          <option value="tech">Technician</option>
          <option value="admin">Admin</option>
        </select>
        <input
          className="max-w-sm p-2"
          type="password"
          name="password"
          placeholder="Password"
          onChange={updatePassword}
          value={password}
        ></input>
        <input
          className="max-w-sm p-2"
          type="password"
          name="repeat_password"
          placeholder="Confirm Password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
        <button className="mt-2" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
