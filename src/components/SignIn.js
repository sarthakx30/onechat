import React, { useState } from 'react';
// import Avatar from "cartoon-avatar";
// import { randomizeAvatar } from 'cartoon-avatar/util/randomizer';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

const toonavatar = require('cartoon-avatar');
const Avatar1url = toonavatar.generate_avatar();
const Avatar2url = toonavatar.generate_avatar();
const Avatar3url = toonavatar.generate_avatar();
const Avatar4url = toonavatar.generate_avatar();

const SignIn = () => {
    const auth = firebase.auth();
    auth.useDeviceLanguage();
    const generateRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
            }
        }, auth);
    }

    const countryCode = "+91";
    const [expandForm, setExpandForm] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState(countryCode);
    const [OTP, setOTP] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        if (phoneNumber.length >= 12) {
            setExpandForm(true);
            generateRecaptcha();
            let appVerifier = window.recaptchaVerifier;
            signInWithPhoneNumber(auth, phoneNumber, appVerifier)
                .then((confirmationResult) => {
                    // SMS sent. Prompt user to type the code from the message, then sign the
                    // user in with confirmationResult.confirm(code).
                    window.confirmationResult = confirmationResult;
                    // ...
                }).catch((error) => {
                    // Error; SMS not sent
                    console.log(error);
                    alert("Captcha Verification Failed");
                });
        }
    }
    
    const [avatar,setAvatar]=useState('');
    const [name,setName]=useState('');

    const verifyOTP = (e) => {
        let otp = e.target.value;
        setOTP(otp);

        if (otp.length === 6 && name.length>0 && avatar!=='') {
            let confirmationResult = window.confirmationResult;
            confirmationResult.confirm(otp).then((result) => {
                // User signed in successfully.
                const user = result.user;
                user.photoURL=avatar;
                user.displayName=name;
                console.log(user);
                // ...
            }).catch((error) => {
                // User couldn't sign in (bad verification code?)
                alert("Incorrect OTP or Name or Avatar not selected");
                console.log(error);
            });
        }
    }

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }

    
    const avatarHandler=(e)=>{
        console.log(e.target.src);
        let avatarURL=e.target.src;
        setAvatar(avatarURL);
        // console.log(avatar);
        // console.log(auth);
    }

    return (
        <div className="signInMethods">
            <form onSubmit={submitHandler}>
                <h1>Sign in with phone number</h1>
                <div className="phoneField">
                    <label htmlFor="phoneNumberInput">Phone Number</label>
                    <input value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }} type="tel" id="phoneNumberInput" placeholder="Enter phone number" />
                </div>
                {expandForm === true ?
                    <div className="otpField">
                        <label htmlFor="otpInput">OTP</label>
                        <input value={OTP} onChange={verifyOTP} type="number" id="otpInput" placeholder="Enter OTP" />
                        <label htmlFor="nameField"></label>
                        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} id="nameField" placeholder="Enter Name"></input>
                        <div className="avatars">
                            <img onClick={avatarHandler} src={Avatar1url} />
                            <img onClick={avatarHandler} src={Avatar2url} />
                            <img onClick={avatarHandler} src={Avatar3url} />
                            <img onClick={avatarHandler} src={Avatar4url} />
                        </div>
                    </div>
                    : null}
                {expandForm === false ?
                    <div classname="btns">
                        <button id="request-otp" type="submit">Request OTP</button>
                        <button className="signIn-btn" onClick={signInWithGoogle}><FontAwesomeIcon icon={faGoogle} /> Sign-In</button>
                    </div> : null}
                <div id="recaptcha-container"></div>
            </form>

        </div>
    )
}

export default SignIn;