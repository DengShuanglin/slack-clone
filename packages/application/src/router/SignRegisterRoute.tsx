import { Component } from 'react'
import { HashRouter, Route, Redirect, useHistory } from 'react-router-dom'
import Register from '../views/Sign/Register/Register'
import Signin from '../views/Sign/Signin/Signin'
import ConfirmEmail from '../views/Sign/ConfirmEmail/ConfirmEmail'
import NotFound from '../views/NotFound/NotFound'
import { localStorageItemName } from '../utils/request'

export default function SignRegisterRoute() {
  const history = useHistory()
  if (localStorage.getItem(localStorageItemName.ACCESS_TOKEN) !== null) {
    history.replace('/index')
    return null
  }
  return (
    <>
      <Route path='/sign/register'>
        <Register />
      </Route>
      <Route path='/sign/signin'>
        <Signin />
      </Route>
      <Route path='/sign/ConfirmEmail'>
        <ConfirmEmail />
      </Route>
      <Redirect from='/' to='/sign/signin' exact />
      <Redirect from='/sign' to='/sign/signin' exact />
    </>
  )
}
