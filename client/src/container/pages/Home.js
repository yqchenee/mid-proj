import React , {Fragment , Component } from 'react';
import InputButton from '../../component/InputButton';
import './Home.css'

// inputfield : txt , id , onKeyPress
//let socket = webSocket('http://140.112.251.175:3001')

class Home extends Component {
    click = ()=> {
        const userName = document.getElementById('username');
        const val = userName.value ;
        if( val !== '' ){
            window.location.href='/main/'+ val;
        }
        console.log(userName.value)
    }
    handleInput = e => {
		if( e.key === "Enter" && e.target.value !== '' ) {
			console.log('input enter')
			const userName = document.getElementById('username');
            window.location.href='/main/'+userName.value;
		}
	}
    render(){
        return (
            <Fragment>
                <div className = 'homeContainer'>
                    <h1 className = 'homeH1' >Welcome</h1>
                    <div className="input-group mb-3" >
                        <input  type        ="text"
                                id          ='username' 
                                className   ="form-control"
                                placeholder ="Enter your name "
                                onKeyPress  = { this.handleInput } />

                       {/* <InputField txt = 'Name' id = 'username' onKeyPress = {this.handleInput} />
                       */}
                    </div>
                    <InputButton onClick = {this.click} text = 'login' id = 'login' />
                </div>
            
                
            </Fragment>
        )
    }
} 

export default Home