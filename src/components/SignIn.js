import React from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const SignIn=()=>{
    const auth=firebase.auth();
    const signInWithGoogle=()=>{
        const provider=new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }
    return(
        <button onClick={signInWithGoogle}>Google Sign-In</button>
    )
}

export default SignIn;