"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Stethoscope,
  AlertTriangle,
  Activity,
  Users,
  Clock,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

// Updated mock data to include transfer history
const mockData = [
  {
    patientId: "P-001",
    initialDiagnosis: "Chest Pain",
    finalDiagnosis: "Myocardial Infarction",
    accuracy: 85,
    status: "Admitted",
    transferHistory: [
      { department: "Emergency", timestamp: "2023-10-25T14:30:00" },
      { department: "Cardiology", timestamp: "2023-10-25T15:45:00" },
    ],
  },
  {
    patientId: "P-002",
    initialDiagnosis: "Shortness of Breath",
    finalDiagnosis: "Pneumonia",
    accuracy: 70,
    status: "Under Observation",
    transferHistory: [
      { department: "Emergency", timestamp: "2023-10-25T16:00:00" },
      { department: "Pulmonology", timestamp: "2023-10-25T17:30:00" },
    ],
  },
  {
    patientId: "P-003",
    initialDiagnosis: "Head Trauma",
    finalDiagnosis: "Concussion",
    accuracy: 95,
    status: "Discharged",
    transferHistory: [
      { department: "Emergency", timestamp: "2023-10-25T18:15:00" },
      { department: "Neurology", timestamp: "2023-10-25T19:00:00" },
      { department: "Discharged", timestamp: "2023-10-26T10:30:00" },
    ],
  },
  {
    patientId: "P-004",
    initialDiagnosis: "Abdominal Pain",
    finalDiagnosis: "Appendicitis",
    accuracy: 90,
    status: "Post-Surgery",
    transferHistory: [
      { department: "Emergency", timestamp: "2023-10-25T20:00:00" },
      { department: "General Surgery", timestamp: "2023-10-25T21:30:00" },
      { department: "Recovery", timestamp: "2023-10-26T01:00:00" },
    ],
  },
  {
    patientId: "P-005",
    initialDiagnosis: "Fever and Rash",
    finalDiagnosis: "Measles",
    accuracy: 60,
    status: "Isolated",
    transferHistory: [
      { department: "Emergency", timestamp: "2023-10-25T22:45:00" },
      { department: "Infectious Diseases", timestamp: "2023-10-26T00:15:00" },
    ],
  },
];

export default function ParamedicDashboard() {
  const [timeFrame, setTimeFrame] = useState("Today");

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return "bg-green-500";
    if (accuracy >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Admitted":
        return <Badge variant="default">Admitted</Badge>;
      case "Under Observation":
        return <Badge variant="secondary">Under Observation</Badge>;
      case "Discharged":
        return <Badge variant="outline">Discharged</Badge>;
      case "Post-Surgery":
        return <Badge className="bg-blue-500 text-white">Post-Surgery</Badge>;
      case "Isolated":
        return <Badge variant="destructive">Isolated</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Paramedic Performance Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Patients
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">
              +14% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Response Time
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.5 min</div>
            <p className="text-xs text-muted-foreground">
              -2.3% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Diagnosis Accuracy
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <Progress value={87} className="h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Critical Cases
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+6 from yesterday</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Recent Patient Cases</CardTitle>
            <div className="space-x-2">
              {["Today", "This Week", "This Month"].map((tf) => (
                <Button
                  key={tf}
                  variant={timeFrame === tf ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeFrame(tf)}
                >
                  {tf}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient ID</TableHead>
                <TableHead>Initial Diagnosis</TableHead>
                <TableHead>Final Diagnosis</TableHead>
                <TableHead>Accuracy</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Department Timeline</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.map((patient) => (
                <TableRow key={patient.patientId}>
                  <TableCell className="font-medium">
                    <Link
                      href={`/patients/${patient.patientId}`}
                      className="text-blue-500 hover:underline"
                    >
                      {patient.patientId}
                    </Link>
                  </TableCell>
                  <TableCell>{patient.initialDiagnosis}</TableCell>
                  <TableCell>{patient.finalDiagnosis}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${getAccuracyColor(
                          patient.accuracy
                        )}`}
                      ></div>
                      <span>{patient.accuracy}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(patient.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {patient.transferHistory.map((transfer, index) => (
                        <div key={index} className="flex items-center">
                          {index > 0 && <ArrowRight className="h-4 w-4 mx-1" />}
                          <Badge
                            variant="outline"
                            className="flex items-center space-x-1"
                          >
                            <Stethoscope className="h-3 w-3" />
                            <span>{transfer.department}</span>
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
