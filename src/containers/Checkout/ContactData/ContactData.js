import React, { Component } from 'react'
import axios from '../../../axios-orders'
import Input from '../../../UI/Input/Input'
export class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            address: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            delieveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' },
                    ]
                },
                value: ''
            }
        }

    }
    checkValidaty(){
        
    }
    onOrderHandeler = (event) => {
        event.preventDefault();
        const formElement = {}
        for (let element in this.state.orderForm) {
            formElement[element] = this.state.orderForm[element].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formElement
        }
        console.log(order)
        axios.post('/orders.json', order).then(res => {
            console.log(res);
            this.props.history.push('/')
        }).catch(err => {
            console.log(err)

        })
    }
    inputChangedHandeler = (event, identifier) => {
        const UpdatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...UpdatedOrderForm[identifier]
        }
        updatedFormElement.value = event.target.value;
        UpdatedOrderForm[identifier] = updatedFormElement;
        this.setState({ orderForm: UpdatedOrderForm })
    }
    render() {
        let formElements = []
        for (let key in this.state.orderForm) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        const formElementOutput = formElements.map(element => {
            return <Input key={element.key}
                inputtype={element.config.elementType}
                elementConfig={element.config.elementConfig}
                value={element.config.value}
                changed={(event) => this.inputChangedHandeler(event, element.id)} />
        })
        return (
            <div className="ContactData">
                <h4>Enter Your Contact Data</h4>
                <form onSubmit={this.onOrderHandeler}>
                    {formElementOutput}
                    <button>Order</button>
                </form>

            </div>
        )
    }
}

export default ContactData
