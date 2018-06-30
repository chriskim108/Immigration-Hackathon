import React, { Component } from "react";

class MessageList extends Component{
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
            <div>

                <h1>Created Messages</h1>
                {
                    filteredMessages.map( (data, index) => 
                        <div key={index}>
                            <h1>{data.content}</h1>    

                            <br/>
                        
                            <em>
                                <strong>
                                    {data.username}                             
                                </strong>
                            </em>

                            <button onClick={() => this.deleteMessage(data.key)}>
                                Remove Message
                            </button>
                        </div>
                    ) 
                }
                
                {/* Form to input messages */}
                <form onSubmit={ this.createMessage.bind(this) } >
                    <label className="newMessageLabel">Create a new message</label>
                    
                    <br/>

                    <input 
                        type="text" 
                        ref="messageOfRoom" 
                        placeholder="Enter Message"/>

                    <input 
                        type="submit" 
                        value="Send Message"/>
                </form>
            </div>
        )
    }
}


export default MessageList;