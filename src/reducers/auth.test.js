/**
 * @jest-environment node
 */

import {
  LOGIN_SUCCESS,
  LOGOUT,
  INFO_SUCCESS,
  INFO_ERROR
} from '../constants/auth'
import auth from './auth'
import MockLocalStorage from './../utils/MockLocalStorage'

global.localStorage = new MockLocalStorage();

describe('auth reducer', () => {
  let user = { username: 'tmp' }
  let token = 'test toekn'
  let initState

  beforeEach(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    initState = {
      loggedIn: false,
      user: null
    }
  })

  it('should return initial state', () => {
    expect(auth(initState, {})).toEqual(initState)
  })

  it('should login success', () => {
    const action = {
      type: LOGIN_SUCCESS,
      payload: { user }
    }

    expect(auth(initState, action)).toEqual(
      {
        loggedIn: true,
        user
      }
    )
  })

  it('should logout', () => {
    const action = {
      type: LOGOUT
    }

    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)

    initState = {
      loggedIn: true,
      user
    }

    expect(auth(initState, action)).toEqual(
      {
        loggedIn: false,
        user: null
      }
    )
    expect(localStorage.getItem('user')).toBeNull()
    expect(localStorage.getItem('token')).toBeNull()
  })

  it('should info success', () => {
    const action = {
      type: INFO_SUCCESS,
      payload: { user }
    }

    expect(auth(initState, action)).toEqual(
      {
        loggedIn: true,
        user
      }
    )
  })

  it('should info error', () => {
    const action = {
      type: INFO_ERROR
    }

    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)

    initState = {
      loggedIn: true,
      user
    }

    expect(auth(initState, action)).toEqual(
      {
        loggedIn: false,
        user: null
      }
    )
    expect(localStorage.getItem('user')).toBeNull()
    expect(localStorage.getItem('token')).toBeNull()
  })
})