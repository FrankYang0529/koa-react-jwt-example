import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  INFO_REQUEST,
  INFO_SUCCESS,
  INFO_ERROR,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from '../constants/auth'

export const onLoginRequest = ({ username, password }) => (
  {
    type: LOGIN_REQUEST,
    payload: {
      username,
      password
    }
  }
)

export const onLoginSuccess = ({ user }) => (
  {
    type: LOGIN_SUCCESS,
    payload: { user }
  }
)

export const onLoginError = (payload) => (
  {
    type: LOGIN_ERROR,
    payload
  }
)

export const onLogout = () => (
  {
    type: LOGOUT
  }
)

export const onInfoRequest = () => (
  {
    type: INFO_REQUEST,
  }
)

export const onInfoSuccess = ({ user }) => (
  {
    type: INFO_SUCCESS,
    payload: { user }
  }
)

export const onInfoFail = () => (
  {
    type: INFO_ERROR
  }
)

export const onRegisterRequest = ({ username, password }) => (
  {
    type: REGISTER_REQUEST,
    payload: {
      username,
      password
    }
  }
)

export const onRegisterSuccess = () => (
  {
    type: REGISTER_SUCCESS
  }
)