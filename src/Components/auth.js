import { auth, googleProvider } from '../Config/firebase.js';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { useState } from 'react';

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    console.log(auth?.currentUser?.photoURL);

    const SignIn = async () => {
        try {
        await createUserWithEmailAndPassword(auth, email, password)
    } catch(err) {
        console.error(err);
    }
    };

    const SignInWithGoogle = async () => {
        try {
        await signInWithPopup(auth, googleProvider)
    } catch(err) {
        console.error(err);
    }
    };

    const logout = async () => {
        try {
        await signOut(auth)
    } catch(err) {
        console.error(err);
    }
    };

    return (
        <div>
            <input placeholder="Email.." onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password.." onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={SignIn}>Sign in</button>

            <button onClick={SignInWithGoogle}>Sign in with Google</button>

            <button onClick={logout}>Log Out</button>
        </div>
    );
};

export default Auth; // Export Auth as default
