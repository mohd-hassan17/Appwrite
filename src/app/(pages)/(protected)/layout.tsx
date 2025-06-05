
"use client"
import useAuth from "@/context/useAuth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

import React from "react"

const ProtectedLayout = ({
    children,
  }: {
    children: React.ReactNode
  }) => {

    const router = useRouter();
    const { authStatus } = useAuth();

    // if (!authStatus) {
    //     router.replace("/login");
    //     return <></>;
    // }
    useEffect(() => {
    if (!authStatus) {
      router.replace("/login");
    }
  }, [authStatus, router]);
    return children

}

export default ProtectedLayout;
