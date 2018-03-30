/**
 * @jest-environment node
 */

import { call, put } from 'redux-saga/effects';

import { REGISTER_REQUEST } from '../constants/auth'
import { onRegisterSuccess } from '../actions/auth'
import { onAlertSuccess, onAlertError } from '../actions/alert'
import { register as registerApi } from '../api'
import { register } from './register'


describe('register middleware', () => {
  const username = 'username'
  const password = 'password'
  const user = { username }
  let action

  beforeEach(() => {
    jest.resetModules()

    action = {
      type: REGISTER_REQUEST,
      payload: { username, password }
    }
  })

  it('should register success', () => {
    const generator = register(action)

    let next = generator.next()
    expect(next.value).toEqual(call(registerApi, action.payload))

    next = generator.next({})
    expect(next.value).toEqual(put(onRegisterSuccess()))

    next = generator.next(onAlertSuccess({ message: 'Register Success' }))
    expect(next.value).toEqual(put(onAlertSuccess({ message: 'Register Success' })))
  })

  it('should register fail', () => {
    let message = 'Missing username or password'
    action = { type: REGISTER_REQUEST, payload: {} }

    const generator = register(action)

    let next = generator.next()
    expect(next.value).toEqual(call(registerApi, action.payload))

    next = generator.next({ message })
    expect(next.value).toEqual(put(onAlertError({ message })))
  })
})