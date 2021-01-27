import React, { Component } from 'react'
import Aux from '../../hoc/Auc'
import Berger from '../../components/Berger/Berger'
import BuildControls from '../../components/Berger/BuildControls/BuildControls'
import axios from '../../axios-orders'
import Spinner from '../../UI/Spinner/Spinner'
const INGREDIENT_PRICES = {
    salad: 0.5,
    meat: 1.3,
    bacon: 0.7,
    cheese: 0.4
}
class BergerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        isPurshasable: false,
        loading: false

    }
    componentDidMount() {
        axios.get('/ingredients.json').then(res => {
            console.log(res.data)
            this.setState({ ingredients: res.data })
        })
    }
    onPharchesOrder = (ingredients) => {
        const sum = Object.keys(ingredients).map(ingKey => {
            return ingredients[ingKey]
        }).reduce((sum, el) => {
            return sum + el
        }, 0)
        this.setState({
            isPurshasable: sum > 0
        })
    }
    addIngredientHandeler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredient = {
            ...this.state.ingredients
        }
        updatedIngredient[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice;
        const updatedTotalPrice = oldPrice + priceAddition

        this.setState({
            totalPrice: updatedTotalPrice,
            ingredients: updatedIngredient
        })
        this.onPharchesOrder(updatedIngredient)
    }
    removeIngredientHandeler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const newCount = oldCount - 1;

        const updatedIngredient = {
            ...this.state.ingredients
        }
        updatedIngredient[type] = newCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction
        this.setState({
            ingredients: updatedIngredient,
            totalPrice: newPrice
        })
        this.onPharchesOrder(updatedIngredient)
    }
    onOrder = () => {
        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price='+this.state.totalPrice)
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname : '/checkout',
            search : '?'+queryString

        })

    }
    render() {
        const disabledIngredients = {
            ...this.state.ingredients
        }
        for (let item in disabledIngredients) {
            disabledIngredients[item] = disabledIngredients[item] <= 0
        }
        let spinner = null;
        if (this.state.loading) {
            spinner = <Spinner />
        }
        let berger=<Spinner/>
        if (this.state.ingredients) {
            berger = (
                <Aux>
                    <Berger ingredients={this.state.ingredients} />

                    <BuildControls ingredientAdded={this.addIngredientHandeler}
                        ingredientRemoved={this.removeIngredientHandeler}
                        disabledIngredients={disabledIngredients}
                        price={this.state.totalPrice}
                        parched={this.state.isPurshasable}
                        clicked={this.onOrder} />
                </Aux>
            )
        }
        return (
            <Aux>
                {spinner}
                {berger}
            </Aux>
        )
    }
}
export default BergerBuilder