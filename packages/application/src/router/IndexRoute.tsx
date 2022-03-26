import { Component, useContext, useEffect, useState } from 'react'
import { HashRouter, Route, Redirect, useHistory } from 'react-router-dom'
import Index from '../views/Index/Index'
import NotFound from '../views/NotFound/NotFound'
import { getUserInfoRequest } from '../api/userRequest'
import { UserContext } from '../store'
import useRequest from '../utils/request/hooks'
import { localStorageItemName } from '../utils/request'

export default function IndexRoute() {
  return (
    <Route
      path='/index'
      component={() => {
        return <Index />
      }}
    />
  )
}
