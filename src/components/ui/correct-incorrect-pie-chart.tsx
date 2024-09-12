"use client";

import React from "react";
import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import targetIcon from "@/components/images/target.png";

interface CorrectIncorrectPieChartPropsArray {
  name: string;
  value: number;
}

interface CorrectIncorrectPieChartProps {
  data: CorrectIncorrectPieChartPropsArray[];
  score: number;
}

const COLORS = ["#2563eb", "#93c5fd"];

export const CorrectIncorrectPieChart = ({
  data,
  score,
}: CorrectIncorrectPieChartProps) => {
  return (
    <Card className="h-[400px] relative">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Correct vs Incorrect</CardTitle>
          <CardTitle className="text-md text-blue-500">{score}/15</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="h-[300px] relative">
        <h1 className="text-secondary-foreground/75 mt-4">
          <strong>You scored {score} questions correct out of 15.</strong>{" "}
          However, it still needs some improvements.
        </h1>

        <div className="relative h-[100%]">
          {/* Responsive Pie Chart */}
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
            <Image
              src={targetIcon}
              height={200}
              width={200}
              alt="chart"
              className="h-7 w-7 object-contain"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
