import React from 'react'
import './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'
const buildControls = (props) => {
    const Controls = [
        { label: 'Salad', type: 'salad' },
        { label: 'Meat', type: 'meat' },
        { label: 'Cheese', type: 'cheese' },
        { label: 'Bacon', type: 'bacon' }
    ]
    return (
        <div className="BuildControls">
            <p>Current price : <strong>{props.price.toFixed(2)}</strong></p>
            {Controls.map(cntr => {
                return <BuildControl label={cntr.label}
                    key={cntr.type}
                    type={cntr.type}
                    added={() => props.ingredientAdded(cntr.type)} 
                    removed={()=>props.ingredientRemoved(cntr.type)}
                    disabledIngredient={props.disabledIngredients[cntr.type]}/>
            })}
            <button className="OrderButton" disabled={!props.parched} onClick={props.clicked}>{props.isAuth ?"ORDER NOW": "Sign in to Order"}</button>
        </div>
    )
};
export default buildControls