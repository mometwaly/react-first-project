import React, { Component } from 'react'
import Layout from './components/Layout/Layout'
import BergerBuilder from './containers/BergerBuilder/BergerBuilder'
import Checkout from './containers/Checkout/Checkout'
import { Route, Switch ,withRouter } from 'react-router-dom'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import * as actions from './store/actions/index'
import { connect } from 'react-redux'
export class App extends Component {

  componentDidMount(){
    console.log(this.props.checkAuth)
    this.props.checkAuth();
  }
  render() {
    return (
      <div>
        <div>
          <Layout>
            <Switch>
              <Route path="/checkout" component={Checkout} />
              <Route path="/orders" exact component={Orders} />
              <Route path="/logout" exact component={Logout} />
              <Route path="/" exact component={BergerBuilder} />
              <Route path="/auth" component={Auth} />
            </Switch>
          </Layout>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkAuth: () => dispatch(actions.checkAuthStatus())
  }
}
export default withRouter(connect(null, mapDispatchToProps)(App));
