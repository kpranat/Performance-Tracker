"use client";

import { useState } from "react";

import { NavBar } from "@/components/NavBar";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import {
  CalendarPlus,
  MapPin,
  Building2,
  Users,
} from "lucide-react";

export default function EventsPage() {

  // Backend Integration Later

  const role: string = "member";
  // member
  // associate_lead
  // lead
  // vice_president
  // president

  const [event, setEvent] = useState({
    eventName: "",
    venueName: "",
    venueCapacity: "",
    tech: "",
    operations: "",
    design: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setEvent({
      ...event,
      [e.target.id]: e.target.value,
    });

  };

  const canCreateEvent =
    role === "lead" ||
    role === "associate_lead" ||
    role === "vice_president" ||
    role === "president";

  return (

    <div className="min-h-screen bg-[#f8f6f2]">

      <NavBar />

      <div className="max-w-4xl mx-auto px-8 py-10">

        <div className="mb-10">

          <h1 className="text-5xl font-light">
            Events
          </h1>

          <p className="text-gray-500 mt-3">
            Manage club events and volunteer requirements.
          </p>

        </div>

        {!canCreateEvent ? (

          <Card className="bg-white rounded-3xl border border-black/10 shadow-lg">

            <CardContent className="py-16 text-center">

              <CalendarPlus className="mx-auto h-12 w-12 text-gray-400 mb-5"/>

              <h2 className="text-2xl font-medium">

                Event Creation Restricted

              </h2>

              <p className="text-gray-500 mt-3">

                Only Leads, Associate Leads,
                Vice President and President
                can create new events.

              </p>

            </CardContent>

          </Card>

        ) : (

          <Card className="bg-white rounded-3xl border border-black/10 shadow-lg">

            <CardHeader>

              <CardTitle>

                Create Event

              </CardTitle>

            </CardHeader>

            <CardContent className="space-y-6">
                            {/* Event Name */}

              <div>

                <Label htmlFor="eventName">
                  Event Name
                </Label>

                <Input
                  id="eventName"
                  placeholder="Enter event name"
                  value={event.eventName}
                  onChange={handleChange}
                  className="mt-2 rounded-xl"
                />

              </div>

              {/* Venue */}

              <div>

                <Label htmlFor="venueName">
                  Venue Name
                </Label>

                <div className="relative mt-2">

                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"/>

                  <Input
                    id="venueName"
                    placeholder="Enter venue"
                    className="pl-10 rounded-xl"
                    value={event.venueName}
                    onChange={handleChange}
                  />

                </div>

              </div>

              {/* Venue Capacity */}

              <div>

                <Label htmlFor="venueCapacity">
                  Venue Capacity
                </Label>

                <div className="relative mt-2">

                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"/>

                  <Input
                    id="venueCapacity"
                    type="number"
                    placeholder="Enter capacity"
                    className="pl-10 rounded-xl"
                    value={event.venueCapacity}
                    onChange={handleChange}
                  />

                </div>

              </div>

              {/* Domain Distribution */}

              <div>

                <Label>
                  Domain Distribution
                </Label>

                <p className="text-sm text-gray-500 mt-1 mb-4">
                  Number of volunteers required from each domain.
                </p>

                <div className="grid md:grid-cols-3 gap-4">

                  <div>

                    <Label htmlFor="tech">
                      Tech
                    </Label>

                    <Input
                      id="tech"
                      type="number"
                      placeholder="0"
                      value={event.tech}
                      onChange={handleChange}
                      className="mt-2 rounded-xl"
                    />

                  </div>

                  <div>

                    <Label htmlFor="operations">
                      Operations
                    </Label>

                    <Input
                      id="operations"
                      type="number"
                      placeholder="0"
                      value={event.operations}
                      onChange={handleChange}
                      className="mt-2 rounded-xl"
                    />

                  </div>

                  <div>

                    <Label htmlFor="design">
                      Design
                    </Label>

                    <Input
                      id="design"
                      type="number"
                      placeholder="0"
                      value={event.design}
                      onChange={handleChange}
                      className="mt-2 rounded-xl"
                    />

                  </div>

                </div>

              </div>

            </CardContent>

            <CardFooter>

              <Button className="w-full bg-black hover:bg-neutral-800 rounded-xl">

                Create Event

              </Button>

            </CardFooter>

          </Card>

        )}

      </div>

    </div>

  );

}