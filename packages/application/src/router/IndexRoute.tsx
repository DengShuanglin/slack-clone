import { Component } from 'react'
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Index from "../views/Index/Index"
import NotFound from "../views/NotFound/NotFound"

export default class IndexRoute extends Component {
  render() {
    return (
      <Route path="/index" component={Index} exact />
    )
  }
}
