import { all } from 'redux-saga/effects'

import watchLogin from './login'
import watchInfo from './info'
import watchRegister from './register'

function* rootSaga() {
  yield all([
    watchLogin(),
    watchInfo(),
    watchRegister()
  ])
}

export default rootSaga