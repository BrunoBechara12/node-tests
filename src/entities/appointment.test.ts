import { expect, test } from "vitest";
import { Appointment } from "./appointments";

test("create an appointment", () => {
  const startsAt = new Date();
  const endsAt = new Date();

  endsAt.setDate(endsAt.getDate() + 3);
  startsAt.setDate(startsAt.getDate() + 1);

  const appointment = new Appointment({
    customer: "Bruno Bechara",
    startsAt,
    endsAt,
  });

  expect(appointment).toBeInstanceOf(Appointment);
  expect(appointment.customer).toEqual("Bruno Bechara");
});

test("cannot create an appointment with end date earlier than start date", () => {
  const startsAt = new Date();
  const endsAt = new Date();

  endsAt.setDate(endsAt.getDate());
  startsAt.setDate(startsAt.getDate() + 1);

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
