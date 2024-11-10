import { describe, expect, it } from "vitest";
import { CreateAppointment } from "./create-appointment";
import { Appointment } from "../entities/appointments";
import { getFutureDate } from "../tests/utils/get-future-date";
import { InMemoryAppointmentsRepository } from "../repositories/in-memory/in-memory-appointments-repository";

describe("Create Appointment", () => {
  it("should be able to create an appointment", () => {
    const appointmentRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppointment(appointmentRepository);

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

  it("should not be able to create an appointment with overlapping dates", async () => {
    const appointmentRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppointment(appointmentRepository);

    const startsAt = getFutureDate("2024-10-10");
    const endsAt = getFutureDate("2024-10-15");

    await createAppointment.execute({
      customer: "Bruno Bechara",
      startsAt,
      endsAt,
    });

    expect(
      createAppointment.execute({
        customer: "Bruno Bechara",
        startsAt: getFutureDate("2024-10-14"),
        endsAt: getFutureDate("2024-10-18"),
      })
    ).rejects.toBeInstanceOf(Error);

    expect(
      createAppointment.execute({
        customer: "Bruno Bechara",
        startsAt: getFutureDate("2024-10-08"),
        endsAt: getFutureDate("2024-10-12"),
      })
    ).rejects.toBeInstanceOf(Error);

    expect(
      createAppointment.execute({
        customer: "Bruno Bechara",
        startsAt: getFutureDate("2024-10-08"),
        endsAt: getFutureDate("2024-10-17"),
      })
    ).rejects.toBeInstanceOf(Error);

    expect(
      createAppointment.execute({
        customer: "Bruno Bechara",
        startsAt: getFutureDate("2024-10-11"),
        endsAt: getFutureDate("2024-10-14"),
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
