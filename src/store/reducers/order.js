import * as actionsTypes from '../actions/actionTypes'

const initialState = {
    orders: [],
    parchesed :false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.PARCHASE_BERGER_SUCCESS:

            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            console.log(newOrder)
            return {
                ...state,
                orders: state.orders.concat(newOrder),
                parchesed :true
            }
        case actionsTypes.ORDER_PARCHESED : 
            return{
                ...state,
                parchesed : false
            }
            
        case actionsTypes.PARCHASE_BERGER_FAIL:
            return {
                ...state,
            }

        case actionsTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders : action.orders
            }

        default:
            return state
    }

}
export default reducer