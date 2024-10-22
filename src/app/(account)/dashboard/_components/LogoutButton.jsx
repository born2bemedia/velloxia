"use client";
import { useRouter } from "next/navigation";
import useAuthStore from "@/stores/authStore"; 
import React from "react";

function LogoutButton() {
  const { setCurrentUser } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("jwt"); 

    setCurrentUser(null); 
    router.push("/log-in"); 
  };

  return (
    <li onClick={handleLogout}>
      <span>Log Out</span>
    </li>
  );
}

export default LogoutButton;
