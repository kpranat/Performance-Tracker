"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  User,
  Mail,
  Calendar,
  Globe,
  Building2,
  UserPlus,
  Lock,
} from "lucide-react";
import { authClient } from "@/lib/auth/client";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    joinDate: "",
    domain: "",
    department: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleRegister = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    if (form.password !== form.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!strongPasswordRegex.test(form.password)) {
    setErrorMessage("Please use a stronger password (see requirements below).");
    return;
  }

    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.role ||
      !form.joinDate ||
      !form.domain ||
      !form.department
    ) {
      setErrorMessage("Please fill in every field before creating your account.");
      return;
    }

    setLoading(true);

    try {
      const backendResponse = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          role: form.role,
          joinDate: form.joinDate,
          domain: form.domain,
          department: form.department,
        }),
      });

      const backendData = await backendResponse.json();

      if (backendResponse.status === 409) {
        setErrorMessage("Account already exists. Please sign in instead.");
        setLoading(false);
        return;
      }

      if (!backendResponse.ok) {
        setErrorMessage(backendData.error || "Unable to save profile data.");
        setLoading(false);
        return;
      }

      try {
        await authClient.signUp.email({
          email: form.email,
          password: form.password,
          name: form.name,
        });
      } catch (authError) {
        console.warn("Auth signup did not complete, but profile creation succeeded.", authError);
      }

      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          "tracker:user",
          JSON.stringify({
            name: form.name,
            email: form.email,
            role: form.role,
          })
        );
        window.localStorage.setItem("tracker:authenticated", "true");
      }

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setErrorMessage("Registration failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 bg-[#1f1f1f] text-white flex-col justify-center px-20">
        <h1 className="text-7xl font-light tracking-wider">JOIN THE</h1>
        <h1 className="text-7xl font-light tracking-wider mb-6">COMMUNITY</h1>
        <p className="text-lg text-gray-300">Contribute • Track • Grow</p>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-2xl bg-white/80 backdrop-blur-xl shadow-2xl border-0 rounded-3xl">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="mx-auto h-14 w-14 rounded-full bg-black flex items-center justify-center mb-4">
                <UserPlus className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-semibold text-gray-900">
                Create Account
              </h2>
              <p className="text-gray-500 mt-2">Start your Tracker journey</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <Label>Full Name</Label>
                  <div className="relative mt-2">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      value={form.name}
                      required
                      className="pl-10 h-12 rounded-xl"
                      placeholder="Enter name"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <Label>Email</Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      required
                      className="pl-10 h-12 rounded-xl"
                      placeholder="Enter email"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <Label>Create Password</Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      value={form.password}
                      required
                      className="pl-10 h-12 rounded-xl"
                      placeholder="Create Password"
                      onChange={handleChange}
                    />
                  </div>
          <p className="text-xs text-gray-500 mt-2 ml-1">
    At least 8 characters, 1 uppercase, 1 number, and 1 symbol.
  </p>
</div>
                <div>
                  <Label>Confirm Password</Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={form.confirmPassword}
                      required
                      className="pl-10 h-12 rounded-xl"
                      placeholder="Confirm Password"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <Label>Role</Label>
                  <Input
                    id="role"
                    value={form.role}
                    required
                    className="h-12 rounded-xl mt-2"
                    placeholder="Member/Lead"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label>Join Date</Label>
                  <div className="relative mt-2">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="joinDate"
                      type="date"
                      value={form.joinDate}
                      required
                      className="pl-10 h-12 rounded-xl"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <Label>Domain</Label>
                  <div className="relative mt-2">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="domain"
                      value={form.domain}
                      required
                      className="pl-10 h-12 rounded-xl"
                      placeholder="Operations / Tech"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <Label>Department</Label>
                  <div className="relative mt-2">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="department"
                      value={form.department}
                      required
                      className="pl-10 h-12 rounded-xl"
                      placeholder="CTech/NWC/CINTEL"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {errorMessage && (
                <div className="mt-4 rounded-xl bg-red-100 px-4 py-3 text-sm text-red-800">
                  {errorMessage}
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-12 rounded-xl bg-black hover:bg-neutral-800 text-white mt-8"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Create Account"}
              </Button>
            </form>

            <CardFooter className="flex justify-center pt-6 px-0">
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-black hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </CardFooter>
          </div>
        </Card>
      </div>
    </div>
  );
}