import React from 'react'
import './Input.css'
const input = (props) => {
    let inputElement = null;
    switch (props.inputtype) {
        case ('input'):
            inputElement = <input className="InputElement" {...props.elementConfig} value={props.value} onChange={props.changed}/>
            break;
        case ('textarea'):
            inputElement = <textarea className="InputElement" {...props.elementConfig} value={props.value} onChange={props.changed}/>
            break;
        case ('select'):
            inputElement = <select className="InputElement" value={props.value} onChange={props.changed}>
                {props.elementConfig.options.map(optionm => {
                    return (<option key={optionm.value} value={optionm.value}>{optionm.displayValue}</option>)
                })}
            </select>
            break;
        default:
            inputElement = <input className="InputElement" {...props.elementConfig} value={props.value} onChange={props.changed}/>
            break;
    }
    return (
        <div className="Input">
            <label className="Label">{props.label}</label>
            {inputElement}
        </div>
    )
}
export default input
