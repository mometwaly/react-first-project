import React from 'react'
import './Order.css'

const order = (props) => {
    const ingredients = []
    for (let ingredientName in props.ingredients){
        ingredients.push({name : ingredientName , amount : props.ingredients[ingredientName]})
    }
    const ingredientsOutput=ingredients.map(el=>{
        return <strong>{el.name} : ({el.amount})</strong>
    })
    return (
        <div className="Order">
            <p>Ingredients : {ingredientsOutput} </p>
            <p>Price : <strong>{props.price.toFixed(2)}</strong> </p>
        </div>
    )
}
export default order