import React, { Component } from 'react'
import Input from '../../UI/Input/Input'
import './Auth.css'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../UI/Spinner/Spinner'
import {Redirect} from 'react-router-dom'
export class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignUp : true
    }
    inputChangedHandeler = (event, identifier) => {
        const UpdatedOrderForm = {
            ...this.state.controls
        }
        const updatedFormElement = {
            ...UpdatedOrderForm[identifier]
        }
        updatedFormElement.value = event.target.value;
        UpdatedOrderForm[identifier] = updatedFormElement;
        this.setState({ controls: UpdatedOrderForm })
    }
    onChangeAuthStatus = ()=>{
        this.setState(prevState=>{
            return {isSignUp : !prevState.isSignUp}
        })
    }
    submitHandeler=(event) =>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp)
    }
    render() {
        const formElements = [];
        for (let key in this.state.controls) {
            formElements.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        let form = formElements.map(formElement => {
            return <Input
                key={formElement.id}
                inputtype={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event) => this.inputChangedHandeler(event, formElement.id)}
            />
        })
        if (this.props.loading){
            console.log(this.props.loading)
            form = <Spinner/>
        }
        let errorMessage =null
        if(this.props.error){
            errorMessage = <p>{this.props.error}</p>
        }
        let authRedirct =null;
        if (this.props.isAuthenticated){
            authRedirct=<Redirect to="/" />
        }
        return (
            <div className='Auth'>
                {authRedirct}
                {errorMessage}
                <form onSubmit={this.submitHandeler}>
                    {form}
                    <button>Submit</button>

                </form>
                <button onClick={this.onChangeAuthStatus}>Switch to {this.state.isSignUp ? 'SignIn':'SignUp'}</button>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        loading : state.auth.loading,
        error : state.auth.error,
        isAuthenticated : state.auth.token !==null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password,isSignUp) => dispatch(actions.auth(email, password,isSignUp)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
