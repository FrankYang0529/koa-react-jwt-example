import React from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import HomePage from './HomePage'
import LoginPage from './LoginPage'
import PrivateRoute from './PrivateRoute'
import { onInfoRequest } from '../actions/auth'

export class App extends React.Component {
  componentDidMount() {
    const { loggedIn, onInfoRequestAction } = this.props
    if(loggedIn) {
      onInfoRequestAction()
    }
  }

  render() {
    const { loggedIn, alert } = this.props
    return (
      <Router>
        <div className="jumbotron">
          <div className="container">
            <div className="col-sm-8 col-sm-offset-2">
              <h1 className="display-4">Koa-React-JWT Example</h1>
              {
                alert.message &&
                  <div className={`alert ${alert.className}`}>{alert.message}</div>
              }
              <Switch>
                <PrivateRoute exact path="/" component={HomePage} loggedIn={loggedIn} />
                <Route path="/login" component={LoginPage} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = store => {
  const { auth, alert } = store
  const { loggedIn } = auth
  return { loggedIn, alert }
}

export function mapDispatchToProps(dispatch) {
  return {
    onInfoRequestAction: () => {
      dispatch(onInfoRequest())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)