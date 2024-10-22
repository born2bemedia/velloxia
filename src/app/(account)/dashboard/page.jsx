"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/stores/authStore"; 
import LogoutButton from "./_components/LogoutButton";

const Dashboard = () => {
  const router = useRouter();
  const { currentUser, fetchCurrentUser } = useAuthStore();

  useEffect(() => {
    if (!currentUser) {
      fetchCurrentUser(); 
      router.push("/log-in");
    }
  }, [currentUser]);

  return (
    <div>
      <h1>Dashboard</h1>
      {currentUser ? (
        <>
            <p>Welcome, {currentUser.username}!</p>
            <LogoutButton />
        </> 
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
