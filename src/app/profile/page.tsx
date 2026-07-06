"use client";

import { NavBar } from "@/components/NavBar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  User,
  Mail,
  BadgeCheck,
  Calendar,
  Building2,
  Globe,
  Award,
  Trophy,
} from "lucide-react";

export default function ProfilePage() {

  // Temporary placeholders
  // Backend integration later

  const role = "member";
  // member
  // associate_lead
  // lead
  // vice_president
  // president

  const profile = {
    name: "",
    email: "",
    joinDate: "",
    domain: "",
    expertiseLevel: "",
    collegeDept: "",
    badges: [] as string[],
    totalPoints: 0,
  };

  return (
    <div className="min-h-screen bg-[#f8f6f2]">

      <NavBar />

      <div className="max-w-6xl mx-auto px-8 py-10">

        {/* Header */}

        <div className="mb-10">

          <h1 className="text-5xl font-light tracking-wide">
            My Profile
          </h1>

          <p className="text-gray-500 mt-3">
            View your volunteer information and contribution details.
          </p>

        </div>

        {/* Profile Summary */}

        <Card className="bg-white border border-black/10 rounded-3xl shadow-lg mb-8">

          <CardContent className="p-8">

            <div className="flex flex-col md:flex-row items-center gap-8">

              <div className="h-28 w-28 rounded-full bg-black text-white flex items-center justify-center">

                <User className="h-10 w-10" />

              </div>

              <div className="flex-1">

                <h2 className="text-3xl font-semibold">

                  {profile.name || "Member Name"}

                </h2>

                <p className="text-gray-500 mt-2">

                  {role.replace("_", " ")}

                </p>

                <div className="flex flex-wrap gap-3 mt-5">

                  <span className="px-4 py-2 rounded-full bg-[#f8f6f2] text-sm">

                    {profile.domain || "Domain"}

                  </span>

                  <span className="px-4 py-2 rounded-full bg-[#f8f6f2] text-sm">

                    {profile.expertiseLevel || "Expertise"}

                  </span>

                </div>

              </div>

            </div>

          </CardContent>

        </Card>

        {/* Information Cards */}

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Personal Information */}

          <Card className="bg-white border border-black/10 rounded-3xl shadow-lg">

            <CardHeader>

              <CardTitle>
                Personal Information
              </CardTitle>

            </CardHeader>

            <CardContent className="space-y-5">

              <div className="flex items-center gap-4">

                <User className="h-5 w-5 text-gray-500" />

                <div>

                  <p className="text-sm text-gray-500">
                    Full Name
                  </p>

                  <p className="font-medium">
                    {profile.name || "Not Available"}
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-4">

                <Mail className="h-5 w-5 text-gray-500" />

                <div>

                  <p className="text-sm text-gray-500">
                    Email
                  </p>

                  <p className="font-medium">
                    {profile.email || "Not Available"}
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-4">

                <BadgeCheck className="h-5 w-5 text-gray-500" />

                <div>

                  <p className="text-sm text-gray-500">
                    Role
                  </p>

                  <p className="capitalize font-medium">
                    {role.replace("_", " ")}
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-4">

                <Calendar className="h-5 w-5 text-gray-500" />

                <div>

                  <p className="text-sm text-gray-500">
                    Join Date
                  </p>

                  <p className="font-medium">
                    {profile.joinDate || "Not Available"}
                  </p>

                </div>

              </div>

            </CardContent>

          </Card>

          {/* Academic & Club Details */}

          <Card className="bg-white border border-black/10 rounded-3xl shadow-lg">

            <CardHeader>

              <CardTitle>
                Academic & Club Details
              </CardTitle>

            </CardHeader>

            <CardContent className="space-y-5">

              <div className="flex items-center gap-4">

                <Globe className="h-5 w-5 text-gray-500" />

                <div>

                  <p className="text-sm text-gray-500">
                    Domain
                  </p>

                  <p className="font-medium">
                    {profile.domain || "Not Assigned"}
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-4">

                <Award className="h-5 w-5 text-gray-500" />

                <div>

                  <p className="text-sm text-gray-500">
                    Expertise Level
                  </p>

                  <p className="font-medium">
                    {profile.expertiseLevel || "Not Available"}
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-4">

                <Building2 className="h-5 w-5 text-gray-500" />

                <div>

                  <p className="text-sm text-gray-500">
                    College Department
                  </p>

                  <p className="font-medium">
                    {profile.collegeDept || "Not Available"}
                  </p>

                </div>

              </div>

            </CardContent>

          </Card>
          {/* Badges */}

          <Card className="bg-white border border-black/10 rounded-3xl shadow-lg">

            <CardHeader>

              <CardTitle>
                Achievements
              </CardTitle>

            </CardHeader>

            <CardContent>

              {profile.badges.length === 0 ? (

                <div className="text-center py-10 text-gray-500">

                  No badges earned yet.

                </div>

              ) : (

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {profile.badges.map((badge, index) => (

                    <div
                      key={index}
                      className="flex items-center gap-3 bg-[#f8f6f2] rounded-xl p-4"
                    >

                      <Award className="h-5 w-5 text-yellow-500" />

                      <span className="font-medium">
                        {badge}
                      </span>

                    </div>

                  ))}

                </div>

              )}

            </CardContent>

          </Card>

          {/* Lead Information */}

          {(role === "lead" ||
            role === "associate_lead" ||
            role === "vice_president" ||
            role === "president") && (

              <Card className="bg-white border border-black/10 rounded-3xl shadow-lg">

                <CardHeader>

                  <CardTitle>
                    Lead Statistics
                  </CardTitle>

                </CardHeader>

                <CardContent>

                  <div className="flex items-center gap-4">

                    <Trophy className="h-7 w-7 text-yellow-500" />

                    <div>

                      <p className="text-sm text-gray-500">
                        Total Contribution Points
                      </p>

                      <h2 className="text-4xl font-semibold">

                        {profile.totalPoints}

                      </h2>

                    </div>

                  </div>

                </CardContent>

              </Card>

            )}

        </div>
                {/* Empty State */}

        {profile.name === "" && (

          <Card className="mt-8 bg-white border border-black/10 rounded-3xl shadow-lg">

            <CardContent className="py-12 text-center">

              <User className="mx-auto h-12 w-12 text-gray-400 mb-4" />

              <h3 className="text-xl font-medium">
                Profile Not Available
              </h3>

              <p className="text-gray-500 mt-2">
                Your profile information will appear here once your account
                has been synced with the database.
              </p>

            </CardContent>

          </Card>

        )}

      </div>

    </div>

  );
}