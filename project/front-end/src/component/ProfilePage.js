import React, { Component } from 'react'
import FriendList from './FriendList'
import PostList from './PostList'
import FriendRequestList from './FriendRequestList'

export class ProfilePage extends Component {
    constructor(props){
        super(props)

        this.props.setMyCred(this.props.data.username, this.props.data.loggedInID)

        this.logout = this.logout.bind(this)
        this.showFriend = this.showFriend.bind(this)
    }

    logout = async () => {
        const object = {
            myUsername: this.props.data.username,
            loggedInID: this.props.data.loggedInID
        }
        await fetch("http://localhost:3000/logout", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(object)
        }).then((res) => 
        {   
            if(!res.ok) {throw new Error(res.status)}
        }).catch((err) => {
            console.log(err.message)
        })

        this.props.changePage("start-page")
    }

    showFriend = (params) => {
        const object = {
            myUsername: this.props.data.username,
            loggedInID: this.props.data.loggedInID,
            friendUsername: params
        }
        fetch("http://localhost:3000/friendprofile", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(object)
        }).then((res) => 
        {   
            if(!res.ok) {throw new Error(res.status)}
            return res.json()
        })
        .then((friendsInfo) => {
            
            this.props.changePage("friend-page", friendsInfo)
        }).catch((err) => {
            console.log(err.message)
        })
    }

    render() {
        return (
            <div>
                <div className="primary-box p-3 topheader">
                    <div className="d-flex justify-content-between ">
                        <h1>Welcome { this.props.data.firstname }</h1>
                        <button className="btn btn-danger mr-2 btn-sm" onClick = { this.logout }> Logout </button>
                    </div>
                </div>
                <div className="text-center p-3">
                    <button className="w-25 btn btn-primary" onClick = {() => this.props.changePage("find-user-page", this.props.data)} >Find friend</button>
                </div>

                <div className="d-flex">
              
                    <div className="primary-box w-25 mr-2 ml-2 p-2">
                        <h4>Friends list</h4>
                        <FriendList friends = { this.props.data.friends } myUsername = { this.props.data.username }
                        loggedInID = { this.props.data.loggedInID } 
                        showFriend = { this.showFriend } changePage = {this.props.changePage}/>
            
                    </div>
                    <div className="primary-box w-50 mr-2 p-2" style={{ minHeight: "600px" }}>
                        <h4>Timeline </h4>
                        <PostList postList = { this.props.data.posts } myUsername = { this.props.data.username }
                          loggedInID = { this.props.data.loggedInID } destUsername = { this.props.data.username }/> 
                    </div>
                    
                    <div className="primary-box w-25 mr-2 p-2">
                        <h4>Friend Requests</h4>
                        <FriendRequestList friendRequestList = { this.props.data.receivedRequests } myUsername = { this.props.data.username }
                          loggedInID = { this.props.data.loggedInID }  />
                    </div>
                </div>  
            </div>
        )
    }
}

export default ProfilePage
