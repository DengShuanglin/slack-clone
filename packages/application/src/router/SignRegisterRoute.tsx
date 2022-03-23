import { Component } from 'react'
import { HashRouter, Route, Redirect } from "react-router-dom";
import Register from "../views/Sign/Register/Register"
import Signin from "../views/Sign/Signin/Signin"
import ConfirmEmail from "../views/Sign/ConfirmEmail/ConfirmEmail"
import NotFound from "../views/NotFound/NotFound"

export default class SignRegisterRoute extends Component {
  render() {
    return (
      <>
          <Route path="/sign/register"><Register/></Route>
          <Route path="/sign/signin" ><Signin/></Route>
          <Route path="/sign/ConfirmEmail"><ConfirmEmail/></Route>
          <Redirect from="/" to="/sign/signin" exact />
      </>
    )
  }
}
