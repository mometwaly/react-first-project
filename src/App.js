import Layout from './components/Layout/Layout'
import BergerBuilder from './containers/BergerBuilder/BergerBuilder'
import Checkout from './containers/Checkout/Checkout'
import { Route, Switch } from 'react-router-dom'
import Orders from './containers/Orders/Orders'
function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" exact component={Orders} />
          <Route path="/" exact component={BergerBuilder} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;