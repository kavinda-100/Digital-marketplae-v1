"use client";
import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const timeZones = [
  { label: "Us-washington", value: "America/New_York" },
  { label: "Us-Los Angeles", value: "America/Los_Angeles" },
  { label: "Canada-Toronto", value: "America/Toronto" },
  { label: "Canada-Vancouver", value: "America/Vancouver" },
  { label: "London", value: "Europe/London" },
  { label: "Germany-Berlin", value: "Europe/Berlin" },
  { label: "France-Paris", value: "Europe/Paris" },
  { label: "Italy-Rome", value: "Europe/Rome" },
  { label: "Spain-Madrid", value: "Europe/Madrid" },
  { label: "Netherlands-Amsterdam", value: "Europe/Amsterdam" },
  { label: "Russia-Moscow", value: "Europe/Moscow" },
  { label: "Australia-Sydney", value: "Australia/Sydney" },
  { label: "New Zealand-Auckland", value: "Pacific/Auckland" },
  { label: "UAE-Dubai", value: "Asia/Dubai" },
  { label: "Sri Lanka-Colombo", value: "Asia/Colombo" },
  { label: "Singapore-Singapore", value: "Asia/Singapore" },
  { label: "China-Beijing", value: "Asia/Shanghai" },
  { label: "Japan-Tokyo", value: "Asia/Tokyo" },
  { label: "India-New Delhi", value: "Asia/Kolkata" },
  { label: "South Africa-Johannesburg", value: "Africa/Johannesburg" },
  { label: "Brazil-Rio de Janeiro", value: "America/Sao_Paulo" },
  { label: "Argentina-Buenos Aires", value: "America/Argentina/Buenos_Aires" },
  { label: "Mexico-Mexico City", value: "America/Mexico_City" },
  { label: "Chile-Santiago", value: "America/Santiago" },
  { label: "Peru-Lima", value: "America/Lima" },
  { label: "Colombia-Bogota", value: "America/Bogota" },
  { label: "Ecuador-Quito", value: "America/Guayaquil" },
  { label: "Venezuela-Caracas", value: "America/Caracas" },
  { label: "Panama-Panama City", value: "America/Panama" },
  { label: "Costa Rica-San Jose", value: "America/Costa_Rica" },
  { label: "Nicaragua-Managua", value: "America/Managua" },
];

const TimeZoneClock = () => {
  const [value, setValue] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = new Intl.DateTimeFormat("en-GB", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
    timeZone: value,
  })
    .format(currentTime)
    .replace("am", "AM")
    .replace("pm", "PM");

  return (
    <Card className={"max-w-[400px]"}>
      <CardHeader>
        <CardTitle>Time Zone Clock</CardTitle>
      </CardHeader>
      <CardContent>
        <Select onValueChange={setValue}>
          <SelectTrigger className="w-full">
            <SelectValue
              placeholder={
                timeZones.find((zone) => zone.value === value)?.label ??
                "Select Time Zone"
              }
            />
          </SelectTrigger>
          <SelectContent>
            {timeZones.map((zone) => (
              <SelectItem key={zone.value} value={zone.value}>
                {zone.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
      <CardFooter>
        <div>
          <h2 className={"text-md font-medium"}>
            Current Time in:{" "}
            <span className={"font-bold text-primary"}>
              {timeZones.find((zone) => zone.value === value)?.label}
            </span>
          </h2>
          <p className={"text-md font-sans font-semibold"}>{formattedTime}</p>
        </div>
      </CardFooter>
    </Card>
  );
};
export default TimeZoneClock;
