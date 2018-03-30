import {
  ALERT_SUCCESS,
  ALERT_ERROR,
  ALERT_CLEAR
} from '../constants/alert'

export default function alert(state = {}, action) {
  switch (action.type) {
    case ALERT_SUCCESS:
      {
        return { className: 'alert-success', message: action.payload.message }
      }
    case ALERT_ERROR:
      {
        return { className: 'alert-danger', message: action.payload.message }
      }
    case ALERT_CLEAR:
      {
        return {}
      }
    default:
      return state
  }
}