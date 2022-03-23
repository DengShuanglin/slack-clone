import { Component } from 'react'
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Register from "../views/Sign/Register/Register"
import Signin from "../views/Sign/Signin/Signin"
import ConfirmEmail from "../views/Sign/ConfirmEmail/ConfirmEmail"
import NotFound from "../views/NotFound/NotFound"

export default class SignRegisterRoute extends Component {
  render() {
    return (
      <>
          <Route path="/sign/register" component={Register} />
          <Route path="/sign/signin" component={Signin} />
          <Route path="/sign/ConfirmEmail" component={ConfirmEmail} />
          <Redirect from="/" to="/sign/signin" exact />
      </>
    )
  }
}
