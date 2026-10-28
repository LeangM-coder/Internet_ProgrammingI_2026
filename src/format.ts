import type { CampusEvent } from "./types";

export function seatsLeft(e: CampusEvent): number {
  return Math.max(0, e.capacity - e.booked);
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// "Mon 2 Nov, 09:00" in UTC, so the output is the same on every machine and browser
// export function formatDate(iso: string): string {
//   const d = new Date(iso);
//   const hh = String(d.getUTCHours()).padStart(2, "0");
//   const mm = String(d.getUTCMinutes()).padStart(2, "0");
//   return `${DAYS[d.getUTCDay()]} ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}, ${hh}:${mm}`;
// }
export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return String(iso);
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", {
      weekday: "short", day: "numeric", month: "short",
      hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "UTC",
    }).formatToParts(d).map(x => [x.type, x.value])
  );
  return `${p.weekday} ${p.day} ${p.month}, ${p.hour}:${p.minute}`;
}