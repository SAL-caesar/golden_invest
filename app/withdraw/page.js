export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const fetchCache = "force-no-store";
export const revalidate = 0;

"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function WithdrawPage() {
  const [session, setSession] = useState(null);
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [wallet, setWallet] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        window.location.href = "/auth/login";
        return;
      }

      setSession(data.session);

      const { data: walletData } = await supabase
        .from("user_wallets")
        .select("balance")
        .eq("user_id", data.session.user.id)
        .single();

      setBalance(walletData?.balance || 0);
    };

    load();
  }, []);

  const handleWithdraw = async () => {
    if (!amount || !wallet) {
      setMessage("❌ يرجى ملء جميع الحقول");
      return;
    }

    if (amount > balance) {
      setMessage("❌ المبلغ أكبر من الرصيد");
      return;
    }

    const { error } = await supabase.from("withdraw_requests").insert({
      user_id: session.user.id,
      amount,
      wallet,
      status: "pending",
    });

    if (error) {
      setMessage("❌ حدث خطأ");
    } else {
      setMessage("✅ تم إرسال طلب السحب");
      setAmount("");
      setWallet("");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-20 bg-white shadow p-6 rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-center">طلب سحب الأموال</h1>

      <p className="text-xl mb-6 text-center">
        <strong>الرصيد:</strong> {balance} USDT
      </p>

      <input
        type="number"
        className="border p-3 rounded w-full mb-3"
        placeholder="المبلغ"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />

      <input
        type="text"
        className="border p-3 rounded w-full mb-3"
        placeholder="عنوان محفظة USDT-TRC20"
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
      />

      <button
        onClick={handleWithdraw}
        className="bg-blue-600 text-white p-3 rounded w-full"
      >
        إرسال الطلب
      </button>

      {message && <p className="text-center mt-4">{message}</p>}
    </div>
  );
}
