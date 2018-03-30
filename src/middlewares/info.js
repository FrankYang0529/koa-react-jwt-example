import { call, put, take } from 'redux-saga/effects'

import { onInfoSuccess, onInfoFail } from '../actions/auth'
import { onAlertError } from '../actions/alert'
import { INFO_REQUEST } from '../constants/auth';
import { info as infoApi } from '../api'

export function* info(action) {
  try {
    const response = yield call(infoApi)
    const { user, message } = response

    if (!user) { throw new Error(message) }

    yield put(onInfoSuccess({ user }))
  } catch (error) {
    yield put(onAlertError(error))
    yield put(onInfoFail())
  }
}

function* watchInfo() {
  while(1) {
    const action = yield take(INFO_REQUEST)
    yield call(info, action)
  }
}

export default watchInfo