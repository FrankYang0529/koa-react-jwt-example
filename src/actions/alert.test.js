
/**
 * @jest-environment node
 */

import {
  ALERT_SUCCESS,
  ALERT_ERROR,
  ALERT_CLEAR
}from './../constants/alert'
import {
  onAlertSuccess,
  onAlertError,
  onAlertClear
} from './alert'

describe('alert actions', () => {
  it('Alert Success', () => {
    const message = {
      message: 'success'
    }
    const expectedAction = {
      type: ALERT_SUCCESS,
      payload: message
    }

    expect(onAlertSuccess(message)).toEqual(expectedAction)
  })

  it('Alert Error', () => {
    const message = {
      message: 'fail'
    }
    const expectedAction = {
      type: ALERT_ERROR,
      payload: message
    }

    expect(onAlertError(message)).toEqual(expectedAction)
  })

  it('Alert Clear', () => {
    const expectedAction = {
      type: ALERT_CLEAR
    }

    expect(onAlertClear()).toEqual(expectedAction)
  })
})