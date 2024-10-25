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
} from "lucide-react";
import Link from "next/link";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// Mock data for the dashboard
const mockData = [
  {
    patientId: "P-001",
    initialDiagnosis: "Chest Pain",
    finalDiagnosis: "Myocardial Infarction",
    accuracy: 85,
    status: "Admitted",
    department: "Cardiology",
  },
  {
    patientId: "P-001",
    initialDiagnosis: "Shortness of Breath",
    finalDiagnosis: "Pneumonia",
    accuracy: 70,
    status: "Under Observation",
    department: "Pulmonology",
  },
  {
    patientId: "P-001",
    initialDiagnosis: "Head Trauma",
    finalDiagnosis: "Concussion",
    accuracy: 95,
    status: "Discharged",
    department: "Neurology",
  },
  {
    patientId: "P-001",
    initialDiagnosis: "Abdominal Pain",
    finalDiagnosis: "Appendicitis",
    accuracy: 90,
    status: "Post-Surgery",
    department: "General Surgery",
  },
  {
    patientId: "P-001",
    initialDiagnosis: "Fever and Rash",
    finalDiagnosis: "Measles",
    accuracy: 60,
    status: "Isolated",
    department: "Infectious Diseases",
  },
];

export default function ParamedicDashboard() {
  const [timeFrame, setTimeFrame] = useState("Today");
  // const [searchTerm, setSearchTerm] = useState("");

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
            {/* Search field */}
            {/* <div className="flex items-center">
              <Label htmlFor="search" className="sr-only">
                Search Patient
              </Label>
              <Input
                placeholder="Search patient..."
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div> */}
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
                <TableHead>Patient Name</TableHead>
                <TableHead>Initial Diagnosis</TableHead>
                <TableHead>Final Diagnosis</TableHead>
                <TableHead>Accuracy</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Department</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData
                // .filter((p) =>
                //   p.patientId.toLowerCase().includes(searchTerm.toLowerCase())
                // )
                .map((patient) => (
                  <TableRow key={patient.patientId}>
                    <Link
                      href={`/patients/${patient.patientId}`}
                      className="text-blue-500"
                    >
                      <TableCell className="font-medium">
                        {patient.patientId}
                      </TableCell>
                    </Link>
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
                        <Stethoscope className="h-4 w-4" />
                        <span>{patient.department}</span>
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
