import { describe, expect, it } from "vitest";
import { CreateAppointment } from "./create-appointment";
import { Appointment } from "../entities/appointments";
import { getFutureDate } from "../tests/utils/get-future-date";

describe("Create Appointment", () => {
  it("shoulde be able to create an appointment", () => {
    const createAppointment = new CreateAppointment();

    const startsAt = getFutureDate("2024-10-10");
    const endsAt = getFutureDate("2024-10-11");

    expect(
      createAppointment.execute({
        customer: "Bruno Bechara",
        startsAt,
        endsAt,
      })
    ).resolves.toBeInstanceOf(Appointment);
  });
});
