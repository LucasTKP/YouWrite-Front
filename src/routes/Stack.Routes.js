import * as React from "react";
import { Fragment, useContext} from "react";
import { AuthContext } from "../App";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Home } from "../pages/Home/Home"
import { AlterPassword } from "../pages/AlterPassword/AlterPassword"
import { Login } from "../pages/Login/Login"


export function StackRoutes() {
  const {user} = useContext(AuthContext)
  console.log(user)
  const Private = ({Item}) => {
    var signed = false;
    var login = true
    if(user !== "null"  && user != null) {
      if(JSON.parse(user).token.length > 5){
        signed = true
        login = false
        return login > 0 ? <Login /> : <Home /> 
      }
    }
    console.log(signed)
    return signed ? <Item /> : <Login />
  }

  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Private Item={Login} />} />
          <Route path="/alterpassword" element={ <AlterPassword /> } />
          <Route path="*" element={<Login />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};