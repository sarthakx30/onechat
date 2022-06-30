import React from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';


const SignOut=()=>{
    const auth=firebase.auth();
    return auth.currentUser && (
        <button onClick={()=>auth.signOut()}>Log Out</button>
    )
}

export default SignOut;