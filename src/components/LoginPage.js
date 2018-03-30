import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { onLoginRequest, onRegisterRequest } from '../actions/auth'

export const LoginPage = ({ loggedIn, onLoginRequestAction, onRegisterRequestAction }) => {
  let usernameField = null
  let passwordField = null

  if(loggedIn) {
    return <Redirect to={{pathname: "/"}} />
  }

  return (
    <div className="col-md-6 col-md-offset-3">
      <form>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text"
                 id="username"
                 ref={el => usernameField = el}
                 className="form-control"/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password"
                 id="password"
                 ref={el => passwordField = el}
                 className="form-control"/>
        </div>
        <button type="submit"
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault()
                  onLoginRequestAction({
                    username: usernameField.value,
                    password: passwordField.value
                  })

                  passwordField.value = ''
                }}>
          Login
        </button>
        <span> </span>
        <button type="submit"
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault()
                  onRegisterRequestAction({
                    username: usernameField.value,
                    password: passwordField.value
                  })

                  passwordField.value = ''
                }}>
          Register
        </button>
      </form>
    </div>
  )
}

const mapStateToProps = store => ({
  loggedIn: store.auth.loggedIn
})

export function mapDispatchToProps(dispatch) {
  return {
    onLoginRequestAction: (username, password) => {
      dispatch(onLoginRequest(username, password))
    },
    onRegisterRequestAction: (username, password) => {
      dispatch(onRegisterRequest(username, password))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)