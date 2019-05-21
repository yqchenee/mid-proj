import React , { Fragment } from 'react'
export default ( { txt , id , onKeyPress} ) => {
    return (
        <Fragment>
            <div className = "input-name" >{txt}</div>
            <input  type        ="text"
                    id          = { id }
                    className   ="form-control"
                    placeholder = { "Enter " + txt + "..." }
                    onKeyPress  = { onKeyPress } />
        </Fragment>
    )
}