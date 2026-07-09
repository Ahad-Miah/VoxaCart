import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../../utils/firebase.init';
import axios from 'axios';

export const AuthContext=createContext()
const provider = new GoogleAuthProvider;
const AuthProvider = ({children}) => {

     const [loading, setLoading] = useState(true);
    const [user,setUser]=useState(null);
// register a user
    const register=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
      //  login user

    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }


    //update profile 
    const handleUpdateProfile =(name,photo)=>{
 return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        })
    }
    // signout 
    const Signout = () => {
        setLoading(true);
        return signOut(auth)
    }
    // google login

    const loginWithGoogle=()=>{
return signInWithPopup(auth, provider)
    }

    // ovserver
    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
       if (currentUser && (!currentUser.displayName || !currentUser.photoURL)) {
            // 1. Firebase-ke bolbo ektu data refresh kore nite
            await currentUser.reload();
            // 2. Refresh hobar por updated user ta nibo
            const refreshedUser = auth.currentUser;
            setUser(refreshedUser);
        } else {
            setUser(currentUser);
        }
        
        setLoading(false);

        if (currentUser?.email && currentUser.displayName) {
            try {
                const userData = {
                    name: currentUser?.displayName || "Anonymous",
                    email: currentUser?.email,
                    image: currentUser?.photoURL || "",
                    role: "customer"
                };

                // Backend API call
                const res = await axios.post(`http://localhost:5000/users/${currentUser?.email}`, userData);
                // console.log("User tracking check:", res.data);
                
            } catch (error) {
                // User already exist korle ba onno error hole ekhane handle hbe, server crash korbe na
                if (error.response?.status === 409) {
                    console.log("User already exists, login successful.");
                } else {
                    console.error("Error saving user to database:", error);
                }
            }
        }
    });

    return () => {
        unsubscribe();
    };
}, []);

    const authInfo={
       register,
       handleUpdateProfile,
       Signout,
       setLoading,
       login,
       loginWithGoogle,
       user,
       loading

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;