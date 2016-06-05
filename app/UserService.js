import firebase from "firebase";
import PubSub from "pubsub-js"

class UserService {
    constructor() {
        this.users = null;
        this.currentUser = null;
        this.usersPopulatedFromFirebase = false;
        this.onUsersPopulatedFromFirebase = null;

        firebase.auth().onAuthStateChanged(u => {
            this._onThirdPartyLogin(u);
        });

        firebase.database().ref("users").on("value", function(snapshot) {
            this.users = snapshot.val();

            // Add key as a property on the user instance.
            for (var k in this.users) {
                this.users[k].key = k;
            }

            this.usersPopulatedFromFirebase = true;
            if (this.onUsersPopulatedFromFirebase !== null) {
                this.onUsersPopulatedFromFirebase();
                this.onUsersPopulatedFromFirebase = null;
            }
        }.bind(this));

    }

    getUserByKey(key) {
        if (this.users === null) {
            throw "users have not been retrieved"
        }

        return this.users[key];
    }

    _setCurrentUser(currentUser) {
        this.currentUser = currentUser;
        PubSub.publish("SET_CURRENT_USER", this.currentUser);
    }

    _onThirdPartyLogin(tpUser) {
        if (!this.usersPopulatedFromFirebase) {
            this.onUsersPopulatedFromFirebase = (function() {
                this._onThirdPartyLogin(tpUser);
            }).bind(this);
            return;
        }

        for (let k in this.users) {
            let checkUser = this.users[k];
            if (checkUser.email === tpUser.email) {
                this._setCurrentUser(checkUser);
                return;
            }
        }

        this._setCurrentUser(this._addUser(tpUser));
    }

    _addUser(tpUser) {
        console.log(tpUser);

        let newUser = {
            displayName: tpUser.displayName,
            email: tpUser.email,
            photoUrl: tpUser.photoURL
        }

        let usersPath = "users";
        let newKey = firebase.database().ref(usersPath).push().key;
        let newUserPath = usersPath + "/" + newKey;
        let updates = {};
        updates[newUserPath] = newUser;
        firebase.database().ref().update(updates);

        return newUser;
     }

}

export default UserService;