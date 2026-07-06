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

import { Label } from "@/components/ui/label";

import { Clock, Plus } from "lucide-react";

export default function AvailabilityPage() {

  // Backend integration later

  const [slots, setSlots] = useState([
    {
      day: "",
      startTime: "",
      endTime: "",
    },
  ]);

  const addSlot = () => {

    setSlots([
      ...slots,
      {
        day: "",
        startTime: "",
        endTime: "",
      },
    ]);

  };

  const updateSlot = (
    index: number,
    field: string,
    value: string
  ) => {

    const updated = [...slots];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setSlots(updated);

  };

  return (

    <div className="min-h-screen bg-[#f8f6f2]">

      <NavBar />

      <div className="max-w-4xl mx-auto px-8 py-10">

        <div className="mb-10">

          <h1 className="text-5xl font-light">

            Availability

          </h1>

          <p className="text-gray-500 mt-3">

            Add your available time slots for event assignments.

          </p>

        </div>

        <Card className="bg-white rounded-3xl border border-black/10 shadow-lg">

          <CardHeader>

            <CardTitle className="flex items-center gap-2">

              <Clock className="h-5 w-5" />

              Free Hours

            </CardTitle>

          </CardHeader>

          <CardContent className="space-y-6">
            {slots.map((slot, index) => (

              <div
                key={index}
                className="grid md:grid-cols-3 gap-4 border rounded-2xl p-5"
              >

                {/* Day */}

                <div>

                  <Label>
                    Day
                  </Label>

                  <select
                    value={slot.day}
                    onChange={(e) =>
                      updateSlot(index, "day", e.target.value)
                    }
                    className="
                      w-full
                      mt-2
                      rounded-xl
                      border
                      border-gray-300
                      px-4
                      py-3
                      bg-white
                    "
                  >

                    <option value="">Select Day</option>

                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>

                  </select>

                </div>

                {/* Start Time */}

                <div>

                  <Label>
                    Start Time
                  </Label>

                  <input
                    type="time"
                    value={slot.startTime}
                    onChange={(e) =>
                      updateSlot(index, "startTime", e.target.value)
                    }
                    className="
                      w-full
                      mt-2
                      rounded-xl
                      border
                      border-gray-300
                      px-4
                      py-3
                    "
                  />

                </div>

                {/* End Time */}

                <div>

                  <Label>
                    End Time
                  </Label>

                  <input
                    type="time"
                    value={slot.endTime}
                    onChange={(e) =>
                      updateSlot(index, "endTime", e.target.value)
                    }
                    className="
                      w-full
                      mt-2
                      rounded-xl
                      border
                      border-gray-300
                      px-4
                      py-3
                    "
                  />

                </div>

              </div>

            ))}

          </CardContent>

          <CardFooter className="flex flex-col gap-4">

            <Button
              type="button"
              variant="outline"
              onClick={addSlot}
              className="w-full rounded-xl"
            >

              <Plus className="h-4 w-4 mr-2" />

              Add Time Slot

            </Button>

            <Button
              type="button"
              className="w-full bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl"
            >

              Save Availability

            </Button>

          </CardFooter>

        </Card>

      </div>

    </div>

  );

}