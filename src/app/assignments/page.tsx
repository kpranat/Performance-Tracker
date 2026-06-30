"use client";

import { NavBar } from "@/components/NavBar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import {
  ClipboardList,
  CheckCircle2,
  Clock,
  Trophy,
} from "lucide-react";

export default function AssignmentsPage() {

  // Backend integration later

  const assignments = [
    // {
    //   eventName:"",
    //   status:"",
    //   pointsAwarded:0
    // }
  ];

  return (

    <div className="min-h-screen bg-[#f8f6f2]">

      <NavBar />

      <div className="max-w-6xl mx-auto px-8 py-10">

        <div className="mb-10">

          <h1 className="text-5xl font-light tracking-wide">
            Assignments
          </h1>

          <p className="text-gray-500 mt-3">
            View your assigned events and contribution status.
          </p>

        </div>

        {/* Summary */}

        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <Card className="bg-white rounded-3xl border border-black/10 shadow-lg">

            <CardHeader>

              <CardTitle className="text-sm">
                Total Assignments
              </CardTitle>

            </CardHeader>

            <CardContent>

              <div className="flex items-center justify-between">

                <h2 className="text-3xl font-semibold">

                  {assignments.length}

                </h2>

                <ClipboardList className="h-6 w-6 text-blue-600"/>

              </div>

            </CardContent>

          </Card>

          <Card className="bg-white rounded-3xl border border-black/10 shadow-lg">

            <CardHeader>

              <CardTitle className="text-sm">

                Assigned

              </CardTitle>

            </CardHeader>

            <CardContent>

              <div className="flex items-center justify-between">

                <h2 className="text-3xl font-semibold">

                  {
                    assignments.filter(
                      (item:any)=>item.status==="Assigned"
                    ).length
                  }

                </h2>

                <Clock className="h-6 w-6 text-orange-500"/>

              </div>

            </CardContent>

          </Card>

          <Card className="bg-white rounded-3xl border border-black/10 shadow-lg">

            <CardHeader>

              <CardTitle className="text-sm">

                Completed

              </CardTitle>

            </CardHeader>

            <CardContent>

              <div className="flex items-center justify-between">

                <h2 className="text-3xl font-semibold">

                  {
                    assignments.filter(
                      (item:any)=>item.status==="Completed"
                    ).length
                  }

                </h2>

                <CheckCircle2 className="h-6 w-6 text-green-600"/>

              </div>

            </CardContent>

          </Card>

        </div>
                {/* Assignments Table */}

        <Card className="bg-white border border-black/10 rounded-3xl shadow-lg">

          <CardHeader>

            <CardTitle>
              My Assignments
            </CardTitle>

          </CardHeader>

          <CardContent>

            {assignments.length === 0 ? (

              <div className="py-16 text-center">

                <ClipboardList className="mx-auto h-12 w-12 text-gray-400 mb-4" />

                <h3 className="text-xl font-medium">
                  No Assignments
                </h3>

                <p className="text-gray-500 mt-2">
                  You don't have any assignments yet.
                </p>

              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead>

                    <tr className="border-b">

                      <th className="text-left py-4">
                        Event
                      </th>

                      <th className="text-center py-4">
                        Status
                      </th>

                      <th className="text-center py-4">
                        Points Awarded
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {assignments.map((assignment: any, index: number) => (

                      <tr
                        key={index}
                        className="border-b last:border-0"
                      >

                        <td className="py-5">

                          {assignment.eventName}

                        </td>

                        <td className="text-center">

                          <Badge
                            className={
                              assignment.status === "Completed"
                                ? "bg-green-100 text-green-700"
                                : assignment.status === "Assigned"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-blue-100 text-blue-700"
                            }
                          >

                            {assignment.status}

                          </Badge>

                        </td>

                        <td className="text-center font-medium">

                          {assignment.pointsAwarded}

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