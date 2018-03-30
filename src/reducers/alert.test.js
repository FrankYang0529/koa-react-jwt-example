/**
 * @jest-environment node
 */

import {
  ALERT_SUCCESS,
  ALERT_ERROR,
  ALERT_CLEAR
} from '../constants/alert'
import alert from './alert'

describe('alert reducer', () => {
  let message = 'test message'
  let initState

  beforeEach(() => {
    initState = {}
  })

  it('should init state', () => {
    expect(alert(initState, {})).toEqual({})
  })

  it('should alert success', () => {
    const action = {
      type:  ALERT_SUCCESS,
      payload: { message }
    }

    expect(alert(initState, action)).toEqual(
      {
        className: 'alert-success',
        message: message
      }
    )
  })

  it('should alert success', () => {
    const action = {
      type:  ALERT_ERROR,
      payload: { message }
    }

    expect(alert(initState, action)).toEqual(
      {
        className: 'alert-danger',
        message: message
      }
    )
  })

  it('should alert clear', () => {
    const action = {
      type:  ALERT_CLEAR
    }

    initState = {
      className: 'alert-success',
      message: message
    }

    expect(alert(initState, action)).toEqual({})
  })
})