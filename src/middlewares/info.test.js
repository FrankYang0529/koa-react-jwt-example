/**
 * @jest-environment node
 */

import { call, put } from 'redux-saga/effects';

import { onInfoSuccess, onInfoFail } from '../actions/auth'
import { onAlertError } from '../actions/alert'
import { INFO_REQUEST } from '../constants/auth';
import { info as infoApi } from '../api'
import { info } from './info'


describe('info middleware', () => {
  const token = 'test token'
  const user = { username: 'username' }
  let action

  beforeEach(() => {
    jest.resetModules()

    action = {
      type: INFO_REQUEST
    }
  })

  it('should info success', () => {
    const generator = info(action)

    let next = generator.next()
    expect(next.value).toEqual(call(infoApi))

    next = generator.next({ user })
    expect(next.value).toEqual(put(onInfoSuccess({ user })))
  })

  it('should info fail', () => {
    let message = 'Token Expired'

    const generator = info(action)

    let next = generator.next()
    expect(next.value).toEqual(call(infoApi))

    next = generator.next({ message })
    expect(next.value).toEqual(put(onAlertError({ message })))

    next = generator.next(put(onInfoFail()))
    expect(next.value).toEqual(put(onInfoFail()))

  })
})