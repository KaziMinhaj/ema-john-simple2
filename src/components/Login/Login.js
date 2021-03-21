import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext, useState } from 'react';
import { UserContext } from "../../App";

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}


function Login() {
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        password: '',
        error: '',
        success: false
    })

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    var googleProvider = new firebase.auth.GoogleAuthProvider();
    var fbProvider = new firebase.auth.FacebookAuthProvider();

    const handleSignIn = () => {
        firebase.auth().signInWithPopup(googleProvider)
            .then(result => {
                const { displayName, photoURL, email } = result.user;
                const signedUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setUser(signedUser)
                console.log(displayName, email, photoURL);
            })
            .catch(error => {
                console.log(error);
            })
    }
    const handleSignOut = () => {
        firebase.auth().signOut().then(() => {
            const signedOut = {
                isSignedIn: false,
                name: '',
                email: '',
                photo: ''
            }
            setUser(signedOut)
        }).catch((error) => {
            // An error happened.
        });
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((response) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo)
                    updateUserName(user.name)
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((response) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo) //context api
                    console.log('sign in user info', response.user);

                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo)
                });
        }
    }
    const handleBlur = (event) => {
        let isFormValid = true;
        console.log(event.target.value, event.target.name);
        if (event.target.name === "email") {
            isFormValid = /\S+@\S+\.\S+/.test(event.target.value)
        }
        if (event.target.name === "password") {
            const isPassValid = event.target.value.length > 6
            const passContainNumber = /\d{1}/.test(event.target.value)
            isFormValid = (isPassValid && passContainNumber);
        }
        if (isFormValid) {
            //copy user state value
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            console.log("name::", event.target.value);
            setUser(newUserInfo)
        }
    }

    const updateUserName = (name) => {
        console.log("updateUserName", name);
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name
        }).then(function () {
            // Update successful.
            console.log('update successfully');
        }).catch(function (error) {
            // An error happened.
            console.log(error);
        });
    }

    //facebook sign in
    const handleFbSignIn = () => {
        firebase
            .auth()
            .signInWithPopup(fbProvider)
            .then((result) => {
                console.log("facebook result:", result);
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;

                // The signed-in user info.
                var user = result.user;

                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                var accessToken = credential.accessToken;

                // ...
                console.log("facebook user :", user);
            })
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;

                // ...
                console.log("error code: ", errorCode, "error message :", errorMessage);
            });
    }
    return (
        <div style={{ textAlign: 'center' }}>
            {
                user.isSignedIn ? <button onClick={handleSignOut}>sign out</button>
                    : <button onClick={handleSignIn}>sign in</button>
            }
            <br />
            {

                <button onClick={handleFbSignIn} > Facebook Login</button>
            }
            {
                user.isSignedIn && <p>Welcome {user.name}</p>
            }

            <div className="myform">
                <form action="" onSubmit={handleSubmit}>
                    <input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)} />
                    <label htmlFor="newUser">signup</label>
                    <br />
                    {newUser && <input type="text" name="name" placeholder="name" onBlur={handleBlur} />}
                    <br />
                    <input type="text" name="email" placeholder="email" onBlur={handleBlur} required />
                    <br />
                    <input type="password" name="password" placeholder="password" onBlur={handleBlur} required />
                    <br />
                    <input type="submit" value={newUser ? 'sign up' : 'sign in'} />
                </form>
                <p style={{ color: 'red' }}> {user.error}</p>
                {user.success && <p style={{ color: 'green' }}> {newUser ? "created" : "logged In"}  success</p>}
                <div>
                    <h5>name: {user.name}</h5>
                    <h5>email:{user.email}</h5>
                    <h5><small>password:{user.password}</small></h5>
                </div>
            </div>
        </div>
    );
}

export default Login;
