import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import trophyIcon from "@/components/images/trophy.png";
import notesIcon from "@/components/images/notes.png";
import checkIcon from "@/components/images/check.png";

type QuickStatsCardProps = {
  rank: number;
  percentile: string;
  correctAnswers: string;
};

export function QuickStatsCard({
  rank,
  percentile,
  correctAnswers,
}: QuickStatsCardProps) {
  const stats = [
    {
      icon: (
        <Image
          src={trophyIcon}
          height={200}
          width={200}
          alt="trophy"
          className="h-6 w-6"
        />
      ),
      value: rank,
      label: "YOUR RANK",
    },
    {
      icon: (
        <Image
          src={notesIcon}
          height={200}
          width={200}
          alt="notes"
          className="h-8 w-8"
        />
      ),
      value: percentile,
      label: "PERCENTILE",
    },
    {
      icon: (
        <Image
          src={checkIcon}
          height={200}
          width={200}
          alt="check"
          className="h-5 w-5"
        />
      ),
      value: correctAnswers,
      label: "CORRECT ANSWERS",
    },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Quick Statistics</CardTitle>
      </CardHeader>
      <CardContent className="py-6 px-2">
        <div className="flex flex-col space-y-6 sm:flex-row sm:space-y-0 sm:space-x-6 items-center justify-center">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4"
            >
              {index > 0 && index < stats.length && (
                <Separator
                  className="hidden sm:block h-16"
                  orientation="vertical"
                />
              )}
              <div className="flex flex-col sm:flex-row items-center sm:space-x-4">
                <div className="flex items-center justify-center w-12 h-12 text-sm rounded-full bg-secondary">
                  {stat.icon}
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
