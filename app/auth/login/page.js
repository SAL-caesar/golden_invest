"use client";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const fetchCache = "force-no-store";
export const revalidate = 0;

import { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) setMessage("خطأ في تسجيل الدخول");
    else window.location.href = "/dashboard";
  };

  return (
    <div>تسجيل الدخول</div>
  );
}
