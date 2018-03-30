import React from 'react'
import { connect } from 'react-redux'

import { onLogout } from '../actions/auth'

export const HomePage = ({ user, onLogoutAction }) => {
  return (
    <div className="col-md-6 col-md-offset-3">
      <p className="lead">Hello {user.username}, welcome to the web 😀</p>
      <button type="submit"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault()
                onLogoutAction()
              }}>
        Logout
      </button>
    </div>
  )
}

const mapStateToProps = store => ({
  user: store.auth.user
})

export function mapDispatchToProps(dispatch) {
  return {
    onLogoutAction: () => {
      dispatch(onLogout())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)