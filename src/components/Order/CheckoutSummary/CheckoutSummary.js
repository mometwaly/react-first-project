import React from 'react'
import './CheckoutSummary'
import Berger from './../../Berger/Berger'
const checkoutSummary = (props) => {
    return (
        <div className="CheckoutSummary">
            <h1>We hope it test well</h1>
            <div style={{ width: '300px', height: '300px', margin: 'auto' }}>
                <Berger ingredients={props.ingredients} />
            </div>
            <button onClick={props.cancelled}>Cancel</button>
            <button onClick={props.continued}>contiune</button>
        </div>
    )
}
export default checkoutSummary