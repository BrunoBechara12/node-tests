import { setYear, parseISO } from "date-fns";

//Recebe "2024-10-11" e retorna "2025-10-11"

export function getFutureDate(date: string) {
  return setYear(parseISO(date), new Date().getFullYear() + 1);
}
