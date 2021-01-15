import React, { useState } from "react";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { signUp } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";

const SignUpForm = () => {
  const [errors, setErrors] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
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
      return dispatch(signUp(username, email, role, password)).then((res) => {
        // console.log(res);
        if (!res.ok && res.errors) {
          return setErrors(res.errors);
        }
        return history.push("/");
      });
    }
    return setErrors(["Password: your password did not match"]);
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
  // border-gray-400 border-2 border-opacity-5
  return (
    <div className="flex flex-col h-screen bg-ghost items-center mx-auto w-full px-4">
      <div className="mt-20 mb-5 max-w-md w-full">
        {errors && (
          <ul className="mx-auto  p-4 bg-red-100 text-red-900 border-2 border-red-900 rounded">
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
        onSubmit={onSignUp}
        className="flex flex-col max-w-md w-full mb-auto shadow-lg justify-center bg-white"
      >
        <div className="flex justify-center w-full p-2 mx-0 mb-2 bg-ghost border-2 border-opacity-90">
          <span className="pr-2">Already have an account? </span>
          <NavLink to="/login" exact className="text-blue-600">
            Log In
          </NavLink>
        </div>
        <div className="p-4 text-xl">Sign Up</div>
        <input
          className="form-input mx-4 border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
          type="text"
          name="username"
          placeholder="Username"
          onChange={updateUsername}
          value={username}
        />
        <input
          className="form-input mx-4 mt-4 border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
          type="email"
          name="email"
          placeholder="Email"
          onChange={updateEmail}
          value={email}
        />
        <select
          className="form-select mx-4 mt-4 border-gray-200 focus:border-pblue focus:bg-blue-50  border-2 border-opacity-50 rounded"
          value={role}
          onChange={updateRole}
        >
          <option value="" defaultValue disabled>
            Select Role
          </option>
          <option value="tech">Technician</option>
          <option value="admin">Admin</option>
        </select>
        <input
          className="form-input mx-4 mt-4 border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
          type="password"
          name="password"
          placeholder="Password"
          onChange={updatePassword}
          value={password}
        />
        <input
          className="form-input mx-4 mt-4 border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
          type="password"
          name="repeat_password"
          placeholder="Confirm Password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        />
        <button
          className="m-3 mx-4 bg-pnavy text-ghost py-1.5 rounded hover:opacity-90"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
