import React, { SyntheticEvent, useState } from "react";
import "./Register.css";

const Register = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmed_password, setConfirmedPass] = useState("");

  function onSubmit(event: SyntheticEvent) {
    event.preventDefault();
    console.log({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
      confirmed_password: confirmed_password,
    });
  }

  return (
    <>
      <main className="form-signin w-100 m-auto">
        <form onSubmit={(event) => onSubmit(event)}>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          <input
            type="text"
            className="form-control"
            placeholder="Joe"
            onChange={event => setFirstName(event.target.value)}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Doe"
            onChange={event => setLastName(event.target.value)}
          />
          <input
            type="email"
            className="form-control"
            placeholder="name@example.com"
            onChange={event => setEmail(event.target.value)}
          />
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            onChange={event => setPassword(event.target.value)}
          />
          <input
            type="password"
            className="form-control"
            placeholder="Confirmed Password"
            onChange={event => setConfirmedPass(event.target.value)}
          />
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Sign in
          </button>
          <p className="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
        </form>
      </main>
    </>
  );
};

export default Register;
