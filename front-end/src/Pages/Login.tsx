import React, { SyntheticEvent, useState } from "react";
import axios from "axios";
import { LoginUserDto } from "../Dtos/UserDto";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const body: LoginUserDto = {
      email,
      password,
    };
    await axios
        .post("login", body)
        .then(() => {
          setRedirect(true);
        })
        .catch((error) => console.log(error.message));
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <main className="form-signin w-100 m-auto">
      <form onSubmit={(event) => onSubmit(event)}>
        <input
          type="email"
          className="form-control"
          placeholder="name@example.com"
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Sign in
        </button>
        <p className="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
      </form>
    </main>
  );
};

export default Login;
