"use client"
import React, { createContext, useContext, useState , ReactNode } from 'react';

interface LoadingContextType {
    isLoading: boolean;
    setLoading: (isLoading: boolean) => void;
}

interface LoadingProviderProps{
    children: ReactNode;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<LoadingProviderProps> = ({children}) => {
    const[ isLoading , setLoading ] = useState(false);

    return(
        <LoadingContext.Provider value={{isLoading,setLoading}}>
            {children}
        </LoadingContext.Provider>
    )
}

export const useLoading = () => {
    const context = useContext(LoadingContext)
    if(!context){
        throw new Error('useLoading must be used within a LoadingProvider')
    }
    return context;
}