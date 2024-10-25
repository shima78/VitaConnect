"use client";

import { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Ambulance,
  Stethoscope,
  Activity,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";

// Mock data for a single patient case
const patientCase = {
  id: "PT001",
  paramedic: {
    arrivalTime: "2023-10-25T14:30:00",
    initialDiagnosis: "Acute Myocardial Infarction",
    symptoms: "Severe chest pain, shortness of breath, nausea",
    vitals: {
      bloodPressure: "150/90",
      heartRate: 110,
      respiratoryRate: 22,
      oxygenSaturation: 94,
      temperature: 37.2,
    },
    ecgFindings: "ST-segment elevation in leads V1-V4",
    actions: [
      "Administered 325mg aspirin",
      "Administered sublingual nitroglycerin",
      "Initiated oxygen therapy",
      "Established IV access",
    ],
    medicationsGiven: [
      { name: "Aspirin", dose: "325mg", route: "PO" },
      { name: "Nitroglycerin", dose: "0.4mg", route: "SL" },
    ],
    transportationDetails: "Code 3 transport to nearest PCI-capable facility",
  },
  doctor: {
    admissionTime: "2023-10-25T15:05:00",
    finalDiagnosis: "ST-Elevation Myocardial Infarction (STEMI)",
    symptoms: "Crushing chest pain radiating to left arm, dyspnea, diaphoresis",
    vitals: {
      bloodPressure: "145/85",
      heartRate: 105,
      respiratoryRate: 20,
      oxygenSaturation: 96,
      temperature: 37.0,
    },
    ecgFindings:
      "ST-segment elevation in leads V1-V4, reciprocal changes in II, III, aVF",
    labResults: {
      troponin: "Elevated (2.5 ng/mL)",
      creatinine: "Normal (0.9 mg/dL)",
      potassium: "Normal (4.2 mEq/L)",
    },
    treatment: [
      "Immediate cardiac catheterization",
      "Percutaneous Coronary Intervention (PCI) with stent placement",
      "Initiated dual antiplatelet therapy",
    ],
    medications: [
      { name: "Clopidogrel", dose: "600mg loading dose", route: "PO" },
      { name: "Heparin", dose: "60 units/kg bolus", route: "IV" },
      { name: "Morphine", dose: "4mg", route: "IV" },
    ],
    disposition: "Admitted to Cardiac Care Unit for post-PCI management",
  },
};

export default function ComparisonPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const calculateTimeDifference = () => {
    const paramedicTime = new Date(patientCase.paramedic.arrivalTime);
    const doctorTime = new Date(patientCase.doctor.admissionTime);
    const diffInMinutes = Math.round(
      (doctorTime.getTime() - paramedicTime.getTime()) / 60000
    );
    return diffInMinutes;
  };

  const calculateAccuracy = () => {
    let score = 0;
    if (
      patientCase.paramedic.initialDiagnosis
        .toLowerCase()
        .includes("myocardial infarction")
    )
      score += 50;
    if (patientCase.paramedic.ecgFindings === patientCase.doctor.ecgFindings)
      score += 30;
    const paramedicSymptoms = patientCase.paramedic.symptoms
      .toLowerCase()
      .split(", ");
    const doctorSymptoms = patientCase.doctor.symptoms
      .toLowerCase()
      .split(", ");
    const matchingSymptoms = paramedicSymptoms.filter((s) =>
      doctorSymptoms.includes(s)
    );
    score += matchingSymptoms.length * 5;
    return Math.min(score, 100);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Patient Case Comparison - {patientCase.id}
      </h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="vitals">Vitals</TabsTrigger>
          <TabsTrigger value="actions">Actions & Treatment</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Ambulance className="mr-2" /> Paramedic Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  <div>
                    <dt className="font-semibold">Arrival Time</dt>
                    <dd>
                      {new Date(
                        patientCase.paramedic.arrivalTime
                      ).toLocaleString()}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Initial Diagnosis</dt>
                    <dd>{patientCase.paramedic.initialDiagnosis}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Reported Symptoms</dt>
                    <dd>{patientCase.paramedic.symptoms}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">ECG Findings</dt>
                    <dd>{patientCase.paramedic.ecgFindings}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Stethoscope className="mr-2" /> Doctor Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  <div>
                    <dt className="font-semibold">Admission Time</dt>
                    <dd>
                      {new Date(
                        patientCase.doctor.admissionTime
                      ).toLocaleString()}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Final Diagnosis</dt>
                    <dd>{patientCase.doctor.finalDiagnosis}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Observed Symptoms</dt>
                    <dd>{patientCase.doctor.symptoms}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">ECG Findings</dt>
                    <dd>{patientCase.doctor.ecgFindings}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2" /> Performance Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">
                      Diagnostic Accuracy
                    </span>
                    <span className="text-sm font-medium">
                      {calculateAccuracy()}%
                    </span>
                  </div>
                  <Progress value={calculateAccuracy()} className="h-2" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-muted-foreground mr-2" />
                    <span>Time to Hospital Admission</span>
                  </div>
                  <Badge variant="secondary">
                    {calculateTimeDifference()} minutes
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <span>Accurate initial diagnosis</span>
                  </div>
                  <div className="flex items-center">
                    <XCircle className="h-5 w-5 text-red-500 mr-2" />
                    <span>Missed reciprocal ECG changes</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vitals" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Vitals Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vital Sign</TableHead>
                    <TableHead>Paramedic Reading</TableHead>
                    <TableHead>Doctor Reading</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Blood Pressure</TableCell>
                    <TableCell>
                      {patientCase.paramedic.vitals.bloodPressure}
                    </TableCell>
                    <TableCell>
                      {patientCase.doctor.vitals.bloodPressure}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Heart Rate</TableCell>
                    <TableCell>
                      {patientCase.paramedic.vitals.heartRate} bpm
                    </TableCell>
                    <TableCell>
                      {patientCase.doctor.vitals.heartRate} bpm
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Respiratory Rate</TableCell>
                    <TableCell>
                      {patientCase.paramedic.vitals.respiratoryRate} /min
                    </TableCell>
                    <TableCell>
                      {patientCase.doctor.vitals.respiratoryRate} /min
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Oxygen Saturation</TableCell>
                    <TableCell>
                      {patientCase.paramedic.vitals.oxygenSaturation}%
                    </TableCell>
                    <TableCell>
                      {patientCase.doctor.vitals.oxygenSaturation}%
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Temperature</TableCell>
                    <TableCell>
                      {patientCase.paramedic.vitals.temperature}°C
                    </TableCell>
                    <TableCell>
                      {patientCase.doctor.vitals.temperature}°C
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="actions" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Paramedic Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px]">
                  <ul className="space-y-2">
                    {patientCase.paramedic.actions.map((action, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Doctor Treatment</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px]">
                  <ul className="space-y-2">
                    {patientCase.doctor.treatment.map((treatment, index) => (
                      <li key={index} className="flex items-center">
                        <Stethoscope className="h-4 w-4 text-blue-500 mr-2" />
                        {treatment}
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="medications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Medications Administered</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medication</TableHead>
                    <TableHead>Dose</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Administered By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patientCase.paramedic.medicationsGiven.map((med, index) => (
                    <TableRow key={`paramedic-${index}`}>
                      <TableCell>{med.name}</TableCell>
                      <TableCell>{med.dose}</TableCell>
                      <TableCell>{med.route}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">Paramedic</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                  {patientCase.doctor.medications.map((med, index) => (
                    <TableRow key={`doctor-${index}`}>
                      <TableCell>{med.name}</TableCell>
                      <TableCell>{med.dose}</TableCell>
                      <TableCell>{med.route}</TableCell>
                      <TableCell>
                        <Badge>Doctor</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
