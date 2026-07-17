"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
  Loader2,
} from "lucide-react";

interface Profile {
  name: string;
  role: string;
  domain: string;
  badges: number;
  totalPoints: number;
}

interface Assignment {
  title: string;
  status: string;
}

interface Event {
  name: string;
  date: string;
  venue: string;
}

export default function DashboardPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [profile, setProfile] = useState<Profile | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [requests, setRequests] = useState({ pending: 0, approved: 0, rejected: 0 });
  const [badges, setBadges] = useState<string[]>([]);


  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch("/api/dashboard");
        
        if (!res.ok) {
          if (res.status === 401) return router.push("/login");
          throw new Error("Failed to fetch dashboard data");
        }

        const data = await res.json();
        
        setProfile(data.profile);
        setAssignments(data.assignments);
        setEvents(data.events);
        setRequests(data.requests);
        setBadges(data.badges);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f6f2] flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-[#f8f6f2] flex flex-col items-center justify-center gap-4">
        <p className="text-red-500">{error || "Unable to load dashboard"}</p>
        <Button onClick={() => window.location.reload()} variant="outline">Try Again</Button>
      </div>
    );
  }

  const role = profile.role || "member";
  const isLead = ["lead", "associate_lead", "vice_president", "president"].includes(role.toLowerCase());

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
            <p className="text-gray-500 mt-3">Welcome back, {profile.name}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Current Role</p>
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
              <CardTitle className="text-sm">Domain</CardTitle>
              <Users className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <h2 className="text-3xl font-semibold">{profile.domain}</h2>
            </CardContent>
          </Card>

          {/* Badges */}
          <Card className="bg-white rounded-3xl border border-black/10 shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Badges</CardTitle>
              <Award className="h-5 w-5 text-amber-500" />
            </CardHeader>
            <CardContent>
              <h2 className="text-3xl font-semibold">{profile.badges}</h2>
            </CardContent>
          </Card>

          {/* Pending */}
          <Card className="bg-white rounded-3xl border border-black/10 shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Pending Tasks</CardTitle>
              <Clock className="h-5 w-5 text-orange-500" />
            </CardHeader>
            <CardContent>
              <h2 className="text-3xl font-semibold">
                {assignments.filter((item) => item.status === "Pending").length}
              </h2>
            </CardContent>
          </Card>

          {/* Completed */}
          <Card className="bg-white rounded-3xl border border-black/10 shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Completed</CardTitle>
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <h2 className="text-3xl font-semibold">
                {assignments.filter((item) => item.status === "Completed").length}
              </h2>
            </CardContent>
          </Card>
        </div>

        {/* Lead Analytics */}
        {isLead && (
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
                  <p className="text-sm text-gray-500">Total Points</p>
                  <h2 className="text-4xl font-semibold mt-2">{profile.totalPoints}</h2>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Active Events</p>
                  <h2 className="text-4xl font-semibold mt-2">{events.length}</h2>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Badges</p>
                  <h2 className="text-4xl font-semibold mt-2">{profile.badges}</h2>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

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
              {events.length === 0 ? (
                <p className="text-sm text-gray-500">No events scheduled.</p>
              ) : (
                events.map((event, index) => (
                  <div key={index} className="flex justify-between items-center border-b last:border-0 pb-3 last:pb-0">
                    <div>
                      <h3 className="font-medium">{event.name}</h3>
                      <p className="text-sm text-gray-500">{event.venue}</p>
                    </div>
                    <span className="text-sm font-medium">{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white rounded-3xl border border-black/10 shadow-lg hover:shadow-xl transition-all">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Button variant="outline" className="rounded-xl" asChild>
                <a href="/assignments">View Assignments</a>
              </Button>
              <Button variant="outline" className="rounded-xl" asChild>
                <a href="/availability">Set Availability</a>
              </Button>
              <Button variant="outline" className="rounded-xl" asChild>
                <a href="/requests">Raise Request</a>
              </Button>
              {isLead && (
                <Button className="bg-black hover:bg-neutral-800 rounded-xl" asChild>
                  <a href="/events">Create Event</a>
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-white rounded-3xl border border-black/10 shadow-lg hover:shadow-xl transition-all">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {assignments.length === 0 ? (
                <p className="text-sm text-gray-500">No recent assignments.</p>
              ) : (
                assignments.map((assignment, index) => (
                  <div key={index} className="flex justify-between items-center border-b last:border-0 pb-3 last:pb-0">
                    <div>
                      <h3 className="font-medium">{assignment.title}</h3>
                      <p className="text-sm text-gray-500">Assignment</p>
                    </div>
                    <span className={`text-sm font-medium ${assignment.status === "Completed" ? "text-green-600" : "text-orange-500"}`}>
                      {assignment.status}
                    </span>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* My Requests */}
          <Card className="bg-white rounded-3xl border border-black/10 shadow-lg hover:shadow-xl transition-all">
            <CardHeader>
              <CardTitle>My Requests</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Pending</span>
                <span className="font-semibold text-orange-500">{requests.pending}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Approved</span>
                <span className="font-semibold text-green-600">{requests.approved}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Rejected</span>
                <span className="font-semibold text-red-500">{requests.rejected}</span>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="bg-white rounded-3xl border border-black/10 shadow-lg hover:shadow-xl transition-all">
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {badges.length === 0 ? (
                <p className="text-sm text-gray-500">No badges earned yet.</p>
              ) : (
                badges.map((badge, index) => (
                  <div key={index} className="flex items-center justify-between rounded-xl bg-[#f8f6f2] p-4">
                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-yellow-500" />
                      <span>{badge}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}