import React from 'react'
import Aux from '../../../hoc/Auc'

const orderSummary=(props) =>{
    const orderSum = Object.keys(props.ingredients).map(ingKey=>{
        return <li><span style={{textTransform:'capitalize'}}>{ingKey}</span> : {props.ingredients[ingKey]}</li>
    })

    return (
        <Aux>
            <h3>Your Orders</h3>
            <p>Awsome Self Perperd Burger Has Folloeing Ingredients</p>
            <ul>
                {orderSum}
            </ul>
        </Aux>
    )
}
export default orderSummary
