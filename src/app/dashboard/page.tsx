"use client";

import { NavBar } from "@/components/NavBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  LayoutDashboard,
  CalendarDays,
  Clock,
  Award,
  Users,
  CheckCircle2,
  Trophy,
  ArrowRight,
} from "lucide-react";

export default function DashboardPage() {
  /*
    Temporary Dummy Data
    Backend integration later
  */

  const role = "member";
  // member
  // associate_lead
  // lead
  // vice_president
  // president

  const profile = {
    name: "",
    domain: "",
    badges: 0,
    totalPoints: 0,
  };
  const assignments: {
    title: string;
    status: string;
  }[] = [];
  const events: {
    name: string;
    date: string;
    venue: string;
  }[] = [];

  const requests = {
    pending: 0,
    approved: 0,
    rejected: 0,
  };

  const badges: string[] = [];

  return (
    <div className="min-h-screen bg-[#f8f6f2]">

      <NavBar />

      <div className="max-w-7xl mx-auto px-8 py-10">

        {/* Header */}

        <div className="flex items-center justify-between mb-10">

          <div>

            <div className="flex items-center gap-3">

              <LayoutDashboard className="h-8 w-8" />

              <h1 className="text-5xl font-light tracking-wide">
                Performance Tracker
              </h1>

            </div>

            <p className="text-gray-500 mt-3">
              Welcome back
            </p>

          </div>

          <div className="text-right">

            <p className="text-sm text-gray-500">
              Current Role
            </p>

            <p className="capitalize text-lg font-medium">
              {role.replace("_", " ")}
            </p>

          </div>

        </div>
        {/* Stats */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          {/* Domain */}

          <Card className="bg-white rounded-3xl border border-black/10 shadow-lg hover:shadow-xl transition-all">

            <CardHeader className="flex flex-row items-center justify-between pb-2">

              <CardTitle className="text-sm">
                Domain
              </CardTitle>

              <Users className="h-5 w-5 text-blue-600" />

            </CardHeader>

            <CardContent>

              <h2 className="text-3xl font-semibold">
                {profile.domain}
              </h2>

            </CardContent>

          </Card>

          {/* Badges */}

          <Card className="bg-white rounded-3xl border border-black/10 shadow-lg hover:shadow-xl transition-all">

            <CardHeader className="flex flex-row items-center justify-between pb-2">

              <CardTitle className="text-sm">
                Badges
              </CardTitle>

              <Award className="h-5 w-5 text-amber-500" />

            </CardHeader>

            <CardContent>

              <h2 className="text-3xl font-semibold">
                {profile.badges}
              </h2>

            </CardContent>

          </Card>

          {/* Pending */}

          <Card className="bg-white rounded-3xl border border-black/10 shadow-lg hover:shadow-xl transition-all">

            <CardHeader className="flex flex-row items-center justify-between pb-2">

              <CardTitle className="text-sm">
                Pending Tasks
              </CardTitle>

              <Clock className="h-5 w-5 text-orange-500" />

            </CardHeader>

            <CardContent>

              <h2 className="text-3xl font-semibold">
                {
                  assignments.filter(
                    (item) => item.status === "Pending"
                  ).length
                }
              </h2>

            </CardContent>

          </Card>

          {/* Completed */}

          <Card className="bg-white rounded-3xl border border-black/10 shadow-lg hover:shadow-xl transition-all">

            <CardHeader className="flex flex-row items-center justify-between pb-2">

              <CardTitle className="text-sm">
                Completed
              </CardTitle>

              <CheckCircle2 className="h-5 w-5 text-green-600" />

            </CardHeader>

            <CardContent>

              <h2 className="text-3xl font-semibold">
                {
                  assignments.filter(
                    (item) => item.status === "Completed"
                  ).length
                }
              </h2>

            </CardContent>

          </Card>

        </div>

        {/* Lead Analytics */}

        {(role === "lead" ||
          role === "associate_lead" ||
          role === "vice_president" ||
          role === "president") && (

            <Card className="bg-white rounded-3xl border border-black/10 shadow-lg mb-8">

              <CardHeader>

                <CardTitle className="flex items-center gap-2">

                  <Trophy className="h-5 w-5 text-yellow-500" />

                  Lead Analytics

                </CardTitle>

              </CardHeader>

              <CardContent>

                <div className="grid md:grid-cols-3 gap-6">

                  <div>

                    <p className="text-sm text-gray-500">
                      Total Points
                    </p>

                    <h2 className="text-4xl font-semibold mt-2">
                      {profile.totalPoints}
                    </h2>

                  </div>

                  <div>

                    <p className="text-sm text-gray-500">
                      Active Events
                    </p>

                    <h2 className="text-4xl font-semibold mt-2">
                      {events.length}
                    </h2>

                  </div>

                  <div>

                    <p className="text-sm text-gray-500">
                      Total Badges
                    </p>

                    <h2 className="text-4xl font-semibold mt-2">
                      {profile.badges}
                    </h2>

                  </div>

                </div>

              </CardContent>

            </Card>

          )}

        {/* Progress */}

        {/* <Card className="bg-white rounded-3xl border border-black/10 shadow-lg mb-8">

          <CardContent className="p-6">

            <div className="flex justify-between items-center mb-4">

              <span className="font-medium">
                Contribution Progress
              </span>

              <span className="text-gray-500">
                65%
              </span>

            </div>

            <div className="w-full h-3 rounded-full bg-gray-200">

              <div className="h-3 rounded-full bg-black w-[65%]" />

            </div>

            <p className="text-sm text-gray-500 mt-4">
              Complete more assignments to earn new badges.
            </p>

          </CardContent>

        </Card> */}

        {/* Main Grid */}

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upcoming Events */}

          <Card className="bg-white rounded-3xl border border-black/10 shadow-lg hover:shadow-xl transition-all">

            <CardHeader>

              <CardTitle className="flex items-center gap-2">

                <CalendarDays className="h-5 w-5" />

                Upcoming Events

              </CardTitle>

            </CardHeader>

            <CardContent className="space-y-4">

              {events.map((event, index) => (

                <div
                  key={index}
                  className="flex justify-between items-center border-b last:border-0 pb-3 last:pb-0"
                >

                  <div>

                    <h3 className="font-medium">
                      {event.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {event.venue}
                    </p>

                  </div>

                  <span className="text-sm font-medium">
                    {event.date}
                  </span>

                </div>

              ))}

            </CardContent>

          </Card>

          {/* Quick Actions */}

          <Card className="bg-white rounded-3xl border border-black/10 shadow-lg hover:shadow-xl transition-all">

            <CardHeader>

              <CardTitle>

                Quick Actions

              </CardTitle>

            </CardHeader>

            <CardContent className="flex flex-col gap-3">

              <Button
                variant="outline"
                className="rounded-xl"
                asChild
              >
                <a href="/assignments">
                  View Assignments
                </a>
              </Button>

              <Button
                variant="outline"
                className="rounded-xl"
                asChild
              >
                <a href="/availability">
                  Set Availability
                </a>
              </Button>

              <Button
                variant="outline"
                className="rounded-xl"
                asChild
              >
                <a href="/requests">
                  Raise Request
                </a>
              </Button>

              {(role === "lead" ||
                role === "associate_lead" ||
                role === "vice_president" ||
                role === "president") && (

                  <Button
                    className="bg-black hover:bg-neutral-800 rounded-xl"
                    asChild
                  >
                    <a href="/events">
                      Create Event
                    </a>
                  </Button>

                )}

            </CardContent>

          </Card>

          {/* Recent Activity */}

          <Card className="bg-white rounded-3xl border border-black/10 shadow-lg hover:shadow-xl transition-all">

            <CardHeader>

              <CardTitle>

                Recent Activity

              </CardTitle>

            </CardHeader>

            <CardContent className="space-y-4">

              {assignments.map((assignment, index) => (

                <div
                  key={index}
                  className="flex justify-between items-center border-b last:border-0 pb-3 last:pb-0"
                >

                  <div>

                    <h3 className="font-medium">
                      {assignment.title}
                    </h3>

                    <p className="text-sm text-gray-500">
                      Assignment
                    </p>

                  </div>

                  <span
                    className={`text-sm font-medium ${assignment.status === "Completed"
                      ? "text-green-600"
                      : "text-orange-500"
                      }`}
                  >
                    {assignment.status}
                  </span>

                </div>

              ))}

            </CardContent>

          </Card>
          {/* My Requests */}

          <Card className="bg-white rounded-3xl border border-black/10 shadow-lg hover:shadow-xl transition-all">

            <CardHeader>

              <CardTitle>

                My Requests

              </CardTitle>

            </CardHeader>

            <CardContent className="space-y-4">

              <div className="flex justify-between items-center">

                <span>Pending</span>

                <span className="font-semibold text-orange-500">
                  {requests.pending}
                </span>

              </div>

              <div className="flex justify-between items-center">

                <span>Approved</span>

                <span className="font-semibold text-green-600">
                  {requests.approved}
                </span>

              </div>

              <div className="flex justify-between items-center">

                <span>Rejected</span>

                <span className="font-semibold text-red-500">
                  {requests.rejected}
                </span>

              </div>

            </CardContent>

          </Card>

          {/* Achievements */}

          <Card className="bg-white rounded-3xl border border-black/10 shadow-lg hover:shadow-xl transition-all">

            <CardHeader>

              <CardTitle>

                Achievements

              </CardTitle>

            </CardHeader>

            <CardContent className="space-y-3">

              {badges.map((badge, index) => (

                <div
                  key={index}
                  className="flex items-center justify-between rounded-xl bg-[#f8f6f2] p-4"
                >

                  <div className="flex items-center gap-3">

                    <Award className="h-5 w-5 text-yellow-500" />

                    <span>{badge}</span>

                  </div>

                  <ArrowRight className="h-4 w-4 text-gray-400" />

                </div>

              ))}

            </CardContent>

          </Card>

        </div>

      </div>

    </div>
  );
}