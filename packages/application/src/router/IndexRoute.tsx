import { Component } from 'react'
import { HashRouter, Route } from "react-router-dom";
import Index from "../views/Index/Index"
import NotFound from "../views/NotFound/NotFound"

export default class IndexRoute extends Component {
  render() {
    return (
      <Route path="/index" ><Index /></Route>
    )
  }
}
