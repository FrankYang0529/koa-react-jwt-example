import {
  ALERT_SUCCESS,
  ALERT_ERROR,
  ALERT_CLEAR
} from '../constants/alert'

export const onAlertSuccess = ({ message }) => (
  {
    type: ALERT_SUCCESS,
    payload: { message }
  }
)

export const onAlertError = ({ message }) => (
  {
    type: ALERT_ERROR,
    payload: { message }
  }
)

export const onAlertClear = () => (
  {
    type: ALERT_CLEAR
  }
)