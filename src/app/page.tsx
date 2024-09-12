"use client";

import { CorrectIncorrectPieChart } from "@/components/ui/correct-incorrect-pie-chart";
import { PercentileGraph } from "@/components/ui/percentile-graph";
import { QuickStatsCard } from "@/components/ui/quick-stats-card";
import { SyllabusAnalysisCard } from "@/components/ui/syllabus-analysis-card";
import { TestInfoCard } from "@/components/ui/test-info-card";
import { useState } from "react";

interface TestInfo {
  rank: number;
  percentile: string;
  score: number;
}

interface PercentileDataPoint {
  percentile: string;
  numStudents: number;
}

interface CorrectIncorrectDataPoint {
  name: string;
  value: number;
}

const FIXED_PERCENTILES = ["0%", "25%", "50%", "75%", "100%"];

export default function TestResultsLayout() {
  const [testInfo, setTestInfo] = useState<TestInfo>({
    rank: 1,
    percentile: "37%",
    score: 12,
  });

  const [percentileData, setPercentileData] = useState<PercentileDataPoint[]>([
    { percentile: "0%", numStudents: 0 },
    { percentile: "10%", numStudents: 4 },
    { percentile: "20%", numStudents: 2 },
    { percentile: "25%", numStudents: 8 },
    { percentile: "30%", numStudents: 3 },
    { percentile: "37%", numStudents: 1 },
    { percentile: "40%", numStudents: 2 },
    { percentile: "50%", numStudents: 6 },
    { percentile: "60%", numStudents: 13 },
    { percentile: "70%", numStudents: 15 },
    { percentile: "75%", numStudents: 18 },
    { percentile: "100%", numStudents: 0 },
  ]);

  const [correctIncorrectData, setCorrectIncorrectData] = useState<
    CorrectIncorrectDataPoint[]
  >([
    { name: "Correct", value: 12 },
    { name: "Incorrect", value: 3 },
  ]);

  const updateTestInfo = (newInfo: TestInfo) => {
    setTestInfo(newInfo);

    setPercentileData((prevData) => {
      let newData = [...prevData];

      const prevIndex = newData.findIndex(
        (item) => item.percentile === testInfo.percentile
      );
      if (prevIndex !== -1) {
        newData[prevIndex] = {
          ...newData[prevIndex],
          numStudents: Math.max(0, newData[prevIndex].numStudents - 1),
        };
      }

      const newIndex = newData.findIndex(
        (item) => item.percentile === newInfo.percentile
      );
      if (newIndex !== -1) {
        newData[newIndex] = {
          ...newData[newIndex],
          numStudents: newData[newIndex].numStudents + 1,
        };
      } else {
        newData.push({ percentile: newInfo.percentile, numStudents: 1 });
      }

      newData = newData.filter(
        (item) =>
          item.numStudents > 0 || FIXED_PERCENTILES.includes(item.percentile)
      );

      newData.sort((a, b) => parseInt(a.percentile) - parseInt(b.percentile));

      return newData;
    });

    const totalQuestions = 15;
    const correctAnswers = newInfo.score;
    const incorrectAnswers = totalQuestions - correctAnswers;
    setCorrectIncorrectData([
      { name: "Correct", value: correctAnswers },
      { name: "Incorrect", value: incorrectAnswers },
    ]);
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-xl">Skill Test</h1>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-3 space-y-4">
          <TestInfoCard onUpdate={updateTestInfo} />
          <QuickStatsCard
            rank={testInfo.rank}
            percentile={testInfo.percentile}
            correctAnswers={`${testInfo.score}/15`}
          />
          <PercentileGraph
            yourPercentile={testInfo.percentile}
            data={percentileData}
          />
        </div>
        <div className="md:col-span-2 space-y-4">
          <SyllabusAnalysisCard />
          <CorrectIncorrectPieChart
            data={correctIncorrectData}
            score={testInfo.score}
          />
        </div>
      </div>
    </div>
  );
}
