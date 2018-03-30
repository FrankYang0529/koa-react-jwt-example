import { call, put, take } from 'redux-saga/effects'

import { onLoginSuccess, onLoginError } from '../actions/auth'
import { onAlertError, onAlertClear } from '../actions/alert'
import { LOGIN_REQUEST } from '../constants/auth';
import { login as loginApi } from '../api'

export function* login(action) {
  try {
    const response = yield call(loginApi, action.payload)
    const { user, token, message } = response
    if (!user || !token) {
      throw new Error(message)
    }

    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)

    yield put(onLoginSuccess({ user }))
    yield put(onAlertClear())
  } catch (error) {
    yield put(onAlertError(error))
  }
}

function* watchLogin() {
  while(1) {
    const action = yield take(LOGIN_REQUEST)
    yield call(login, action)
  }
}

export default watchLogin