import React from 'react'
export default ({ onClick, text , id }) => {
	return(
		<div className="input-group-append">
			<button className="btn btn-outline-secondary" type="button" 
					id={id}  onClick={onClick}>
					{text}
			</button>
		</div>
	)
}
