import React, { Component } from 'react'
import Aux from '../../hoc/Auc'
import Berger from '../../components/Berger/Berger'
import BuildControls from '../../components/Berger/BuildControls/BuildControls'
//import axios from '../../axios-orders'
import Spinner from '../../UI/Spinner/Spinner'
import { connect } from 'react-redux'
import * as burgerBuilderActions from '../../store/actions/index'

class BergerBuilder extends Component {
    state = {
        loading: false

    }
    componentDidMount() {
        this.props.onInitIngredients()
    }
    onPharchesOrder = (ingredients) => {
        const sum = Object.keys(ingredients).map(ingKey => {
            return ingredients[ingKey]
        }).reduce((sum, el) => {
            return sum + el
        }, 0)
        return sum > 0

    }

    onOrder = () => {
        /*const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice)
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString

        })*/
        if(!this.props.isAuthenticated){
            this.props.history.push('/auth')
        }
        else{
            this.props.history.push('/checkout')
        }
        

    }
    render() {
        const disabledIngredients = {
            ...this.props.ings
        }
        for (let item in disabledIngredients) {
            disabledIngredients[item] = disabledIngredients[item] <= 0
        }
        let spinner = null;
        if (this.state.loading) {
            spinner = <Spinner />
        }
        let berger = <Spinner />
        if (this.props.ings) {
            berger = (
                <Aux>
                    <Berger ingredients={this.props.ings} />

                    <BuildControls ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabledIngredients={disabledIngredients}
                        price={this.props.price}
                        parched={() => this.onPharchesOrder(this.props.ings)}
                        clicked={this.onOrder}
                        isAuth={this.props.isAuthenticated} />
                </Aux>
            )
        }
        return (
            <Aux>
                {/*spinner*/}
                {berger}
            </Aux>
        )
    }
}
const mapStateToProps = state => {
    return {
        ings: state.bergerBuilder.ingredients,
        price: state.bergerBuilder.totalPrice,
        isAuthenticated : state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.intiateIngredients())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BergerBuilder)