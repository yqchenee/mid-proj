import React , {Fragment , Component } from 'react';
import { NavLink  , Redirect} from 'react-router-dom';
import './Tal_Book.css'
import webSocket from 'socket.io-client';
import RowMenu from '../../component/RowMenu';
import ROW from '../../component/ROWs';
import InputForm from '../../component/InputForm';
//import './Home'

var element = id => {
    return document.getElementById(id);
};

var socket = {};

// <Tal_Book Data = {this.state.tx_data} Status = {this.state.status} />
class Tal_Book extends Component {
	constructor(props){
		super(props);
		this.state = {
			tx_data : [] ,
			status : '',
			balance : 0
		}
		socket = webSocket('http://localhost:3001')
		if (socket !== undefined) {
			console.log("Connected to sockets!");
		}
		//console.log(typeof(props.match.params.name))
	}
	
	setStatus = s => {
		this.setState( state => state.status = s ) ;
		setTimeout(() => {
			this.setState ( state => state.status = '') 
		}, 1500);
	}

	require =() => {
		socket.emit('require');
		//socket.emit('clear')
	}
	
	handleInput = e => {
		if( e.key === "Enter" ) {
			console.log('input enter')
			//const userName = element("username");
			const userVal = element("uservalue");
			if( isNaN(userVal.value) || userVal.value == '') {
				this.setStatus( "Please input a valid number!" )
				return;
			}
			const userNote = element("usernote");
			const withdraw_deposit = element("withdraw_deposit");
			const Time = Date.now();
			let value = (withdraw_deposit.value == "deposit") ? userVal.value : -userVal.value ;

			if( this.state.balance + value < 0 ) {
				if( this.state.balance == 0 ) this.setStatus("Please deposit money first.")
				else this.setStatus("Money is not enough to withdraw.")
				return;
			}
			
			socket.emit("input" , {
				name: this.props.match.params.name ,
				money: value,
				body: userNote.value,
				date: Time
			})
			console.log( Time );
		}
	}
	
	componentWillMount(){
		socket.emit('need init' , {
			name : this.props.match.params.name
		})
		
		socket.on("init", data => {
			console.log('INITIALIZE');
			console.log(data);
			this.updateData(data);
			let scroll = element('scroll');
			scroll.scrollTop = scroll.scrollHeight;
		});
	}
	componentDidMount(){
		socket.on('newdata', data => {
			console.log('new data');
			this.setState( state => state.tx_data.push(data) );
		})	;
		
		socket.on('output' , data => {
			console.log('output', data )
			this.setState( state => state.tx_data.push(data) ) ;
			let scroll = element('scroll');  // move the scroll to the bottom
			scroll.scrollTop = scroll.scrollHeight;
			this.setState( state => state.balance += data.money )
			var userVal = element("uservalue");
			var userNote = element("usernote");
			userVal.value = '';
			userNote.value = '';
		})
		
		socket.on('dbfault' , ()=> {
			console.log('db connect fail')
		})
		
		socket.on('status' , s => {
			console.log('client receive status')
			this.setStatus(s)
		})
	}
	
	updateData = data => {
		this.setState( state => state.tx_data = data )
		var len = data.length;
		const lastRowBalance = element( len-1 )
		this.setState(state => state.balance = parseInt(lastRowBalance.innerHTML))
	}
	
	clickBottom = () => {
		socket.emit('clear')
	}
	render(){
		const name = this.props.match.params.name;
		return (
			<Fragment>
				<div className = "row" id = "welcomeMessage">
					<div className = 'col' >Welcome , {name}</div>
					<NavLink to = '/home' style = { { float : 'right', padding : '0px 20px 0px 0px'}} >logout</NavLink>
				</div>

				<RowMenu />
				
				<div className = 'data_top' id = 'scroll'>
					<ROW Data = {this.state.tx_data} />
				</div>

				<div className = 'input_bottom'>
					<InputForm 
							onKeyPress = {this.handleInput } 
							status_text= {this.state.status } 
							onClick    = {this.clickBottom }
							/>
				</div>
					 
			</Fragment>
		);
	}
}

export default Tal_Book;