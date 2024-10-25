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
import { Switch } from "@/components/ui/switch";
import { AlertTriangle } from "lucide-react";

export default function Component() {
  const [formData, setFormData] = useState({
    patientName: "",
    patientId: "",
    infectiousDisease: "",
    symptoms: "",
    severity: "",
    isolationRequired: false,
    department: "",
    additionalNotes: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (field: string) => (value: string) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prevData) => ({ ...prevData, isolationRequired: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Infectious disease report submitted successfully!");
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center">
            <AlertTriangle className="mr-2 h-6 w-6 text-yellow-500" />
            Infectious Disease Report
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
              <Label htmlFor="infectiousDisease">Infectious Disease</Label>
              <Input
                id="infectiousDisease"
                name="infectiousDisease"
                placeholder="Enter the suspected or confirmed infectious disease"
                value={formData.infectiousDisease}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="symptoms">Symptoms</Label>
              <Textarea
                id="symptoms"
                name="symptoms"
                placeholder="Describe the patient's symptoms"
                value={formData.symptoms}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="severity">Severity</Label>
              <Select onValueChange={handleSelectChange("severity")}>
                <SelectTrigger id="severity">
                  <SelectValue placeholder="Select severity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mild">Mild</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="severe">Severe</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="isolationRequired"
                checked={formData.isolationRequired}
                onCheckedChange={handleSwitchChange}
              />
              <Label htmlFor="isolationRequired">Isolation Required</Label>
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Assigned Department</Label>
              <Select onValueChange={handleSelectChange("department")}>
                <SelectTrigger id="department">
                  <SelectValue placeholder="Select assigned department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="infectiousDisease">
                    Infectious Disease
                  </SelectItem>
                  <SelectItem value="icu">Intensive Care Unit</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                  <SelectItem value="pediatrics">Pediatrics</SelectItem>
                  <SelectItem value="generalMedicine">
                    General Medicine
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="additionalNotes">Additional Notes</Label>
              <Textarea
                id="additionalNotes"
                name="additionalNotes"
                placeholder="Any additional information or special instructions"
                value={formData.additionalNotes}
                onChange={handleInputChange}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Submit Report
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
