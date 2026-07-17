"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { User, Mail, Calendar, Globe, Building2, UserPlus, Lock } from "lucide-react";
import { authClient } from "@/lib/auth/client";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "", email: "", password: "", confirmPassword: "",
    role: "", joinDate: "", domain: "", department: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleRegister = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    if (form.password !== form.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // 1. Save app-specific profile to your DB
      const backendResponse = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const backendData = await backendResponse.json();

      // Handle "Email already exists" from your database
      if (backendResponse.status === 409) {
        setErrorMessage("Account already exists. Please sign in.");
        setTimeout(() => router.push("/login"), 2000);
        setLoading(false);
        return;
      }

      if (!backendResponse.ok) {
        setErrorMessage(backendData.error || "Unable to save profile.");
        setLoading(false);
        return;
      }

      // 2. Register with Neon Auth
      try {
        await authClient.signUp.email({
          email: form.email,
          password: form.password,
          name: form.name,
        });
        router.push("/dashboard");
      } catch (authError) {
        console.error("Auth Error:", authError);
        setErrorMessage("Profile saved, but authentication failed. Please try logging in.");
      }
    } catch (err) {
      setErrorMessage("Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex w-1/2 bg-[#1f1f1f] text-white flex-col justify-center px-20">
        <h1 className="text-7xl font-light tracking-wider">JOIN THE</h1>
        <h1 className="text-7xl font-light tracking-wider mb-6">COMMUNITY</h1>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-2xl bg-white/80 backdrop-blur-xl shadow-2xl border-0 rounded-3xl">
          <div className="p-8">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input id="name" value={form.name} required placeholder="Full Name" onChange={handleChange} />
                <Input id="email" type="email" value={form.email} required placeholder="Email" onChange={handleChange} />
                <Input id="password" type="password" value={form.password} required placeholder="Password" onChange={handleChange} />
                <Input id="confirmPassword" type="password" value={form.confirmPassword} required placeholder="Confirm Password" onChange={handleChange} />
                <Input id="role" value={form.role} required placeholder="Role (Member/Lead)" onChange={handleChange} />
                <Input id="joinDate" type="date" value={form.joinDate} required onChange={handleChange} />
                <Input id="domain" value={form.domain} required placeholder="Domain" onChange={handleChange} />
                <Input id="department" value={form.department} required placeholder="Department" onChange={handleChange} />
              </div>
              {errorMessage && <div className="text-red-600 text-sm">{errorMessage}</div>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating..." : "Create Account"}
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}