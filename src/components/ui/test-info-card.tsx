"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import htmlLogo from "@/components/images/html.png";
import Image from "next/image";

interface TestInfo {
  rank: number;
  percentile: string;
  score: number;
}

interface TestInfoCardProps {
  onUpdate: (newInfo: TestInfo) => void;
}

interface FormData {
  rank: string;
  percentile: string;
  score: string;
}

export function TestInfoCard({ onUpdate }: TestInfoCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    rank: "",
    percentile: "",
    score: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.rank) {
      newErrors.rank = "Rank is required";
    }

    if (!formData.percentile) {
      newErrors.percentile = "Percentile is required";
    } else if (parseFloat(formData.percentile) > 100) {
      newErrors.percentile = "Percentile should be less than or equal to 100";
    }

    if (!formData.score) {
      newErrors.score = "Score is required";
    } else if (parseInt(formData.score) > 15) {
      newErrors.score = "Score should be less than or equal to 15";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onUpdate({
        rank: parseInt(formData.rank),
        percentile: `${formData.percentile}%`,
        score: parseInt(formData.score),
      });
      setIsOpen(false);
      setFormData({
        rank: "",
        percentile: "",
        score: "",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    // Clear error when user starts typing
    if (errors[e.target.id as keyof FormData]) {
      setErrors({
        ...errors,
        [e.target.id]: undefined,
      });
    }
  };

  const inputs = [
    {
      label: (
        <>
          Update your <strong>Rank</strong>
        </>
      ),
      id: "rank",
      type: "number",
      placeholder: "Enter your rank",
      value: formData.rank,
    },
    {
      label: (
        <>
          Update your <strong>Percentile</strong>
        </>
      ),
      id: "percentile",
      type: "number",
      placeholder: "Enter your percentile",
      value: formData.percentile,
    },
    {
      label: (
        <>
          Update your <strong>current score (out of 15)</strong>
        </>
      ),
      id: "score",
      type: "number",
      placeholder: "Enter your score",
      value: formData.score,
    },
  ];

  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <Image
            src={htmlLogo}
            height={200}
            width={200}
            alt="Html"
            className="h-14 w-14 text-orange-500"
          />
          <div>
            <h3 className="font-semibold text-lg">HTML Basics Test</h3>
            <p className="text-sm text-muted-foreground">
              Duration: 1 hour | Questions: 50 | Submitted on 5th June 2021
            </p>
          </div>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="blue">Update</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[750px]">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between mb-5 mt-8 px-2">
                Update Test Information
                <Image
                  src={htmlLogo}
                  height={200}
                  width={200}
                  alt="Html"
                  className="h-8 w-8 text-orange-500"
                />
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              {inputs.map((input, index) => (
                <div
                  key={input.id}
                  className="flex items-center justify-between gap-2 space-y-2"
                >
                  <div className="flex items-center justify-start gap-2 w-full">
                    <div className="flex items-center justify-center w-6 h-6  text-sm rounded-full bg-[#132278] text-white flex-shrink-0">
                      {index + 1}
                    </div>
                    <Label htmlFor={input.id} className="flex-grow">
                      {input.label}
                    </Label>
                  </div>
                  <div className="flex flex-col w-full items-start justify-start">
                    <Input
                      id={input.id}
                      type={input.type}
                      value={input.value}
                      onChange={handleChange}
                      placeholder={input.placeholder}
                      className="ml-2"
                      // required
                    />
                    {errors[input.id as keyof FormData] && (
                      <p className="ml-4 text-red-500 text-sm">
                        {errors[input.id as keyof FormData]}
                      </p>
                    )}
                  </div>
                </div>
              ))}
              <Button variant="blue" type="submit" className="self-end w-1/4">
                Submit
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
