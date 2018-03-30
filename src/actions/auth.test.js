/**
 * @jest-environment node
 */

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  INFO_REQUEST,
  INFO_SUCCESS,
  INFO_ERROR,
  REGISTER_REQUEST,
  REGISTER_SUCCESS
}from './../constants/auth'
import {
  onLoginRequest,
  onLoginSuccess,
  onLogout,
  onInfoRequest,
  onInfoSuccess,
  onInfoFail,
  onRegisterRequest,
  onRegisterSuccess
} from './auth'

describe('auth actions', () => {
  it('Login Request', () => {
    const user = {
      username: 'username',
      password: 'password'
    }
    const expectedAction = {
      type: LOGIN_REQUEST,
      payload: user
    }

    expect(onLoginRequest(user)).toEqual(expectedAction)
  })

  it('Login Success', () => {
    const user = { username: 'username' }
    const expectedAction = {
      type: LOGIN_SUCCESS,
      payload: {
        user
      }
    }

    expect(onLoginSuccess({ user })).toEqual(expectedAction)
  })

  it('Logout', () => {
    const expectedAction = {
      type: LOGOUT
    }

    expect(onLogout()).toEqual(expectedAction)
  })

  it('Info Request', () => {
    const expectedAction = {
      type: INFO_REQUEST,
    }

    expect(onInfoRequest()).toEqual(expectedAction)
  })

  it('Info Success', () => {
    const user = { username: 'username' }
    const expectedAction = {
      type: INFO_SUCCESS,
      payload: {
        user
      }
    }

    expect(onInfoSuccess({ user })).toEqual(expectedAction)
  })

  it('Info Fail', () => {
    const expectedAction = {
      type: INFO_ERROR,
    }

    expect(onInfoFail()).toEqual(expectedAction)
  })

  it('Register Request', () => {
    const user = {
      username: 'username',
      password: 'password'
    }
    const expectedAction = {
      type: REGISTER_REQUEST,
      payload: user
    }

    expect(onRegisterRequest(user)).toEqual(expectedAction)
  })

  it('Register Success', () => {
    const expectedAction = {
      type: REGISTER_SUCCESS,
    }

    expect(onRegisterSuccess()).toEqual(expectedAction)
  })

})