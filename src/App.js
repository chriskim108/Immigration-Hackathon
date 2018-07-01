import React, { Component } from 'react';
import RoomList from "./components/RoomList";
import MessageList from "./components/MessageList";
// import User from "./components/User";
import TextBox from "./components/TextBox";
import './App.css';
import * as firebase from 'firebase';

class App extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      activeRoom: "",
      userInformation:"",
    };
    
    this.activeRoomSelected = this.activeRoomSelected.bind(this);
    this.setUser = this.setUser.bind(this);
  }
  
  activeRoomSelected(room){
    let roomSelected = room;
    this.setState({activeRoom:roomSelected});
    console.log(this.state.activeRooms);
  }
  
  setUser(user){
    let authorizedUser = user;
    this.setState({ userInformation: authorizedUser});
    console.log(authorizedUser);
  }
  
  render() {
    return (
      <div id="App">

        <div>
          <RoomList 
          firebase={firebase}
          activeRoom={this.state.activeRoom} 
          activeRoomSelected={this.activeRoomSelected.bind(this)} />
        </div>

        <div id="App_messages">
          <div>
            <MessageList
            firebase={firebase}
            activeRoom={this.state.activeRoom} 
            activeRoomSelected={this.activeRoomSelected.bind(this)}
            userInformation={this.state.userInformation}
            setUser={this.setUser.bind(this)}/>
          </div>

          <div>
            {/* <User 
            firebase={firebase}
            userInformation={this.state.userInformation}
            setUser={this.setUser.bind(this)}/> */}
            <TextBox 
            firebase={firebase}
            activeRoom={this.state.activeRoom} 
            activeRoomSelected={this.activeRoomSelected.bind(this)}
            userInformation={this.state.userInformation}
            setUser={this.setUser.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
}

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAMdnxm_WQ8qv-IvXoRUz-SfKC0T8A-siI",
  authDomain: "wihelp-f5681.firebaseapp.com",
  databaseURL: "https://wihelp-f5681.firebaseio.com",
  projectId: "wihelp-f5681",
  storageBucket: "wihelp-f5681.appspot.com",
  messagingSenderId: "545540919875"
};
firebase.initializeApp(config);

export default App;







