import * as actionsTypes from './actionTypes'
import axios from '../../axios-orders'
export const addIngredient = (name) =>{
    return {
        type : actionsTypes.ADD_INGREDIENT,
        ingredientName : name
    }
}

export const removeIngredient = (name) =>{
    return {
        type : actionsTypes.REMOVE_INGREDIENT,
        ingredientName :name
    }
}
export const setIngredients = (ingredients)=>{
    return {
        type : actionsTypes.SET_INGREDIENTS,
        ingredients : ingredients
    }
}
export const intiateIngredients = () =>{
    return dispatch =>{
        axios.get('/ingredients.json').then(res => {
              dispatch(setIngredients(res.data))
            })
    }
}
