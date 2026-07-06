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

import { Badge } from "@/components/ui/badge";

import {
  FileText,
  Send,
} from "lucide-react";

export default function RequestsPage() {

  // Backend Integration Later

  const [form, setForm] = useState({
    requestType: "",
    event: "",
    reason: "",
  });

  const requests: {
    requestType: string;
    event: string;
    status: string;
    createdAt: string;
  }[] = [];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });

  };

  return (

    <div className="min-h-screen bg-[#f8f6f2]">

      <NavBar />

      <div className="max-w-5xl mx-auto px-8 py-10">

        <div className="mb-10">

          <h1 className="text-5xl font-light">

            Requests

          </h1>

          <p className="text-gray-500 mt-3">

            Submit leave or availability related requests.

          </p>

        </div>

        <Card className="bg-white rounded-3xl border border-black/10 shadow-lg">

          <CardHeader>

            <CardTitle>

              Raise Request

            </CardTitle>

          </CardHeader>

          <CardContent className="space-y-6">
                        {/* Request Type */}

            <div>

              <Label htmlFor="requestType">
                Request Type
              </Label>

              <Input
                id="requestType"
                placeholder="Leave / Availability / Other"
                className="mt-2 rounded-xl"
                value={form.requestType}
                onChange={handleChange}
              />

            </div>

            {/* Event */}

            <div>

              <Label htmlFor="event">
                Event
              </Label>

              <Input
                id="event"
                placeholder="Event Name"
                className="mt-2 rounded-xl"
                value={form.event}
                onChange={handleChange}
              />

            </div>

            {/* Reason */}

            <div>

              <Label htmlFor="reason">
                Reason
              </Label>

              <textarea
                id="reason"
                rows={5}
                placeholder="Enter your reason..."
                value={form.reason}
                onChange={(e) =>
                  setForm({
                    ...form,
                    reason: e.target.value,
                  })
                }
                className="
                  w-full
                  mt-2
                  rounded-xl
                  border
                  border-gray-300
                  px-4
                  py-3
                  resize-none
                  focus:outline-none
                  focus:ring-2
                  focus:ring-black
                "
              />

            </div>

          </CardContent>

          <CardFooter>

            <Button className="w-full bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl">

              <Send className="h-4 w-4 mr-2" />

              Submit Request

            </Button>

          </CardFooter>

        </Card>

        {/* Request History */}

        <Card className="mt-8 bg-white rounded-3xl border border-black/10 shadow-lg">

          <CardHeader>

            <CardTitle>

              Request History

            </CardTitle>

          </CardHeader>

          <CardContent>

            {requests.length === 0 ? (

              <div className="py-16 text-center">

                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />

                <h3 className="text-xl font-medium">

                  No Requests Found

                </h3>

                <p className="text-gray-500 mt-2">

                  Your submitted requests will appear here.

                </p>

              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead>

                    <tr className="border-b">

                      <th className="text-left py-4">
                        Request Type
                      </th>

                      <th className="text-left py-4">
                        Event
                      </th>

                      <th className="text-center py-4">
                        Status
                      </th>

                      <th className="text-right py-4">
                        Date
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {requests.map((request, index) => (

                      <tr
                        key={index}
                        className="border-b last:border-0"
                      >

                        <td className="py-5">

                          {request.requestType}

                        </td>

                        <td>

                          {request.event}

                        </td>

                        <td className="text-center">

                          <Badge
                            className={
                              request.status === "Approved"
                                ? "bg-green-100 text-green-700"
                                : request.status === "Rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }
                          >

                            {request.status}

                          </Badge>

                        </td>

                        <td className="text-right">

                          {request.createdAt}

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </CardContent>

        </Card>

      </div>

    </div>

  );

}