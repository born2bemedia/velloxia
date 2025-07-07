"use client";
import React, { useEffect } from "react";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "@/styles/login.scss";
import ChangePasswordReset from "../dashboard/_components/ChangePasswordReset";

function SetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("code");
  const router = useRouter();

  useEffect(() => {
    if (token) {
      localStorage.setItem("resetToken", token);
    }
  }, [token]);

  if (!token) {
    return (
      <section className="change-password log-in">
        <div className="_container">
          <h1>Invalid or expired link.</h1>
        </div>
      </section>
    );
  }

  return <ChangePasswordReset token={token} />;
}

export default function SetPassword() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SetPasswordContent />
    </Suspense>
  );
}
