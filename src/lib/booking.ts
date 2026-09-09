export const consultationTypes = ["infra", "devops", "cloud", "power"];
export const consultationTimes = ["09:00", "10:30", "13:00", "14:30", "16:00"];

export function todayInLondon() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/London", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
}

export function bookingDateNumber(iso: string) {
  return Number(iso.replaceAll("-", ""));
}

export function validBookingDate(date: number) {
  if (!Number.isInteger(date)) return false;
  const value = String(date);
  if (!/^\d{8}$/.test(value)) return false;
  const iso = `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`;
  const parsed = new Date(`${iso}T12:00:00Z`);
  if (!Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== iso) return false;
  const horizon = new Date(`${todayInLondon()}T12:00:00Z`);
  horizon.setUTCDate(horizon.getUTCDate() + 365);
  return iso > todayInLondon() && parsed <= horizon && parsed.getUTCDay() !== 0 && parsed.getUTCDay() !== 6;
}

export function formatBookingDate(date: number) {
  const raw = String(date);
  if (raw.length !== 8) return `June ${date}, 2026 (legacy booking)`;
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })
    .format(new Date(`${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6)}T12:00:00Z`));
}
