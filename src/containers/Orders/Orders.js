import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
export class Orders extends Component {
    state ={
        orders : []
    }
    componentDidMount(){
        axios.get('/orders.json').then(res=>{
            let fetchedData = []
            for(let key in res.data){
                fetchedData.push({
                   ...res.data[key],
                   id: key
                })
            }
            this.setState({orders : fetchedData})
            console.log(this.state.orders)
            
        })
    }
    render() {
        let gettenOrder = [...this.state.orders]
        let orders = gettenOrder.map(order =>{
            return <Order 
            key={order.id}
            ingredients={order.ingredients}
            price = {+order.price} />
        })
        return (
            <div>
                {orders}
            </div>
        )
    }
}

export default Orders
