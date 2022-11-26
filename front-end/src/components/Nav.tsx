import React, { useEffect, useState } from "react";
import axios  from "axios";
import { LoggedInUserDto } from "../Dtos/UserDto";

const Nav = () => {
  const [user, setUser] = useState<LoggedInUserDto>({
      first_name: '',
      email: '',
      last_name: '',
      id: undefined
  });

  useEffect(() => {
    (async () => {
      const response = await axios.get<LoggedInUserDto>("user");
      setUser({
          id: response.data.id,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          email: response.data.email,
          role: response.data.role
      });
      console.log(response.data);
    })();
  }, []);

  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">
        Company name
      </a>
      <button
        className="navbar-toggler position-absolute d-md-none collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="navbar-nav">
        <div className="nav-item text-nowrap">
          <a className="nav-link px-3" href="#">
            {user.first_name}
          </a>
          <a className="nav-link px-3" href="#">
            Sign out
          </a>
        </div>
      </div>
    </header>
  );
};

export default Nav;
