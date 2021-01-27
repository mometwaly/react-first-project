import React from 'react'
import './Berger.css'
import BergerIngredient from './BergerIngredient/BergerIngredient'

const berger = (props) => {
    let transformedIngredient = Object.keys(props.ingredients).map(key => {
        return [...Array(props.ingredients[key])].map((_, index) => {
            return <BergerIngredient key={key + index} type={key} />
        })
    }).reduce((arr,el)=>{
        return arr.concat(el)
    },[])
    if (transformedIngredient.length === 0){
        transformedIngredient = <p>Please Add Ingredients</p>
    }
    console.log(transformedIngredient)

    return (
        <div className="Berger">
            <BergerIngredient type="bread-top" />
            {transformedIngredient}
            <BergerIngredient type="bread-buttom" />
        </div>
    )
}
export default berger
