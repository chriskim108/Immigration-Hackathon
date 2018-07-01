import React, { Component } from "react";
import './RoomList.css';

class RoomList extends Component{
    constructor(props){
        super(props);

        this.state = {
            rooms: [],
            newRoom:"",
        };

        this.roomsRef = this.props.firebase.database().ref('rooms');
        this.handleChange = this.handleChange.bind(this);
        this.createRoom = this.createRoom.bind(this);

    }

    componentDidMount(){
        this.roomsRef.on("child_added", snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ) })
        })

        this.roomsRef.on("child_removed", snapshot => {
            const deletedRoom = snapshot.val();
            deletedRoom.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.pop( deletedRoom ) })
        })
    }

    handleChange(e){
        e.preventDefault();
        this.setState({ newRoomName: e.target.value });
    }

    createRoom(e){
        e.preventDefault();
        // Retriving the values from the input tag
        let newRoom = this.refs.nameOfRoom.value;

        // Pushing it to FireBase
        this.roomsRef.push({
            name: newRoom
        });
    }

    selectedRoom(room){
        this.props.activeRoomSelected(room);
    }

    deleteRoom(roomId) {
        let remainRooms = this.state.rooms.filter(room => room.key !== roomId);
        this.setState({ rooms: remainRooms});
    }

    render(){
        return(
            <div className = "wrapper">

                <h1 className="header">Chat Rooms</h1>
                <div className = "scroll">
                {
                    this.state.rooms.map( (data, index) =>
                      <div className = "rooms">
                        <div onClick={ ()=>this.props.activeRoomSelected(data.key) }
                             key={index} >
                      </div>

                            <p>
                                {data.name}
                            </p>

                            <button onClick={() => this.deleteRoom(data.key)}>
                                Delete Room
                            </button>
                        </div>

                    )
                  }
                </div>



                <form className="form" onSubmit={ this.createRoom.bind(this) } >

                    <br/>

                    <input
                        type="text"
                        ref="nameOfRoom"
                        placeholder="Create a new room"
                        className="newRoomInput"/>

                    <input
                        type="submit"
                        value="Create Room"
                        className="newRoomSubmit"/>
                </form>

            </div>
        )
    }
}

export default RoomList;
