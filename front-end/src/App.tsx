import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Users from "./Pages/Users";
import Register from "./Pages/Register";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Dashboard/>} />
        <Route path={'/users'} element={<Users/>}/>
        <Route path={'/register'} element={<Register/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
