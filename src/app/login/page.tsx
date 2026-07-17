"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Lock, LogIn } from "lucide-react";
import { authClient } from "@/lib/auth/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.signIn.email({
        email,
        password,
      });

      if (result.error) {
        setErrorMessage(result.error.message || "Unable to sign in.");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      setErrorMessage("Sign in failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 bg-[#1f1f1f] text-white flex-col justify-center px-20">
        <h1 className="text-7xl font-light tracking-wider">PERFORMANCE</h1>
        <h1 className="text-7xl font-light tracking-wider mb-6">TRACKER</h1>
        <p className="text-lg text-gray-300">Track • Contribute • Grow</p>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md bg-white/80 backdrop-blur-xl shadow-2xl border-0 rounded-3xl">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="mx-auto h-14 w-14 rounded-full bg-black flex items-center justify-center mb-4">
                <LogIn className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-semibold text-gray-900">
                Welcome Back
              </h2>
              <p className="text-gray-500 mt-2">Sign in to continue</p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="space-y-5">
                <div>
                  <Label>Email</Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10 h-12 rounded-xl"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label>Password</Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      className="pl-10 h-12 rounded-xl"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                {errorMessage && (
                  <div className="rounded-xl bg-red-100 px-4 py-3 text-sm text-red-800">
                    {errorMessage}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-black hover:bg-gray-800 text-white flex items-center justify-center gap-2"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </div>
            </form>

            <CardFooter className="flex justify-center pt-6 px-0">
              <p className="text-sm text-gray-500">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="font-medium text-black hover:underline"
                >
                  Create one
                </Link>
              </p>
            </CardFooter>
          </div>
        </Card>
      </div>
    </div>
  );
}