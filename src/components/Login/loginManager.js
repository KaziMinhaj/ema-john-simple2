import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializedLoginFramework = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // if already initialized, use that one
    }
}

export const handleGoogleSignIn = () => {
    var googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
        .then(result => {
            const { displayName, photoURL, email } = result.user;
            const signedUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true
            }
            return signedUser
        })
        .catch(error => {
            console.log(error);
        })
}

export const handleFbSignIn = () => {
    var fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase
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
            user.success = true;
            return user
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

export const handleSignOut = () => {
    return firebase.auth().signOut().then(() => {
        const signedOut = {
            isSignedIn: false,
            name: '',
            email: '',
            photo: ''
        }
        return signedOut
    }).catch((error) => {
        // An error happened.
    });
}

export const createUserWithEmailAndPassword = (email, password, name) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((response) => {
            const newUserInfo = response.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            updateUserName(name)
            return newUserInfo
        })
        .catch((error) => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo
        });
}

export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then((response) => {
            const newUserInfo = response.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            return newUserInfo
        })
        .catch((error) => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo
        });
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