"use client";
export const dynamic = "force-dynamic";
import { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage("❌ خطأ في إنشاء الحساب");
    } else {
      setMessage("✅ تم إنشاء الحساب بنجاح");
      setTimeout(() => {
        window.location.href = "/auth/login";
      }, 1000);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white shadow p-6 rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">إنشاء حساب</h1>

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
        onClick={handleSignup}
        className="bg-green-600 text-white p-3 rounded w-full"
      >
        إنشاء حساب
      </button>

      {message && (
        <p className="text-center mt-4 font-bold text-red-600">{message}</p>
      )}
    </div>
  );
}
