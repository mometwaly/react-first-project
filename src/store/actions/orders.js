import * as actionsTypes from './actionTypes'
import axios from '../../axios-orders'


export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionsTypes.PARCHASE_BERGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionsTypes.PARCHASE_BERGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = (orderData,token) => {
    console.log(orderData)
    return dispatch => {
        axios.post('/orders.json?auth='+token, orderData).then(res => {
            dispatch(purchaseBurgerSuccess(res.data.name, orderData))
        })
    }
}

export const isOrderParchesed = () => {
    return {
        type: actionsTypes.ORDER_PARCHESED
    }
}
export const fetchOrderSuccess = (orders) => {
    return {
        type: actionsTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}
export const fetchOrdersStart = (token) => {
    return (dispatch) => {
        axios.get('/orders.json?auth='+token).then(res => {
            //console.log(res.data)
            let fetchedData = []
            for (let key in res.data) {
                fetchedData.push({
                    ...res.data[key],
                    id: key
                })
            }
            console.log('here',fetchedData)
            dispatch(fetchOrderSuccess(fetchedData))


        })
    }
}
