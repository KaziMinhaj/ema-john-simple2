
import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { Redirect, useHistory, useLocation } from "react-router";
import { handleFbSignIn, handleSignOut, handleGoogleSignIn, initializedLoginFramework, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './loginManager';

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

    initializedLoginFramework();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    //handle response 
    const handleResponse = (res, redirect) => {
        setUser(res)
        setLoggedInUser(res);
        if (redirect) {
            history.replace(from) // for redirection
        }
    }
    //handle sign in
    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res, true)
            })
    }

    //facebook sign in
    const fbSignIn = () => {
        handleFbSignIn()
            .then(res => {
                handleResponse(res, true)
            })
    }

    //handle sign out
    const signOut = () => {
        handleSignOut()
            .then(res => {
                handleResponse(res, false)
            })
    }

    //private route
    const history = useHistory()
    const location = useLocation()
    let { from } = location.state || { from: { pathname: "/" } };

    const handleSubmit = (event) => {
        event.preventDefault()
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.email, user.password, user.name)
                .then(res => {
                    handleResponse(res, true)
                })
        }
        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    handleResponse(res, true)
                })
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
    return (
        <div style={{ textAlign: 'center' }}>
            {
                user.isSignedIn ? <button onClick={signOut}>sign out</button>
                    : <button onClick={googleSignIn}>sign in</button>
            }
            <br />
            {

                <button onClick={fbSignIn} > Facebook Login</button>
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
