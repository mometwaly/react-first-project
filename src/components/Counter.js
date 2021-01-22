import React, { Component } from 'react'

class Counter extends Component {
    constructor(props) {
        super(props)

        this.state = {
            count: 0
        }
    }
    increament() {
        this.setState({
            count: this.state.count + 1
        },()=>{
            // if we need write some code after state changes write here
            console.log (this.state.count)
        })
    }

    render() {
        return (
            <div>
                count - {this.state.count}
                <button onClick={() => this.increament()}>Increase Counter</button>
            </div>
        )
    }
}

export default Counter
