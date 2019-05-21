import React, {Fragment , Component} from 'react';
import { BrowserRouter , NavLink , Switch , Route , Redirect } from 'react-router-dom';
import './app.css'
import Home from './pages/Home'
import Tal_Book from './pages/Tal_Book';

/*const socket = webSocket('http://140.112.251.175:3001')

if (socket !== undefined) {
	console.log("Connected to sockets!");
}*/

class App extends Component {
	render(){
		return(
			<BrowserRouter>
				<Router />
			</BrowserRouter>
		)
	}
}

class Router extends Component {
	render(){
		return(
			<div className = 'container'>
				<Switch>
					<Route exact path = '/' component = {Home}></Route>
					<Route exact path = '/home' component = {Home}></Route>
					<Route path = "/main/:name?" component = {Tal_Book}></Route>
				</Switch>
			</div>
		)
	}
}

export default App;

/*
	constructor(props){
		super(props);
		this.state = {
			tx_data : [] ,
			status : ''
		}

	}
	componentWillMount(){
		socket.on("init", data => {
			console.log('INITIALIZE');
			this.updateData( data ) ;
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
			var userName = element("username"); // clear input field
			var userVal = element("uservalue");
			var userNote = element("usernote");
			userName.value = '';
			userVal.value = '';
			userNote.value = '';
		})

		socket.on('dbfault' , ()=> {
			console.log('db connect fail')
		})

		socket.on('status' , s => {
			console.log('client rdeceive status')
			this.setState( state => state.status = s ) ;
			setTimeout(() => {
				this.setState ( state => state.status = '') 
			}, 1500);
		})
	}
	
	updateData = data => {
		this.setState( state => state.tx_data = data )
	}

<Tal_Book Data = {this.state.tx_data} Status = {this.state.status} />

*/