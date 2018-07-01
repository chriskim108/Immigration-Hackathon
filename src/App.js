import React, { Component } from 'react';
import RoomList from "./components/RoomList";
import MessageList from "./components/MessageList";
import User from "./components/User";
import './App.css';
import * as firebase from 'firebase';
import axios from 'axios';
import APIkey from './secrets.js'
// import LanguageTranslatorV3 from 'watson-developer-cloud/language-translator/v3';
// import cors from 'cors';



// var languageTranslator = new LanguageTranslatorV3({
//   version: '2018-05-01',
//   iam_apikey: "yLEDbjvd1fxV4C0h82BrNkmTMuTzP3RFJeJN2kFl_nkH"
// });

// var parameters = {
//   text: 'Surprse mother fucker ',
//   model_id: 'en-es'
// };


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeRoom: "",
      userInformation: "",
    };

    this.activeRoomSelected = this.activeRoomSelected.bind(this);
    this.setUser = this.setUser.bind(this);
    this.button = this.button.bind(this);
  }

  activeRoomSelected(room) {
    let roomSelected = room;
    this.setState({ activeRoom: roomSelected });
    console.log(this.state.activeRooms);
  }

  setUser(user) {
    let authorizedUser = user;
    this.setState({ userInformation: authorizedUser });
    console.log(authorizedUser);
  }

  button(evt) {
    evt.preventDefault();
  
    axios.post("https://us-central1-wihelp-4c5ed.cloudfunctions.net/app/trans/", {text: 'de donde estas', lang: 'es'})
    .then(res => res.data)
    .then( data => data.translations)
    .then( translations => console.log(translations[0].translation, ` traslations is an array ${Array.isArray(translations)}`))
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.button}>helloWorld</button>
        <RoomList
          firebase={firebase}
          activeRoom={this.state.activeRoom}
          activeRoomSelected={this.activeRoomSelected.bind(this)} />

        <MessageList
          firebase={firebase}
          activeRoom={this.state.activeRoom}
          activeRoomSelected={this.activeRoomSelected.bind(this)}
          userInformation={this.state.userInformation}
          setUser={this.setUser.bind(this)} />

        <User
          firebase={firebase}
          userInformation={this.state.userInformation}
          setUser={this.setUser.bind(this)} />
      </div>
    );
  }
}

// Initialize Firebase
var config = {
  apiKey: APIkey,
  authDomain: "wihelp-f5681.firebaseapp.com",
  databaseURL: "https://wihelp-f5681.firebaseio.com",
  projectId: "wihelp-f5681",
  storageBucket: "wihelp-f5681.appspot.com",
  messagingSenderId: "545540919875"
};
firebase.initializeApp(config);

export default App;







