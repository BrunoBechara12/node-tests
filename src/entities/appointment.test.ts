import { expect, test } from "vitest";
import { Appointment } from "./appointments";
import { getFutureDate } from "../tests/utils/get-future-date";

test("create an appointment", () => {
  const startsAt = getFutureDate("2024-10-10");
  const endsAt = getFutureDate("2024-10-12");

  const appointment = new Appointment({
    customer: "Bruno Bechara",
    startsAt,
    endsAt,
  });

  expect(appointment).toBeInstanceOf(Appointment);
  expect(appointment.customer).toEqual("Bruno Bechara");
});

test("cannot create an appointment with end date earlier than start date", () => {
  const startsAt = getFutureDate("2024-10-10");
  const endsAt = getFutureDate("2024-10-09");

  expect(() => {
    return new Appointment({
      customer: "Bruno Bechara",
      startsAt,
      endsAt,
    });
  }).toThrow();
});

test("cannot create an appointment with start date earlier than now", () => {
  const startsAt = new Date();
  const endsAt = new Date();

  endsAt.setDate(endsAt.getDate() + 5);
  startsAt.setDate(startsAt.getDate() - 1);

  expect(() => {
    return new Appointment({
      customer: "Bruno",
      startsAt,
      endsAt,
    });
  }).toThrow();
});
