"use client";

import { useState } from "react";
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
} from "lucide-react";

export default function RegisterPage() {

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

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 bg-[#1f1f1f] text-white flex-col justify-center px-20">
        <h1 className="text-7xl font-light tracking-wider">
          JOIN THE
        </h1>

        <h1 className="text-7xl font-light tracking-wider mb-6">
          COMMUNITY
        </h1>

        <p className="text-lg text-gray-300">
          Contribute • Track • Grow
        </p>
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

              <p className="text-gray-500 mt-2">
                Start your Tracker journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label>Full Name</Label>
                <div className="relative mt-2">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
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
                    className="pl-10 h-12 rounded-xl"
                    placeholder="Enter email"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
  <Label>Password</Label>
  <Input
    id="password"
    type="password"
    className="h-12 rounded-xl mt-2"
    placeholder="Create a password"
    onChange={handleChange}
  />
</div>

<div>
  <Label>Confirm Password</Label>
  <Input
    id="confirmPassword"
    type="password"
    className="h-12 rounded-xl mt-2"
    placeholder="Confirm password"
    onChange={handleChange}
  />
</div>


              <div>
                <Label>Role</Label>
                <Input
                  id="role"
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
                    className="pl-10 h-12 rounded-xl"
                    placeholder="CTech/NWC/CINTEL"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <Button className="w-full h-12 rounded-xl bg-black hover:bg-gray-800 text-white flex items-center justify-center gap-2 mt-8">
              Create Account
            </Button>

            <CardFooter className="flex justify-center pt-6 px-0">
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-medium text-black hover:underline"
                >
                  Sign In
                </a>
              </p>
            </CardFooter>
          </div>
        </Card>
      </div>
    </div>
  );
}