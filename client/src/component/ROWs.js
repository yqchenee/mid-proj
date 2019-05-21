import React , { Fragment } from 'react'
import Row from './Row'
export default ( {Data} ) => {
    var rows = [];
    var keys = 0 ;
    var id = 0 ;
    let bal = 0 ;

    Data.forEach( item => {  // item : { name , record : [] }
        console.log(keys , typeof(bal) , typeof(item.money))
        bal = bal + Number( item.money ) ;
        item.balance = bal;

        rows.push(
            <Fragment key = {keys}>
                <Row item = {item} id = {id}/>
            </Fragment>
        )
        keys += 1 ;
        id += 1 ;
    })
    return (    
        <Fragment>
        {rows}
        </Fragment>    
    )
}