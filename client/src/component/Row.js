import React , { Fragment }from 'react'
export default ( {item , id } ) => {   // record :  time , money , body
    //console.log(typeof(item.date))
    let date = new Date(item.date)
    date = date.toUTCString();
    const showMoney = (item.money > 0) ?
        <Fragment>
            <div className="col"></div>
            <div className="col">{item.money}</div> 
        </Fragment> :
        <Fragment>
            <div className="col">{-item.money}</div>
            <div className="col"></div> 
        </Fragment>

    const bgcolor = (id % 2 == 1 ) ? "rgb(227, 227, 227)" : "rgb(250, 247, 247)"

    return (
        <div className = "row"  style = { { backgroundColor: bgcolor }} >
            <div className="col">{date}</div>
            <div className="col">{item.body}</div>
            {showMoney}
            <div className="col" id = {id} >{item.balance}</div>
            <div className="w-100"></div>
        </div>
    )
}