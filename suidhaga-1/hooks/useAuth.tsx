import React ,{ useEffect, useState }  from 'react';
import { auth }                 from '@/firebase/setup';
import { setPersistence,
    browserSessionPersistence,
    onAuthStateChanged , getAuth}        from 'firebase/auth';
import { log } from 'console';
import { User } from 'firebase/auth';

interface AuthState {
    loading: boolean;
    user: User | null;
}

export function useFirebaseAuthPersistence() {
    useEffect(()=>{
        setPersistence(auth,browserSessionPersistence)
        .then(()=>{
            console.log(auth.currentUser);
            
            console.log('Authentication persistence set successfully!');
        })
        .catch((err)=>{
            console.log('error setting persistence',err);
        })
    },[])
}

export const UseAuth = ():AuthState => {
    const[authState,setAuthState] = useState<AuthState>({loading:true,user:null})
    
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            setAuthState({
                loading: false,
                user: user
            });
        });
        return () => unsubscribe();
    },[])

    return authState;
}