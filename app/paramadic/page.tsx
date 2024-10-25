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

export default function Component() {
  const [formData, setFormData] = useState({
    nidaId: "",
    diagnosis: "",
    actionsTaken: "",
    medicationGiven: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to a server or perform other actions
    alert("Patient information submitted successfully!");
  };

  return (
    <div className="h-full flex">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Paramedic Patient Handover Form
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid  gap-4">
              <div className="space-y-2">
                <Label htmlFor="nidaId">NIDA ID/Patient Id</Label>
                <Input
                  id="nidaId"
                  name="nidaId"
                  placeholder="Enter patient's NIDA ID"
                  value={formData.nidaId}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="diagnosis">Initial Diagnosis</Label>
              <Textarea
                id="diagnosis"
                name="diagnosis"
                placeholder="Enter initial diagnosis"
                value={formData.diagnosis}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="actionsTaken">Actions Taken</Label>
              <Textarea
                id="actionsTaken"
                name="actionsTaken"
                placeholder="Describe actions taken"
                value={formData.actionsTaken}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="medicationGiven">Medication Given</Label>
              <Textarea
                id="medicationGiven"
                name="medicationGiven"
                placeholder="List any medication given"
                value={formData.medicationGiven}
                onChange={handleInputChange}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Submit Patient Information
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
