/**
 * @jest-environment node
 */

import { call, put } from 'redux-saga/effects';

import { LOGIN_REQUEST } from '../constants/auth'
import { onLoginSuccess } from '../actions/auth'
import MockLocalStorage from './../utils/MockLocalStorage'
import { onAlertClear, onAlertError } from '../actions/alert';
import { login as loginApi } from '../api'
import { login } from './login'

global.localStorage = new MockLocalStorage();

describe('login middleware', () => {
  const username = 'username'
  const password = 'password'
  const token = 'test token'
  const user = { username }
  let action

  beforeEach(() => {
    jest.resetModules()
    localStorage.removeItem('user')
    localStorage.removeItem('token')

    action = {
      type: LOGIN_REQUEST,
      payload: { username, password }
    }
  })

  it('should login success', () => {
    const generator = login(action)

    let next = generator.next()
    expect(next.value).toEqual(call(loginApi, action.payload))

    next = generator.next({ user, token })
    expect(next.value).toEqual(put(onLoginSuccess({ user })))

    next = generator.next(onAlertClear())
    expect(next.value).toEqual(put(onAlertClear()))

    expect(localStorage.getItem('user')).toEqual(JSON.stringify(user))
    expect(localStorage.getItem('token')).toEqual(token)
  })

  it('should login fail', () => {
    let message = 'Missing username or password'
    action = { type: LOGIN_REQUEST, payload: {} }

    const generator = login(action)

    let next = generator.next()
    expect(next.value).toEqual(call(loginApi, action.payload))

    next = generator.next({ message })
    expect(next.value).toEqual(put(onAlertError({ message })))
  })
})