"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const syllabusData = [
  {
    topic: "HTML Basics",
    percentage: 90,
    color: "bg-blue-500",
    secColor: "bg-blue-100",
    textColor: "text-blue-500",
  },
  {
    topic: "CSS Fundamentals",
    percentage: 75,
    color: "bg-green-500",
    secColor: "bg-green-100",
    textColor: "text-green-500",
  },
  {
    topic: "JavaScript Essentials",
    percentage: 60,
    color: "bg-yellow-500",
    secColor: "bg-yellow-100",
    textColor: "text-yellow-500",
  },
  {
    topic: "Web Accessibility",
    percentage: 85,
    color: "bg-purple-500",
    secColor: "bg-purple-100",
    textColor: "text-purple-500",
  },
];

export function SyllabusAnalysisCard() {
  return (
    <Card className="h-auto">
      <CardHeader>
        <CardTitle>Syllabus-wise Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 mt-4">
        {syllabusData.map((item, index) => (
          <div key={index} className="space-y-2">
            <span>{item.topic}</span>
            <div className="flex justify-between items-center text-sm gap-3">
              <Progress
                value={item.percentage}
                className={item.color}
                secColor={item.secColor}
              />
              <h1 className={`text-md ${item.textColor} font-semibold`}>
                {item.percentage}%
              </h1>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
