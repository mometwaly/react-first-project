import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
export class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrder(this.props.token);
    }
    render() {
        let orders = null;
        if (this.props.orders) {
            //console.log(this.props.orders)
            let gettenOrder = [...this.props.orders]
            orders = gettenOrder.map(order => {
                return <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={+order.price} />
            })

        }
        return (
            <div>
                {orders}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        token : state.auth.token
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrder: (token) => dispatch(actions.fetchOrdersStart(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders) 
