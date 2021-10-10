var express = require('express');
const { use } = require('.');
var router = express.Router();
const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/";

/* send friend request. */
router.post('/', function(req, res, next) {
    const { myUsername, loggedInID, otherFirstname, otherLastname, otherUsername } = req.body;
    if(typeof(myUsername) != "string" || typeof(loggedInID) != "number" 
    || typeof(otherFirstname) != "string" || typeof(otherLastname) != "string" || typeof(otherUsername) != "string"
    || myUsername == otherUsername)
    { 
        res.status(400).send("Wrong parameter!");
    }else{
        MongoClient.connect(url, (error, database) => {
            if(error) { throw error; }
            let dbo = database.db("database");
            dbo.collection("users").find({"username": myUsername}).toArray((error, result) => {
                if(error){ throw error; }
                let addedUser = {"firstname": otherFirstname, "lastname": otherLastname, "username": otherUsername};
                friendsObject = result[0].friends;
                let alreadyFriend = false;
                for(const friend of friendsObject){
                    if(friend.username == otherUsername)
                    {
                        alreadyFriend = true;
                        break;
                    }
                }
                if(alreadyFriend){
                    res.status(403).send("You are already friends!");
                    database.close();
                }
                else if(result[0].loggedInID == loggedInID && result[0].loggedInID != null)
                {
                    dbo.collection("users").updateOne({"username": myUsername}, {$addToSet: {"sendRequests": addedUser}})
                    .then((obj) => {
                        let myInfo  = {"firstname": result[0].firstname, "lastname": result[0].lastname, "username": myUsername};
                        dbo.collection("users").updateOne({"username": otherUsername}, {$addToSet: {"receivedRequests": myInfo}})
                        .then((obj) => {
                            res.status(200).send("Friend request sent!");
                            database.close(); 
                        });
                    });          
                }else{
                    res.status(401).send("Unauthorized!");
                    database.close();
                }
            });
        
        });
    }
});

module.exports = router;
