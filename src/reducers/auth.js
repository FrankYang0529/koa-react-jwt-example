import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  INFO_SUCCESS,
  INFO_ERROR
} from '../constants/auth'

const initState = {
  loggedIn: localStorage.getItem('token') ? true : false,
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
}

export default function auth(state = initState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      {
        return { loggedIn: true, user: action.payload.user }
      }
    case LOGOUT:
      {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        return { loggedIn: false, user: null }
      }
    case INFO_SUCCESS:
      {
        return { loggedIn: true, user: action.payload.user }
      }
    case INFO_ERROR:
      {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        return { loggedIn: false, user: null }
      }
    default:
      return state
  }
}