export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const fetchCache = "force-no-store";
export const revalidate = 0;

"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function DashboardPage() {
  const [session, setSession] = useState(null);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        window.location.href = "/auth/login";
        return;
      }

      setSession(data.session);

      const { data: wallet } = await supabase
        .from("user_wallets")
        .select("balance")
        .eq("user_id", data.session.user.id)
        .single();

      setBalance(wallet?.balance || 0);
    };

    load();
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-20 bg-white p-6 rounded-lg">
      <h1 className="text-3xl font-bold mb-4">لوحة التحكم</h1>

      {session && (
        <>
          <p className="text-xl mb-3">
            <strong>البريد:</strong> {session.user.email}
          </p>

          <p className="text-xl mb-6">
            <strong>الرصيد:</strong> {balance} USDT
          </p>

          <a
            href="/withdraw"
            className="bg-green-600 text-white p-3 block rounded text-center"
          >
            سحب الأموال
          </a>
        </>
      )}
    </div>
  );
}
