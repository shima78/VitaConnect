"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export default function Component() {
  const [formData, setFormData] = useState({
    patientName: "",
    patientId: "",
    finalDiagnosis: "",
    treatmentPlan: "",
    medicationPrescribed: "",
    additionalTests: "",
    initialDiagnosisAccuracy: "",
    feedbackForParamedics: "",
    admissionRequired: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      initialDiagnosisAccuracy: value,
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prevData) => ({ ...prevData, admissionRequired: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to a server or perform other actions
    alert("Doctor's diagnostic information submitted successfully!");
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Doctor Diagnostic Form
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patientName">Patient Name</Label>
              <Input
                id="patientName"
                name="patientName"
                placeholder="Enter patient's full name"
                value={formData.patientName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="patientId">Patient ID</Label>
              <Input
                id="patientId"
                name="patientId"
                placeholder="Enter patient's ID"
                value={formData.patientId}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="finalDiagnosis">Final Diagnosis</Label>
            <Textarea
              id="finalDiagnosis"
              name="finalDiagnosis"
              placeholder="Enter final diagnosis"
              value={formData.finalDiagnosis}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="treatmentPlan">Treatment Plan</Label>
            <Textarea
              id="treatmentPlan"
              name="treatmentPlan"
              placeholder="Describe the treatment plan"
              value={formData.treatmentPlan}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="medicationPrescribed">Medication Prescribed</Label>
            <Textarea
              id="medicationPrescribed"
              name="medicationPrescribed"
              placeholder="List prescribed medications"
              value={formData.medicationPrescribed}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="additionalTests">Additional Tests Required</Label>
            <Textarea
              id="additionalTests"
              name="additionalTests"
              placeholder="List any additional tests required"
              value={formData.additionalTests}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="initialDiagnosisAccuracy">
              Initial Diagnosis Accuracy
            </Label>
            <Select
              onValueChange={handleSelectChange}
              value={formData.initialDiagnosisAccuracy}
            >
              <SelectTrigger id="initialDiagnosisAccuracy">
                <SelectValue placeholder="Select accuracy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="accurate">Accurate</SelectItem>
                <SelectItem value="partiallyAccurate">
                  Partially Accurate
                </SelectItem>
                <SelectItem value="inaccurate">Inaccurate</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="feedbackForParamedics">
              Feedback for Paramedics
            </Label>
            <Textarea
              id="feedbackForParamedics"
              name="feedbackForParamedics"
              placeholder="Provide feedback for the paramedic team"
              value={formData.feedbackForParamedics}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="admissionRequired"
              checked={formData.admissionRequired}
              onCheckedChange={handleCheckboxChange}
            />
            <Label htmlFor="admissionRequired">Admission Required</Label>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Submit Diagnostic Information
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
