"use client";

import { useState, useRef, useEffect } from "react";
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
import Tesseract from "tesseract.js";

export default function Component() {
  const [formData, setFormData] = useState({
    nidaId: "",
    diagnosis: "",
    actionsTaken: "",
    medicationGiven: "",
  });

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [detectedText, setDetectedText] = useState("");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      if (videoRef.current) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" }, // Use the back camera
          });
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        } catch (err) {
          console.error("Error accessing camera:", err);
        }
      }
    };

    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Patient information submitted successfully!");
  };

  const handleCapture = (event: any) => {
    event.preventDefault()
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const imageData = canvasRef.current.toDataURL("image/png");
        setImageSrc(imageData);
      }
    }
  };

  const handleRetake = () => {
    setImageSrc(null);
    setDetectedText("");
  };

  const handleDone = async (event: any) => {
    event.preventDefault()
    if (imageSrc) {
      Tesseract.recognize(
          imageSrc,
          'eng',
          {
            logger: (info) => console.log(info),
          }
      ).then(({ data: { text } }) => {
        setDetectedText(text);
      }).catch((err) => {
        console.error("Error during OCR:", err);
        setDetectedText("Error detecting text.");
      });
    }
  };

  return (
      <div className="h-full flex flex-col items-center">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Paramedic Patient Handover Form
            </CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
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

              {/* Camera Feed Section */}
              <div className="space-y-2 ">
                <Label>Camera Feed</Label>
                <video
                    ref={videoRef}
                    className="w-full max-h-48 border rounded"
                    autoPlay
                    playsInline
                ></video>
                <Button onClick={handleCapture}>Capture</Button>
                <canvas ref={canvasRef} className="hidden" width={640} height={480}></canvas>
                {imageSrc && (
                    <div className="mt-2 flex flex-col items-center">
                      <img src={imageSrc} alt="Captured" className="w-full max-h-48 object-contain" />
                      <div className="mt-2 space-x-4">
                        <Button onClick={handleRetake}>Retake</Button>
                        <Button onClick={handleDone}>Done</Button>
                      </div>
                    </div>
                )}
              </div>

              {detectedText && (
                  <div className="space-y-2">
                    <Label htmlFor="detectedText">Detected Text</Label>
                    <Textarea
                        id="detectedText"
                        value={detectedText}
                        readOnly
                        className="bg-gray-100"
                    />
                  </div>
              )}
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
