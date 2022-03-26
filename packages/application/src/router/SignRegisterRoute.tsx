import { Component, useContext, useEffect, useState } from 'react'
import { HashRouter, Route, Redirect, useHistory } from 'react-router-dom'
import Register from '../views/Sign/Register/Register'
import Signin from '../views/Sign/Signin/Signin'
import ConfirmEmail from '../views/Sign/ConfirmEmail/ConfirmEmail'
import NotFound from '../views/NotFound/NotFound'
import { localStorageItemName } from '../utils/request'
import { set } from 'husky'
import { UserContext } from '../store'

export default function SignRegisterRoute() {
  const history = useHistory()
  const ctx = useContext(UserContext)
  const [_, set_] = useState(0)
  useEffect(() => {
    ctx.addRefreshCallback('SignRegisterRoute', () => {
      set_(_ + 1)
    })
    return () => {
      delete ctx.callbackMap['SignRegisterRoute']
    }
  }, [])
  // useEffect(() => {
  //     console.log(history.location.pathname);
  //     if (localStorage.getItem(localStorageItemName.ACCESS_TOKEN) !== null) {
  //         history.push('/index')
  //     } else {
  //         jsx = (
  //             <>
  //                 <Route path='/sign/register'>
  //                     <Register/>
  //                 </Route>
  //                 <Route path='/sign/signin'>
  //                     <Signin/>
  //                 </Route>
  //                 <Route path='/sign/ConfirmEmail'>
  //                     <ConfirmEmail/>
  //                 </Route>
  //                 <Redirect path='/sign' to='/sign/signin' exact={true}/>
  //             </>
  //         )
  //     }
  //     set_(_+1);
  // }, [history.location.pathname])
  if (localStorage.getItem(localStorageItemName.ACCESS_TOKEN) !== null) {
    history.replace('/index')
    console.log(11)
  }
  console.log(12)
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
      <Redirect path='/sign' to='/sign/signin' exact={true} />
    </>
  )
}
