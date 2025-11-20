'use client';
import {useState} from 'react';
import { supabase } from "../../../lib/supabaseClient";

export default function LoginPage(){
 const [email,setEmail]=useState('');
 const [password,setPassword]=useState('');
 const [msg,setMsg]=useState('');

 const handle=async()=>{
   const {error}=await supabase.auth.signInWithPassword({email,password});
   if(error) setMsg('خطأ تسجيل');
   else window.location='/dashboard';
 };

 return <div>login</div>;
}
