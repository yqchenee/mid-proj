import React , { Fragment } from 'react'
import './inputform.css' ;
import InputField from './InputField' 
import InputButton from './InputButton' 
export default ( {onKeyPress , status_text , onClick } ) => {
    return (
        <Fragment >
            <div className="input-group mb-3" style = { { width : '100%'} }>
                <select className = "dropdown-toggle" name="withdraw_deposit" id ="withdraw_deposit">
                    <option value="deposit">DEPOSIT</option>
                    <option value="withdraw">WITHDRAW</option>
                </select>
                <InputField txt = 'Value' id = 'uservalue' onKeyPress = {onKeyPress} />
                <InputField txt = 'Memo'  id = 'usernote'  onKeyPress = {onKeyPress} />
                <InputButton onClick = {onClick} text = 'clear' id = 'button-addon2' />

            </div>
            {/*
            <div className="input-group mb-3" style = { { width : '80%'} }>
                <InputField txt = 'Value' id = 'uservalue' onKeyPress = {onKeyPress} />
                <InputField txt = 'Note'  id = 'usernote'  onKeyPress = {onKeyPress} />
            </div>
            */}
            <div  className = 'col' id = "show_status">{status_text}</div>
        </Fragment>
    )
}