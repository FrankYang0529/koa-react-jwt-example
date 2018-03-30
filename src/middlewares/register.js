import { call, put, take } from 'redux-saga/effects'

import { onRegisterSuccess } from '../actions/auth'
import { onAlertSuccess, onAlertError } from '../actions/alert'
import { REGISTER_REQUEST } from '../constants/auth';
import { register as registerApi } from '../api'

export function* register(action) {
  try {
    const response = yield call(registerApi, action.payload)

    if (response.message) {
      throw new Error(response.message)
    }

    yield put(onRegisterSuccess())
    yield put(onAlertSuccess({ message: 'Register Success' }))
  } catch (error) {
    yield put(onAlertError(error))
  }
}

function* watchRegister() {
  while(1) {
    const action = yield take(REGISTER_REQUEST)
    yield call(register, action)
  }
}

export default watchRegister