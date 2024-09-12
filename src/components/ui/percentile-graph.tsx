"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Label,
} from "recharts";
import Image from "next/image";
import chartIcon from "@/components/images/chart.png";

interface DataPoint {
  percentile: string;
  numStudents: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
  yourPercentile: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
  yourPercentile,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-300 p-2 rounded shadow">
        <p className="text-gray-400">{`Percentile: ${label}`}</p>
        <p className="text-[#8884d8]">{`Number of Students: ${payload[0].value}`}</p>
        {label === yourPercentile && (
          <p className="font-bold text-green-600">Your Percentile</p>
        )}
      </div>
    );
  }
  return null;
};

interface PercentileGraphProps {
  yourPercentile: string;
  data: DataPoint[];
}

export const PercentileGraph: React.FC<PercentileGraphProps> = ({
  yourPercentile,
  data,
}) => {
  const customTicks: string[] = ["0%", "25%", "50%", "75%", "100%"];

  return (
    <Card className="w-full h-[400px]">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Percentile Distribution
          <div className="flex items-center justify-center w-12 h-12 text-sm rounded-full bg-secondary">
            <Image
              src={chartIcon}
              height={200}
              width={200}
              alt="chart"
              className="h-6 w-6"
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <h1 className="text-secondary-foreground/75">
          <strong>You scored {yourPercentile} percentile</strong> which is lower
          than the average percentile 72% of all the engineers who took this
          assessment
        </h1>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ left: 20, right: 30, top: 20, bottom: 20 }}
          >
            <XAxis
              dataKey="percentile"
              ticks={customTicks}
              tickFormatter={(value) => value}
              padding={{ left: 10, right: 10 }}
            />
            <Tooltip
              content={<CustomTooltip yourPercentile={yourPercentile} />}
            />
            <Line
              type="monotone"
              dataKey="numStudents"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            <ReferenceLine
              x={yourPercentile}
              stroke="gray"
              opacity={0.3}
              strokeWidth={2}
              label={
                <Label value="Your Percentile" position="top" fill="gray" />
              }
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
