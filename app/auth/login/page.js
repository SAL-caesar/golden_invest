"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage("❌ خطأ في تسجيل الدخول");
    } else {
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white shadow p-6 rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">تسجيل الدخول</h1>

      <input
        type="email"
        placeholder="البريد الإلكتروني"
        className="border p-3 rounded w-full mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="كلمة المرور"
        className="border p-3 rounded w-full mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white p-3 rounded w-full"
      >
        تسجيل الدخول
      </button>

      {message && (
        <p className="text-center mt-4 font-bold text-red-600">{message}</p>
      )}
    </div>
  );
}
