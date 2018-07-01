import React, { Component } from "react";
import './TextBox.css'

class TextBox extends Component{
    constructor(props){
        super(props);

        this.state = {
            messages:[]
        }

        this.messageRef = this.props.firebase.database().ref('messages');
    }

    componentDidMount(){
        this.messageRef.on("child_added", snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat( message ) })
        })
    }

    createMessage(e){
        e.preventDefault();
        // Retriving the values from the input tag
        let newContent = this.refs.messageOfRoom.value;
        let newRoomId = this.props.activeRoom;
        let newSentAt = this.props.firebase.database.ServerValue.TIMESTAMP;
        let newUser = this.props.userInformation ? this.props.userInformation.displayName : "Guest";

        // Pushing it to FireBase
        this.messageRef.push({
            content:newContent,
            roomId:newRoomId,
            sentAt:newSentAt,
            username:newUser
        });

        console.log("NEW USER HERE: " + newUser);
    }

    deleteMessage(messageId) {
        let remainMessages= this.state.messages.filter(message => message.key !== messageId);
        this.setState({ messages: remainMessages});
    }

    render(){

        let filteredMessages = this.state.messages.filter(message => message.roomId === this.props.activeRoom);
        console.log("Filtered " + this.state.messages.length + " messages down to " + filteredMessages.length + " active messages.");

        return(
            <div className ="form">
                <form onSubmit={ this.createMessage.bind(this) } id="textForm">

                    <br/>
                    <input
                        className="send"
                        type="submit"
                        value="Send Message"/>

                    <input
                        id="inputText"
                        type="text"
                        ref="messageOfRoom"
                        placeholder="Enter Message"/>


                </form>
            </div>
        )
    }
}


export default TextBox;
