import { useEffect, useState } from "react";
import { SITE } from "@/config/site";

type OpeningStatus = {
  isOpen: boolean;
  countdown: string;
};

type ZonedParts = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
};

const getZonedParts = (date: Date): ZonedParts => {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: SITE.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));

  return {
    year: Number(values.year),
    month: Number(values.month),
    day: Number(values.day),
    hour: Number(values.hour),
    minute: Number(values.minute),
  };
};

const zonedDate = (
  date: Pick<ZonedParts, "year" | "month" | "day">,
  hour: number,
  minute: number,
) => {
  const target = Date.UTC(date.year, date.month - 1, date.day, hour, minute);
  let timestamp = target;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const parts = getZonedParts(new Date(timestamp));
    const represented = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute);
    timestamp += target - represented;
  }

  return new Date(timestamp);
};

const nextCalendarDay = (date: Pick<ZonedParts, "year" | "month" | "day">) => {
  const next = new Date(Date.UTC(date.year, date.month - 1, date.day + 1));
  return { year: next.getUTCFullYear(), month: next.getUTCMonth() + 1, day: next.getUTCDate() };
};

const getOpeningStatus = (now: Date): OpeningStatus => {
  const parts = getZonedParts(now);
  const currentMinute = parts.hour * 60 + parts.minute;
  const opensAt = SITE.openingTime.split(":").map(Number);
  const closesAt = SITE.closingTime.split(":").map(Number);
  const openingMinute = opensAt[0] * 60 + opensAt[1];
  const closingMinute = closesAt[0] * 60 + closesAt[1];
  const isOpen = currentMinute >= openingMinute || currentMinute < closingMinute;
  const targetDate = isOpen && currentMinute >= openingMinute ? nextCalendarDay(parts) : parts;
  const target = isOpen
    ? zonedDate(targetDate, closesAt[0], closesAt[1])
    : zonedDate(parts, opensAt[0], opensAt[1]);
  const remainingMinutes = Math.max(0, Math.ceil((target.getTime() - now.getTime()) / 60_000));
  const hours = Math.floor(remainingMinutes / 60);
  const minutes = remainingMinutes % 60;

  return {
    isOpen,
    countdown: `${hours}h ${minutes}m`,
  };
};

export function useOpeningStatus() {
  const [status, setStatus] = useState<OpeningStatus | null>(null);

  useEffect(() => {
    const update = () => setStatus(getOpeningStatus(new Date()));
    update();
    const timer = window.setInterval(update, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return status;
}
