'use client';
import React, {use, useEffect} from 'react';
import useAuth from '@/context/useAuth';    
import { useRouter } from 'next/navigation';
import appwriteService from '@/appwrite/config';

const LogoutPage = () => {
    const { setAuthStatus } = useAuth();
    const router = useRouter();

    useEffect(() => {
        appwriteService.logout()
            .then(() => {
                setAuthStatus(false);
                router.push('/');
            })
            
    }, []);
   
    return(

        <></>
    ) 
};

export default LogoutPage;