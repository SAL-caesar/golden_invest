"use client";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const fetchCache = "force-no-store";
export const revalidate = 0;

import { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) setMessage("خطأ في التسجيل");
    else window.location.href = "/auth/login";
  };

  return (
    <div>إنشاء حساب</div>
  );
}
