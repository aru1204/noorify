import { createUserWithEmailAndPassword, deleteUser, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../../Utilities/firebase.init';
import useAxiosPublic from '../../Hooks/useAxiosPublic/useAxiosPublic';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const provider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();


    // New User Create 

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // Google Login 

    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, provider)
    }

    // Login User 

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    // Logout User 

    const logoutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

    // Google user delete

    const deleteGoogleUser = () => {
        return deleteUser(auth.currentUser)
    }

    // Update User Profile 

    const updateUserProfile = (name) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name
        });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if(!currentUser){
                await axiosPublic.post("/logout", {}, {withCredentials: true})
                .then(res => {
                })
            }
            setLoading(false)
        });
        return () => {
            return unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        loading,
        createUser,
        loginUser,
        logoutUser,
        googleLogin,
        updateUserProfile,
        deleteGoogleUser
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;