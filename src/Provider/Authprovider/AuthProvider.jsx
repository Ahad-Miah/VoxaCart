import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../../utils/firebase.init';
import axios from 'axios';

export const AuthContext=createContext()
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

    // ovserver
      useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, async currentUser => {
            // console.log("currentUSer",currentUser);
            setUser(currentUser);
            setLoading(false);
        
        })

        return () => {
            unsubscribe();
        }

    }, [])

    const authInfo={
       register,
       handleUpdateProfile,
       Signout,
       setLoading,
       login,
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