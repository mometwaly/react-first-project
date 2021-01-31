import React, { Component } from 'react'
import CheckoutSummmary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route ,Redirect} from 'react-router-dom'
import ContactData from './ContactData/ContactData'
import {connect} from 'react-redux'
import * as actions from'../../store/actions/index'
export class Checkout extends Component {
    componentWillMount() {
        this.props.isOrderparchesed();
    }
    oncancelled = () => {
        this.props.history.goBack();
    }
    onContinued = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render() {
        const redirectPage = this.props.parchesed ? <Redirect to="/" /> : null;
        return (
            <div>
                {redirectPage}
                <CheckoutSummmary ingredients={this.props.ings}
                    cancelled={this.oncancelled}
                    continued={this.onContinued} />
                <Route path={this.props.match.path + '/contact-data'} render={(props) => (<ContactData ingredients={this.props.ings} price={this.props.price}  {...props}/>)} />
            </div>
        )
    }
}
const mapStateToProps = state =>{
    return{
    ings : state.bergerBuilder.ingredients,
    price : state.bergerBuilder.totalPrice,
    parchesed : state.order.parchesed
    }
}
const mapDispatchToProps = dispatch => {
    return {
        isOrderparchesed : () => dispatch(actions.isOrderParchesed())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Checkout)
